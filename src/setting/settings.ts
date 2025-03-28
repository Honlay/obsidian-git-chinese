import type { App, RGB } from "obsidian";
import { moment, Notice, Platform, PluginSettingTab, Setting } from "obsidian";
import {
    DATE_TIME_FORMAT_SECONDS,
    DEFAULT_SETTINGS,
    GIT_LINE_AUTHORING_MOVEMENT_DETECTION_MINIMAL_LENGTH,
} from "src/constants";
import { IsomorphicGit } from "src/gitManager/isomorphicGit";
import { SimpleGit } from "src/gitManager/simpleGit";
import { previewColor } from "src/lineAuthor/lineAuthorProvider";
import type {
    LineAuthorDateTimeFormatOptions,
    LineAuthorDisplay,
    LineAuthorFollowMovement,
    LineAuthorSettings,
    LineAuthorTimezoneOption,
} from "src/lineAuthor/model";
import type ObsidianGit from "src/main";
import type {
    ObsidianGitSettings,
    ShowAuthorInHistoryView,
    SyncMethod,
} from "src/types";
import { convertToRgb, rgbToString, formatMinutes } from "src/utils";
import { getAvailableLanguages, setLocale, t } from "src/i18n";

const FORMAT_STRING_REFERENCE_URL =
    "https://momentjs.com/docs/#/parsing/string-format/";
const LINE_AUTHOR_FEATURE_WIKI_LINK =
    "https://publish.obsidian.md/git-doc/Line+Authoring";

export class ObsidianGitSettingsTab extends PluginSettingTab {
    lineAuthorColorSettings: Map<"oldest" | "newest", Setting> = new Map();
    constructor(
        app: App,
        private plugin: ObsidianGit
    ) {
        super(app, plugin);
    }

    private get settings() {
        return this.plugin.settings;
    }

    display(): void {
        const { containerEl } = this;
        const plugin: ObsidianGit = this.plugin;

        let commitOrSync: string;
        if (plugin.settings.differentIntervalCommitAndPush) {
            commitOrSync = "commit";
        } else {
            commitOrSync = "commit-and-sync";
        }

        const gitReady = plugin.gitReady;

        containerEl.empty();
        
        new Setting(containerEl).setName(t("settings.general")).setHeading();
        
        new Setting(containerEl)
            .setName(t("settings.language"))
            .setDesc(t("settings.languageDesc"))
            .addDropdown((dropdown) => {
                const languages = getAvailableLanguages();
                languages.forEach((lang) => {
                    dropdown.addOption(lang.value, lang.label);
                });
                dropdown.setValue(plugin.settings.language);
                dropdown.onChange(async (value) => {
                    plugin.settings.language = value as any;
                    setLocale(value as any);
                    await plugin.saveSettings();
                    this.display();
                });
            });
            
        if (!gitReady) {
            containerEl.createEl("p", {
                text: t("settings.notReady"),
            });
            containerEl.createEl("br");
        }

        let setting: Setting;
        if (gitReady) {
            new Setting(containerEl).setName(t("settings.automatic")).setHeading();
            new Setting(containerEl)
                .setName(t("settings.splitTimers"))
                .setDesc(t("settings.splitTimersDesc"))
                .addToggle((toggle) =>
                    toggle
                        .setValue(
                            plugin.settings.differentIntervalCommitAndPush
                        )
                        .onChange(async (value) => {
                            plugin.settings.differentIntervalCommitAndPush =
                                value;
                            await plugin.saveSettings();
                            plugin.automaticsManager.reload("commit", "push");
                            this.display();
                        })
                );

            const intervalName = plugin.settings.differentIntervalCommitAndPush
                ? "settings.autoCommitInterval"
                : "settings.autoCommitAndSyncInterval";
            const intervalDesc = plugin.settings.differentIntervalCommitAndPush
                ? "settings.autoCommitIntervalDesc"
                : "settings.autoCommitAndSyncIntervalDesc";

            new Setting(containerEl)
                .setName(t(intervalName))
                .setDesc(t(intervalDesc))
                .addText((text) => {
                    text.inputEl.type = "number";
                    text.setValue(String(plugin.settings.autoSaveInterval));
                    text.setPlaceholder(
                        String(DEFAULT_SETTINGS.autoSaveInterval)
                    );
                    text.onChange(async (value) => {
                        plugin.settings.autoSaveInterval = Number(value);
                        await plugin.saveSettings();
                        plugin.automaticsManager.reload("commit");
                    });
                });

            setting = new Setting(containerEl)
                .setName(t("settings.autoCommitAfterFileEdits", commitOrSync))
                .setDesc(
                    t("settings.autoCommitAfterFileEditsDesc", 
                      commitOrSync, 
                      formatMinutes(plugin.settings.autoSaveInterval))
                )
                .addToggle((toggle) =>
                    toggle
                        .setValue(plugin.settings.autoBackupAfterFileChange)
                        .onChange(async (value) => {
                            plugin.settings.autoBackupAfterFileChange = value;
                            this.display();
                            await plugin.saveSettings();
                            plugin.automaticsManager.reload("commit");
                        })
                );
            this.mayDisableSetting(
                setting,
                plugin.settings.setLastSaveToLastCommit
            );

            setting = new Setting(containerEl)
                .setName(t("settings.autoCommitAfterLatestCommit", commitOrSync))
                .setDesc(t("settings.autoCommitAfterLatestCommitDesc", commitOrSync))
                .addToggle((toggle) =>
                    toggle
                        .setValue(plugin.settings.setLastSaveToLastCommit)
                        .onChange(async (value) => {
                            plugin.settings.setLastSaveToLastCommit = value;
                            await plugin.saveSettings();
                            plugin.automaticsManager.reload("commit");
                            this.display();
                        })
                );
            this.mayDisableSetting(
                setting,
                plugin.settings.autoBackupAfterFileChange
            );

            setting = new Setting(containerEl)
                .setName(t("settings.autoPushInterval"))
                .setDesc(t("settings.autoPushIntervalDesc"))
                .addText((text) => {
                    text.inputEl.type = "number";
                    text.setValue(String(plugin.settings.autoPushInterval));
                    text.setPlaceholder(
                        String(DEFAULT_SETTINGS.autoPushInterval)
                    );
                    text.onChange(async (value) => {
                        plugin.settings.autoPushInterval = Number(value);
                        await plugin.saveSettings();
                        plugin.automaticsManager.reload("push");
                    });
                });
            this.mayDisableSetting(
                setting,
                !plugin.settings.differentIntervalCommitAndPush
            );

            new Setting(containerEl)
                .setName(t("settings.autoPullInterval"))
                .setDesc(t("settings.autoPullIntervalDesc"))
                .addText((text) => {
                    text.inputEl.type = "number";
                    text.setValue(String(plugin.settings.autoPullInterval));
                    text.setPlaceholder(
                        String(DEFAULT_SETTINGS.autoPullInterval)
                    );
                    text.onChange(async (value) => {
                        plugin.settings.autoPullInterval = Number(value);
                        await plugin.saveSettings();
                        plugin.automaticsManager.reload("pull");
                    });
                });

            new Setting(containerEl)
                .setName(t("settings.customMessageOnAutoBackup"))
                .setDesc(t("settings.customMessageOnAutoBackupDesc"))
                .addToggle((toggle) =>
                    toggle
                        .setValue(plugin.settings.customMessageOnAutoBackup)
                        .onChange(async (value) => {
                            plugin.settings.customMessageOnAutoBackup = value;
                            await plugin.saveSettings();
                            this.display();
                        })
                );

            setting = new Setting(containerEl)
                .setName(t("settings.commitMessageOnAutoCommit", commitOrSync))
                .setDesc(t("settings.commitMessagePlaceholdersDesc"))
                .addTextArea((text) =>
                    text
                        .setPlaceholder(t("settings.commitMessagePlaceholder"))
                        .setValue(plugin.settings.autoCommitMessage)
                        .onChange(async (value) => {
                            plugin.settings.autoCommitMessage = value;
                            await plugin.saveSettings();
                        })
                );
            this.mayDisableSetting(
                setting,
                plugin.settings.customMessageOnAutoBackup
            );

            new Setting(containerEl).setName(t("settings.commitMessage")).setHeading();

            new Setting(containerEl)
                .setName(t("settings.commitMessageOnManualCommit"))
                .setDesc(t("settings.commitMessagePlaceholdersDesc"))
                .addTextArea((text) =>
                    text
                        .setPlaceholder(t("settings.commitMessagePlaceholder"))
                        .setValue(
                            plugin.settings.commitMessage
                                ? plugin.settings.commitMessage
                                : ""
                        )
                        .onChange(async (value) => {
                            plugin.settings.commitMessage = value;
                            await plugin.saveSettings();
                        })
                );

            const datePlaceholderSetting = new Setting(containerEl)
                .setName(t("settings.commitDateFormat"))
                .addMomentFormat((text) =>
                    text
                        .setDefaultFormat(plugin.settings.commitDateFormat)
                        .setValue(plugin.settings.commitDateFormat)
                        .onChange(async (value) => {
                            plugin.settings.commitDateFormat = value;
                            await plugin.saveSettings();
                        })
                );
            datePlaceholderSetting.descEl.innerHTML = t("settings.commitDateFormatDescHtml", DATE_TIME_FORMAT_SECONDS);

            new Setting(containerEl)
                .setName(t("settings.hostnameReplacementName"))
                .setDesc(t("settings.hostnameReplacementDesc"))
                .addText((text) =>
                    text
                        .setValue(plugin.localStorage.getHostname() ?? "")
                        .onChange((value) => {
                            plugin.localStorage.setHostname(value);
                        })
                );

            new Setting(containerEl)
                .setName(t("settings.previewCommitMessage"))
                .addButton((button) =>
                    button.setButtonText(t("settings.previewButtonText")).onClick(async () => {
                        const commitMessagePreview =
                            await plugin.gitManager.formatCommitMessage(
                                plugin.settings.commitMessage
                            );
                        new Notice(`${commitMessagePreview}`);
                    })
                );

            new Setting(containerEl)
                .setName(t("settings.listFilenamesInBody"))
                .addToggle((toggle) =>
                    toggle
                        .setValue(plugin.settings.listChangedFilesInMessageBody)
                        .onChange(async (value) => {
                            plugin.settings.listChangedFilesInMessageBody =
                                value;
                            await plugin.saveSettings();
                        })
                );

            new Setting(containerEl).setName(t("settings.pullHeading")).setHeading();

            if (plugin.gitManager instanceof SimpleGit)
                new Setting(containerEl)
                    .setName(t("settings.mergeStrategy"))
                    .setDesc(t("settings.mergeStrategyDesc"))
                    .addDropdown((dropdown) => {
                        const options: Record<SyncMethod, string> = {
                            merge: t("settings.syncOptions.merge"),
                            rebase: t("settings.syncOptions.rebase"),
                            reset: t("settings.syncOptions.reset"),
                        };
                        dropdown.addOptions(options);
                        dropdown.setValue(plugin.settings.syncMethod);

                        dropdown.onChange(async (option: SyncMethod) => {
                            plugin.settings.syncMethod = option;
                            await plugin.saveSettings();
                        });
                    });

            new Setting(containerEl)
                .setName(t("settings.pullOnStartup"))
                .setDesc(t("settings.pullOnStartupDesc"))
                .addToggle((toggle) =>
                    toggle
                        .setValue(plugin.settings.autoPullOnBoot)
                        .onChange(async (value) => {
                            plugin.settings.autoPullOnBoot = value;
                            await plugin.saveSettings();
                        })
                );

            new Setting(containerEl)
                .setName(t("settings.commitAndSync"))
                .setDesc(t("settings.commitAndSyncDesc"))
                .setHeading();

            setting = new Setting(containerEl)
                .setName(t("settings.pushOnCommitSync"))
                .setDesc(t("settings.pushOnCommitSyncDesc"))
                .addToggle((toggle) =>
                    toggle
                        .setValue(!plugin.settings.disablePush)
                        .onChange(async (value) => {
                            plugin.settings.disablePush = !value;
                            this.display();
                            await plugin.saveSettings();
                        })
                );

            new Setting(containerEl)
                .setName(t("settings.pullOnCommitSync"))
                .setDesc(t("settings.pullOnCommitSyncDesc"))
                .addToggle((toggle) =>
                    toggle
                        .setValue(plugin.settings.pullBeforePush)
                        .onChange(async (value) => {
                            plugin.settings.pullBeforePush = value;
                            this.display();
                            await plugin.saveSettings();
                        })
                );

            if (plugin.gitManager instanceof SimpleGit) {
                new Setting(containerEl)
                    .setName(t("settings.lineAuthorInfo"))
                    .setHeading();

                this.addLineAuthorInfoSettings();
            }
        }

        new Setting(containerEl).setName(t("settings.historyView")).setHeading();

        new Setting(containerEl)
            .setName(t("settings.showAuthor"))
            .setDesc(t("settings.showAuthorDesc"))
            .addDropdown((dropdown) => {
                const options: Record<ShowAuthorInHistoryView, string> = {
                    hide: t("settings.authorOptions.hide"),
                    full: t("settings.authorOptions.full"),
                    initials: t("settings.authorOptions.initials"),
                };
                dropdown.addOptions(options);
                dropdown.setValue(plugin.settings.authorInHistoryView);
                dropdown.onChange(async (option: ShowAuthorInHistoryView) => {
                    plugin.settings.authorInHistoryView = option;
                    await plugin.saveSettings();
                    await plugin.refresh();
                });
            });

        new Setting(containerEl)
            .setName(t("settings.showDate"))
            .setDesc(t("settings.showDateDesc"))
            .addToggle((toggle) =>
                toggle
                    .setValue(plugin.settings.dateInHistoryView)
                    .onChange(async (value) => {
                        plugin.settings.dateInHistoryView = value;
                        await plugin.saveSettings();
                        await plugin.refresh();
                    })
            );

        new Setting(containerEl).setName(t("settings.sourceControlView")).setHeading();

        new Setting(containerEl)
            .setName(t("settings.autoRefreshSourceControl"))
            .setDesc(t("settings.autoRefreshSourceControlDesc"))
            .addToggle((toggle) =>
                toggle
                    .setValue(plugin.settings.refreshSourceControl)
                    .onChange(async (value) => {
                        plugin.settings.refreshSourceControl = value;
                        await plugin.saveSettings();
                    })
            );

        new Setting(containerEl)
            .setName(t("settings.sourceControlRefreshInterval"))
            .setDesc(t("settings.sourceControlRefreshIntervalDesc"))
            .addText((text) => {
                text.inputEl.type = "number";
                text.setValue(
                    String(plugin.settings.refreshSourceControlTimer)
                );
                text.setPlaceholder(
                    String(DEFAULT_SETTINGS.refreshSourceControlTimer)
                );
                text.onChange(async (value) => {
                    plugin.settings.refreshSourceControlTimer = Math.max(
                        Number(value),
                        500
                    );
                    await plugin.saveSettings();
                    plugin.setRefreshDebouncer();
                });
            });
        new Setting(containerEl).setName(t("settings.miscellaneous")).setHeading();

        if (plugin.gitManager instanceof SimpleGit) {
            new Setting(containerEl)
                .setName(t("settings.diffViewStyle"))
                .setDesc(t("settings.diffViewStyleDesc"))
                .addDropdown((dropdown) => {
                    const options: Record<
                        ObsidianGitSettings["diffStyle"],
                        string
                    > = {
                        split: t("settings.diffOptions.split"),
                        git_unified: t("settings.diffOptions.unified"),
                    };
                    dropdown.addOptions(options);
                    dropdown.setValue(plugin.settings.diffStyle);
                    dropdown.onChange(
                        async (option: ObsidianGitSettings["diffStyle"]) => {
                            plugin.settings.diffStyle = option;
                            await plugin.saveSettings();
                        }
                    );
                });
        }

        new Setting(containerEl)
            .setName(t("settings.disableNotifications"))
            .setDesc(t("settings.disableNotificationsDesc"))
            .addToggle((toggle) =>
                toggle
                    .setValue(plugin.settings.disablePopups)
                    .onChange(async (value) => {
                        plugin.settings.disablePopups = value;
                        this.display();
                        await plugin.saveSettings();
                    })
            );

        if (!plugin.settings.disablePopups)
            new Setting(containerEl)
                .setName(t("settings.hideNotificationsForNoChanges"))
                .setDesc(t("settings.hideNotificationsForNoChangesDesc"))
                .addToggle((toggle) =>
                    toggle
                        .setValue(plugin.settings.disablePopupsForNoChanges)
                        .onChange(async (value) => {
                            plugin.settings.disablePopupsForNoChanges = value;
                            await plugin.saveSettings();
                        })
                );

        new Setting(containerEl)
            .setName(t("settings.showStatusBarToggle"))
            .setDesc(t("settings.showStatusBarToggleDesc"))
            .addToggle((toggle) =>
                toggle
                    .setValue(plugin.settings.showStatusBar)
                    .onChange(async (value) => {
                        plugin.settings.showStatusBar = value;
                        await plugin.saveSettings();
                    })
            );

        new Setting(containerEl)
            .setName(t("settings.showStageButtons"))
            .addToggle((toggle) =>
                toggle
                    .setValue(plugin.settings.showFileMenu)
                    .onChange(async (value) => {
                        plugin.settings.showFileMenu = value;
                        await plugin.saveSettings();
                    })
            );

        new Setting(containerEl)
            .setName(t("settings.showBranchStatusBarToggle"))
            .setDesc(t("settings.showBranchStatusBarToggleDesc"))
            .addToggle((toggle) =>
                toggle
                    .setValue(plugin.settings.showBranchStatusBar)
                    .onChange(async (value) => {
                        plugin.settings.showBranchStatusBar = value;
                        await plugin.saveSettings();
                    })
            );

        new Setting(containerEl)
            .setName(t("settings.showChangedFilesCount"))
            .addToggle((toggle) =>
                toggle
                    .setValue(plugin.settings.changedFilesInStatusBar)
                    .onChange(async (value) => {
                        plugin.settings.changedFilesInStatusBar = value;
                        await plugin.saveSettings();
                    })
            );

        if (plugin.gitManager instanceof IsomorphicGit) {
            new Setting(containerEl)
                .setName(t("settings.authenticationHeading"))
                .setHeading();
        } else {
            new Setting(containerEl).setName(t("settings.commitAuthorHeading")).setHeading();
        }

        if (plugin.gitManager instanceof IsomorphicGit)
            new Setting(containerEl)
                .setName(
                    t("settings.gitServerUsername")
                )
                .addText((cb) => {
                    cb.setValue(plugin.localStorage.getUsername() ?? "");
                    cb.onChange((value) => {
                        plugin.localStorage.setUsername(value);
                    });
                });

        if (plugin.gitManager instanceof IsomorphicGit)
            new Setting(containerEl)
                .setName(t("settings.passwordOrToken"))
                .setDesc(
                    t("settings.passwordOrTokenDesc")
                )
                .addText((cb) => {
                    cb.inputEl.autocapitalize = "off";
                    cb.inputEl.autocomplete = "off";
                    cb.inputEl.spellcheck = false;
                    cb.onChange((value) => {
                        plugin.localStorage.setPassword(value);
                    });
                });

        if (plugin.gitReady)
            new Setting(containerEl)
                .setName(t("settings.authorName"))
                .addText(async (cb) => {
                    cb.setValue(
                        (await plugin.gitManager.getConfig("user.name")) ?? ""
                    );
                    cb.onChange(async (value) => {
                        await plugin.gitManager.setConfig(
                            "user.name",
                            value == "" ? undefined : value
                        );
                    });
                });

        if (plugin.gitReady)
            new Setting(containerEl)
                .setName(t("settings.authorEmail"))
                .addText(async (cb) => {
                    cb.setValue(
                        (await plugin.gitManager.getConfig("user.email")) ?? ""
                    );
                    cb.onChange(async (value) => {
                        await plugin.gitManager.setConfig(
                            "user.email",
                            value == "" ? undefined : value
                        );
                    });
                });

        new Setting(containerEl)
            .setName(t("settings.advanced"))
            .setDesc(
                t("settings.advancedDesc")
            )
            .setHeading();

        if (plugin.gitManager instanceof SimpleGit) {
            new Setting(containerEl)
                .setName(t("settings.updateSubmodules"))
                .setDesc(
                    t("settings.updateSubmodulesDesc")
                )
                .addToggle((toggle) =>
                    toggle
                        .setValue(plugin.settings.updateSubmodules)
                        .onChange(async (value) => {
                            plugin.settings.updateSubmodules = value;
                            await plugin.saveSettings();
                        })
                );
            if (plugin.settings.updateSubmodules) {
                new Setting(containerEl)
                    .setName(t("settings.submoduleRecurse"))
                    .setDesc(
                        t("settings.submoduleRecurseDesc")
                    )
                    .addToggle((toggle) =>
                        toggle
                            .setValue(plugin.settings.submoduleRecurseCheckout)
                            .onChange(async (value) => {
                                plugin.settings.submoduleRecurseCheckout =
                                    value;
                                await plugin.saveSettings();
                            })
                    );
            }
        }

        if (plugin.gitManager instanceof SimpleGit)
            new Setting(containerEl)
                .setName(t("settings.customGitPath"))
                .addText((cb) => {
                    cb.setValue(plugin.localStorage.getGitPath() ?? "");
                    cb.setPlaceholder("git");
                    cb.onChange((value) => {
                        plugin.localStorage.setGitPath(value || "git");
                        plugin.gitManager
                            .updateGitPath(value || "git")
                            .catch((e) => plugin.displayError(e));
                    });
                });

        if (plugin.gitManager instanceof SimpleGit)
            new Setting(containerEl)
                .setName(t("settings.additionalEnvVars"))
                .setDesc(
                    t("settings.additionalEnvVarsDesc")
                )
                .addTextArea((cb) => {
                    cb.setPlaceholder("GIT_DIR=/path/to/git/dir");
                    cb.setValue(plugin.localStorage.getEnvVars().join("\n"));
                    cb.onChange((value) => {
                        plugin.localStorage.setEnvVars(value.split("\n"));
                    });
                });

        if (plugin.gitManager instanceof SimpleGit)
            new Setting(containerEl)
                .setName(t("settings.additionalPathEnv"))
                .setDesc(t("settings.additionalPathEnvDesc"))
                .addTextArea((cb) => {
                    cb.setValue(plugin.localStorage.getPATHPaths().join("\n"));
                    cb.onChange((value) => {
                        plugin.localStorage.setPATHPaths(value.split("\n"));
                    });
                });
        if (plugin.gitManager instanceof SimpleGit)
            new Setting(containerEl)
                .setName(t("settings.reloadEnvVars"))
                .setDesc(
                    t("settings.reloadEnvVarsDesc")
                )
                .addButton((cb) => {
                    cb.setButtonText(t("settings.reloadButtonText"));
                    cb.setCta();
                    cb.onClick(async () => {
                        await (plugin.gitManager as SimpleGit).setGitInstance();
                    });
                });

        new Setting(containerEl)
            .setName(t("settings.customBasePath"))
            .setDesc(
                t("settings.customBasePathDesc")
            )
            .addText((cb) => {
                cb.setValue(plugin.settings.basePath);
                cb.setPlaceholder("directory/directory-with-git-repo");
                cb.onChange(async (value) => {
                    plugin.settings.basePath = value;
                    await plugin.saveSettings();
                    plugin.gitManager
                        .updateBasePath(value || "")
                        .catch((e) => plugin.displayError(e));
                });
            });

        new Setting(containerEl)
            .setName(t("settings.customGitDir"))
            .setDesc(
                t("settings.customGitDirDesc")
            )
            .addText((cb) => {
                cb.setValue(plugin.settings.gitDir);
                cb.setPlaceholder(".git");
                cb.onChange(async (value) => {
                    plugin.settings.gitDir = value;
                    await plugin.saveSettings();
                });
            });

        new Setting(containerEl)
            .setName(t("settings.disableOnDevice"))
            .setDesc(
                t("settings.disableOnDeviceDesc")
            )
            .addToggle((toggle) =>
                toggle
                    .setValue(plugin.localStorage.getPluginDisabled())
                    .onChange((value) => {
                        plugin.localStorage.setPluginDisabled(value);
                        if (value) {
                            plugin.unloadPlugin();
                        } else {
                            plugin
                                .init({ fromReload: true })
                                .catch((e) => plugin.displayError(e));
                        }
                        new Notice(
                            t("notices.restartObsidian")
                        );
                    })
            );

        new Setting(containerEl).setName(t("settings.support")).setHeading();
        new Setting(containerEl)
            .setName(t("settings.donate"))
            .setDesc(
                t("settings.donateDesc")
            )
            .addButton((bt) => {
                bt.buttonEl.outerHTML =
                    "<a href='https://ko-fi.com/F1F195IQ5' target='_blank'><img height='36' style='border:0px;height:36px;' src='https://cdn.ko-fi.com/cdn/kofi3.png?v=3' border='0' alt='Buy Me a Coffee at ko-fi.com' /></a>";
            });

        const debugDiv = containerEl.createDiv();
        debugDiv.setAttr("align", "center");
        debugDiv.setAttr("style", "margin: var(--size-4-2)");

        const debugButton = debugDiv.createEl("button");
        debugButton.setText(t("settings.copyDebugInfo"));
        debugButton.onclick = async () => {
            await window.navigator.clipboard.writeText(
                JSON.stringify(
                    {
                        settings: this.plugin.settings,
                        pluginVersion: this.plugin.manifest.version,
                    },
                    null,
                    4
                )
            );
            new Notice(
                t("settings.debugInfoCopied")
            );
        };

        if (Platform.isDesktopApp) {
            const info = containerEl.createDiv();
            info.setAttr("align", "center");
            info.setText(
                t("settings.debuggingAndLogging")
            );
            const keys = containerEl.createDiv();
            keys.setAttr("align", "center");
            keys.addClass("obsidian-git-shortcuts");
            if (Platform.isMacOS === true) {
                keys.createEl("kbd", { text: t("settings.macShortcut") });
            } else {
                keys.createEl("kbd", { text: t("settings.winLinuxShortcut") });
            }
        }
    }

    mayDisableSetting(setting: Setting, disable: boolean) {
        if (disable) {
            setting.setDisabled(disable);
            setting.setClass("obsidian-git-disabled");
        }
    }

    public configureLineAuthorShowStatus(show: boolean) {
        this.settings.lineAuthor.show = show;
        void this.plugin.saveSettings();

        if (show) this.plugin.lineAuthoringFeature.activateFeature();
        else this.plugin.lineAuthoringFeature.deactivateFeature();
    }

    /**
     * Persists the setting {@link key} with value {@link value} and
     * refreshes the line author info views.
     */
    public async lineAuthorSettingHandler<
        K extends keyof ObsidianGitSettings["lineAuthor"],
    >(key: K, value: ObsidianGitSettings["lineAuthor"][K]): Promise<void> {
        this.settings.lineAuthor[key] = value;
        await this.plugin.saveSettings();
        this.plugin.lineAuthoringFeature.refreshLineAuthorViews();
    }

    /**
     * Ensure, that certain last shown values are persisten in the settings.
     *
     * Necessary for the line author info gutter context menus.
     */
    public beforeSaveSettings() {
        const laSettings = this.settings.lineAuthor;
        if (laSettings.authorDisplay !== "hide") {
            laSettings.lastShownAuthorDisplay = laSettings.authorDisplay;
        }
        if (laSettings.dateTimeFormatOptions !== "hide") {
            laSettings.lastShownDateTimeFormatOptions =
                laSettings.dateTimeFormatOptions;
        }
    }

    private addLineAuthorInfoSettings() {
        const baseLineAuthorInfoSetting = new Setting(this.containerEl).setName(
            t("settings.lineAuthorInfoDesc")
        );

        if (!this.plugin.lineAuthoringFeature.isAvailableOnCurrentPlatform()) {
            baseLineAuthorInfoSetting
                .setDesc(t("settings.lineAuthorDesktopOnly"))
                .setDisabled(true);
        }

        baseLineAuthorInfoSetting.descEl.innerHTML = `
            <a href="${LINE_AUTHOR_FEATURE_WIKI_LINK}">${t("settings.lineAuthorFeatureGuide")}</a></br>
            ${t("settings.lineAuthorConfigDesc")}`;

        baseLineAuthorInfoSetting.addToggle((toggle) =>
            toggle.setValue(this.settings.lineAuthor.show).onChange((value) => {
                this.configureLineAuthorShowStatus(value);
                this.display();
            })
        );

        if (this.settings.lineAuthor.show) {
            const trackMovement = new Setting(this.containerEl)
                .setName(t("settings.followLineMovement"))
                .setDesc("")
                .addDropdown((dropdown) => {
                    dropdown.addOptions(<
                        Record<LineAuthorFollowMovement, string>
                    >{
                        inactive: t("settings.followMovementInactive"),
                        "same-commit": t("settings.followMovementSameCommit"),
                        "all-commits": t("settings.followMovementAllCommits"),
                    });
                    dropdown.setValue(this.settings.lineAuthor.followMovement);
                    dropdown.onChange((value: LineAuthorFollowMovement) =>
                        this.lineAuthorSettingHandler("followMovement", value)
                    );
                });
            trackMovement.descEl.innerHTML = t("settings.followMovementDesc");

            new Setting(this.containerEl)
                .setName(t("settings.showCommitHash"))
                .addToggle((tgl) => {
                    tgl.setValue(this.settings.lineAuthor.showCommitHash);
                    tgl.onChange((value: boolean) =>
                        this.lineAuthorSettingHandler("showCommitHash", value)
                    );
                });

            new Setting(this.containerEl)
                .setName(t("settings.authorNameDisplay"))
                .setDesc(t("settings.authorNameDisplayDesc"))
                .addDropdown((dropdown) => {
                    const options: Record<LineAuthorDisplay, string> = {
                        hide: "Hide",
                        initials: "Initials (default)",
                        "first name": "First name",
                        "last name": "Last name",
                        full: "Full name",
                    };
                    dropdown.addOptions(options);
                    dropdown.setValue(this.settings.lineAuthor.authorDisplay);

                    dropdown.onChange(async (value: LineAuthorDisplay) =>
                        this.lineAuthorSettingHandler("authorDisplay", value)
                    );
                });

            new Setting(this.containerEl)
                .setName(t("settings.authoringDateDisplay"))
                .setDesc(
                    t("settings.authoringDateDisplayDesc")
                )
                .addDropdown((dropdown) => {
                    const options: Record<
                        LineAuthorDateTimeFormatOptions,
                        string
                    > = {
                        hide: "Hide",
                        date: "Date (default)",
                        datetime: "Date and time",
                        "natural language": "Natural language",
                        custom: "Custom",
                    };
                    dropdown.addOptions(options);
                    dropdown.setValue(
                        this.settings.lineAuthor.dateTimeFormatOptions
                    );

                    dropdown.onChange(
                        async (value: LineAuthorDateTimeFormatOptions) => {
                            await this.lineAuthorSettingHandler(
                                "dateTimeFormatOptions",
                                value
                            );
                            this.display();
                        }
                    );
                });

            if (this.settings.lineAuthor.dateTimeFormatOptions === "custom") {
                const dateTimeFormatCustomStringSetting = new Setting(
                    this.containerEl
                );

                dateTimeFormatCustomStringSetting
                    .setName(t("settings.customDateFormat"))
                    .addText((cb) => {
                        cb.setValue(
                            this.settings.lineAuthor.dateTimeFormatCustomString
                        );
                        cb.setPlaceholder("YYYY-MM-DD HH:mm");

                        cb.onChange(async (value) => {
                            await this.lineAuthorSettingHandler(
                                "dateTimeFormatCustomString",
                                value
                            );
                            dateTimeFormatCustomStringSetting.descEl.innerHTML =
                                this.previewCustomDateTimeDescriptionHtml(
                                    value
                                );
                        });
                    });

                dateTimeFormatCustomStringSetting.descEl.innerHTML =
                    this.previewCustomDateTimeDescriptionHtml(
                        this.settings.lineAuthor.dateTimeFormatCustomString
                    );
            }

            new Setting(this.containerEl)
                .setName(t("settings.dateDisplayTimezone"))
                .addDropdown((dropdown) => {
                    const options: Record<LineAuthorTimezoneOption, string> = {
                        "viewer-local": t("settings.viewerLocal"),
                        "author-local": t("settings.authorLocal"),
                        utc0000: t("settings.utc"),
                    };
                    dropdown.addOptions(options);
                    dropdown.setValue(
                        this.settings.lineAuthor.dateTimeTimezone
                    );

                    dropdown.onChange(async (value: LineAuthorTimezoneOption) =>
                        this.lineAuthorSettingHandler("dateTimeTimezone", value)
                    );
                }).descEl.innerHTML = t("settings.dateDisplayTimezoneDesc");

            const oldestAgeSetting = new Setting(this.containerEl).setName(
                t("settings.oldestAge")
            );

            oldestAgeSetting.descEl.innerHTML =
                this.previewOldestAgeDescriptionHtml(
                    this.settings.lineAuthor.coloringMaxAge
                )[0];

            oldestAgeSetting.addText((text) => {
                text.setPlaceholder("1y");
                text.setValue(this.settings.lineAuthor.coloringMaxAge);
                text.onChange(async (value) => {
                    const [preview, valid] =
                        this.previewOldestAgeDescriptionHtml(value);
                    oldestAgeSetting.descEl.innerHTML = preview;
                    if (valid) {
                        await this.lineAuthorSettingHandler(
                            "coloringMaxAge",
                            value
                        );
                        this.refreshColorSettingsName("oldest");
                    }
                });
            });

            this.createColorSetting("newest");
            this.createColorSetting("oldest");

            new Setting(this.containerEl)
                .setName(t("settings.textColor"))
                .addText((field) => {
                    field.setValue(this.settings.lineAuthor.textColorCss);
                    field.onChange(async (value) => {
                        await this.lineAuthorSettingHandler(
                            "textColorCss",
                            value
                        );
                    });
                }).descEl.innerHTML = t("settings.textColorDesc");

            new Setting(this.containerEl)
                .setName(t("settings.ignoreWhitespace"))
                .addToggle((tgl) => {
                    tgl.setValue(this.settings.lineAuthor.ignoreWhitespace);
                    tgl.onChange((value) =>
                        this.lineAuthorSettingHandler("ignoreWhitespace", value)
                    );
                }).descEl.innerHTML = t("settings.ignoreWhitespaceDesc");
        }
    }

    private createColorSetting(which: "oldest" | "newest") {
        const setting = new Setting(this.containerEl)
            .setName("")
            .addText((text) => {
                const color = pickColor(which, this.settings.lineAuthor);
                const defaultColor = pickColor(
                    which,
                    DEFAULT_SETTINGS.lineAuthor
                );
                text.setPlaceholder(rgbToString(defaultColor));
                text.setValue(rgbToString(color));
                text.onChange(async (colorNew) => {
                    const rgb = convertToRgb(colorNew);
                    if (rgb !== undefined) {
                        const key =
                            which === "newest" ? "colorNew" : "colorOld";
                        await this.lineAuthorSettingHandler(key, rgb);
                    }
                    this.refreshColorSettingsDesc(which, rgb);
                });
            });
        this.lineAuthorColorSettings.set(which, setting);

        this.refreshColorSettingsName(which);
        this.refreshColorSettingsDesc(
            which,
            pickColor(which, this.settings.lineAuthor)
        );
    }

    private refreshColorSettingsName(which: "oldest" | "newest") {
        const settingsDom = this.lineAuthorColorSettings.get(which);
        if (settingsDom) {
            const whichDescriber =
                which === "oldest"
                    ? t("settings.colorForOldest", this.settings.lineAuthor.coloringMaxAge)
                    : t("settings.colorForNewest");
            settingsDom.nameEl.innerText = whichDescriber;
        }
    }

    private refreshColorSettingsDesc(which: "oldest" | "newest", rgb?: RGB) {
        const settingsDom = this.lineAuthorColorSettings.get(which);
        if (settingsDom) {
            settingsDom.descEl.innerHTML = this.colorSettingPreviewDescHtml(
                which,
                this.settings.lineAuthor,
                rgb !== undefined
            );
        }
    }

    private colorSettingPreviewDescHtml(
        which: "oldest" | "newest",
        laSettings: LineAuthorSettings,
        colorIsValid: boolean
    ): string {
        const rgbStr = colorIsValid
            ? previewColor(which, laSettings)
            : `rgba(127,127,127,0.3)`;
        const today = moment.unix(moment.now() / 1000).format("YYYY-MM-DD");
        const text = colorIsValid
            ? `abcdef Author Name ${today}`
            : t("settings.invalidAge");
        const preview = `<div
            class="line-author-settings-preview"
            style="background-color: ${rgbStr}; width: 30ch;"
            >${text}</div>`;

        return `${t("settings.textColorPreviewHtml")} ${preview}`;
    }

    private previewCustomDateTimeDescriptionHtml(
        dateTimeFormatCustomString: string
    ) {
        const formattedDateTime = moment().format(dateTimeFormatCustomString);
        return `<a href="${FORMAT_STRING_REFERENCE_URL}">${t("settings.formatStringDesc")}</a></br>${t("settings.currentlyFormatted")} ${formattedDateTime}`;
    }

    private previewOldestAgeDescriptionHtml(coloringMaxAge: string) {
        const duration = parseColoringMaxAgeDuration(coloringMaxAge);
        const durationString =
            duration !== undefined ? `${duration.asDays()} ${t("settings.days")}` : t("settings.invalidAge");
        return [
            `${t("settings.oldestAgeDesc2")} ${durationString}`,
            duration,
        ] as const;
    }
}

export function pickColor(
    which: "oldest" | "newest",
    las: LineAuthorSettings
): RGB {
    return which === "oldest" ? las.colorOld : las.colorNew;
}

export function parseColoringMaxAgeDuration(
    durationString: string
): moment.Duration | undefined {
    // https://momentjs.com/docs/#/durations/creating/
    const duration = moment.duration("P" + durationString.toUpperCase());
    return duration.isValid() && duration.asDays() && duration.asDays() >= 1
        ? duration
        : undefined;
}

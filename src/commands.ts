import { Notice, Platform, WorkspaceLeaf } from "obsidian";
import { HISTORY_VIEW_CONFIG, SOURCE_CONTROL_VIEW_CONFIG } from "./constants";
import ObsidianGit from "./main";
import { openHistoryInGitHub, openLineInGitHub } from "./openInGitHub";
import { ChangedFilesModal } from "./ui/modals/changedFilesModal";
import { GeneralModal } from "./ui/modals/generalModal";
import { IgnoreModal } from "./ui/modals/ignoreModal";
import { SimpleGit } from "./gitManager/simpleGit";
import { t } from "./i18n";

export function addCommmands(plugin: ObsidianGit) {
    const app = plugin.app;

    plugin.addCommand({
        id: "edit-gitignore",
        name: t("command.editGitignore"),
        callback: async () => {
            const path = plugin.gitManager.getRelativeVaultPath(".gitignore");
            if (!(await app.vault.adapter.exists(path))) {
                await app.vault.adapter.write(path, "");
            }
            const content = await app.vault.adapter.read(path);
            const modal = new IgnoreModal(app, content);
            const res = await modal.openAndGetReslt();
            if (res !== undefined) {
                await app.vault.adapter.write(path, res);
                await plugin.refresh();
            }
        },
    });
    plugin.addCommand({
        id: "open-git-view",
        name: t("command.openSourceControlView"),
        callback: async () => {
            const leafs = app.workspace.getLeavesOfType(
                SOURCE_CONTROL_VIEW_CONFIG.type
            );
            let leaf: WorkspaceLeaf;
            if (leafs.length === 0) {
                leaf =
                    app.workspace.getRightLeaf(false) ??
                    app.workspace.getLeaf();
                await leaf.setViewState({
                    type: SOURCE_CONTROL_VIEW_CONFIG.type,
                });
            } else {
                leaf = leafs.first()!;
            }
            await app.workspace.revealLeaf(leaf);

            // Is not needed for the first open, but allows to refresh the view
            // per hotkey even if already opened
            app.workspace.trigger("obsidian-git:refresh");
        },
    });
    plugin.addCommand({
        id: "open-history-view",
        name: t("command.openHistoryView"),
        callback: async () => {
            const leafs = app.workspace.getLeavesOfType(
                HISTORY_VIEW_CONFIG.type
            );
            let leaf: WorkspaceLeaf;
            if (leafs.length === 0) {
                leaf =
                    app.workspace.getRightLeaf(false) ??
                    app.workspace.getLeaf();
                await leaf.setViewState({
                    type: HISTORY_VIEW_CONFIG.type,
                });
            } else {
                leaf = leafs.first()!;
            }
            await app.workspace.revealLeaf(leaf);

            // Is not needed for the first open, but allows to refresh the view
            // per hotkey even if already opened
            app.workspace.trigger("obsidian-git:refresh");
        },
    });

    plugin.addCommand({
        id: "open-diff-view",
        name: t("command.openDiffView"),
        checkCallback: (checking) => {
            const file = app.workspace.getActiveFile();
            if (checking) {
                return file !== null;
            } else {
                const filePath = plugin.gitManager.getRelativeRepoPath(
                    file!.path,
                    true
                );
                plugin.tools.openDiff({
                    aFile: filePath,
                    aRef: "",
                });
            }
        },
    });

    plugin.addCommand({
        id: "view-file-on-github",
        name: t("command.openFileOnGithub"),
        editorCallback: (editor, { file }) => {
            if (file) return openLineInGitHub(editor, file, plugin.gitManager);
        },
    });

    plugin.addCommand({
        id: "view-history-on-github",
        name: t("command.openFileHistoryOnGithub"),
        editorCallback: (_, { file }) => {
            if (file) return openHistoryInGitHub(file, plugin.gitManager);
        },
    });

    plugin.addCommand({
        id: "pull",
        name: t("command.pull"),
        callback: () =>
            plugin.promiseQueue.addTask(() => plugin.pullChangesFromRemote()),
    });

    plugin.addCommand({
        id: "fetch",
        name: t("command.fetch"),
        callback: () => plugin.promiseQueue.addTask(() => plugin.fetch()),
    });

    plugin.addCommand({
        id: "switch-to-remote-branch",
        name: t("command.switchToRemoteBranch"),
        callback: () =>
            plugin.promiseQueue.addTask(() => plugin.switchRemoteBranch()),
    });

    plugin.addCommand({
        id: "add-to-gitignore",
        name: t("command.addFileToGitignore"),
        checkCallback: (checking) => {
            const file = app.workspace.getActiveFile();
            if (checking) {
                return file !== null;
            } else {
                plugin
                    .addFileToGitignore(file!.path)
                    .catch((e) => plugin.displayError(e));
            }
        },
    });

    plugin.addCommand({
        id: "push",
        name: t("command.commitAndSync"),
        callback: () =>
            plugin.promiseQueue.addTask(() => plugin.commitAndSync(false)),
    });

    plugin.addCommand({
        id: "backup-and-close",
        name: t("command.commitAndSyncAndClose"),
        callback: () =>
            plugin.promiseQueue.addTask(async () => {
                await plugin.commitAndSync(false);
                window.close();
            }),
    });

    plugin.addCommand({
        id: "commit-push-specified-message",
        name: t("command.commitAndSyncWithSpecificMessage"),
        callback: () =>
            plugin.promiseQueue.addTask(() =>
                plugin.commitAndSync(false, true)
            ),
    });

    plugin.addCommand({
        id: "commit",
        name: t("command.commitAllChanges"),
        callback: () =>
            plugin.promiseQueue.addTask(() =>
                plugin.commit({ fromAuto: false })
            ),
    });

    plugin.addCommand({
        id: "commit-specified-message",
        name: t("command.commitAllChangesWithSpecificMessage"),
        callback: () =>
            plugin.promiseQueue.addTask(() =>
                plugin.commit({
                    fromAuto: false,
                    requestCustomMessage: true,
                })
            ),
    });

    plugin.addCommand({
        id: "commit-staged",
        name: t("command.commitStaged"),
        callback: () =>
            plugin.promiseQueue.addTask(() =>
                plugin.commit({
                    fromAuto: false,
                    requestCustomMessage: false,
                    onlyStaged: true,
                })
            ),
    });

    if (Platform.isDesktopApp) {
        plugin.addCommand({
            id: "commit-amend-staged-specified-message",
            name: t("command.amendStaged"),
            callback: () =>
                plugin.promiseQueue.addTask(() =>
                    plugin.commit({
                        fromAuto: false,
                        requestCustomMessage: true,
                        onlyStaged: true,
                        amend: true,
                    })
                ),
        });
    }

    plugin.addCommand({
        id: "commit-staged-specified-message",
        name: t("command.commitStagedWithSpecificMessage"),
        callback: () =>
            plugin.promiseQueue.addTask(() =>
                plugin.commit({
                    fromAuto: false,
                    requestCustomMessage: true,
                    onlyStaged: true,
                })
            ),
    });

    plugin.addCommand({
        id: "push2",
        name: t("command.push"),
        callback: () => plugin.promiseQueue.addTask(() => plugin.push()),
    });

    plugin.addCommand({
        id: "stage-current-file",
        name: t("command.stageCurrentFile"),
        checkCallback: (checking) => {
            const file = app.workspace.getActiveFile();
            if (checking) {
                return file !== null;
            } else {
                plugin.promiseQueue.addTask(() => plugin.stageFile(file!));
            }
        },
    });

    plugin.addCommand({
        id: "unstage-current-file",
        name: t("command.unstageCurrentFile"),
        checkCallback: (checking) => {
            const file = app.workspace.getActiveFile();
            if (checking) {
                return file !== null;
            } else {
                plugin.promiseQueue.addTask(() => plugin.unstageFile(file!));
            }
        },
    });

    plugin.addCommand({
        id: "edit-remotes",
        name: t("command.editRemotes"),
        callback: () =>
            plugin.editRemotes().catch((e) => plugin.displayError(e)),
    });

    plugin.addCommand({
        id: "remove-remote",
        name: t("command.removeRemote"),
        callback: () =>
            plugin.removeRemote().catch((e) => plugin.displayError(e)),
    });

    plugin.addCommand({
        id: "set-upstream-branch",
        name: t("command.setUpstreamBranch"),
        callback: () =>
            plugin.setUpstreamBranch().catch((e) => plugin.displayError(e)),
    });

    plugin.addCommand({
        id: "delete-repo",
        name: t("command.deleteRepository"),
        callback: async () => {
            const repoExists = await app.vault.adapter.exists(
                `${plugin.settings.basePath}/.git`
            );
            if (repoExists) {
                const modal = new GeneralModal(plugin, {
                    options: ["NO", "YES"],
                    placeholder: t("modals.deleteRepository.placeholder"),
                    onlySelection: true,
                });
                const shouldDelete = (await modal.openAndGetResult()) === "YES";
                if (shouldDelete) {
                    await app.vault.adapter.rmdir(
                        `${plugin.settings.basePath}/.git`,
                        true
                    );
                    new Notice(
                        t("notices.deleteRepository.success")
                    );
                    plugin.unloadPlugin();
                    await plugin.init({ fromReload: true });
                }
            } else {
                new Notice(t("notices.deleteRepository.notFound"));
            }
        },
    });

    plugin.addCommand({
        id: "init-repo",
        name: t("command.initializeNewRepo"),
        callback: () =>
            plugin.createNewRepo().catch((e) => plugin.displayError(e)),
    });

    plugin.addCommand({
        id: "clone-repo",
        name: t("command.cloneExistingRepo"),
        callback: () =>
            plugin.cloneNewRepo().catch((e) => plugin.displayError(e)),
    });

    plugin.addCommand({
        id: "list-changed-files",
        name: t("command.listChangedFiles"),
        callback: async () => {
            if (!(await plugin.isAllInitialized())) return;

            try {
                const status = await plugin.updateCachedStatus();
                if (status.changed.length + status.staged.length > 500) {
                    plugin.displayError(t("errors.tooManyChanges"));
                    return;
                }

                new ChangedFilesModal(plugin, status.all).open();
            } catch (e) {
                plugin.displayError(e);
            }
        },
    });

    plugin.addCommand({
        id: "switch-branch",
        name: t("command.switchBranch"),
        callback: () => {
            plugin.switchBranch().catch((e) => plugin.displayError(e));
        },
    });

    plugin.addCommand({
        id: "create-branch",
        name: t("command.createNewBranch"),
        callback: () => {
            plugin.createBranch().catch((e) => plugin.displayError(e));
        },
    });

    plugin.addCommand({
        id: "delete-branch",
        name: t("command.deleteBranch"),
        callback: () => {
            plugin.deleteBranch().catch((e) => plugin.displayError(e));
        },
    });

    plugin.addCommand({
        id: "discard-all",
        name: t("command.discardAllChanges"),
        callback: async () => {
            if (!(await plugin.isAllInitialized())) return false;
            const modal = new GeneralModal(plugin, {
                options: ["NO", "YES"],
                placeholder: t("modals.discardAllChanges.placeholder"),
                onlySelection: true,
            });
            const shouldDiscardAll = (await modal.openAndGetResult()) === "YES";
            if (shouldDiscardAll) {
                plugin.promiseQueue.addTask(() => plugin.discardAll());
            }
        },
    });

    plugin.addCommand({
        id: "raw-command",
        name: t("command.rawCommand"),
        checkCallback: (checking) => {
            const gitManager = plugin.gitManager;
            if (checking) {
                // only available on desktop
                return gitManager instanceof SimpleGit;
            } else {
                plugin.tools
                    .runRawCommand()
                    .catch((e) => plugin.displayError(e));
            }
        },
    });

    plugin.addCommand({
        id: "toggle-line-author-info",
        name: t("command.toggleLineAuthorInfo"),
        callback: () =>
            plugin.settingsTab?.configureLineAuthorShowStatus(
                !plugin.settings.lineAuthor.show
            ),
    });
}

import { moment, setIcon } from "obsidian";
import type ObsidianGit from "./main";
import { CurrentGitAction } from "./types";
import { t } from "./i18n";

interface StatusBarMessage {
    message: string;
    timeout: number;
}

export class StatusBar {
    private messages: StatusBarMessage[] = [];
    private currentMessage: StatusBarMessage | null;
    private lastMessageTimestamp: number | null = null;
    private lastCommitTimestamp?: Date;
    private unPushedCommits?: number;
    private readonly base = "mod-git-";
    private textEl: HTMLElement;

    constructor(
        private statusBarEl: HTMLElement,
        private readonly plugin: ObsidianGit
    ) {
        this.statusBarEl.setAttribute("data-tooltip-position", "top");

        plugin.registerEvent(
            plugin.app.workspace.on("obsidian-git:refreshed", () => {
                this.refreshCommitTimestamp().catch(console.error);
            })
        );
    }

    public remove(): void {
        this.statusBarEl.empty();
    }

    public displayMessage(message: string, timeout: number) {
        this.messages.push({
            message: `Git: ${message.slice(0, 100)}`,
            timeout: timeout,
        });
        this.display();
    }

    public display() {
        if (this.messages.length > 0 && !this.currentMessage) {
            this.currentMessage = this.messages.shift() as StatusBarMessage;
            this.statusBarEl.addClass(this.base + "message");
            this.statusBarEl.ariaLabel = "";
            this.statusBarEl.setText(this.currentMessage.message);
            this.lastMessageTimestamp = Date.now();
        } else if (this.currentMessage) {
            const messageAge =
                Date.now() - (this.lastMessageTimestamp as number);
            if (messageAge >= this.currentMessage.timeout) {
                this.currentMessage = null;
                this.lastMessageTimestamp = null;
            }
        } else {
            this.displayState();
        }
    }

    private async refreshCommitTimestamp() {
        if (
            this.lastCommitTimestamp === undefined &&
            this.plugin.gitReady &&
            this.plugin.settings.showStatusBar
        ) {
            try {
                const gitHead = await this.plugin.gitManager.getLastCommitTime();
                this.lastCommitTimestamp = gitHead || undefined;
                const unpushed = await this.plugin.gitManager.getUnpushedCommits();
                this.unPushedCommits = unpushed !== undefined ? unpushed : -1;
                this.updateStatusBarText();
            } catch (e) {
                console.error(`Error refreshing commit timestamp: ${e}`);
            }
        }
    }

    private updateStatusBarText() {
        if (
            this.lastCommitTimestamp &&
            this.plugin.gitReady &&
            this.plugin.settings.showStatusBar
        ) {
            const statusBarText = this.formatStatusBarCommitText();
            this.statusBarEl.ariaLabel = statusBarText;
        }
    }

    private formatStatusBarCommitText(): string {
        const statusText: string[] = [];
        
        if (this.lastCommitTimestamp) {
            statusText.push(
                moment(this.lastCommitTimestamp).format(
                    this.plugin.settings.commitDateFormat
                )
            );
        }
        
        if (this.unPushedCommits !== undefined && this.unPushedCommits > 0) {
            statusText.push(
                this.unPushedCommits === 1
                    ? t("statusBar.unpushedCommitSingular")
                    : t("statusBar.unpushedCommitPlural", this.unPushedCommits)
            );
        }
        
        return statusText.join("\n");
    }

    private displayState() {
        this.statusBarEl.removeClass(this.base + "message");
        const state = this.plugin.state.gitAction;
        if (this.plugin.state.offlineMode) {
            setIcon(this.statusBarEl, "git-pull-request");
            this.statusBarEl.setText(
                this.plugin.state.offlineMode
                    ? `Git: ${t("statusBar.offline")}`
                    : `Git: ${t("statusBar.error")}`
            );
        } else {
            switch (state) {
                case CurrentGitAction.status:
                    setIcon(this.statusBarEl, "git-pull-request");
                    this.statusBarEl.setText(`Git: ${t("statusBar.commitInProgress")}`);
                    break;
                case CurrentGitAction.pull:
                    setIcon(this.statusBarEl, "git-pull-request");
                    this.statusBarEl.setText(`Git: ${t("statusBar.pullInProgress")}`);
                    break;
                case CurrentGitAction.add:
                    setIcon(this.statusBarEl, "git-pull-request");
                    this.statusBarEl.setText(`Git: ${t("statusBar.commitInProgress")}`);
                    break;
                case CurrentGitAction.commit:
                    setIcon(this.statusBarEl, "git-pull-request");
                    this.statusBarEl.setText(`Git: ${t("statusBar.commitInProgress")}`);
                    break;
                case CurrentGitAction.push:
                    setIcon(this.statusBarEl, "git-pull-request");
                    this.statusBarEl.setText(`Git: ${t("statusBar.pushInProgress")}`);
                    break;
                default:
                    setIcon(this.statusBarEl, "git-pull-request");
                    this.statusBarEl.setText(`Git: ${t("statusBar.upToDate")}`);
                    break;
            }
        }
    }
}

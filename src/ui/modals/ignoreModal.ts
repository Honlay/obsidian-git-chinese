import type { App } from "obsidian";
import { Modal, Setting } from "obsidian";
import ObsidianGit from "../../main";
import { t } from "../../i18n";

export class IgnoreModal extends Modal {
    resolve:
        | ((value: string | PromiseLike<string> | undefined) => void)
        | null = null;
    constructor(
        private plugin: ObsidianGit,
        private path: string,
        private lines: string[],
        private save: (lines: string[]) => Promise<void>
    ) {
        super(plugin.app);
    }

    openAndGetReslt(): Promise<string> {
        return new Promise((resolve) => {
            this.resolve = resolve;
            this.open();
        });
    }

    onOpen(): void {
        this.contentEl.empty();
        this.contentEl.createEl("h2", {
            cls: "ignore-title",
        }).setText(t("modals.editGitignore.title"));

        const textBox = this.contentEl.createEl("textarea", {
            text: this.lines.join("\n"),
            cls: ["obsidian-git-textarea"],
            attr: { rows: 10, cols: 30, wrap: "off" },
        });

        const div = this.contentEl.createDiv();

        div.createEl("button", {
            cls: ["mod-cta", "obsidian-git-center-button"],
            text: t("modals.editGitignore.save"),
        }).addEventListener("click", () => {
            this.resolve!(textBox.value);
            this.close();
        });
    }

    onClose() {
        const { contentEl } = this;
        contentEl.empty();
        if (this.resolve) this.resolve(undefined);
    }
}

<script lang="ts">
    import { t } from "src/i18n";
    
    interface Props {
        files: unknown[];
    }

    let { files }: Props = $props();
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<main>
    {#if files.length > 500}
        <div class="tree-item nav-file">
            <div
                class="tree-item-self nav-file-title"
                aria-label={t("sourceControl.moreFiles").replace("...", (files.length - 500))}
            >
                <div class="tree-item-inner nav-file-title-content">
                    {t("sourceControl.moreFiles").replace("...", (files.length - 500))}
                </div>
            </div>
        </div>
    {/if}
</main>

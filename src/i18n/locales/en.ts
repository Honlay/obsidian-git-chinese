export const en = {
    settings: {
        general: "General",
        automatic: "Automatic",
        splitTimers: "Split timers for auto commit and sync",
        splitTimersDesc: "When turned on different intervals can be used for commit and sync",
        autoCommitInterval: "Auto commit interval (minutes)",
        autoCommitIntervalDesc: "Commit changes every X minutes. Set to 0 (default) to disable.",
        autoCommitAndSyncInterval: "Auto commit and sync interval (minutes)",
        autoCommitAndSyncIntervalDesc: "Commit and sync changes every X minutes. Set to 0 (default) to disable.",
        autoCommitAfterFileEdits: "Auto {0} after file edits have stopped",
        autoCommitAfterFileEditsDesc: "Requires {0} interval not to be 0. If enabled auto {0} will happen within {1} after you stopped editing a file. This also prevents auto {0} from happening while editing a file. If disabled it ignores when you last edited a file.",
        autoCommitAfterLatestCommit: "Auto {0} after latest commit",
        autoCommitAfterLatestCommitDesc: "If enabled, set the timestamp of the last auto {0} to the timestamp of the latest commit. This decreases the auto {0} frequency after manually committing.",
        autoPushInterval: "Auto push interval (minutes)",
        autoPushIntervalDesc: "Push commits every X minutes. Set to 0 (default) to disable.",
        autoPullInterval: "Auto pull interval (minutes)",
        autoPullIntervalDesc: "Pull changes every X minutes. Set to 0 (default) to disable.",
        autoPullOnBoot: "Pull on startup",
        autoPullOnBootDesc: "Execute git pull when Obsidian starts.",
        disablePushDialog: "Disable push dialog",
        disablePushDialogDesc: "Don't show the backup dialog before pushing.",
        pullBeforePush: "Pull before push",
        pullBeforePushDesc: "Automatically pull before pushing.",
        disablePopups: "Disable notifications",
        disablePopupsDesc: "Suppresses notifications during backup process.",
        disablePopupsForNoChanges: "Disable notifications for no changes",
        disablePopupsForNoChangesDesc: "Don't show successful backup notification if nothing has changed.",
        customMessageOnAutoBackup: "Specify custom commit message on auto backup",
        customMessageOnAutoBackupDesc: "You will get a pop up to specify your message.",
        showStatusBar: "Show status bar",
        showStatusBarDesc: "Show information about your repository in the status bar.",
        showChangedFilesInStatusBar: "Show count of changed files in status bar",
        showChangedFilesInStatusBarDesc: "Show how many files you currently have changed in the status bar.",
        showBranchStatusBar: "Show current branch in status bar",
        showBranchStatusBarDesc: "Show the current branch in the status bar.",
        commitMessage: "Commit message",
        commitMessageOnManualCommit: "Commit message on manual commit",
        commitMessageOnAutoCommit: "Commit message on auto {0}",
        commitMessagePlaceholder: "vault backup: {{date}}",
        commitMessagePlaceholdersDesc: "Available placeholders: {{date}} (see below), {{hostname}} (see below), {{numFiles}} (number of changed files in the commit) and {{files}} (changed files in commit message).",
        commitDateFormat: "Commit date format",
        commitDateFormatDesc: "Format for {{date}} in the commit message.",
        commitDateFormatDescHtml: "Format for {{date}} in the commit message. E.g. \"{0}\". See <a href=\"https://momentjs.com\">Moment.js</a> for more formats.",
        refreshSourceControl: "Automatically refresh source control view",
        refreshSourceControlDesc: "Refreshes the source control view after changes automatically.",
        refreshSourceControlTimer: "Source control view refresh interval (ms)",
        refreshSourceControlTimerDesc: "Time between each source control view refresh (milliseconds).",
        showFileMenu: "Show file menu",
        showFileMenuDesc: "Show git commands in the file menu.",
        authorInHistoryView: "Show author in history view",
        authorInHistoryViewDesc: "Show the author name in the history view.",
        dateInHistoryView: "Show date in the history view",
        dateInHistoryViewDesc: "Show the date in the history view.",
        lineAuthor: "Line author",
        lineAuthorActiveDesc: "Show who last edited each line.",
        followMovement: "Follow line movement",
        dateTimeFormat: "Date/Time Format",
        timezone: "Timezone",
        showCommitHash: "Show commit hash",
        ignoreWhitespace: "Ignore whitespace",
        coloringOptions: "Coloring options",
        coloringMaxAge: "Color lines at most",
        colorNew: "New line color",
        colorOld: "Old line color",
        notReady: "Git is not ready. When all settings are correct you can configure commit-sync, etc.",
        language: "Language",
        languageDesc: "Choose the language for the plugin interface",
        english: "English",
        chinese: "Chinese",
        auto: "Auto",
        hostnameReplacementName: "{{hostname}} placeholder replacement",
        hostnameReplacementDesc: "Specify custom hostname for every device.",
        previewCommitMessage: "Preview commit message",
        previewButtonText: "Preview",
        listFilenamesInBody: "List filenames affected by commit in the commit body",
        pullHeading: "Pull",
        mergeStrategy: "Merge strategy",
        mergeStrategyDesc: "Decide how to integrate commits from your remote branch into your local branch.",
        pullOnStartup: "Pull on startup",
        pullOnStartupDesc: "Automatically pull commits when Obsidian starts.",
        commitAndSync: "Commit-and-sync",
        commitAndSyncDesc: "Commit-and-sync with default settings means staging everything -> committing -> pulling -> pushing. Ideally this is a single action that you do regularly to keep your local and remote repository in sync.",
        pushOnCommitSync: "Push on commit-and-sync",
        pushOnCommitSyncDesc: "Most of the time you want to push after committing. Turning this off turns a commit-and-sync action into commit and pull only. It will still be called commit-and-sync.",
        pullOnCommitSync: "Pull on commit-and-sync",
        pullOnCommitSyncDesc: "On commit-and-sync, pull commits as well. Turning this off turns a commit-and-sync action into commit and push only.",
        historyView: "History view",
        showAuthor: "Show Author",
        showAuthorDesc: "Show the author of the commit in the history view.",
        authorOptions: {
            hide: "Hide",
            full: "Full",
            initials: "Initials"
        },
        showDate: "Show Date",
        showDateDesc: "Show the date of the commit in the history view. The {{date}} placeholder format is used to display the date.",
        sourceControlView: "Source control view",
        autoRefreshSourceControl: "Automatically refresh source control view on file changes",
        autoRefreshSourceControlDesc: "On slower machines this may cause lags. If so, just disable this option.",
        sourceControlRefreshInterval: "Source control view refresh interval",
        sourceControlRefreshIntervalDesc: "Milliseconds to wait after file change before refreshing the Source Control View.",
        miscellaneous: "Miscellaneous",
        diffViewStyle: "Diff view style",
        diffViewStyleDesc: "Set the style for the diff view. Note that the actual diff in \"Split\" mode is not generated by Git, but the editor itself instead so it may differ from the diff generated by Git. One advantage of this is that you can edit the text in that view.",
        diffOptions: {
            split: "Split",
            unified: "Unified"
        },
        disableNotifications: "Disable notifications",
        disableNotificationsDesc: "Disable notifications for git operations to minimize distraction (refer to status bar for updates). Errors are still shown as notifications even if you enable this setting.",
        hideNotificationsForNoChanges: "Hide notifications for no changes",
        hideNotificationsForNoChangesDesc: "Don't show notifications when there are no changes to commit or push.",
        showStatusBarToggle: "Show status bar",
        showStatusBarToggleDesc: "Obsidian must be restarted for the changes to take affect.",
        showStageButtons: "Show stage/unstage button in file menu",
        showBranchStatusBarToggle: "Show branch status bar",
        showBranchStatusBarToggleDesc: "Obsidian must be restarted for the changes to take affect.",
        showChangedFilesCount: "Show the count of modified files in the status bar",
        copyDebugInfo: "Copy Debug Information",
        debugInfoCopied: "Debug information copied to clipboard. May contain sensitive information!",
        debuggingAndLogging: "Debugging and logging:\nYou can always see the logs of this and every other plugin by opening the console with",
        macShortcut: "CMD (⌘) + OPTION (⌥) + I",
        winLinuxShortcut: "CTRL + SHIFT + I",
        syncOptions: {
            merge: "Merge",
            rebase: "Rebase",
            reset: "Other sync service (Only updates the HEAD without touching the working directory)"
        },
        colorForOldest: "Color for oldest ({0} or older) commits",
        colorForNewest: "Color for newest commits"
    },
    commands: {
        commitChanges: "Commit changes",
        pushChanges: "Push changes",
        pullChanges: "Pull changes",
        commitAndPush: "Commit and push changes",
        openSourceControlView: "Open source control view",
        openHistoryView: "Open history view",
        openDiffView: "Open diff view",
        editRemotes: "Edit remotes",
        addRemote: "Add remote",
        removeRemote: "Remove remote",
        init: "Initialize repository",
        clone: "Clone repository",
        openFileOnGitHub: "Open file on GitHub",
        openHistoryOnGitHub: "Open file history on GitHub",
        createBackup: "Create backup",
        listChangedFiles: "List changed files",
        editGitignore: "Edit .gitignore",
        openFileOnGithub: "Open file on GitHub",
        openFileHistoryOnGithub: "Open file history on GitHub",
        pull: "Pull",
        fetch: "Fetch",
        switchToRemoteBranch: "Switch to remote branch",
        addFileToGitignore: "Add file to .gitignore",
        commitAndSync: "Commit and sync",
        commitAndSyncAndClose: "Commit and sync and close Obsidian",
        commitAndSyncWithSpecificMessage: "Commit and sync with specific message",
        commitAllChanges: "Commit all changes",
        commitAllChangesWithSpecificMessage: "Commit all changes with specific message",
        commitStaged: "Commit staged changes",
        amendStaged: "Amend staged changes",
        commitStagedWithSpecificMessage: "Commit staged changes with specific message",
        push: "Push",
        stageCurrentFile: "Stage current file",
        unstageCurrentFile: "Unstage current file",
        setUpstreamBranch: "Set upstream branch",
        deleteRepository: "WARNING: Delete repository",
        initializeNewRepo: "Initialize new repo",
        cloneExistingRepo: "Clone existing remote repo",
        switchBranch: "Switch branch",
        createNewBranch: "Create new branch",
        deleteBranch: "Delete branch",
        discardAllChanges: "WARNING: Discard all changes",
        rawCommand: "Raw command",
        toggleLineAuthorInfo: "Toggle line author info"
    },
    statusBar: {
        commitInProgress: "Commit in progress...",
        pushInProgress: "Push in progress...",
        pullInProgress: "Pull in progress...",
        commitCompleted: "Commit completed",
        pushCompleted: "Push completed",
        pullCompleted: "Pull completed",
        upToDate: "Up to date",
        offline: "Git: Offline",
        error: "Git: Error",
        disabled: "Git: Disabled",
        unpushedCommitSingular: "1 unpushed commit",
        unpushedCommitPlural: "{0} unpushed commits",
        toggle: "Toggle Git status bar",
        describe: "Show git status on status bar"
    },
    modals: {
        commitTitle: "Commit changes",
        commitPrompt: "Enter commit message",
        commitConfirm: "Commit",
        commitCancel: "Cancel",
        pullTitle: "Pull changes",
        pullPrompt: "Would you like to pull changes?",
        pullConfirm: "Pull",
        pullCancel: "Cancel",
        pushTitle: "Push changes",
        pushPrompt: "Would you like to push changes?",
        pushConfirm: "Push",
        pushCancel: "Cancel",
        cloneTitle: "Clone repository",
        clonePrompt: "Enter repository URL",
        cloneConfirm: "Clone",
        cloneCancel: "Cancel",
        remoteTitle: "Add remote",
        remotePrompt: "Enter remote name and URL",
        remoteName: "Remote name",
        remoteUrl: "Remote URL",
        remoteConfirm: "Add",
        remoteCancel: "Cancel",
        deleteRepository: {
            placeholder: "Are you sure you want to delete the repository (.git directory)? This action cannot be reverted."
        },
        discardAllChanges: {
            placeholder: "Do you want to discard all changes made to tracked files? This action cannot be reverted."
        },
        editGitignore: {
            title: "Edit .gitignore",
            save: "Save"
        },
        autoBackupPrompt: "Auto backup prompt",
        enterCustomMessage: "Enter custom commit message",
        branchSelect: "Select branch",
        createBranch: "Create new branch",
        deleteBranch: "Delete branch",
        forceDelete: "Force delete",
        enterRemoteUrl: "Enter remote URL",
        enterDirectory: "Enter directory for clone",
        cloneInProgress: "Cloning new repo...",
        abortedClone: "Aborted clone",
        running: "Running '{0}'...",
        enterResponse: "Enter response",
        notAGitRepository: "Not a git repository",
        tooManyChanges: "Too many changes to display"
    },
    sourceControl: {
        changes: "Changes",
        stagedChanges: "Staged changes",
        unstage: "Unstage",
        stage: "Stage",
        stageAll: "Stage all",
        unstageAll: "Unstage all",
        commitStagedButton: "Commit",
        noChanges: "No changes",
        moreFiles: "...more files",
        changedFiles: "Changed files",
        recentlyPulledFiles: "Recently pulled files",
        changeLayout: "Change layout",
        refresh: "Refresh",
        clear: "Clear",
        discard: "Discard"
    },
    views: {
        history: "History view",
        sourceControl: "Source control view",
        diff: "Diff view"
    },
    notices: {
        deleteRepository: {
            success: "Repository has been deleted successfully. Reloading plugin...",
            notFound: "Repository not found"
        },
        restartObsidian: "Obsidian must be restarted for changes to take effect."
    },
    errors: {
        commitFailed: "Commit failed",
        pushFailed: "Push failed",
        pullFailed: "Pull failed",
        networkError: "Network error",
        conflictsFound: "Conflicts found",
        authError: "Authentication error",
        notAGitRepository: "Not a git repository",
        tooManyChanges: "Too many changes to display"
    },
    messages: {
        pullUpToDate: "Pull: Everything is up-to-date",
        committedFiles: "Committed {0} {0, plural, one {file} other {files}}",
        noChangesToCommit: "No changes to commit",
        committedChanges: "Committed changes",
        pushedToRemote: "Pushed {0} {0, plural, one {file} other {files}} to remote",
        noCommitsToPush: "No commits to push",
        pulledFromRemote: "Pulled {0} {0, plural, one {file} other {files}} from remote",
        fetchedFromRemote: "Fetched from remote",
        noChangesToPull: "No changes to pull",
        createdBranch: "Created new branch {0}",
        switchedToBranch: "Switched to {0}",
        deletedBranch: "Deleted branch {0}",
        setUpstreamTo: "Set upstream branch to {0}",
        initializedRepo: "Initialized new repo",
        addedToGitignore: "Added {0} to .gitignore",
        stagedFile: "Staged {0}",
        unstagedFile: "Unstaged {0}",
        stageError: "Staging error: {0}",
        unstageError: "Unstaging error: {0}",
        noGitRepository: "Can't find a valid git repository. Please create one via the given command or clone an existing repo.",
        cannotRunGit: "Cannot run git command. Trying to run: '{0}'.",
        commitConflictError: "Did not commit, because you have conflicts in {0} {0, plural, one {file} other {files}}. Please resolve them and commit per command.",
        pullConflictError: "You have conflicts in {0} {0, plural, one {file} other {files}}",
        networkError: "Git: Going into offline mode. Future network errors will no longer be displayed.",
        conflictResolutionGuide: "# Conflicts\nPlease resolve them and commit them using the commands `Git: Commit all changes` followed by `Git: Push`\n(This file will automatically be deleted before commit)\n[[#Additional Instructions]] available below file list\n\n",
        conflictResolutionAdditional: "\n# Additional Instructions\nI strongly recommend to use \"Source mode\" for viewing the conflicted files. For simple conflicts, in each file listed above replace every occurrence of the following text blocks with the desired text.\n\n```diff\n<<<<<<< HEAD\n    File changes in local repository\n=======\n    File changes in remote repository\n>>>>>>> origin/main\n```"
    }
}; 
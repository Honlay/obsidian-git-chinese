export const zh = {
    settings: {
        general: "常规",
        automatic: "自动化",
        splitTimers: "为自动提交和同步分离计时器",
        splitTimersDesc: "启用后可以为提交和同步使用不同的时间间隔",
        autoCommitInterval: "自动提交间隔（分钟）",
        autoCommitIntervalDesc: "每隔X分钟提交一次更改。设为0（默认值）禁用此功能。",
        autoCommitAndSyncInterval: "自动提交并同步间隔（分钟）",
        autoCommitAndSyncIntervalDesc: "每隔X分钟提交并同步一次更改。设为0（默认值）禁用此功能。",
        autoCommitAfterFileEdits: "停止编辑文件后自动{0}",
        autoCommitAfterFileEditsDesc: "要求{0}间隔不为0。如果开启，将在停止编辑文件后的{1}内进行自动{0}。这也会防止在编辑文件时进行自动{0}。如果关闭，则不考虑上次文件编辑时间。",
        autoCommitAfterLatestCommit: "最新提交后自动{0}",
        autoCommitAfterLatestCommitDesc: "如果开启，将最后一次自动{0}的时间戳设置为最新提交的时间戳。这会在手动提交后减少自动{0}的频率。",
        autoPushInterval: "自动推送间隔（分钟）",
        autoPushIntervalDesc: "每隔X分钟推送一次提交。设为0（默认值）禁用此功能。",
        autoPullInterval: "自动拉取间隔（分钟）",
        autoPullIntervalDesc: "每隔X分钟拉取一次更改。设为0（默认值）禁用此功能。",
        autoPullOnBoot: "启动时拉取",
        autoPullOnBootDesc: "Obsidian启动时执行git pull。",
        disablePushDialog: "禁用推送对话框",
        disablePushDialogDesc: "推送前不显示备份对话框。",
        pullBeforePush: "推送前拉取",
        pullBeforePushDesc: "推送前自动先拉取。",
        disablePopups: "禁用通知",
        disablePopupsDesc: "不显示备份过程中的通知。",
        disablePopupsForNoChanges: "无更改时禁用通知",
        disablePopupsForNoChangesDesc: "如果没有更改，则不显示备份成功通知。",
        customMessageOnAutoBackup: "自动备份时指定自定义提交消息",
        customMessageOnAutoBackupDesc: "您将收到一个弹窗以指定您的消息。",
        showStatusBar: "显示状态栏",
        showStatusBarDesc: "在状态栏中显示仓库信息。",
        showChangedFilesInStatusBar: "在状态栏中显示已更改文件计数",
        showChangedFilesInStatusBarDesc: "在状态栏中显示当前已更改文件的数量。",
        showBranchStatusBar: "在状态栏中显示当前分支",
        showBranchStatusBarDesc: "在状态栏中显示当前分支。",
        commitMessage: "提交消息",
        commitMessageOnManualCommit: "手动提交时的提交消息",
        commitMessageOnAutoCommit: "自动{0}时的提交消息",
        commitMessagePlaceholder: "仓库备份: {{date}}",
        commitMessagePlaceholdersDesc: "可用占位符：{{date}}（见下文）、{{hostname}}（见下文）、{{numFiles}}（提交中已更改文件的数量）和{{files}}（提交消息中已更改的文件）。",
        commitDateFormat: "提交日期格式",
        commitDateFormatDesc: "提交消息中{{date}}的格式。",
        commitDateFormatDescHtml: "提交消息中{{date}}的格式。例如：\"{0}\"。查看 <a href=\"https://momentjs.com\">Moment.js</a> 获取更多格式。",
        refreshSourceControl: "自动刷新源代码控制视图",
        refreshSourceControlDesc: "变更后自动刷新源代码控制视图。",
        refreshSourceControlTimer: "源代码控制视图刷新间隔（毫秒）",
        refreshSourceControlTimerDesc: "源代码控制视图每次刷新之间的时间间隔（毫秒）。",
        showFileMenu: "显示文件菜单",
        showFileMenuDesc: "在文件菜单中显示git命令。",
        authorInHistoryView: "在历史视图中显示作者",
        authorInHistoryViewDesc: "在历史视图中显示作者姓名。",
        dateInHistoryView: "在历史视图中显示日期",
        dateInHistoryViewDesc: "在历史视图中显示日期。",
        lineAuthor: "行作者",
        lineAuthorActiveDesc: "显示每行的最后编辑者。",
        followMovement: "跟踪行移动",
        dateTimeFormat: "日期/时间格式",
        timezone: "时区",
        showCommitHash: "显示提交哈希值",
        ignoreWhitespace: "忽略空白",
        coloringOptions: "着色选项",
        coloringMaxAge: "行着色的最长时间",
        colorNew: "新行颜色",
        colorOld: "旧行颜色",
        notReady: "Git尚未准备就绪。当所有设置正确后，您可以配置提交同步等操作。",
        language: "语言",
        languageDesc: "选择插件界面语言",
        english: "英语",
        chinese: "中文",
        auto: "自动",
        hostnameReplacementName: "{{hostname}} 占位符替换",
        hostnameReplacementDesc: "为每个设备指定自定义主机名。",
        previewCommitMessage: "预览提交消息",
        previewButtonText: "预览",
        listFilenamesInBody: "在提交正文中列出受影响的文件名",
        pullHeading: "拉取",
        mergeStrategy: "合并策略",
        mergeStrategyDesc: "选择如何将远程分支的提交整合到本地分支。",
        pullOnStartup: "启动时拉取",
        pullOnStartupDesc: "Obsidian启动时自动拉取提交。",
        commitAndSync: "提交并同步",
        commitAndSyncDesc: "默认设置下的提交并同步意味着：暂存所有内容 -> 提交 -> 拉取 -> 推送。理想情况下，这是一个定期执行的单一操作，用于保持本地和远程仓库同步。",
        pushOnCommitSync: "提交并同步时推送",
        pushOnCommitSyncDesc: '大多数情况下，您会希望在提交后推送。关闭此选项会将提交并同步操作变为仅提交和拉取。它仍会被称为"提交并同步"。',
        pullOnCommitSync: "提交并同步时拉取",
        pullOnCommitSyncDesc: "在提交并同步时，同时拉取提交。关闭此选项会将提交并同步操作变为仅提交和推送。",
        historyView: "历史视图",
        showAuthor: "显示作者",
        showAuthorDesc: "在历史视图中显示提交作者。",
        authorOptions: {
            hide: "隐藏",
            full: "完整",
            initials: "缩写"
        },
        showDate: "显示日期",
        showDateDesc: "在历史视图中显示提交日期。使用 {{date}} 占位符格式来显示日期。",
        sourceControlView: "源代码控制视图",
        autoRefreshSourceControl: "文件更改时自动刷新源代码控制视图",
        autoRefreshSourceControlDesc: "在较慢的设备上，这可能导致卡顿。如果出现这种情况，请禁用此选项。",
        sourceControlRefreshInterval: "源代码控制视图刷新间隔",
        sourceControlRefreshIntervalDesc: "文件更改后等待刷新源代码控制视图的毫秒数。",
        miscellaneous: "杂项",
        diffViewStyle: "差异视图样式",
        diffViewStyleDesc: "设置差异视图的样式。请注意，\"分割\"模式下的实际差异不是由Git生成的，而是由编辑器本身生成，可能与Git生成的差异不同。这种方式的优点是您可以在该视图中编辑文本。",
        diffOptions: {
            split: "分割",
            unified: "统一"
        },
        disableNotifications: "禁用通知",
        disableNotificationsDesc: "禁用Git操作的通知以减少干扰（可通过状态栏获取更新）。即使启用此设置，错误仍会以通知形式显示。",
        hideNotificationsForNoChanges: "无更改时隐藏通知",
        hideNotificationsForNoChangesDesc: "当没有要提交或推送的更改时，不显示通知。",
        showStatusBarToggle: "显示状态栏",
        showStatusBarToggleDesc: "更改生效需重启Obsidian。",
        showStageButtons: "在文件菜单中显示暂存/取消暂存按钮",
        showBranchStatusBarToggle: "显示分支状态栏",
        showBranchStatusBarToggleDesc: "更改生效需重启Obsidian。",
        showChangedFilesCount: "在状态栏中显示已修改文件的数量",
        commitAuthorHeading: "提交作者",
        authenticationHeading: "认证/提交作者",
        gitServerUsername: "Git服务器上的用户名（如您在GitHub上的用户名）",
        passwordOrToken: "密码/个人访问令牌",
        passwordOrTokenDesc: "输入您的密码。您将无法再次查看。",
        authorName: "提交的作者名称",
        authorEmail: "提交的作者邮箱",
        advanced: "高级设置",
        advancedDesc: "以下设置通常不需要更改，但在特殊情况下可能必需。",
        updateSubmodules: "更新子模块",
        updateSubmodulesDesc: "\"提交并同步\"和\"拉取\"会处理子模块。缺少的功能：冲突文件标识，已拉取/推送/提交文件的计数。每个子模块需要设置跟踪分支。",
        submoduleRecurse: "子模块递归检出/切换",
        submoduleRecurseDesc: "当根仓库发生检出时，在子模块上递归执行检出（如果分支存在）。",
        customGitPath: "自定义Git二进制路径",
        additionalEnvVars: "额外的环境变量",
        additionalEnvVarsDesc: "每行一个环境变量，格式为KEY=VALUE。",
        additionalPathEnv: "额外的PATH环境变量路径",
        additionalPathEnvDesc: "每行一个路径",
        reloadEnvVars: "使用新环境变量重新加载",
        reloadEnvVarsDesc: "删除的环境变量在Obsidian重启前不会生效。",
        reloadButtonText: "重新加载",
        customBasePath: "自定义基础路径（Git仓库路径）",
        customBasePathDesc: "设置从Vault根目录到Git执行目录的相对路径。主要用于设置Git仓库路径，仅当Git仓库位于Vault根目录下时才需要。在Windows上使用\"\\\"代替\"/\"。",
        customGitDir: "自定义Git目录路径（替代'.git'）",
        customGitDirDesc: "更改生效需重启Obsidian。在Windows上使用\"\\\"代替\"/\"。",
        disableOnDevice: "在此设备上禁用",
        disableOnDeviceDesc: "在此设备上禁用插件。此设置不会同步。",
        support: "支持",
        donate: "捐赠",
        donateDesc: "如果您喜欢此插件，请考虑捐赠以支持继续开发。",
        copyDebugInfo: "复制调试信息",
        debugInfoCopied: "调试信息已复制到剪贴板。可能包含敏感信息！",
        debuggingAndLogging: "调试和日志记录：\n您可以通过打开控制台查看此插件和其他所有插件的日志，使用",
        macShortcut: "CMD (⌘) + OPTION (⌥) + I",
        winLinuxShortcut: "CTRL + SHIFT + I",
        lineAuthorInfo: "行作者信息",
        lineAuthorInfoDesc: "显示每行旁边的提交作者信息",
        lineAuthorDesktopOnly: "目前仅适用于桌面版。",
        lineAuthorFeatureGuide: "功能指南和快速示例",
        lineAuthorConfigDesc: "提交哈希、作者姓名和创作日期都可以单独开关。可以隐藏所有内容，只显示按年龄着色的侧栏。",
        followLineMovement: "跟踪行的移动和跨文件复制",
        followMovementInactive: "不跟踪（默认）",
        followMovementSameCommit: "在同一提交内跟踪",
        followMovementAllCommits: "在所有提交中跟踪（可能较慢）",
        followMovementDesc: "默认情况下（停用），每行只显示其最新更改的提交。启用\"同一提交\"时，会跟踪同一提交内的剪切-复制-粘贴操作，并显示原始创作的提交。启用\"所有提交\"时，会检测多次提交间的文本剪切-复制-粘贴。它使用git-blame，对于同一（或所有）提交中的匹配内容（至少需要40个字符），显示原始提交的信息。",
        authorNameDisplay: "作者名称显示",
        authorNameDisplayDesc: "是否以及如何显示作者",
        authoringDateDisplay: "创作日期显示",
        authoringDateDisplayDesc: "是否以及如何显示行创作的日期和时间",
        customDateFormat: "自定义创作日期格式",
        dateDisplayTimezone: "创作日期显示时区",
        dateDisplayTimezoneDesc: "显示创作日期的时区。可以是您的本地时区（默认）、作者创建提交时的时区，或UTC±00:00。",
        viewerLocal: "我的本地（默认）",
        authorLocal: "作者的本地",
        utc: "UTC+0000/Z",
        oldestAge: "着色中的最长时间",
        oldestAgeDesc: "行作者着色中的最长时间。所有更老的内容都将具有相同的颜色。最小有效时间为\"1d\"。",
        textColor: "文本颜色",
        textColorDesc: "边栏文本的CSS颜色。强烈建议使用主题定义的CSS变量（如 var(--text-muted) 或 var(--text-on-accent)），因为它们会自动适应主题变化。",
        ignoreWhitespaceDesc: "默认情况下，空白和换行被视为文档的一部分（因此不会被忽略）。当添加新的后续行时，即使前一行的文本相同，也会显示为'已更改'。如果您不关心纯空白更改（如列表缩进/引用缩进更改），启用此选项将提供更有意义的变更检测。",
        textColorPreviewHtml: "支持'rgb(r,g,b)'、'hsl(h,s,l)'、十六进制(#)和命名颜色（如'black'、'purple'）。颜色预览：",
        formatStringDesc: "用于显示创作日期的格式字符串。",
        currentlyFormatted: "当前格式：",
        oldestAgeDesc2: "行作者着色中的最长时间。所有更老的内容都将具有相同的颜色。最小有效时间为\"1d\"。当前：",
        days: "天",
        invalidAge: "无效！",
        syncOptions: {
            merge: "合并",
            rebase: "变基",
            reset: "其他同步服务（仅更新HEAD指针，不修改工作目录）"
        },
        colorForOldest: "最旧提交（{0}或更旧）的颜色",
        colorForNewest: "最新提交的颜色"
    },
    commands: {
        commitChanges: "提交更改",
        pushChanges: "推送更改",
        pullChanges: "拉取更改",
        commitAndPush: "提交并推送更改",
        openSourceControlView: "打开源代码控制视图",
        openHistoryView: "打开历史视图",
        openDiffView: "打开差异视图",
        editRemotes: "编辑远程仓库",
        addRemote: "添加远程仓库",
        removeRemote: "移除远程仓库",
        init: "初始化仓库",
        clone: "克隆仓库",
        openFileOnGitHub: "在GitHub上打开文件",
        openHistoryOnGitHub: "在GitHub上打开文件历史",
        createBackup: "创建备份",
        listChangedFiles: "列出已更改文件",
        editGitignore: "编辑 .gitignore",
        openFileOnGithub: "在GitHub上打开文件",
        openFileHistoryOnGithub: "在GitHub上打开文件历史",
        pull: "拉取",
        fetch: "获取",
        switchToRemoteBranch: "切换到远程分支",
        addFileToGitignore: "将文件添加到 .gitignore",
        commitAndSync: "提交并同步",
        commitAndSyncAndClose: "提交并同步后关闭Obsidian",
        commitAndSyncWithSpecificMessage: "使用指定消息提交并同步",
        commitAllChanges: "提交所有更改",
        commitAllChangesWithSpecificMessage: "使用指定消息提交所有更改",
        commitStaged: "提交已暂存的更改",
        amendStaged: "修改已暂存的更改",
        commitStagedWithSpecificMessage: "使用指定消息提交已暂存的更改",
        push: "推送",
        stageCurrentFile: "暂存当前文件",
        unstageCurrentFile: "取消暂存当前文件",
        setUpstreamBranch: "设置上游分支",
        deleteRepository: "警告：删除仓库",
        initializeNewRepo: "初始化新仓库",
        cloneExistingRepo: "克隆现有远程仓库",
        switchBranch: "切换分支",
        createNewBranch: "创建新分支",
        deleteBranch: "删除分支",
        discardAllChanges: "警告：放弃所有更改",
        rawCommand: "原始命令",
        toggleLineAuthorInfo: "切换行作者信息"
    },
    statusBar: {
        commitInProgress: "正在提交...",
        pushInProgress: "正在推送...",
        pullInProgress: "正在拉取...",
        commitCompleted: "提交完成",
        pushCompleted: "推送完成",
        pullCompleted: "拉取完成",
        upToDate: "已是最新",
        offline: "Git: 离线",
        error: "Git: 错误",
        disabled: "Git: 已禁用",
        unpushedCommitSingular: "1个未推送的提交",
        unpushedCommitPlural: "{0}个未推送的提交",
        toggle: "切换Git状态栏",
        describe: "在状态栏中显示Git状态"
    },
    modals: {
        commitTitle: "提交更改",
        commitPrompt: "请输入提交信息",
        commitConfirm: "提交",
        commitCancel: "取消",
        pullTitle: "拉取更改",
        pullPrompt: "是否要拉取更改？",
        pullConfirm: "拉取",
        pullCancel: "取消",
        pushTitle: "推送更改",
        pushPrompt: "是否要推送更改？",
        pushConfirm: "推送",
        pushCancel: "取消",
        cloneTitle: "克隆仓库",
        clonePrompt: "输入仓库URL",
        cloneConfirm: "克隆",
        cloneCancel: "取消",
        remoteTitle: "添加远程仓库",
        remotePrompt: "输入远程仓库名称和URL",
        remoteName: "远程仓库名称",
        remoteUrl: "远程仓库URL",
        remoteConfirm: "添加",
        remoteCancel: "取消",
        autoBackupPrompt: "自动备份提示",
        enterCustomMessage: "请输入自定义提交消息",
        branchSelect: "选择分支",
        createBranch: "创建新分支",
        deleteBranch: "删除分支",
        forceDelete: "强制删除",
        enterRemoteUrl: "输入远程仓库URL",
        enterDirectory: "输入克隆目录",
        cloneInProgress: "正在克隆新仓库...",
        abortedClone: "已取消克隆",
        running: "正在运行 '{0}'...",
        enterResponse: "输入响应",
        deleteRepository: {
            placeholder: "您确定要删除仓库（.git目录）吗？此操作无法撤销。"
        },
        notAGitRepository: "不是Git仓库",
        tooManyChanges: "要显示的更改太多"
    },
    sourceControl: {
        changes: "更改",
        stagedChanges: "已暂存的更改",
        unstage: "取消暂存",
        stage: "暂存",
        stageAll: "暂存所有",
        unstageAll: "取消暂存所有",
        commitStagedButton: "提交",
        noChanges: "没有更改",
        moreFiles: "以及...个更多文件",
        changedFiles: "已更改文件",
        recentlyPulledFiles: "最近拉取的文件",
        changeLayout: "更改布局",
        refresh: "刷新",
        clear: "清除",
        discard: "放弃"
    },
    views: {
        history: "历史视图",
        sourceControl: "源代码控制视图",
        diff: "差异视图"
    },
    notices: {
        deleteRepository: {
            success: "已成功删除仓库。正在重新加载插件...",
            notFound: "未找到仓库"
        },
        restartObsidian: "Obsidian必须重新启动才能使更改生效。"
    },
    errors: {
        commitFailed: "提交失败",
        pushFailed: "推送失败",
        pullFailed: "拉取失败",
        networkError: "网络错误",
        conflictsFound: "发现冲突",
        authError: "认证错误",
        notAGitRepository: "不是Git仓库",
        tooManyChanges: "要显示的更改太多"
    },
    messages: {
        pullUpToDate: "拉取：已是最新",
        committedFiles: "已提交 {0} 个文件",
        noChangesToCommit: "没有要提交的更改",
        committedChanges: "已提交更改",
        pushedToRemote: "已推送 {0} 个文件到远程仓库",
        noCommitsToPush: "没有要推送的提交",
        pulledFromRemote: "已从远程仓库拉取 {0} 个文件",
        fetchedFromRemote: "已从远程仓库获取更新",
        noChangesToPull: "没有要拉取的更改",
        createdBranch: "已创建新分支 {0}",
        switchedToBranch: "已切换到分支 {0}",
        deletedBranch: "已删除分支 {0}",
        setUpstreamTo: "已设置上游分支为 {0}",
        initializedRepo: "已初始化新仓库",
        addedToGitignore: "已将 {0} 添加到 .gitignore",
        stagedFile: "已暂存 {0}",
        unstagedFile: "已取消暂存 {0}",
        stageError: "暂存失败：{0}",
        unstageError: "取消暂存失败：{0}",
        noGitRepository: "找不到有效的 Git 仓库。请通过命令创建一个新仓库或克隆现有仓库。",
        cannotRunGit: "无法运行 git 命令。尝试运行：'{0}'",
        commitConflictError: "由于存在 {0} 个文件冲突，无法提交。请解决冲突后再提交。",
        pullConflictError: "由于存在 {0} 个文件冲突，无法拉取。请解决冲突后再拉取。",
        networkError: "Git：进入离线模式。未来的网络错误将不再显示。",
        conflictResolutionGuide: '# 冲突\n请解决冲突并使用"Git：提交所有更改"命令提交，然后使用"Git：推送"命令推送\n（此文件将在提交前自动删除）\n\n[[#附加说明]] 在文件列表下方\n\n',
        conflictResolutionAdditional: '\n# 附加说明\n强烈建议使用"源代码模式"查看冲突文件。对于简单的冲突，在上述每个文件中，将以下文本块替换为所需的文本。\n\n```diff\n<<<<<<< HEAD\n    本地仓库的文件更改\n=======\n    远程仓库的文件更改\n>>>>>>> origin/main\n```'
    }
}; 
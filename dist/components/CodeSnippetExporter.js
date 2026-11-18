// day-05-crongenius/src/components/CodeSnippetExporter.jsx
export function CodeSnippetExporter({ expression, onCopySnippet }) {
    const snippets = [
        {
            lang: 'Crontab File',
            code: `# Runs: ${expression}\n${expression} /usr/local/bin/backup-job.sh >> /var/log/cron.log 2>&1`
        },
        {
            lang: 'Node.js (node-cron)',
            code: `import cron from 'node-cron';\n\n// Schedule task: ${expression}\ncron.schedule('${expression}', async () => {\n  console.log('⚡ Cron triggered at', new Date().toISOString());\n  await executeScheduledTask();\n});`
        },
        {
            lang: 'Python (croniter / schedule)',
            code: `from croniter import croniter\nfrom datetime import datetime\n\nbase = datetime.now()\niter = croniter('${expression}', base)\nnext_run = iter.get_next(datetime)\nprint(f"Next execution scheduled for: {next_run}")`
        },
        {
            lang: 'Go (robfig/cron/v3)',
            code: `package main\n\nimport (\n  "fmt"\n  "github.com/robfig/cron/v3"\n)\n\nfunc main() {\n  c := cron.New()\n  c.AddFunc("${expression}", func() {\n    fmt.Println("Cron tick triggered!")\n  })\n  c.Start()\n}`
        }
    ];
    return (React.createElement("div", { className: "snippets-card card-elevated" },
        React.createElement("div", { className: "section-title" },
            React.createElement("span", null, "Production Code Snippets"),
            React.createElement("span", { className: "badge-pill" }, "Copy-Paste Ready")),
        React.createElement("div", { className: "snippets-grid" }, snippets.map((s, idx) => (React.createElement("div", { key: idx, className: "snippet-box" },
            React.createElement("div", { className: "snippet-header" },
                React.createElement("span", { className: "snippet-lang" }, s.lang),
                React.createElement("button", { className: "btn-secondary", style: { fontSize: '0.72rem', padding: '3px 8px' }, onClick: () => onCopySnippet(s.code, s.lang) }, "\uD83D\uDCCB Copy")),
            React.createElement("pre", { className: "snippet-code" },
                React.createElement("code", null, s.code))))))));
}

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

  return (
    <div className="snippets-card card-elevated">
      <div className="section-title">
        <span>Production Code Snippets</span>
        <span className="badge-pill">Copy-Paste Ready</span>
      </div>

      <div className="snippets-grid">
        {snippets.map((s, idx) => (
          <div key={idx} className="snippet-box">
            <div className="snippet-header">
              <span className="snippet-lang">{s.lang}</span>
              <button
                className="btn-secondary"
                style={{ fontSize: '0.72rem', padding: '3px 8px' }}
                onClick={() => onCopySnippet(s.code, s.lang)}
              >
                📋 Copy
              </button>
            </div>
            <pre className="snippet-code">
              <code>{s.code}</code>
            </pre>
          </div>
        ))}
      </div>
    </div>
  );
}

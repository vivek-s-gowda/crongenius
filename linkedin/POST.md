# Day 5 of 30: Building a Dev Tool Every Single Day 🚀

Who else has stared at a cron string like `0 2 * * 1-5` and had a mini panic attack wondering: "Wait, does this run at 2 AM on weekdays, or every 2 hours? And what exact date/time will it fire next on our UTC production server?".

So for **Day 5 / 30**, I built **CronGenius** — a visual cron expression builder and schedule simulator built in **React 19** with a custom **Tokyo Night** theme, glassmorphism, and live schedule forecasting.

Here is what it does:
• ⏱️ **Live Human English Translation**: As you type or click, it translates any 5-field cron expression into crystal-clear plain English in real time (e.g. `*/15 * * * *` ➔ *"Every 15 minutes"*).
• 🛠️ **Segmented Visual Builder**: Clickable interactive segments for Minute, Hour, Day of Month, Month, and Day of Week with preloaded quick patterns (work hours, weekends, quarterly).
• 📅 **Next 25 Runs Schedule**: Calculates the exact next 25 upcoming execution runs with relative countdown chips (*"in 14m"*, *"in 2 hours"*) and timezone switching (UTC, EST, PST, GMT, IST, Tokyo).
• ⚡ **Webhook & Event Simulator**: Test how your cloud functions handle cron ticks. Dispatch simulated ticks, test endpoints, and monitor real-time latency logs.
• 📜 **Production Code Exporter**: One-click copy-paste snippets for Crontab, Node.js (`node-cron`), Python (`schedule`/`croniter`), and Go (`robfig/cron`).
• 🎨 **Dynamic Theme Suite**: Built with an electric Tokyo Night aesthetic (violet & sky cyan), plus switchable Nordic Aurora, Cyberpunk Grid, and Solar Flare palettes.
• ☁️ **Firebase Hosting Ready**: Complete with SPA rewrites and edge cache headers.

### ⚙️ Under The Hood
• **Modular React 19 Component Architecture**: Split into clean components (`Header`, `CronExpressionBar`, `CronVisualBuilder`, `ScheduleTimeline`, `PresetsPicker`, `WebhookSimulator`, `CodeSnippetExporter`, `Toast`).
• **14 Automated Unit Tests**: 100% green test suite covering parsing, step ranges, translation logic, and next-run math using Node.js's native test runner (`node --test`).
• **Isolated Git History**: Dedicated git repository strictly inside this project folder.

Check out the 4 snapshots below showing the visual builder, active schedule timeline, webhook simulator, and multi-language snippets!

👉 Quick question for engineers: When you're setting up scheduled tasks or cron jobs, do you write raw crontabs on servers, use cloud schedulers (AWS EventBridge / GCP Cloud Scheduler), or handle it in-app with Node/Python libraries?

#buildinpublic #30daychallenge #softwareengineering #react #javascript #devtools #cron #productivity #webdevelopment #coding

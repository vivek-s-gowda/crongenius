# ⏱️ Day 05: CronGenius — React 19 Visual Cron Schedule Studio

> Part of the **30-Day App Challenge** by Vivek Gowda (`sgowdavivek@gmail.com`).

CronGenius is a production-ready, client-side developer tool for designing cron expressions visually, translating them into human English, forecasting upcoming execution timelines across timezones, and testing cron webhooks.

---

## 🌟 Key Features

1. **Modular React 19 Architecture**:
   - Clean component hierarchy: `Header`, `CronExpressionBar`, `CronVisualBuilder`, `ScheduleTimeline`, `PresetsPicker`, `WebhookSimulator`, `CodeSnippetExporter`, `Toast`.
2. **Interactive Visual Builder**:
   - Granular visual controls for Minute, Hour, Day of Month, Month, and Day of Week.
   - Quick pattern chips for common schedules (e.g., `*/5`, `9-17`, `1-5`).
3. **Live Human English Translation**:
   - Instant bi-directional translation of 5-field cron strings into plain English.
4. **Next 25 Runs Timeline**:
   - Calculates the next 25 runs with relative countdown chips and timezone adjustments (UTC, EST, PST, GMT, IST, Tokyo).
5. **Webhook & Execution Simulator**:
   - Test cron payload triggers against custom API endpoints with live latency metrics.
6. **Production Code Snippets**:
   - Instant export for Crontab, Node.js (`node-cron`), Python (`croniter`), and Go (`robfig/cron`).
7. **Dynamic Tokyo Night Theme**:
   - Electric violet and sky cyan aesthetic with switchable Nordic Aurora, Cyberpunk Grid, and Solar Flare palettes.

---

## 🚀 Quickstart

```bash
cd day-05-crongenius
npm run start
# Open http://localhost:3005 in your browser
```

---

## 🧪 Automated Tests

Run the native test suite (14/14 passing):

```bash
cd day-05-crongenius
npm test
```

---

## ☁️ Firebase 1-Click Deployment

This app is 100% deploy-ready for **Firebase Hosting**:

```bash
cd day-05-crongenius
npm run build
firebase deploy --only hosting
```

Features included in `firebase.json`:
- Single-page application rewrites (`/index.html`).
- High-performance immutable static asset caching for JS/CSS (`max-age=31536000`).
- Cache revalidation for HTML and JSON.

---

## 📸 LinkedIn Snapshots

Automated high-resolution 16:9 snapshots are stored in `linkedin/snapshots/`:
- `01_hero_overview.png`: Clean overview of the studio in Tokyo Night theme.
- `02_core_workflow.png`: Active visual schedule builder with live execution timeline.
- `03_feature_deepdive.png`: Webhook & Event execution simulator with live latency logs.
- `04_export_results.png`: Multi-language production code snippets.

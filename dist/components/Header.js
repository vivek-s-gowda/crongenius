// day-05-crongenius/src/components/Header.jsx
import { THEMES } from '../themes.js';
import { TIMEZONES } from '../cronCalculator.js';
export function Header({ currentTheme, onThemeChange, timezone, onTimezoneChange, onOpenSimulator }) {
    return (React.createElement("header", { className: "app-header glass-panel" },
        React.createElement("div", { className: "brand-section" },
            React.createElement("div", { className: "logo-badge animated-pulse" }, "\u23F1\uFE0F"),
            React.createElement("div", { className: "brand-text" },
                React.createElement("h1", { className: "gradient-text" }, "CronGenius"),
                React.createElement("div", { className: "brand-subtitle" }, "Visual Cron Engine & Schedule Studio"))),
        React.createElement("div", { className: "header-controls" },
            React.createElement("div", { className: "control-group glass-chip" },
                React.createElement("span", { className: "control-label" }, "Theme:"),
                React.createElement("div", { className: "pill-group" }, THEMES.map(t => (React.createElement("button", { key: t.id, className: `pill-btn theme-pill ${currentTheme === t.id ? 'active' : ''}`, onClick: () => onThemeChange(t.id), title: t.name },
                    React.createElement("span", { className: "theme-dot", style: { background: t.primary } }),
                    t.name.split(' ')[0]))))),
            React.createElement("div", { className: "control-group glass-chip" },
                React.createElement("span", { className: "control-label" }, "Timezone:"),
                React.createElement("select", { className: "select-input", value: timezone, onChange: (e) => onTimezoneChange(e.target.value) }, TIMEZONES.map(tz => (React.createElement("option", { key: tz.id, value: tz.id }, tz.label))))),
            React.createElement("button", { className: "btn-glow", onClick: onOpenSimulator },
                React.createElement("span", null, "\uD83D\uDE80 Webhook Simulator")))));
}

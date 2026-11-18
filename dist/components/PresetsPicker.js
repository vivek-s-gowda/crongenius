// day-05-crongenius/src/components/PresetsPicker.jsx
import { SCHEDULE_PRESETS } from '../cronCalculator.js';
export function PresetsPicker({ currentExpression, onSelectPreset }) {
    return (React.createElement("div", { className: "presets-card card-elevated" },
        React.createElement("div", { className: "section-title" },
            React.createElement("span", null, "Production Schedule Presets"),
            React.createElement("span", { className: "badge-pill" }, "1-Click Templates")),
        React.createElement("div", { className: "presets-grid" }, SCHEDULE_PRESETS.map((p, idx) => {
            const isSelected = currentExpression === p.expr;
            return (React.createElement("button", { key: idx, className: `preset-btn ${isSelected ? 'active' : ''}`, onClick: () => onSelectPreset(p.expr, p.name) },
                React.createElement("div", { className: "preset-top" },
                    React.createElement("span", { className: "preset-name" }, p.name),
                    React.createElement("span", { className: "preset-cat" }, p.category)),
                React.createElement("code", { className: "preset-expr" }, p.expr)));
        }))));
}

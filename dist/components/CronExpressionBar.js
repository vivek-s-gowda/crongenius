// day-05-crongenius/src/components/CronExpressionBar.jsx
export function CronExpressionBar({ expression, translation, isValid, errorMsg, onCopyExpression, onExpressionChange }) {
    const parts = expression.trim().split(/\s+/);
    const labels = ['Minute', 'Hour', 'Day (Month)', 'Month', 'Day (Week)'];
    return (React.createElement("div", { className: "expression-hero card-elevated" },
        React.createElement("div", { className: "hero-top-row" },
            React.createElement("div", { className: "hero-boxes-wrapper" }, labels.map((lbl, idx) => (React.createElement("div", { key: lbl, className: "cron-segment-box" },
                React.createElement("span", { className: "segment-value" }, parts[idx] || '*'),
                React.createElement("span", { className: "segment-label" }, lbl))))),
            React.createElement("div", { className: "hero-actions" },
                React.createElement("input", { type: "text", className: "expression-input", value: expression, onChange: (e) => onExpressionChange(e.target.value), placeholder: "* * * * *" }),
                React.createElement("button", { className: "btn-glow", onClick: () => onCopyExpression(expression) }, "\uD83D\uDCCB Copy Expression"))),
        React.createElement("div", { className: `translation-banner ${isValid ? 'valid' : 'invalid'}` },
            React.createElement("span", { className: "status-dot" }),
            React.createElement("span", { className: "translation-text" }, isValid ? translation : `Syntax Error: ${errorMsg}`))));
}

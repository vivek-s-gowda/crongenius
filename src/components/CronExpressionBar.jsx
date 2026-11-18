// day-05-crongenius/src/components/CronExpressionBar.jsx
export function CronExpressionBar({
  expression,
  translation,
  isValid,
  errorMsg,
  onCopyExpression,
  onExpressionChange
}) {
  const parts = expression.trim().split(/\s+/);
  const labels = ['Minute', 'Hour', 'Day (Month)', 'Month', 'Day (Week)'];

  return (
    <div className="expression-hero card-elevated">
      <div className="hero-top-row">
        <div className="hero-boxes-wrapper">
          {labels.map((lbl, idx) => (
            <div key={lbl} className="cron-segment-box">
              <span className="segment-value">{parts[idx] || '*'}</span>
              <span className="segment-label">{lbl}</span>
            </div>
          ))}
        </div>

        <div className="hero-actions">
          <input
            type="text"
            className="expression-input"
            value={expression}
            onChange={(e) => onExpressionChange(e.target.value)}
            placeholder="* * * * *"
          />
          <button className="btn-glow" onClick={() => onCopyExpression(expression)}>
            📋 Copy Expression
          </button>
        </div>
      </div>

      <div className={`translation-banner ${isValid ? 'valid' : 'invalid'}`}>
        <span className="status-dot"></span>
        <span className="translation-text">
          {isValid ? translation : `Syntax Error: ${errorMsg}`}
        </span>
      </div>
    </div>
  );
}

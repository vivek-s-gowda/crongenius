// day-05-crongenius/src/components/WebhookSimulator.jsx
export function WebhookSimulator({
  logs,
  onTriggerTick,
  onClearLogs,
  webhookUrl,
  onUrlChange
}) {
  return (
    <div className="simulator-card card-elevated">
      <div className="section-title">
        <span>Webhook & Execution Event Simulator</span>
        <div style={{ display: 'flex', gap: '6px' }}>
          <button className="btn-glow" onClick={onTriggerTick}>
            ⚡ Trigger Simulated Tick
          </button>
          <button className="btn-secondary" onClick={onClearLogs}>
            Clear Logs
          </button>
        </div>
      </div>

      <div className="simulator-config-row">
        <span className="control-label">Webhook Endpoint:</span>
        <input
          type="text"
          className="clause-input"
          style={{ flex: 1 }}
          value={webhookUrl}
          onChange={(e) => onUrlChange(e.target.value)}
          placeholder="https://api.yourcloud.com/cron-handler"
        />
      </div>

      <div className="event-log-terminal">
        <div className="terminal-header">
          <span className="dot dot-red"></span>
          <span className="dot dot-yellow"></span>
          <span className="dot dot-green"></span>
          <span className="terminal-title">Live Execution Stream ({logs.length} events)</span>
        </div>
        <div className="terminal-body">
          {logs.length === 0 ? (
            <div className="empty-terminal-hint">
              Waiting for cron execution event. Click "Trigger Simulated Tick" above to test the runner.
            </div>
          ) : (
            logs.map((log, i) => (
              <div key={i} className="log-line animated-fade-in">
                <span className="log-timestamp">[{log.time}]</span>
                <span className={`log-badge status-${log.status}`}>{log.status}</span>
                <span className="log-msg">{log.message}</span>
                <span className="log-latency">{log.latency}ms</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

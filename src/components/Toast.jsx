// day-05-crongenius/src/components/Toast.jsx
export function Toast({ message }) {
  if (!message) return null;
  return (
    <div className="toast show animated-bounce">
      {message}
    </div>
  );
}

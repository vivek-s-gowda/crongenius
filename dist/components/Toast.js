// day-05-crongenius/src/components/Toast.jsx
export function Toast({ message }) {
    if (!message)
        return null;
    return (React.createElement("div", { className: "toast show animated-bounce" }, message));
}

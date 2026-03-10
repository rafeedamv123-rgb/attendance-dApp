import "./Toast.css";

const TYPES = ["success", "error", "info"];

/**
 * @param {object} props
 * @param {"success"|"error"|"info"} [props.type]
 * @param {string} [props.message]
 * @param {boolean} [props.visible]
 */
export default function Toast({ type = "info", message, visible = false }) {
  if (!message || !visible) return null;

  const t = TYPES.includes(type) ? type : "info";

  return (
    <div
      className={`toast toast--${t}`}
      role="alert"
      aria-live="polite"
      data-visible={visible}
    >
      <span className="toast__icon" aria-hidden>
        {t === "success" && "✓"}
        {t === "error" && "✕"}
        {t === "info" && "ℹ"}
      </span>
      <span className="toast__message">{message}</span>
    </div>
  );
}

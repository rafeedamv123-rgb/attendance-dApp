import "./Input.css";

/**
 * @param {object} props
 * @param {string} [props.label]
 * @param {string} [props.placeholder]
 * @param {string} [props.value]
 * @param {(v: string) => void} [props.onChange]
 * @param {string} [props.type]
 * @param {string} [props.id]
 * @param {boolean} [props.disabled]
 * @param {string} [props.error]
 * @param {string} [props.hint]
 */
export default function Input({
  label,
  placeholder,
  value,
  onChange,
  type = "text",
  id,
  disabled = false,
  error,
  hint,
  ...rest
}) {
  const inputId = id || `input-${Math.random().toString(36).slice(2, 9)}`;

  return (
    <div className="input-group">
      {label && (
        <label htmlFor={inputId} className="input-group__label">
          {label}
        </label>
      )}
      <input
        id={inputId}
        type={type}
        className={`input-group__input ${error ? "input-group__input--error" : ""}`}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        disabled={disabled}
        aria-invalid={!!error}
        aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
        {...rest}
      />
      {error && (
        <p id={`${inputId}-error`} className="input-group__error" role="alert">
          {error}
        </p>
      )}
      {hint && !error && (
        <p id={`${inputId}-hint`} className="input-group__hint">
          {hint}
        </p>
      )}
    </div>
  );
}

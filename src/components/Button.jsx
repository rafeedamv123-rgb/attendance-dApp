import "./Button.css";

const VARIANTS = ["primary", "secondary", "ghost", "success", "danger"];
const SIZES = ["sm", "md", "lg"];

/**
 * @param {object} props
 * @param {"primary"|"secondary"|"ghost"|"success"|"danger"} [props.variant]
 * @param {"sm"|"md"|"lg"} [props.size]
 * @param {boolean} [props.loading]
 * @param {boolean} [props.disabled]
 * @param {React.ReactNode} [props.children]
 * @param {string} [props.className]
 */
export default function Button({
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  children,
  className = "",
  ...rest
}) {
  const v = VARIANTS.includes(variant) ? variant : "primary";
  const s = SIZES.includes(size) ? size : "md";

  return (
    <button
      type="button"
      className={`btn btn--${v} btn--${s} ${className}`.trim()}
      disabled={disabled || loading}
      aria-busy={loading}
      {...rest}
    >
      {loading ? (
        <>
          <span className="btn__spinner" aria-hidden />
          <span className="btn__text">{children}</span>
        </>
      ) : (
        children
      )}
    </button>
  );
}

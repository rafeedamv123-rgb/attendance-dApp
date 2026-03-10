import "./Card.css";

/**
 * @param {object} props
 * @param {string} [props.title]
 * @param {string} [props.subtitle]
 * @param {React.ReactNode} [props.children]
 * @param {string} [props.className]
 */
export default function Card({ title, subtitle, children, className = "" }) {
  return (
    <section className={`card ${className}`.trim()} aria-labelledby={title ? "card-title" : undefined}>
      {(title || subtitle) && (
        <header className="card__header">
          {title && (
            <h2 id="card-title" className="card__title">
              {title}
            </h2>
          )}
          {subtitle && <p className="card__subtitle">{subtitle}</p>}
        </header>
      )}
      <div className="card__body">{children}</div>
    </section>
  );
}

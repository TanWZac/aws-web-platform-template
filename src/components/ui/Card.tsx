type CardProps = {
  title: string;
  description?: string;
  children?: React.ReactNode;
};

export function Card({ title, description, children }: CardProps) {
  return (
    <section className="card">
      <div className="cardHeader">
        <h2>{title}</h2>
        {description ? <p>{description}</p> : null}
      </div>
      {children ? <div className="cardBody">{children}</div> : null}
    </section>
  );
}

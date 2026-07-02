type Props = {
  label: string;
  value: string;
  helper: string;
};

export function MetricCard(props: Props) {
  return (
    <div className="metricCard">
      <p>{props.label}</p>
      <strong>{props.value}</strong>
      <span>{props.helper}</span>
    </div>
  );
}

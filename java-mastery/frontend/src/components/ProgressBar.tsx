type Props = {
  value: number;
  max?: number;
  label?: string;
};

export default function ProgressBar({ value, max = 100, label }: Props) {
  const percent = Math.min((value / max) * 100, 100);

  return (
    <div className="w-full">
      {label && <p className="mb-2 text-sm text-slate-300">{label}</p>}
      <div className="h-3 w-full overflow-hidden rounded-full bg-slate-800">
        <div
          className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}

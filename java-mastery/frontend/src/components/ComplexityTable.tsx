import type { ComplexityRow } from '../types';

type Props = {
  rows: ComplexityRow[];
};

export default function ComplexityTable({ rows }: Props) {
  const getColor = (value: string) => {
    const normalized = value.toLowerCase();
    if (normalized.includes('n')) return 'text-green-300';
    if (normalized.includes('log')) return 'text-yellow-300';
    return 'text-blue-300';
  };

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="text-left text-slate-300">Operation</th>
            <th className="text-left text-slate-300">Time</th>
            <th className="text-left text-slate-300">Space</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={`${row.operation}-${index}`} className="border-t border-slate-700">
              <td className="py-2 text-slate-100">{row.operation}</td>
              <td className={`py-2 ${getColor(row.time)}`}>{row.time}</td>
              <td className={`py-2 ${getColor(row.space)}`}>{row.space}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

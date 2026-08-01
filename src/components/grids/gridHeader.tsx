
interface GridHeaderProps {
  columns: string[];
}

export default function GridHeader({ columns }: GridHeaderProps) {
  return (
    <div
      className="
      sticky top-0 z-30
      grid
      grid-cols-[240px_220px_180px_150px_160px_160px_180px]
      bg-gray-100
      border-b
      font-semibold
      text-gray-700
      "
    >
      {columns.map((column) => (
        <div
          key={column}
          className="truncate border-r border-gray-200 px-4 py-3 last:border-r-0"
        >
          {column}
        </div>
      ))}
    </div>
  );
}
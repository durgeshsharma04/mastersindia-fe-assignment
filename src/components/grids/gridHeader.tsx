
interface GridHeaderProps {
  columns: string[];
  selectedRows: Set<string>;
  selectallRows: () => void;
  markAsReconciled: () => void;
  error: string | null;
}

export default function GridHeader({ selectedRows, selectallRows, columns, markAsReconciled, error }: GridHeaderProps) {
    const isAllSelected = selectedRows && selectedRows.size > 0;
  return (
    <>
    <div className="flex items-center justify-between px-4 py-2 border-b">
      <span className="text-gray-700 font-semibold text-sm px-4 py-2">Selected Rows: {selectedRows.size}</span>
      {error && <span className="text-red-500 font-semibold text-sm px-4 py-2">{error}</span>}
      <button disabled={!isAllSelected} onClick={markAsReconciled} className={`${!isAllSelected ? 'bg-gray-500' : 'bg-blue-500 hover:bg-blue-600'} text-white px-4 py-2 rounded`}>
        Mark as Reconciled
      </button>
    </div>
   
    <div
      className="
      sticky top-0 z-30
      grid
      grid-cols-[48px_240px_220px_180px_150px_160px_160px_180px]
      bg-gray-100
      border-b
      font-semibold
      text-gray-700
      "
    >
      <div className="w-12 flex items-center justify-center border-r">
      <input
        type="checkbox"
        checked={isAllSelected}
        onChange={selectallRows}
      />
      </div>
      {columns.map((column) => (
        <div
          key={column}
          className="truncate border-r border-gray-200 px-4 py-3 last:border-r-0"
        >
          {column}
        </div>
      ))}
    </div>
    </>
  );
}
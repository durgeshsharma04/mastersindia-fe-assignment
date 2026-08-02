import GridCell from "./gridCell";
import clsx from "clsx";
import type { GridRowProps } from "../../types/grid";

export default function GridRow({ row, start, activeCell, setActiveCell, rowIndex, editingCell, setEditingCell, saveEdit, selectedRows, handleSelectRow, error }: GridRowProps) {

  const isSelected = selectedRows && selectedRows.has(row.id);

  return (
    <div
      className={clsx(
        `
        absolute
        left-0
        w-full
        grid
        h-12
        items-center
        grid-cols-[48px_240px_220px_180px_150px_160px_160px_180px]
        border-b
        hover:bg-blue-50
        `,
        {
          "bg-green-50": row.status === "matched",
          "bg-yellow-50":
            row.status === "amount_mismatch" ||
            row.status === "gstin_mismatch",
          "bg-red-50": row.status === "missing_in_gstr2b",
        }
      )}
      style={{
        transform: `translateY(${start}px)`,
      }}
    >
      <div className="truncate border-r border-gray-200 px-4 py-3 last:border-r-0">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => handleSelectRow && handleSelectRow(row.id)}
          
        />
      </div>
      <GridCell editingCell={editingCell} id={row.id} field="vendor_name" setEditingCell={setEditingCell} saveEdit={saveEdit} rowIndex={rowIndex} activeCell={activeCell} setActiveCell={setActiveCell} columnIndex={0} error={error}>
        {row.vendor_name}
      </GridCell>

      <GridCell editingCell={editingCell} id={row.id} field="vendor_gstin" setEditingCell={setEditingCell} saveEdit={saveEdit} rowIndex={rowIndex} activeCell={activeCell} setActiveCell={setActiveCell} columnIndex={1} error={error}>
        {row.vendor_gstin}
      </GridCell>

      <GridCell editingCell={editingCell} id={row.id} field="invoice_number" setEditingCell={setEditingCell} saveEdit={saveEdit} rowIndex={rowIndex} activeCell={activeCell} setActiveCell={setActiveCell} columnIndex={2} error={error}>
        {row.invoice_number}
        </GridCell>

      <GridCell editingCell={editingCell} id={row.id} field="invoice_date" setEditingCell={setEditingCell} saveEdit={saveEdit} rowIndex={rowIndex} activeCell={activeCell} setActiveCell={setActiveCell} columnIndex={3} error={error}>
        {row.invoice_date}
      </GridCell>

      <GridCell editingCell={editingCell} id={row.id} field="total_amount" setEditingCell={setEditingCell} saveEdit={saveEdit} rowIndex={rowIndex} activeCell={activeCell} setActiveCell={setActiveCell} columnIndex={4} error={error}>
        ₹{row.total_amount.toLocaleString()}
      </GridCell>

      <GridCell editingCell={editingCell} id={row.id} field="gstr2b_amount" setEditingCell={setEditingCell} saveEdit={saveEdit} rowIndex={rowIndex} activeCell={activeCell} setActiveCell={setActiveCell} columnIndex={5} error={error}>
        {row.gstr2b_amount
          ? `₹${row.gstr2b_amount.toLocaleString()}`
          : "-"}
      </GridCell>

      <GridCell id={row.id} field="status" rowIndex={rowIndex} columnIndex={6} error={error}>
        {row.status}
      </GridCell>
    </div>
  );
}
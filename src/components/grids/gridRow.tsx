import GridCell from "./gridCell";
import clsx from "clsx";
import { Invoice } from "../../types/invoice";

interface Props {
  row: Invoice;
  start: number;
  activeCell: { row: number; col: number } | null;
  setActiveCell: (cell: { row: number; col: number } | null) => void;
  rowIndex: number;
  editingCell: { row: number; col: number } | null;
  setEditingCell: (cell: { row: number; col: number } | null) => void;
  saveEdit: (rowIndex: number, field: string, inputValue: string) => void;
  selectedRows?: Set<string>;
  handleSelectRow?: (rowId: string) => void;
  error: string | null;
}

export default function GridRow({ row, start, activeCell, setActiveCell, rowIndex, editingCell, setEditingCell, saveEdit, selectedRows, handleSelectRow, error }: Props) {

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
      <GridCell editingCell={editingCell} field="vendor_name" setEditingCell={setEditingCell} saveEdit={saveEdit} rowIndex={rowIndex} activeCell={activeCell} setActiveCell={setActiveCell} columnIndex={0} error={error}>
        {row.vendor_name}
      </GridCell>

      <GridCell editingCell={editingCell} field="vendor_gstin" setEditingCell={setEditingCell} saveEdit={saveEdit} rowIndex={rowIndex} activeCell={activeCell} setActiveCell={setActiveCell} columnIndex={1} error={error}>
        {row.vendor_gstin}
      </GridCell>

      <GridCell editingCell={editingCell} field="invoice_number" setEditingCell={setEditingCell} saveEdit={saveEdit} rowIndex={rowIndex} activeCell={activeCell} setActiveCell={setActiveCell} columnIndex={2} error={error}>
        {row.invoice_number}
        </GridCell>

      <GridCell editingCell={editingCell} field="invoice_date" setEditingCell={setEditingCell} saveEdit={saveEdit} rowIndex={rowIndex} activeCell={activeCell} setActiveCell={setActiveCell} columnIndex={3} error={error}>
        {row.invoice_date}
      </GridCell>

      <GridCell editingCell={editingCell} field="total_amount" setEditingCell={setEditingCell} saveEdit={saveEdit} rowIndex={rowIndex} activeCell={activeCell} setActiveCell={setActiveCell} columnIndex={4} error={error}>
        ₹{row.total_amount.toLocaleString()}
      </GridCell>

      <GridCell editingCell={editingCell} field="gstr2b_amount" setEditingCell={setEditingCell} saveEdit={saveEdit} rowIndex={rowIndex} activeCell={activeCell} setActiveCell={setActiveCell} columnIndex={5} error={error}>
        {row.gstr2b_amount
          ? `₹${row.gstr2b_amount.toLocaleString()}`
          : "-"}
      </GridCell>

      <GridCell field="status" rowIndex={rowIndex} columnIndex={6} error={error}>
        {row.status}
      </GridCell>
    </div>
  );
}
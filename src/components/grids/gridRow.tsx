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
  setRows?: React.Dispatch<React.SetStateAction<Invoice[]>>;
}

export default function GridRow({ row, start, activeCell, setActiveCell, rowIndex, editingCell, setEditingCell, setRows }: Props) {
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
        grid-cols-[240px_220px_180px_150px_160px_160px_180px]
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
      <GridCell editingCell={editingCell} field="vendor_name" setEditingCell={setEditingCell} setRows={setRows} rowIndex={rowIndex} activeCell={activeCell} setActiveCell={setActiveCell} columnIndex={1}>{row.vendor_name}</GridCell>

      <GridCell editingCell={editingCell} field="vendor_gstin" setEditingCell={setEditingCell} setRows={setRows} rowIndex={rowIndex} activeCell={activeCell} setActiveCell={setActiveCell} columnIndex={2}>{row.vendor_gstin}</GridCell>

      <GridCell editingCell={editingCell} field="invoice_number" setEditingCell={setEditingCell} setRows={setRows} rowIndex={rowIndex} activeCell={activeCell} setActiveCell={setActiveCell} columnIndex={3}>{row.invoice_number}</GridCell>

      <GridCell editingCell={editingCell} field="invoice_date" setEditingCell={setEditingCell} setRows={setRows} rowIndex={rowIndex} activeCell={activeCell} setActiveCell={setActiveCell} columnIndex={4}>{row.invoice_date}</GridCell>

      <GridCell editingCell={editingCell} field="total_amount" setEditingCell={setEditingCell} setRows={setRows} rowIndex={rowIndex} activeCell={activeCell} setActiveCell={setActiveCell} columnIndex={5}>₹{row.total_amount.toLocaleString()}</GridCell>

      <GridCell editingCell={editingCell} field="gstr2b_amount" setEditingCell={setEditingCell} setRows={setRows} rowIndex={rowIndex} activeCell={activeCell} setActiveCell={setActiveCell} columnIndex={6}>
        {row.gstr2b_amount
          ? `₹${row.gstr2b_amount.toLocaleString()}`
          : "-"}
      </GridCell>

      <GridCell field="status" setEditingCell={setEditingCell} setRows={setRows} rowIndex={rowIndex} activeCell={activeCell} setActiveCell={setActiveCell} columnIndex={7}>
        {row.status}
      </GridCell>
    </div>
  );
}
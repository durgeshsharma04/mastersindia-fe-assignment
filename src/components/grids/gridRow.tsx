import GridCell from "./gridCell";
import clsx from "clsx";
import { Invoice } from "../../types/invoice";

interface Props {
  row: Invoice;
  start: number;
  activeCell: { row: number; col: number } | null;
  setActiveCell: (cell: { row: number; col: number } | null) => void;
  rowIndex: number;
}

export default function GridRow({ row, start, activeCell, setActiveCell, rowIndex }: Props) {
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
      <GridCell rowIndex={rowIndex} activeCell={activeCell} setActiveCell={setActiveCell} columnIndex={1}>{row.vendor_name}</GridCell>

      <GridCell rowIndex={rowIndex} activeCell={activeCell} setActiveCell={setActiveCell} columnIndex={2}>{row.vendor_gstin}</GridCell>

      <GridCell rowIndex={rowIndex} activeCell={activeCell} setActiveCell={setActiveCell} columnIndex={3}>{row.invoice_number}</GridCell>

      <GridCell rowIndex={rowIndex} activeCell={activeCell} setActiveCell={setActiveCell} columnIndex={4}>{row.invoice_date}</GridCell>

      <GridCell rowIndex={rowIndex} activeCell={activeCell} setActiveCell={setActiveCell} columnIndex={5}>₹{row.total_amount.toLocaleString()}</GridCell>

      <GridCell rowIndex={rowIndex} columnIndex={6}  activeCell={activeCell} setActiveCell={setActiveCell}>
        {row.gstr2b_amount
          ? `₹${row.gstr2b_amount.toLocaleString()}`
          : "-"}
      </GridCell>

      <GridCell rowIndex={rowIndex} columnIndex={7}  activeCell={activeCell} setActiveCell={setActiveCell}>
        {row.status}
      </GridCell>
    </div>
  );
}
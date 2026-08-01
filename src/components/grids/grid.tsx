import GridHeader from "./gridHeader";
import GridBody from "./gridBoady";
import { Invoice } from "../../types/invoice";
import { useKeyboardNavigation } from "../../hooks/keyboardNavigationHook";

interface GridProps {
  rows: Invoice[];
}

const columns = [
  "Vendor",
  "GSTIN",
  "Invoice",
  "Date",
  "Amount",
  "GSTR-2B",
  "Status",
];

export default function Grid({ rows }: GridProps) {
  const { activeCell, setActiveCell, handleKeyDown } = useKeyboardNavigation(rows.length, columns.length);

  const handleSetActiveCell = (cell: { row: number; col: number } | null) => {
    if (cell) {
      setActiveCell(cell);
    }
  };

  return (
    <div tabIndex={0} onKeyDown={handleKeyDown} className="flex h-screen w-full flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow outline-none">
      <GridHeader columns={columns} />
      <GridBody activeCell={activeCell} setActiveCell={handleSetActiveCell} rows={rows} />
    </div>
  );
}
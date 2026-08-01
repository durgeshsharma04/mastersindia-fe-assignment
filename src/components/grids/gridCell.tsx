import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  columnIndex: number;
  activeCell: { row: number; col: number } | null;
  setActiveCell: (cell: { row: number; col: number } | null) => void;
  rowIndex: number;
}

export default function GridCell({ children, activeCell, setActiveCell, columnIndex, rowIndex }: Props) {
    const isActive =
  activeCell?.row === rowIndex &&
  activeCell?.col === columnIndex;
  return (
    <div
     onClick={() =>
    setActiveCell({
      row: rowIndex,
      col: columnIndex,
    })
  }
      className={
     `truncate
      border-r
      border-gray-200
      px-4
      py-3
      last:border-r-0
      ${isActive ? "bg-blue-100 ring-2 ring-blue-500" : ""}`}
    >
      {children}
    </div>
  );
}
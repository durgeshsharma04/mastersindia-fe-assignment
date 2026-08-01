import { useRef, useEffect } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import GridRow from "./gridRow";
import { Invoice } from "../../types/invoice";

interface Props {
  rows: Invoice[];
  activeCell: { row: number; col: number } | null;
  setActiveCell: (cell: { row: number; col: number } | null) => void;
  saveEdit: (rowIndex: number, field: string, inputValue: string) => void;
  editingCell: { row: number; col: number } | null;
  setEditingCell: (cell: { row: number; col: number } | null) => void;
  handleSelectRow?: (rowId: string) => void;
  selectedRows?: Set<string>;
  error : string | null;
}

export default function GridBody({ rows, activeCell, setActiveCell, saveEdit, editingCell, setEditingCell, handleSelectRow, selectedRows, error }: Props) {
  const parentRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 48,
    overscan: 8,
  });

  useEffect(() => {
    if (activeCell?.row != null) {
      rowVirtualizer.scrollToIndex(activeCell.row, {
        align: "auto",
      });
    }
  }, [activeCell, rowVirtualizer]);

  return (
    <div
      ref={parentRef}
      className="flex-1 overflow-auto"
    >
      <div
        className="relative"
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualRow) => (
          <GridRow
            key={rows[virtualRow.index].id}
            row={rows[virtualRow.index]}
            start={virtualRow.start}
            activeCell={activeCell}
            setActiveCell={setActiveCell}
            rowIndex={virtualRow.index}
            editingCell={editingCell}
            setEditingCell={setEditingCell}
            saveEdit={saveEdit}
            selectedRows={selectedRows}
            handleSelectRow={handleSelectRow}
            error={error}
          />
        ))}
      </div>
    </div>
  );
}
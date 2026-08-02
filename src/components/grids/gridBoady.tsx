import { useRef, useEffect } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import GridRow from "./gridRow";
import type { GridBodyProps } from "../../types/grid";

export default function GridBody({ rows, activeCell, setActiveCell, saveEdit, editingCell, setEditingCell, handleSelectRow, selectedRows, error }: GridBodyProps) {
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
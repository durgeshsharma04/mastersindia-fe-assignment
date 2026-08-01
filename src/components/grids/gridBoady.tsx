import { useRef, useEffect} from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import GridRow from "./gridRow";
import { Invoice } from "../../types/invoice";

interface Props {
  rows: Invoice[];
  activeCell: { row: number; col: number } | null;
  setActiveCell: (cell: { row: number; col: number } | null) => void;
}

export default function GridBody({ rows, activeCell, setActiveCell }: Props) {
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
          />
        ))}
      </div>
    </div>
  );
}
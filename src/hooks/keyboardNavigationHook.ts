
import { useCallback, useState } from "react";

interface ActiveCell {
  row: number;
  col: number;
}

export function useKeyboardNavigation(
  totalRows: number,
  totalColumns: number
) {
  const [activeCell, setActiveCell] = useState<ActiveCell>({
    row: 0,
    col: 0,
  });

  const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLDivElement>) => {
    console.log("handleKeyDown called");
      switch (event.key) {
        case "ArrowDown":
          event.preventDefault();

          setActiveCell((prev) => ({
            ...prev,
            row: Math.min(prev.row + 1, totalRows - 1),
          }));
          break;

        case "ArrowUp":
          event.preventDefault();

          setActiveCell((prev) => ({
            ...prev,
            row: Math.max(prev.row - 1, 0),
          }));
          break;

        case "ArrowLeft":
          event.preventDefault();

          setActiveCell((prev) => ({
            ...prev,
            col: Math.max(prev.col - 1, 0),
          }));
          break;

        case "ArrowRight":
          event.preventDefault();

          setActiveCell((prev) => ({
            ...prev,
            col: Math.min(prev.col + 1, totalColumns - 1),
          }));
          break;

        default:
          break;
      }
    },
    [totalRows, totalColumns]
  );

  return {
    activeCell,
    setActiveCell,
    handleKeyDown,
  };
}
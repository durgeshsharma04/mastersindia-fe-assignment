import { useState, useEffect } from "react";
import type { GridCellProps } from "../../types/grid";

export default function GridCell({ children, activeCell, setActiveCell, columnIndex, rowIndex, field, editingCell, setEditingCell, saveEdit, error, id }: GridCellProps) {
  const [inputValue, setInputValue] = useState("");
  const isActive =
    activeCell?.row === rowIndex &&
    activeCell?.col === columnIndex;

  const isEditing =
    editingCell?.row === rowIndex &&
    editingCell?.col === columnIndex;

  useEffect(() => {
    if (isEditing) {
      setInputValue(children?.toString() || "");
    }
  }, [isEditing, children]);

  const handleDoubleClick = () => {
    if (setEditingCell && !error) {
      setEditingCell({
        row: rowIndex,
        col: columnIndex,
      });
      // setInputValue(children?.toString() || "");
    }
  }

  const handleOnClick = () => {
    setActiveCell && setActiveCell({
      row: rowIndex,
      col: columnIndex,
    });
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
       e.stopPropagation();
      saveEdit && saveEdit(id, field, inputValue);
    }

    if (e.key === "Escape") {
      if (setEditingCell && !error) {
        setEditingCell(null);
      }
    }
  }

  if (isEditing) {
    return (
      <input
        autoFocus
        value={inputValue}
        onChange={handleChange}
        onBlur={saveEdit && (() => saveEdit(id, field, inputValue))}
        onKeyDown={handleKeyDown}
      />
    );
  }

  return (
    <div
      onClick={handleOnClick}
      onDoubleClick={handleDoubleClick}
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
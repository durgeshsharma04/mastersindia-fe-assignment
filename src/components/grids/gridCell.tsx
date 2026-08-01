import { ReactNode, useState } from "react";

interface Props {
  children: ReactNode;
  columnIndex: number;
  activeCell?: { row: number; col: number } | null;
  setActiveCell?: (cell: { row: number; col: number } | null) => void;
  rowIndex: number;
  field: string;
  editingCell?: { row: number; col: number } | null;
  setEditingCell?: (cell: { row: number; col: number } | null) => void;
  saveEdit?: (rowIndex: number, field: string, inputValue: string) => void;
  error?: string | null;
}

export default function GridCell({ children, activeCell, setActiveCell, columnIndex, rowIndex, field, editingCell, setEditingCell, saveEdit, error }: Props) {
  const [inputValue, setInputValue] = useState("");
  const isActive =
    activeCell?.row === rowIndex &&
    activeCell?.col === columnIndex;

  const isEditing =
    editingCell?.row === rowIndex &&
    editingCell?.col === columnIndex;

  const handleDoubleClick = () => {
    if (setEditingCell && !error) {
      setEditingCell({
        row: rowIndex,
        col: columnIndex,
      });
      setInputValue(children?.toString() || "");
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
    console.log("Key pressed:", e.key);
    if (e.key === "Enter") {
      saveEdit && saveEdit(rowIndex, field, inputValue);
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
        onBlur={saveEdit && (() => saveEdit(rowIndex, field, inputValue))}
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
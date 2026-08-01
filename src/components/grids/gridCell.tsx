import { ReactNode, useState } from "react";
import { Invoice } from "../../types/invoice";

interface Props {
  children: ReactNode;
  columnIndex: number;
  activeCell: { row: number; col: number } | null;
  setActiveCell: (cell: { row: number; col: number } | null) => void;
  rowIndex: number;
  field: string;
  editingCell?: { row: number; col: number } | null;
  setEditingCell?: (cell: { row: number; col: number } | null) => void;
  setRows?: React.Dispatch<React.SetStateAction<Invoice[]>>;
}

export default function GridCell({ children, activeCell, setActiveCell, columnIndex, rowIndex, field, editingCell, setEditingCell, setRows }: Props) {
  const [inputValue, setInputValue] = useState("");
  const isActive =
    activeCell?.row === rowIndex &&
    activeCell?.col === columnIndex;

  const isEditing =
    editingCell?.row === rowIndex &&
    editingCell?.col === columnIndex;

  const handleDoubleClick = () => {
    if (setEditingCell) {
      setEditingCell({
        row: rowIndex,
        col: columnIndex,
      });
      setInputValue(children?.toString() || "");
    }
  }

  const saveEdit = () => {
    if (setRows) {
      setRows((prevRows) =>
        prevRows.map((row, index) => {
          if (index !== rowIndex) return row;

          return {
            ...row,
            [field]: inputValue,
            status: "unreconciled",
          };
        })
      );
    }

    if (setEditingCell) {
      setEditingCell(null);
    }
  };

  const handleOnClick = () => {
    setActiveCell({
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
      saveEdit();
    }

     if (e.key === "Escape") {
      if (setEditingCell) {
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
        onBlur={saveEdit}
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
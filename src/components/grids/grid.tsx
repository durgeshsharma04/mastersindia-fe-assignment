import GridHeader from "./gridHeader";
import GridBody from "./gridBoady";
import { Invoice } from "../../types/invoice";
import type { CellPosition } from "../../types/grid";
import { useKeyboardNavigation } from "../../hooks/keyboardNavigationHook";
import { useState, useRef, useEffect } from "react";

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
  const [rowsData, setRowsData] = useState<Invoice[]>(rows);
  const [editingCell, setEditingCell] = useState<CellPosition | null>(null);
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [error, setError] = useState<string | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const { activeCell, setActiveCell, handleKeyDown } = useKeyboardNavigation(rows.length, columns.length-1, setEditingCell);
  
  useEffect(() => {
    if (gridRef.current) {
      gridRef.current.focus();
    }
  }, []);

  const isAllSelected = rows.length > 0 && (selectedRows && selectedRows.size === rows.length);
  const GSTIN_REGEX =
  /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}Z[A-Z0-9]{1}$/;

const isValidGSTIN = (gstin: string)=>{
    return GSTIN_REGEX.test(gstin.trim().toUpperCase());
}

  const saveEdit = (id: string, field: string, inputValue: string) => {
    if (field === "vendor_gstin" && !isValidGSTIN(inputValue)) {
      setError("Invalid GSTIN format. Please enter a valid GSTIN.");
      return;
    }else{
      setError(null);
    }
      setRowsData((prevRows) =>
        prevRows.map((row) => {
          if (row.id !== id) return row;

          return {
            ...row,
            [field]: inputValue,
            status: "unreconciled",
          };
        })
      );

    if (setEditingCell) {
      setEditingCell(null);
      gridRef.current?.focus();
    }
  };

  const handleSetActiveCell = (cell: CellPosition | null) => {
    if (cell) {
      setActiveCell(cell);
    }
  };

  const selectallRows = () => {
    if (isAllSelected) {
      setSelectedRows(new Set());
      return;
    }

    setSelectedRows(new Set(rows.map((row) => row.id)));
  }

  const handleSelectRow = (rowId: string) => {
    const newSelectedRows = new Set(selectedRows);
    if (newSelectedRows.has(rowId)) {
      newSelectedRows.delete(rowId);
    } else {
      newSelectedRows.add(rowId);
    }
    setSelectedRows(newSelectedRows);
  }

  const markAsReconciled = () => {
    console.log("Marking as reconciled for selected rows:");
    setRowsData((prevRows) =>
      prevRows.map((row) => {
        if (selectedRows.has(row.id)) {
          return {
            ...row,
            status: "matched",
          };
        }
        return row;
      })
    );
    setSelectedRows(new Set());
  }

  return (
    <div tabIndex={0} ref={gridRef} onKeyDown={handleKeyDown} className="flex h-screen w-full flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow outline-none">
      <GridHeader error={error} selectedRows={selectedRows} selectallRows={selectallRows} columns={columns} markAsReconciled={markAsReconciled}/>
      <GridBody error={error} selectedRows={selectedRows} handleSelectRow={handleSelectRow} activeCell={activeCell} setActiveCell={handleSetActiveCell} rows={rowsData} saveEdit={saveEdit} editingCell={editingCell} setEditingCell={setEditingCell} />
    </div>
  );
}
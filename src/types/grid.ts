import type { ReactNode } from "react";
import type { Invoice } from "./invoice";

export interface CellPosition {
  row: number;
  col: number;
}

export interface GridCellInteractionProps {
  activeCell: CellPosition | null;
  setActiveCell: (cell: CellPosition | null) => void;
  editingCell: CellPosition | null;
  setEditingCell: (cell: CellPosition | null) => void;
  saveEdit: (id: string, field: string, inputValue: string) => void;
  error: string | null;
}

export interface GridRowSelectionProps {
  selectedRows?: Set<string>;
  handleSelectRow?: (rowId: string) => void;
}

export interface GridBodyProps extends GridCellInteractionProps, GridRowSelectionProps {
  rows: Invoice[];
}

export interface GridRowProps extends GridCellInteractionProps, GridRowSelectionProps {
  row: Invoice;
  start: number;
  rowIndex: number;
}

export interface GridCellProps {
  children: ReactNode;
  columnIndex: number;
  activeCell?: CellPosition | null;
  setActiveCell?: (cell: CellPosition | null) => void;
  rowIndex: number;
  field: string;
  editingCell?: CellPosition | null;
  setEditingCell?: (cell: CellPosition | null) => void;
  saveEdit?: (id: string, field: string, inputValue: string) => void;
  error?: string | null;
  id: string;
}

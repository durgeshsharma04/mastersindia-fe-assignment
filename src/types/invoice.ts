export interface Invoice {
  id: string;
  vendor_name: string;
  vendor_gstin: string;
  invoice_number: string;
  invoice_date: string;
  igst: number;
  cgst: number;
  sgst: number;
  total_amount: number;
  gstr2b_amount: number | null;
  taxable_amount: number | null;
  status:
    | "matched"
    | "amount_mismatch"
    | "gstin_mismatch"
    | "missing_in_gstr2b"
    | "unreconciled";
}

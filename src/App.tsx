import Grid from './components/grids/grid';
import invoiceData from './unique_invoice_records';

export default function App() {

  return <>
  <div className="h-screen w-full overflow-x-auto bg-gray-50">
      <div className="min-w-[1290px]">
        <Grid rows={invoiceData} />
      </div>
    </div>
  </>
}
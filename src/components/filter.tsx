
import { useState } from "react";


interface FilterProps {
    selectedStatus: Set<string>;
    setSelectedFilter: React.Dispatch<React.SetStateAction<Set<string>>>;
    options: string[];
}
export default function Filter({ selectedStatus, setSelectedFilter, options }: FilterProps) {

    const [open, setOpen] = useState(false);

    return (
        <div className="relative w-fit">
            <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2 rounded-md border bg-white px-4 py-2 shadow-sm hover:bg-gray-50"
            >
                Filter Selected: 

                    <span className="rounded bg-blue-400 w-6 px-2 py-0.5 text-sm text-white">
                        {selectedStatus.size > 0 ? selectedStatus.size : 0}
                    </span>
            </button>
            {open && (
                <>
                <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
                <div className=" absolute mt-2 w-72 rounded-lg border bg-white shadow-lg z-50">
                    {options.map((status) => (
                        <label
                            key={status}
                            className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 cursor-pointer"
                        >
                        <div className="flex items-center gap-3">

                            <input
                                type="checkbox"
                                checked={selectedStatus.has(status)}
                                onChange={() => setSelectedFilter((prev) => {
                                    const updated = new Set(prev);
                                    if (updated.has(status)) {
                                        updated.delete(status);
                                    } else {
                                        updated.add(status);
                                    }
                                    return updated;
                                })}
                            />

                            <span>{status}</span>

                        </div>
                    </label>
                ))}
            </div>
            </>
            )}
        </div>
    );
}
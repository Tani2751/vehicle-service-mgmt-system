import { createColumnHelper } from "@tanstack/react-table";
import { Ellipsis } from 'lucide-react';

const columnHelper = createColumnHelper();


export const InventoryColumns = [
    columnHelper.accessor("partId", {
        header: "Part ID"
    }),
    columnHelper.accessor("partName", {
        header: "Part Name"
    }),
    columnHelper.accessor("category", {
        header: "Category"
    }),
    columnHelper.accessor("availableStock", {
        header: "Available Stock"
    }),
    columnHelper.accessor("threshold", {
        header: "Threshold"
    }),
    columnHelper.accessor("status", {
        header: "Status",
        cell: info => {
            const status = info.getValue();
            const color = 
                status === "Out of Stock" 
                    ? "bg-red-100 text-red-700"
                    : status == "Low Stock"
                    ? "bg-yellow-100 text-yellow-700"
                    : status === "Critical"
                    ? "bg-orange-100 text-orange-700" : ""

            return (
                <span className={`rounded-full px-2 py-1 text-sm ${color}`}>
                    {status}
                </span>
            )
        }
    }),
    columnHelper.display({
        id: "actions",
        header: "Action",
        cell: ({ row }) => (
        <div className="flex items-center justify-center">
            <Ellipsis />
        </div>
        ),
  }),
]
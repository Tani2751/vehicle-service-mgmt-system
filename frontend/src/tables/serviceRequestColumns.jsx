import { createColumnHelper } from "@tanstack/react-table";
import { Ellipsis } from 'lucide-react';

const columnHelper = createColumnHelper();

export const serviceRequestColumns = [
  columnHelper.accessor("serviceId", {
    header: "Service ID",
  }),
  columnHelper.accessor("customer", {
    header: "Customer",
  }),
  columnHelper.accessor("vehicle", {
    header: "Vehicle",
  }),

  columnHelper.accessor("serviceType", {
    header: "Service Type",
  }),

  columnHelper.accessor("status", {
    header: "Status",
    cell: info => {
    const status = info.getValue();

    const color =
      status === "Completed"
        ? "bg-green-100 text-green-700"
        : status === "In Service"
        ? "bg-blue-100 text-blue-700"
        : status === "Checked In"
        ? "bg-yellow-100 text-yellow-700"
        : status === "Inspection" 
        ? "bg-orange-100 text-yellow-700" 
        : status === "Waiting for Parts" 
        ? "bg-red-100 text-yellow-700" : ""
        return (
            <span className={`rounded-full px-2 py-1 text-sm ${color}`}>
                {status}
            </span>
        );
        },
    }),
  columnHelper.accessor("mechanic", {
    header: "Mechanic",
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
];

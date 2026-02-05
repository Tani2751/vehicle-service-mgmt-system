import { createColumnHelper } from "@tanstack/react-table";
import { Ellipsis } from 'lucide-react';

const columnHelper = createColumnHelper();


export const appointmentColumns = [
    columnHelper.accessor("appointmentId", {
        header: "Appointment ID"
    }),
    columnHelper.accessor("customer", {
        header: "Customer"
    }),
    columnHelper.accessor("phone", {
        header: "Phone"
    }),
    columnHelper.accessor("vehicleNumber", {
        header: "Vehicle No."
    }),
    columnHelper.accessor("serviceType", {
        header: "service Type"
    }),
    columnHelper.accessor("appointmentDate", {
        header: "Appointment Date"
    }),
    columnHelper.accessor("timeSlot", {
        header: "TimeSlot"
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
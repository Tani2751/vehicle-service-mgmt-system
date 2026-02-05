import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { Search } from 'lucide-react'
import { useSelector } from "react-redux";

export default function DataTable({ data, columns }) {

  const [globalFilter, setGlobalFilter] = useState("");
  const [columnFilters, setColumnFilters] = useState([]);
  const {data:userData, status, error} = useSelector((state) => state?.user);
  const userInfo = userData?.data?.userData;
  
  const table = useReactTable({
    data,
    columns,
    state: {globalFilter, columnFilters },
    onGlobalFilterChange: setGlobalFilter,  
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="space-y-4">

      <div className="flex gap-4 mb-8 relative">
        {/* 🔍 Global Search */}
        <input
          type="text"
          placeholder="Search service requests..."
          value={globalFilter}
          onChange={e => setGlobalFilter(e.target.value)}
          className="w-full rounded border  font-sans
            pl-12 px-3 py-2 text-regularNormal
            focus:border-orange-400
            focus:outline-none
            focus:shadow-lg
            focus:shadow-orange-300"
        />
          
        
        <Search className="absolute top-2.5 left-4 size-5" />

        { userInfo === "super_admin" ? 
            <select
          className="w-48 rounded border font-medium text-regularNormal "
          value={table.getColumn("status")?.getFilterValue() ?? ""}
          onChange={e =>
            table.getColumn("status")?.setFilterValue(e.target.value || undefined)
          }
        >
          <option className="font-sans text-center text-[15px]" value="">All Status</option>
          <option className="font-sans text-center text-[15px]" value="Checked In">Checked In</option>
          <option className="font-sans text-center text-[15px]" value="Inspection">Inspection</option>
          <option className="font-sans text-center text-[15px]" value="Waiting for Parts">Waiting for Parts</option>
          <option className="font-sans text-center text-[15px]" value="In Service">In Service</option>
          <option className="font-sans text-center text-[15px]" value="Completed">Completed</option>
            </select> : ""
        }
        
        { userInfo === "super_admin" ?
            <select
              className="w-48 rounded border  font-medium text-regularNormal"
              value={table.getColumn("serviceType")?.getFilterValue() ?? ""}
              onChange={e =>
                table.getColumn("serviceType")?.setFilterValue(e.target.value || undefined)
              }
            > 
              <option className="font-sans text-center text-[15px]" value="">All Service</option>
              <option className="font-sans text-center text-[15px]" value="Regular">Regular</option>
              <option className="font-sans text-center text-[15px]"  value="Repair">Repair</option>
              <option className="font-sans text-center text-[15px]" value="Add-ons">Add-ons</option>          
            </select> : ""
        }

        <select
          className="w-48 rounded border   font-medium text-regularNormal"
          value={table.getColumn("serviceType")?.getFilterValue() ?? ""}
          onChange={e =>
            table.getColumn("serviceType")?.setFilterValue(e.target.value || undefined)
          }
        > 
          <option className="font-sans text-center text-[15px]" value="">All Roles</option>
          <option className="font-sans text-center text-[15px]" value="Regular">Admin</option>
          <option className="font-sans text-center text-[15px]"  value="Repair">Service Advisor</option>
          <option className="font-sans text-center text-[15px]" value="Add-ons">Inspectionist</option>
          <option className="font-sans text-center text-[15px]" value="Add-ons">Mechanic</option>
          <option className="font-sans text-center text-[15px]" value="Add-ons">Customer</option>          
        </select>

        <select
          className="w-48 rounded border font-medium text-regularNormal"
          value={table.getColumn("serviceType")?.getFilterValue() ?? ""}
          onChange={e =>
            table.getColumn("serviceType")?.setFilterValue(e.target.value || undefined)
          }
        > 
          <option className="font-sans text-center text-[15px]" value="">Status </option>
          <option className="font-sans text-center text-[15px]" value="Regular">Active </option>
          <option className="font-sans text-center text-[15px]"  value="Repair">In Active </option>          
        </select>

      </div>

      <div className="overflow-x-auto overflow-y-hidden rounded-lg">
        <table className="min-w-full">
          <thead className="bg-orange-400/70">
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th key={header.id} className="px-4 py-3 text-center text-sm lg:text-lg items-center ">
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody>
            {table.getRowModel().rows.map(row => (
              <tr key={row.id} className=" bg-gray-300/20  hover:bg-gray-50">
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className="px-4 py-4  text-center text-sm lg:text-regularNormal items-center">
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext()
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

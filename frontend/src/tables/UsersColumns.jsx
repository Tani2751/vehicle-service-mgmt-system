import { createColumnHelper } from "@tanstack/react-table";
import { Ellipsis } from 'lucide-react';
import Dropdown from "../components/Dropdown";
import { actionItems } from "../utilities";

const columnHelper = createColumnHelper();

export const SuperAdmin_UsersColumns = [
    columnHelper.accessor("name", {
        header: "Name"
    }),
    columnHelper.accessor("email", {
        header: "Email"
    }),
    columnHelper.accessor("role", {
        header: "Role"
    }),
    columnHelper.accessor("status ", {
        header: "Status "
    }),
    columnHelper.accessor("garage ", {
        header: "Garage "
    }),
    columnHelper.display({
        id:"actions",
        header: "Action",
        cell: ({row}) => (
            <div className="flex items-center justify-center">
                <Dropdown 
                    trigger={<Ellipsis  />}
                    items={actionItems}
                    position="bottom"
                    onSelect={(item) => {
                        
                    }}
                />
                
            </div> 
        )
    })
]
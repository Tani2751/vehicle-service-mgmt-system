import Area_Chart from "../../components/Charts/Area_Chart";

import Pie_Charts from "../../components/Charts/PieCharts";
import { DashBoard_Widget } from "../../components/AdminDashboardComp/DashBoard_widget";
import { Users, SquareUserRound, UserStar } from 'lucide-react';
import DataTable from "../../components/DataTable";
import { appointments, inventories, serviceRequests, serviceTypeData } from "../../utilities";
import { useQuery } from "@tanstack/react-query"
import { useAuth } from "../../Hooks/useAuth";
import { SuperAdmin_UsersColumns } from "../../tables/UsersColumns";
import { NavLink } from "react-router-dom";


export function DashboardUsers() {
    const {accessToken, user} = useAuth();
    const userId = user?.userId;

    console.log( 'user',  user);

    const {data, isLoading, error} = useQuery({
        queryKey: ["users_dashboard", accessToken, userId],
        enabled: !!accessToken && !!userId,
        queryFn: async () => {
            try {
                const res  = await fetch(`http://localhost:3000/api/v1/SupAdminDashboard/userSection/${userId}`, {
                credentials: "include",
                headers: {
                        Authorization: `Bearer ${accessToken}`
                    },
                })
                 const resData = await res.json();

                if (!res.ok) throw new Error("Failed to fetch dashboard data"); 
                if (resData.success) {
                    return resData.data.users
                }                          
            } catch (error) {
                console.log(error);
                console.log(resData.message);          
            }
        }
    }); 

  
    
if (!isLoading) {

    console.log(isLoading, data);
}
    
    

return (
    <main className=" w-full relative">
            {/* widgets*/}
            <div className="flex items-center justify-center p-2  md:p-8">
                <section className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-8 p-4">                
                    

                    <div className="bg-gray-100 rounded-2xl h-55 shadow-xl">
                        <DashBoard_Widget
                            title={"Total Users"} 
                            value={"6,000"}
                            icon={<Users  className="lg:size-16 md:size-12 text-orange-400 " />}
                            variant={"category"}
                            today={'17'}
                        />
                    </div>


                    <div className="bg-gray-100 rounded-2xl h-55 shadow-xl">
                        <DashBoard_Widget
                            title={"Service Staff"} 
                            value={"46"}
                            icon={<SquareUserRound   className="lg:size-16 md:size-12 text-orange-400 " />}
                            variant={"category"}
                            today={'17'}
                        />
                    </div>

                    <div className="bg-gray-100 rounded-2xl h-55 shadow-xl">
                        <DashBoard_Widget
                            title={"Customers"} 
                            value={"5043"}
                            icon={<Users  className="lg:size-16 md:size-12 text-orange-400 " />}
                            variant={"category"}
                            today={'17'}
                        />
                    </div>  

                    <div className="bg-gray-100 rounded-2xl h-55 shadow-xl">
                        <DashBoard_Widget 
                            title={"Total Subscribed Users"} 
                            value={"1,120"}
                            icon={<UserStar  className="lg:size-16 md:size-12 text-orange-400 " />}
                            variant={"trend"}
                            trend= {{ value: 12.5, direction: "up" }}
                            />
                    </div>                                           
                </section>
            </div>

            {/* charts*/}

            <div className="grid grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 p-2 md:p-14 gap-8">
                <div>
                    <h4 className="mb-4 ml-14 text-h5 lg:text-4xl  font-semibold">Users Roles Distribution</h4>
                    <div className="bg-gray-300/20 rounded-2xl p-8 shadow-xl">
                        <div className="flex items-center justify-center m-0">
                            <Pie_Charts data={serviceTypeData} />
                        </div>                        
                    </div>                    
                </div>

                <div>
                    <h4 className="mb-4 ml-14 text-h5 lg:text-4xl  font-semibold">User Growth</h4>
                    <div className="bg-gray-300/20 rounded-2xl p-8 shadow-xl">
                        <div className="flex items-center justify-center m-0">
                            <Area_Chart />
                        </div>                        
                    </div>                    
                </div>
            </div>


            {/* tables*/}

            <div className="p-2 mb-16 md:p-14 md:mb-6 relative ">
                <h4 className="mb-6 ml-6 text-h6 lg:text-4xl font-semibold">Users Table</h4>
                <DataTable data={serviceRequests} columns={SuperAdmin_UsersColumns} className='overflow-hidden' />
                <NavLink to="/superAdminDashboard/createUser">
                    <button                    
                        className={`absolute right-6 -bottom-16 text-black md:right-11 md:-bottom-3 font-semibold xl:mt-10 mt-8 px-3 py-1.5 xl:px-5 xl:py-2 rounded-[12px] text-mediumNormal xl:text-lg  hover:scale-110 cursor-pointer duration-300 transition-all mx-2 bg-orange-400/60`}>
                        + Add User
                    </button>
                </NavLink>
            </div>            
        </main>
)
}
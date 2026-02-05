import Area_Chart from "../../components/Charts/Area_Chart";
import Bar_Chart from "../../components/Charts/Bar_Chart";
import Line_Chart from "../../components/Charts/Line_Chart";
import Pie_Charts from "../../components/Charts/PieCharts";
import { DashBoard_Widget } from "../../components/AdminDashboardComp/DashBoard_widget";
import { Motorbike, Users, Server, IndianRupee, CalendarIcon, PackageIcon } from 'lucide-react';
import DataTable from "../../components/DataTable";
import { serviceRequestColumns } from "../../tables/serviceRequestColumns";
import { appointments, inventories, serviceRequests, serviceTypeData } from "../../utilities";
import { appointmentColumns } from "../../tables/AppointmentColumns";
import { InventoryColumns } from "../../tables/InventoryColumns";



export function DashboardHomePage() {
    return (
        <main className=" w-full ">
            {/* widgets*/}
            <div className="flex items-center justify-center p-2  md:p-8">
                <section className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8 p-4">                
                    <div className="bg-gray-100 rounded-2xl h-55 shadow-xl">
                        <DashBoard_Widget 
                            title={"Total Vehicles"} 
                            value={"1,120"}
                            icon={<Motorbike className="lg:size-16 md:size-12 text-orange-400 " />}
                            variant={"trend"}
                            trend= {{ value: 12.5, direction: "up" }}
                            />
                    </div>

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
                            title={"Active Services"} 
                            value={"128"}
                            icon={<Server   className="lg:size-16 md:size-12 text-orange-400 " />}
                            variant={"StatusKPI"}
                            status={"normal"}
                        />
                    </div>

                    <div className="bg-gray-100 rounded-2xl h-55 shadow-xl">
                        <DashBoard_Widget 
                            title={`Today’s earnings`} 
                            value={"34,392"}
                            icon={<IndianRupee  className="lg:size-16 md:size-12 text-orange-400 " />}
                            variant={"micro-trend"}
                        />
                    </div>

                    <div className="bg-gray-100 rounded-2xl h-55 shadow-xl">
                        <DashBoard_Widget
                            title={`Today's Appointments`} 
                            value={"30"}
                            icon={<CalendarIcon   className="lg:size-16 md:size-12 text-orange-400 " />}
                            variant={"progress"}
                            progress={{ current: 18, total: 30 }}
                        />
                    </div>

                    <div className="bg-gray-100 rounded-2xl h-55 shadow-xl">
                        <DashBoard_Widget
                            title={`Low Stock Items`} 
                            value={"6"}
                            icon={<PackageIcon  className="lg:size-16 md:size-12 text-orange-400 " />}
                            variant={"alert"}
                        />
                    </div>                                                
                </section>
            </div>

            {/* charts*/}

            <div className="grid grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 p-2 md:p-14 gap-8">
                <div>
                    <h4 className="mb-4 ml-14 text-h5 lg:text-4xl  font-semibold">Services Over Time</h4>
                    <div className="bg-gray-300/20 rounded-2xl p-8 shadow-xl">
                        <div className="flex items-center justify-center m-0">
                            <Line_Chart />
                        </div>                        
                    </div>                    
                </div>

                <div>
                    <h4 className="mb-4 ml-14 text-h5 lg:text-4xl  font-semibold">Revenue Overview</h4>
                    <div className="bg-gray-300/20 rounded-2xl p-8 shadow-xl ">
                        <div className="flex items-center justify-center m-0">
                            <Bar_Chart />
                        </div>                        
                    </div>                    
                </div>

                <div>
                    <h4 className="mb-4 ml-14 text-h5 lg:text-4xl  font-semibold">Service Type Distribution</h4>
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

            <div className="p-2 md:p-14">
                <h4 className="mb-6 ml-6 text-h6 lg:text-4xl font-semibold">Recent Service Requests</h4>
                <DataTable data={serviceRequests} columns={serviceRequestColumns} />
            </div>

            <div className="p-2 md:p-14">
                <h4 className="mb-6 ml-6 font-semibold">Upcoming Appointments</h4>
                <DataTable data={appointments} columns={appointmentColumns} />
            </div>

            <div className="p-2 md:p-14">
                <h4 className="mb-6 ml-6 font-semibold">Low Inventory Table</h4>
                <DataTable data={inventories} columns={InventoryColumns} />
            </div>

            
        </main>
    )
}
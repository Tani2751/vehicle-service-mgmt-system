import TinyAreaChart from "../Charts/TinyAreaChart";






const STATUS_MAP = {
  normal: {
    color: "green",
    label: "Normal",
    ring: "bg-green-100 text-green-600",
    dot: "bg-green-500",
  },
  warning: {
    color: "yellow",
    label: "Nearing capacity",
    ring: "bg-yellow-100 text-yellow-600",
    dot: "bg-yellow-500",
  },
  critical: {
    color: "red",
    label: "Overloaded",
    ring: "bg-red-100 text-red-600",
    dot: "bg-red-500",
  },
};


const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];



export function DashBoard_Widget({
    icon,
    title,
    value,
    variant="simple",
    trend,
    progress,
    today,
    status

}) {


    const s = STATUS_MAP[status];

    return (
        <div className={`h-full bg-gray-300/50 rounded-2xl p-6 `}>
           <div className="flex items-center justify-between">
                <div>
                    <p className="text-lg font-sans mb-2">
                        {title}
                        { variant === "StatusKPI" && <span className={`w-3 h-3 rounded-full ${s.dot}`} />}
                    </p>
                    <p className="lg:text-4xl text-orange-400  md:text-3xl font-semibold ">{value}</p>
                </div>

                {icon && (
                <div className="rounded-full p-2">
                    {icon}
                </div>                
                )}
                
            </div>

            <div className="flex gap-2 justify-between">
                <div>
                    {/* Trend Variant */}
                    {variant === "trend" && trend && (
                        <p
                            className={`mt-12 text-xl lg:text-2xl font-semibold inline-block
                                ${
                                    trend.direction === "up"
                                    ? "text-green-600"
                                    : "text-red-600"
                                }
                                `}
                        >
                            {trend.direction === "up" ? "▲": "▼" } {trend.value}% today
                        </p>
                    )} 
                </div>                                                                     
            </div>
                    
            <div className="flex">
                    <div>
                        {variant === "category" && (
                            <p className="text-xl mt-12 lg:text-2xl text-green-600 font-semibold">
                                +{today} new today
                            </p>)                    
                        }
                    </div>
                    
            </div>

            <div className="ml-3">
                {variant === "micro-trend" && (
                    <TinyAreaChart />
                )}
            </div>
            

            {variant === "StatusKPI" && (
                <div className=" mt-6 lg:mt-12 flex items-center justify-between gap-2">
                    <div className={`px-3 py-1 text-xl lg:text-2xl inline-block font-semibold rounded-full ${s.ring}`}>
                        {s.label}                        
                    </div>
                    <div className="mt-4 flex items-center justify-between gap-2 text-gray-400">                        
                        <span className="text-sm lg:text-lg">Services in progress</span>                       
                    </div>
                </div>
            )}
                


                {/* Progress Variant */}
                {variant === "progress" && progress && (
                    <div className="mt-3">
                    <p className="lg:text-lg text-sm mt-8 text-gray-500">
                        {progress.current} / {progress.total} completed
                    </p>

                    <div className="mt-3 h-2 w-full rounded bg-gray-300">
                        <div
                        className="h-2 rounded bg-blue-600"
                        style={{
                            width: `${(progress.current / progress.total) * 100}%`
                        }}
                        />
                    </div>
                    </div>
                )}

                {/* Alert Variant */}
                {variant === "alert" && (
                    <p className="mt-12 text-sm font-medium text-red-600">
                    Action required
                    </p>
                )}
            
        </div>
    )
}
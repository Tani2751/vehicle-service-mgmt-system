import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,Label } from 'recharts';
import { useViewPort } from '../../Hooks/useViewport';


const revenueOverviewData = [
  { month: "Jan", revenue2025: 18000, revenue2024: 15000 },
  { month: "Feb", revenue2025: 22000, revenue2024: 18000 },
  { month: "Mar", revenue2025: 26000, revenue2024: 21000 },
  { month: "Apr", revenue2025: 31000, revenue2024: 24500 },
  { month: "May", revenue2025: 36000, revenue2024: 29000 },
  { month: "Jun", revenue2025: 42000, revenue2024: 33000 },
];

// #endregion
const Bar_Chart = () => {
  const viewportSize = useViewPort();
  return (
    <BarChart
      style={{ width: '100%', maxWidth: '700px', maxHeight: '70vh', aspectRatio: viewportSize.width <= 648 ? 0.818 : 1.6}}
      responsive
      data={revenueOverviewData}
      margin={{
        top: 5,
        right: 5,
        left: viewportSize.width <= 648 ? 0 : 28,
        bottom: viewportSize.width <= 648 ? 0 : 20,
        }}
    >
       <CartesianGrid strokeDasharray="" />
        <XAxis dataKey="month" >
            <Label                
                value="Month"
                offset={-15}
                position="insideBottom"
            />
        </XAxis> 
        <YAxis width="auto">
            <Label
                value="revenue"
                angle={-90}
                offset={-16}
                position="insideLeft"
                style={{ textAnchor: "middle" }}
            />
        </YAxis >
        <Tooltip />
        {viewportSize.width <= 648 ? '' : <Legend verticalAlign="bottom" wrapperStyle={{ bottom: -15 }}/> }         
        <Bar dataKey="revenue2025" fill="#FF8904" activeBar={{ fill: 'pink', stroke: 'blue' }} radius={[10, 10, 0, 0]} />
        <Bar dataKey="revenue2024" fill="#5FD489" activeBar={{ fill: 'gold', stroke: 'purple' }} radius={[10, 10, 0, 0]} />

    </BarChart>
  );
};

export default Bar_Chart;
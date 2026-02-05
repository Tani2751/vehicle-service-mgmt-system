import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Label } from 'recharts';
import { useViewPort } from '../../Hooks/useViewport';


const userGrowthData = [
  { month: "Jan", users: 45 },
  { month: "Feb", users: 60 },
  { month: "Mar", users: 85 },
  { month: "Apr", users: 120 },
  { month: "May", users: 160 },
  { month: "Jun", users: 210 },
];


const Area_Chart = () => {
  const viewportSize = useViewPort();
  return (
    <AreaChart
      style={{ width: '100%', maxWidth: '700px', maxHeight: '70vh', aspectRatio: viewportSize.width <= 648 ? 0.818 : 1.6}}
      responsive
      data={userGrowthData}
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
                value="Users"
                angle={-90}
                offset={-16}
                position="insideLeft"
                style={{ textAnchor: "middle" }}
                />
            </YAxis >
      <Tooltip />
      <Area type="monotone" dataKey="users" stroke="#90D5FF" fill="#FF8904" />

    </AreaChart>
  );
};

export default Area_Chart;
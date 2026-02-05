import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label } from 'recharts';
import { useViewPort } from '../../Hooks/useViewport';

const servicesOverTimeData = [
  { month: "Jan", services2025: 120, services2024: 95, services2023: 80 },
  { month: "Feb", services2025: 145, services2024: 110, services2023: 90 },
  { month: "Mar", services2025: 170, services2024: 130, services2023: 105 },
  { month: "Apr", services2025: 200, services2024: 155, services2023: 120 },
  { month: "May", services2025: 225, services2024: 180, services2023: 140 },
  { month: "Jun", services2025: 260, services2024: 210, services2023: 165 },
];



export default function Line_Chart() {

  const viewportSize = useViewPort();
  return (
    <LineChart
            style={{ width: '100%', maxWidth: '700px', height: '100%', maxHeight: '70vh', aspectRatio: viewportSize.width <= 648 ? 0.818 : 1.618 }}
            responsive
            data={servicesOverTimeData}
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
                value="Number of Services"
                angle={-90}
                offset={-16}
                position="insideLeft"
                style={{ textAnchor: "middle" }}
              />
            </YAxis >
            <Tooltip />

            {viewportSize.width <= 648 ? '' : <Legend verticalAlign="bottom" wrapperStyle={{ bottom: -10 }}/> }
            
            <Line type="monotone" dataKey="services2025" stroke="#FF8904" strokeWidth={2} activeDot={{ r: 6 }} />
            <Line type="monotone" dataKey="services2024" stroke="#5FD489" strokeWidth={2} activeDot={{ r: 6 }} />
            <Line type="monotone" dataKey="services2023" stroke="#90D5FF" strokeWidth={2} activeDot={{ r: 6 }} />        

    </LineChart>        
  );
}
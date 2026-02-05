import { Pie, PieChart, Tooltip, Legend, Cell, Label} from "recharts";
import { useViewPort } from "../../Hooks/useViewport";





const COLORS = ["#FF8904", "#5FD489", "#90D5FF"];


const Pie_Charts = ({data}) => {
    const viewportSize = useViewPort();
    return (
        <PieChart 
            style={{ width: '100%', maxWidth: '700px', maxHeight: '100vh', aspectRatio: viewportSize.width <= 648 ? 0.818 : 1.618 }}
             margin={{
                top: 12,
                right: 5,
                left: viewportSize.width <= 648 ? 0 : 28,
                bottom:viewportSize.width <= 648 ? 0 : 20,
                }}
            responsive>
            <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}                
                label={({ percent }) => `${(percent * 100).toFixed(0)}%`}                
            >
                {data.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
            </Pie>
            
            <Tooltip />
            {viewportSize.width <= 648 ? '' :  <Legend /> }  
        </PieChart>
    )
}

export default Pie_Charts;

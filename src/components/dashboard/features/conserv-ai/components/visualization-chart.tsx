import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const COLORS = ['#22c55e', '#3b82f6', '#f59e0b', '#ef4444'];

interface VisualizationChartProps {
  visualization: {
    type: 'line' | 'pie';
    data: any;
  };
}

export function VisualizationChart({ visualization }: VisualizationChartProps) {
  return (
    <div className="mt-4 h-[200px] w-full min-w-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        {visualization.type === 'line' ? (
          <LineChart data={visualization.data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#22c55e"
              name="Value"
            />
          </LineChart>
        ) : (
          <PieChart>
            <Pie
              data={visualization.data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
            >
              {visualization.data.map((index: number) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}
import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Tooltip as RechartsTooltip,
} from 'recharts';
import Card from './Card';
import { COLORS } from '../../constants/countries';
import type { ChartDataPoint } from '../../types';

interface RevenueDistributionChartProps {
    chartData: ChartDataPoint[];
    totalRevenue: number;
    formatCurrency: (value: number) => string;
}

const RevenueDistributionChart = ({
    chartData,
    totalRevenue,
    formatCurrency,
}: RevenueDistributionChartProps) => (
    <Card>
        <h3 className="text-md font-bold mb-4 text-text-secondary">Distribución de Ingresos</h3>
        <div className="h-64 w-full relative">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                    >
                        {chartData.map((entry, index) => (
                            <Cell
                                key={`cell-${entry.name}-${index}`}
                                fill={entry.name === 'Sin datos' ? '#282828' : COLORS[index % COLORS.length]}
                                stroke="none"
                            />
                        ))}
                    </Pie>
                    {totalRevenue > 0 && (
                        <RechartsTooltip
                            contentStyle={{ backgroundColor: '#181818', borderColor: '#282828', borderRadius: '8px' }}
                            itemStyle={{ color: '#fff' }}
                            formatter={(value: number) => formatCurrency(value)}
                        />
                    )}
                </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="text-center">
                    {totalRevenue > 0 ? (
                        <>
                            <span className="text-xs text-text-secondary">Total</span>
                            <p className="font-bold text-text-primary text-lg">{formatCurrency(totalRevenue)}</p>
                        </>
                    ) : (
                        <span className="text-xs text-text-muted">Ingresa streams</span>
                    )}
                </div>
            </div>
        </div>
        <div className="space-y-2 mt-2">
            {totalRevenue > 0 ? chartData.slice(0, 5).map((item, idx) => (
                <div key={`${item.name}-${idx}`} className="flex justify-between items-center text-xs">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[idx % COLORS.length] }}></div>
                        <span className="text-text-secondary">{item.name}</span>
                    </div>
                    <span className="text-text-primary font-mono">{formatCurrency(item.value)}</span>
                </div>
            )) : (
                <p className="text-center text-xs text-text-muted">La gráfica se actualizará al ingresar datos.</p>
            )}
        </div>
    </Card>
);

export default RevenueDistributionChart;

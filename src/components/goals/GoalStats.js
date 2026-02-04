import StatsCard from "../common/StatsCard";
import ChartContainer from "../common/ChartContainer";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

const GoalStats = ({ stats, categoryStats, dailyCompletions }) => {
    if (!stats) return null;

    return (
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Goal Statistics</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <StatsCard
                    value={stats.totalGoals}
                    label="Total Goals"
                    gradient="from-blue-500 to-cyan-500"
                    icon="🎯"
                />
                <StatsCard
                    value={stats.completedGoals}
                    label="Completed"
                    gradient="from-green-500 to-emerald-500"
                    icon="✅"
                />
                <StatsCard
                    value={`${stats.completionRate}%`}
                    label="Completion Rate"
                    gradient="from-purple-500 to-pink-500"
                    icon="📈"
                />
                <StatsCard
                    value={Math.round((stats.totalGoals - stats.completedGoals) / 7)}
                    label="Goals/Week"
                    gradient="from-yellow-500 to-orange-500"
                    icon="📅"
                />
            </div>

            {categoryStats.length > 0 && (
                <div className="grid md:grid-cols-2 gap-8">
                    <ChartContainer title="Goals by Category" icon="📊">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={categoryStats}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="total"
                                >
                                    {categoryStats.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </ChartContainer>
                    <ChartContainer title="Weekly Progress" icon="📅">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={dailyCompletions}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="day" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="completed" fill="#8884d8" />
                            </BarChart>
                        </ResponsiveContainer>
                    </ChartContainer>
                </div>
            )}
        </div>
    );
};

export default GoalStats;
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import { TrendingUp, Heart, Activity } from "lucide-react";
import StatsCard from "../common/StatsCard";
import MoodHistoryItem from "./MoodHistoryItem";

const MoodAnalytics = ({ moodHistory, analysis, onClose }) => {
    // This is a simplified version - you can expand it based on your needs
    // For now, let's create a basic analytics component
    
    const calculateBasicStats = () => {
        const total = moodHistory.length;
        const completed = moodHistory.filter(m => m.category === "Positive").length;
        const completionRate = total > 0 ? ((completed / total) * 100).toFixed(1) : 0;
        
        return {
            totalEntries: total,
            positivePercentage: completionRate,
            negativePercentage: (100 - completionRate).toFixed(1),
            positiveStreak: calculatePositiveStreak(moodHistory)
        };
    };

    const calculatePositiveStreak = (history) => {
        let streak = 0;
        let maxStreak = 0;
        
        history.forEach(entry => {
            if (entry.category === "Positive") {
                streak++;
                maxStreak = Math.max(maxStreak, streak);
            } else {
                streak = 0;
            }
        });
        
        return maxStreak;
    };

    const stats = calculateBasicStats();

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            className="bg-white rounded-2xl shadow-xl p-6 mt-8"
        >
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Your Mood Insights</h2>
                    <p className="text-gray-600">Track your emotional journey over time</p>
                </div>
                <button
                    onClick={onClose}
                    className="text-gray-500 hover:text-gray-700"
                >
                    ✕
                </button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <StatsCard
                    value={stats.totalEntries}
                    label="Total Entries"
                    description="Moods tracked"
                    gradient="from-blue-500 to-cyan-500"
                    icon="📈"
                />
                <StatsCard
                    value={`${stats.positivePercentage}%`}
                    label="Positive Days"
                    description={`${stats.positiveStreak} day streak`}
                    gradient="from-green-500 to-emerald-500"
                    icon={<TrendingUp className="w-8 h-8" />}
                />
                <StatsCard
                    value={`${stats.negativePercentage}%`}
                    label="Challenging Days"
                    description="It's okay to feel this way"
                    gradient="from-red-500 to-rose-500"
                    icon="😔"
                />
                <StatsCard
                    value={stats.positiveStreak}
                    label="Best Streak"
                    description="Consecutive positive days"
                    gradient="from-purple-500 to-pink-500"
                    icon={<Heart className="w-8 h-8" />}
                />
            </div>

            {/* Recent Moods */}
            <div className="mt-8">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Recent Mood Entries</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {moodHistory.slice(-6).reverse().map((mood, index) => (
                        <MoodHistoryItem key={index} mood={mood} />
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export default MoodAnalytics;
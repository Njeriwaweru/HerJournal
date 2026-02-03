import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, AreaChart, Area } from 'recharts';
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, Calendar, Heart, Zap, TrendingDown, Activity, Clock, Star } from "lucide-react";

const MoodTracker = () => {
    const navigate = useNavigate();
    
    // Enhanced mood data structure
    const moods = [
        { 
            emoji: "🌞", 
            label: "Excellent", 
            description: "Feeling wonderful and energized",
            color: "#FBBF24",
            gradient: "from-yellow-400 to-orange-400",
            category: "Positive",
            intensity: 5
        },
        { 
            emoji: "😌", 
            label: "Relaxed", 
            description: "Calm, peaceful, and content",
            color: "#34D399",
            gradient: "from-emerald-400 to-teal-400",
            category: "Positive",
            intensity: 4
        },
        { 
            emoji: "🤩", 
            label: "Excited", 
            description: "Full of energy and enthusiasm",
            color: "#A78BFA",
            gradient: "from-purple-400 to-violet-400",
            category: "Positive",
            intensity: 5
        },
        { 
            emoji: "😓", 
            label: "Anxious", 
            description: "Feeling worried or nervous",
            color: "#F97316",
            gradient: "from-orange-400 to-amber-400",
            category: "Negative",
            intensity: 3
        },
        { 
            emoji: "😰", 
            label: "Stressed", 
            description: "Under pressure or overwhelmed",
            color: "#EF4444",
            gradient: "from-red-400 to-rose-400",
            category: "Negative",
            intensity: 4
        },
        { 
            emoji: "😡", 
            label: "Frustrated", 
            description: "Feeling annoyed or upset",
            color: "#DC2626",
            gradient: "from-rose-600 to-pink-600",
            category: "Negative",
            intensity: 5
        },
        { 
            emoji: "😊", 
            label: "Happy", 
            description: "Feeling joyful and satisfied",
            color: "#10B981",
            gradient: "from-green-400 to-emerald-400",
            category: "Positive",
            intensity: 4
        },
        { 
            emoji: "😔", 
            label: "Sad", 
            description: "Feeling down or disappointed",
            color: "#6B7280",
            gradient: "from-gray-400 to-slate-400",
            category: "Negative",
            intensity: 3
        },
        { 
            emoji: "😴", 
            label: "Tired", 
            description: "Low energy, needing rest",
            color: "#8B5CF6",
            gradient: "from-indigo-400 to-purple-400",
            category: "Neutral",
            intensity: 2
        }
    ];

    const [selectedMood, setSelectedMood] = useState(null);
    const [moodHistory, setMoodHistory] = useState([]);
    const [showHistory, setShowHistory] = useState(false);
    const [analysis, setAnalysis] = useState(null);
    const [selectedIntensity, setSelectedIntensity] = useState(3);
    const [showMoodDetails, setShowMoodDetails] = useState(false);
    const [activeCategory, setActiveCategory] = useState("all");

    // Load mood history on component mount
    useEffect(() => {
        loadMoodHistory();
    }, []);

    const loadMoodHistory = () => {
        const savedMoods = JSON.parse(localStorage.getItem("moodHistory")) || [];
        setMoodHistory(savedMoods);
        analyzeMoods(savedMoods);
    };

    const handleSelectMood = (mood) => {
        setSelectedMood(mood);
        setShowMoodDetails(true);
        
        toast.info(`Selected: ${mood.label}`, {
            position: "bottom-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            icon: mood.emoji
        });
    };

    const handleSaveMood = () => {
        if (!selectedMood) return;

        const currentMood = {
            mood: selectedMood.emoji,
            label: selectedMood.label,
            description: selectedMood.description,
            category: selectedMood.category,
            intensity: selectedIntensity,
            color: selectedMood.color,
            date: new Date().toISOString(),
            timestamp: Date.now(),
            formattedDate: new Date().toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            })
        };
        
        const savedMoods = JSON.parse(localStorage.getItem("moodHistory")) || [];
        savedMoods.push(currentMood);
        localStorage.setItem("moodHistory", JSON.stringify(savedMoods));
        
        toast.success(
            <div className="flex items-center space-x-2">
                <span className="text-2xl">{selectedMood.emoji}</span>
                <span>Mood saved! Redirecting to reflection...</span>
            </div>,
            {
                position: "bottom-center",
                autoClose: 1500,
                hideProgressBar: false,
            }
        );
        
        setTimeout(() => {
            navigate("/reflection");
        }, 1500);
    };

    // Analyze mood data
    const analyzeMoods = (moods) => {
        if (moods.length === 0) return;

        const moodCounts = {};
        const categoryCounts = { Positive: 0, Negative: 0, Neutral: 0 };
        let positiveStreak = 0;
        let currentStreak = 0;
        let lastCategory = null;
        let weeklyAverage = 0;
        let totalIntensity = 0;

        // Sort by date for trend analysis
        const sortedMoods = [...moods].sort((a, b) => new Date(a.date) - new Date(b.date));
        
        // Last 7 days data for trend chart
        const last7Days = [...Array(7)].map((_, i) => {
            const date = new Date();
            date.setDate(date.getDate() - i);
            return {
                date: date.toLocaleDateString('en-US', { weekday: 'short' }),
                fullDate: date.toISOString().split('T')[0],
                averageIntensity: 0,
                count: 0
            };
        }).reverse();

        sortedMoods.forEach(mood => {
            // Count by emoji
            moodCounts[mood.mood] = (moodCounts[mood.mood] || 0) + 1;
            
            // Count by category
            const category = mood.category || "Unknown";
            categoryCounts[category] = (categoryCounts[category] || 0) + 1;

            // Calculate streak
            if (category === lastCategory) {
                currentStreak++;
            } else {
                if (lastCategory === "Positive") {
                    positiveStreak = Math.max(positiveStreak, currentStreak);
                }
                currentStreak = 1;
                lastCategory = category;
            }

            // Calculate intensity
            totalIntensity += mood.intensity || 3;

            // Update weekly data
            const moodDate = new Date(mood.date).toISOString().split('T')[0];
            const dayData = last7Days.find(d => d.fullDate === moodDate);
            if (dayData) {
                dayData.count++;
                dayData.averageIntensity = ((dayData.averageIntensity * (dayData.count - 1)) + (mood.intensity || 3)) / dayData.count;
            }
        });

        // Final streak check
        if (lastCategory === "Positive") {
            positiveStreak = Math.max(positiveStreak, currentStreak);
        }

        // Find most common mood
        const mostCommonMood = Object.entries(moodCounts).reduce((a, b) => 
            a[1] > b[1] ? a : b, ["", 0]
        );

        // Calculate percentages
        const totalMoods = moods.length;
        const positivePercentage = ((categoryCounts.Positive / totalMoods) * 100).toFixed(1);
        const negativePercentage = ((categoryCounts.Negative / totalMoods) * 100).toFixed(1);
        const neutralPercentage = ((categoryCounts.Neutral / totalMoods) * 100).toFixed(1);
        weeklyAverage = (totalIntensity / totalMoods).toFixed(1);

        // Prepare chart data
        const moodDataForChart = moods.slice(-14).map(mood => ({
            date: new Date(mood.date).toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric' 
            }),
            mood: mood.mood,
            label: mood.label,
            intensity: mood.intensity || 3,
            category: mood.category || "Unknown",
            color: mood.color || "#999"
        }));

        const pieData = Object.entries(moodCounts).map(([mood, count]) => {
            const moodObj = moods.find(m => m.emoji === mood) || { label: mood, color: "#999" };
            return {
                name: moodObj.label,
                value: count,
                emoji: mood,
                color: moodObj.color
            };
        });

        const trendData = last7Days.map(day => ({
            name: day.date,
            intensity: day.averageIntensity,
            count: day.count
        }));

        setAnalysis({
            totalEntries: totalMoods,
            mostCommonMood: {
                emoji: mostCommonMood[0],
                label: moods.find(m => m.emoji === mostCommonMood[0])?.label || mostCommonMood[0],
                count: mostCommonMood[1],
                percentage: ((mostCommonMood[1] / totalMoods) * 100).toFixed(1)
            },
            positivePercentage,
            negativePercentage,
            neutralPercentage,
            positiveStreak,
            weeklyAverage,
            moodDataForChart,
            pieData,
            trendData,
            categoryCounts
        });
    };

    const filteredMoods = activeCategory === "all" 
        ? moods 
        : moods.filter(mood => mood.category === activeCategory);

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 p-4 md:p-8">
            <ToastContainer 
                position="bottom-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            
            {/* Header */}
            <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                        How are you feeling today?
                    </h1>
                    {moodHistory.length > 0 && (
                        <button
                            onClick={() => setShowHistory(!showHistory)}
                            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-4 py-2 rounded-xl transition shadow-lg"
                        >
                            {showHistory ? "Hide Insights" : "Show Insights"}
                        </button>
                    )}
                </div>
                <p className="text-gray-600">
                    Select how you're feeling right now. You can adjust the intensity and add notes.
                </p>
            </div>

            {/* Mood Category Filter */}
            <div className="mb-8">
                <div className="flex flex-wrap gap-2 mb-4">
                    <button
                        onClick={() => setActiveCategory("all")}
                        className={`px-4 py-2 rounded-full transition ${activeCategory === "all" 
                            ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white' 
                            : 'bg-white text-gray-600 hover:bg-gray-100'
                        }`}
                    >
                        All Moods
                    </button>
                    <button
                        onClick={() => setActiveCategory("Positive")}
                        className={`px-4 py-2 rounded-full transition ${activeCategory === "Positive" 
                            ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white' 
                            : 'bg-white text-gray-600 hover:bg-gray-100'
                        }`}
                    >
                        😊 Positive
                    </button>
                    <button
                        onClick={() => setActiveCategory("Negative")}
                        className={`px-4 py-2 rounded-full transition ${activeCategory === "Negative" 
                            ? 'bg-gradient-to-r from-red-500 to-rose-500 text-white' 
                            : 'bg-white text-gray-600 hover:bg-gray-100'
                        }`}
                    >
                        😔 Negative
                    </button>
                    <button
                        onClick={() => setActiveCategory("Neutral")}
                        className={`px-4 py-2 rounded-full transition ${activeCategory === "Neutral" 
                            ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white' 
                            : 'bg-white text-gray-600 hover:bg-gray-100'
                        }`}
                    >
                        😐 Neutral
                    </button>
                </div>
            </div>

            {/* Mood Selection Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mb-12">
                {filteredMoods.map((mood, index) => (
                    <motion.button
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ scale: 1.05, y: -5 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleSelectMood(mood)}
                        className={`relative overflow-hidden rounded-2xl p-6 text-center transition-all duration-300 ${
                            selectedMood?.emoji === mood.emoji
                                ? 'ring-4 ring-offset-2 transform scale-105 shadow-2xl'
                                : 'shadow-lg hover:shadow-xl'
                        }`}
                        style={{
                            background: selectedMood?.emoji === mood.emoji 
                                ? `linear-gradient(135deg, ${mood.color}20, white)`
                                : 'white',
                            border: `2px solid ${selectedMood?.emoji === mood.emoji ? mood.color : 'transparent'}`
                        }}
                    >
                        <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4 bg-gradient-to-br ${mood.gradient}`}>
                            <span className="text-4xl">{mood.emoji}</span>
                        </div>
                        <h3 className="font-bold text-lg text-gray-800 mb-2">{mood.label}</h3>
                        <p className="text-sm text-gray-600 mb-3">{mood.description}</p>
                        <div className="flex justify-center space-x-1">
                            {[...Array(5)].map((_, i) => (
                                <div 
                                    key={i}
                                    className={`w-2 h-2 rounded-full ${i < mood.intensity ? 'bg-current' : 'bg-gray-300'}`}
                                    style={{ color: mood.color }}
                                />
                            ))}
                        </div>
                        {selectedMood?.emoji === mood.emoji && (
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="absolute top-2 right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center"
                            >
                                <span className="text-white text-sm">✓</span>
                            </motion.div>
                        )}
                    </motion.button>
                ))}
            </div>

            {/* Selected Mood Details */}
            <AnimatePresence>
                {selectedMood && showMoodDetails && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="bg-white rounded-2xl shadow-xl p-6 mb-8"
                    >
                        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                            <div className="flex items-center space-x-6">
                                <div className={`w-24 h-24 rounded-2xl flex items-center justify-center bg-gradient-to-br ${selectedMood.gradient} shadow-lg`}>
                                    <span className="text-6xl">{selectedMood.emoji}</span>
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-800 mb-2">
                                        {selectedMood.label}
                                    </h3>
                                    <p className="text-gray-600 mb-4 max-w-md">
                                        {selectedMood.description}
                                    </p>
                                    <div className="flex items-center space-x-4">
                                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                            selectedMood.category === "Positive" 
                                                ? "bg-green-100 text-green-800"
                                                : selectedMood.category === "Negative"
                                                ? "bg-red-100 text-red-800"
                                                : "bg-blue-100 text-blue-800"
                                        }`}>
                                            {selectedMood.category} Mood
                                        </span>
                                        <div className="flex items-center space-x-2">
                                            <span className="text-sm text-gray-600">Intensity:</span>
                                            <div className="flex space-x-1">
                                                {[...Array(5)].map((_, i) => (
                                                    <button
                                                        key={i}
                                                        onClick={() => setSelectedIntensity(i + 1)}
                                                        className={`w-6 h-6 rounded-full transition ${
                                                            i < selectedIntensity
                                                                ? 'bg-current'
                                                                : 'bg-gray-200'
                                                        }`}
                                                        style={{ color: selectedMood.color }}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <button
                                onClick={handleSaveMood}
                                className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-semibold text-lg px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition transform hover:scale-105 w-full md:w-auto"
                            >
                                💾 Save & Continue to Reflection
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Mood History & Analysis Section */}
            <AnimatePresence>
                {showHistory && moodHistory.length > 0 && (
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
                            <span className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-2 rounded-full text-sm font-medium">
                                {moodHistory.length} total entries
                            </span>
                        </div>

                        {/* Quick Stats */}
                        {analysis && (
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                                <div className="bg-gradient-to-r from-yellow-50 to-amber-50 p-4 rounded-xl border border-yellow-100">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-3xl font-bold text-yellow-600">{analysis.mostCommonMood.emoji}</p>
                                            <p className="font-semibold text-gray-800">Most Common</p>
                                            <p className="text-sm text-gray-600">{analysis.mostCommonMood.percentage}% of entries</p>
                                        </div>
                                        <Star className="w-8 h-8 text-yellow-500" />
                                    </div>
                                </div>
                                <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border border-green-100">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-3xl font-bold text-green-600">{analysis.positivePercentage}%</p>
                                            <p className="font-semibold text-gray-800">Positive Days</p>
                                            <p className="text-sm text-gray-600">{analysis.positiveStreak} day streak</p>
                                        </div>
                                        <TrendingUp className="w-8 h-8 text-green-500" />
                                    </div>
                                </div>
                                <div className="bg-gradient-to-r from-red-50 to-rose-50 p-4 rounded-xl border border-red-100">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-3xl font-bold text-red-600">{analysis.negativePercentage}%</p>
                                            <p className="font-semibold text-gray-800">Challenging Days</p>
                                            <p className="text-sm text-gray-600">It's okay to feel this way</p>
                                        </div>
                                        <TrendingDown className="w-8 h-8 text-red-500" />
                                    </div>
                                </div>
                                <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl border border-purple-100">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-3xl font-bold text-purple-600">{analysis.weeklyAverage}</p>
                                            <p className="font-semibold text-gray-800">Avg Intensity</p>
                                            <p className="text-sm text-gray-600">On a scale of 1-5</p>
                                        </div>
                                        <Activity className="w-8 h-8 text-purple-500" />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Charts */}
                        {analysis && analysis.pieData.length > 0 && (
                            <div className="grid lg:grid-cols-2 gap-8 mb-8">
                                <div className="bg-gray-50 p-6 rounded-2xl">
                                    <div className="flex items-center justify-between mb-6">
                                        <h3 className="text-lg font-bold text-gray-800">Mood Distribution</h3>
                                        <Heart className="w-5 h-5 text-pink-500" />
                                    </div>
                                    <div className="h-72">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <PieChart>
                                                <Pie
                                                    data={analysis.pieData}
                                                    cx="50%"
                                                    cy="50%"
                                                    labelLine={false}
                                                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                                    outerRadius={90}
                                                    innerRadius={40}
                                                    fill="#8884d8"
                                                    dataKey="value"
                                                >
                                                    {analysis.pieData.map((entry, index) => (
                                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                                    ))}
                                                </Pie>
                                                <Tooltip 
                                                    formatter={(value) => [`${value} entries`, 'Count']}
                                                />
                                            </PieChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>
                                <div className="bg-gray-50 p-6 rounded-2xl">
                                    <div className="flex items-center justify-between mb-6">
                                        <h3 className="text-lg font-bold text-gray-800">Weekly Mood Trend</h3>
                                        <TrendingUp className="w-5 h-5 text-green-500" />
                                    </div>
                                    <div className="h-72">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <AreaChart data={analysis.trendData}>
                                                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                                <XAxis dataKey="name" />
                                                <YAxis />
                                                <Tooltip 
                                                    formatter={(value, name) => {
                                                        if (name === 'intensity') return [value.toFixed(1), 'Average Intensity'];
                                                        if (name === 'count') return [value, 'Mood Entries'];
                                                        return [value, name];
                                                    }}
                                                />
                                                <Area 
                                                    type="monotone" 
                                                    dataKey="intensity" 
                                                    stroke="#8b5cf6" 
                                                    fill="#8b5cf6" 
                                                    fillOpacity={0.3}
                                                    strokeWidth={2}
                                                />
                                            </AreaChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Recent Moods */}
                        <div className="mt-8">
                            <h3 className="text-xl font-bold text-gray-800 mb-6">Recent Mood Entries</h3>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {moodHistory.slice(-6).reverse().map((mood, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-4 border border-gray-100 hover:border-gray-200 transition"
                                    >
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="flex items-center space-x-3">
                                                <div 
                                                    className="w-12 h-12 rounded-lg flex items-center justify-center"
                                                    style={{ backgroundColor: `${mood.color}20` }}
                                                >
                                                    <span className="text-2xl">{mood.mood}</span>
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-gray-800">{mood.label}</p>
                                                    <div className="flex items-center space-x-1">
                                                        {[...Array(5)].map((_, i) => (
                                                            <div 
                                                                key={i}
                                                                className={`w-2 h-2 rounded-full ${i < (mood.intensity || 3) ? 'bg-current' : 'bg-gray-300'}`}
                                                                style={{ color: mood.color }}
                                                            />
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                            <Clock className="w-4 h-4 text-gray-400" />
                                        </div>
                                        <p className="text-sm text-gray-500 mb-2">
                                            {new Date(mood.date).toLocaleDateString('en-US', {
                                                weekday: 'short',
                                                month: 'short',
                                                day: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}
                                        </p>
                                        <div className="flex justify-between items-center">
                                            <span className={`px-2 py-1 text-xs rounded ${
                                                mood.category === "Positive" 
                                                    ? "bg-green-100 text-green-800"
                                                    : mood.category === "Negative"
                                                    ? "bg-red-100 text-red-800"
                                                    : "bg-blue-100 text-blue-800"
                                            }`}>
                                                {mood.category}
                                            </span>
                                            <span className="text-xs text-gray-500">
                                                {mood.intensity || 3}/5 intensity
                                            </span>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {showHistory && moodHistory.length === 0 && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12 bg-white rounded-2xl shadow-lg"
                >
                    <div className="text-4xl mb-4">📊</div>
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">No mood history yet</h3>
                    <p className="text-gray-500">Start tracking your mood to see insights and patterns!</p>
                </motion.div>
            )}
        </div>
    );
};

export default MoodTracker;
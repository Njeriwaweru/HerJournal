import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

const Goal = () => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([
        {id: 1, name: 'Well-being', color: '#10B981', emoji: '🧠'},
        {id: 2, name: 'Career', color: '#3B82F6', emoji: '💼'},
        {id: 3, name: 'Habit', color: '#8B5CF6', emoji: '🔄'},
        {id: 4, name: 'Self-care', color: '#EC4899', emoji: '🌸'},
        {id: 5, name: 'Relationships', color: '#F59E0B', emoji: '👥'},
        {id: 6, name: 'Personal Growth', color: '#EF4444', emoji: '🌱'},
    ]);
    const [newCategory, setNewCategory] = useState("");
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const [goals, setGoals] = useState([]);
    const [activeCategory, setActiveCategory] = useState(null);
    const [goalText, setGoalText] = useState("");
    const [showStats, setShowStats] = useState(false);
    const [editingGoal, setEditingGoal] = useState(null);

    // Available frequencies for goals
    const frequencies = [
        { id: 'daily', label: 'Daily', emoji: '📅' },
        { id: 'weekly', label: 'Weekly', emoji: '📆' },
        { id: 'monthly', label: 'Monthly', emoji: '🗓️' },
        { id: 'one-time', label: 'One-time', emoji: '🎯' },
    ];

    // Priority levels
    const priorities = [
        { id: 'high', label: 'High', color: 'bg-red-500' },
        { id: 'medium', label: 'Medium', color: 'bg-yellow-500' },
        { id: 'low', label: 'Low', color: 'bg-green-500' },
    ];

    // Load data on component mount
    useEffect(() => {
        const savedCategories = localStorage.getItem("goalCategories");
        const savedGoals = localStorage.getItem("goals");
        
        if (savedCategories) {
            setCategories(JSON.parse(savedCategories));
        }
        if (savedGoals) {
            setGoals(JSON.parse(savedGoals));
        }
        setLoaded(true);
    }, []);

    // Save data when changed
    useEffect(() => {
        if (loaded) {
            localStorage.setItem("goalCategories", JSON.stringify(categories));
            localStorage.setItem("goals", JSON.stringify(goals));
        }
    }, [categories, goals, loaded]);

    const handleAddCategory = () => {
        if (newCategory.trim() === "") {
            toast.error("Please enter a category name!");
            return;
        }
        
        const newCategoryObj = {
            id: Date.now(),
            name: newCategory.trim(),
            color: `#${Math.floor(Math.random()*16777215).toString(16)}`,
            emoji: '🎯'
        };
        
        setCategories([...categories, newCategoryObj]);
        setNewCategory("");
        setModalIsOpen(false);
        toast.success(`Category "${newCategory.trim()}" added!`);
    };

    const handleAddGoal = () => {
        if (!goalText.trim() || !activeCategory) {
            toast.error("Please select a category and write a goal!");
            return;
        }

        const newGoal = {
            id: Date.now(),
            text: goalText.trim(),
            category: activeCategory,
            date: new Date().toISOString(),
            createdAt: new Date().toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            }),
            completed: false,
            completedAt: null,
            frequency: 'daily',
            priority: 'medium',
            progress: 0,
            subTasks: []
        };

        setGoals([newGoal, ...goals]);
        setGoalText("");
        toast.success("Goal added successfully! 🎯");
    };

    const handleCompleteGoal = (goalId) => {
        setGoals(goals.map(goal => {
            if (goal.id === goalId) {
                const updatedGoal = {
                    ...goal,
                    completed: !goal.completed,
                    completedAt: !goal.completed ? new Date().toISOString() : null,
                    progress: !goal.completed ? 100 : 0
                };
                
                if (updatedGoal.completed) {
                    toast.success("🎉 Goal completed! Great job!");
                }
                return updatedGoal;
            }
            return goal;
        }));
    };

    const handleDeleteGoal = (goalId) => {
        setGoals(goals.filter(goal => goal.id !== goalId));
        toast.info("Goal removed");
    };

    const handleEditGoal = (goal) => {
        setEditingGoal(goal);
        setGoalText(goal.text);
        setActiveCategory(goal.category);
    };

    const handleUpdateGoal = () => {
        if (!editingGoal || !goalText.trim()) return;
        
        setGoals(goals.map(goal => 
            goal.id === editingGoal.id 
                ? { ...goal, text: goalText.trim() }
                : goal
        ));
        
        setEditingGoal(null);
        setGoalText("");
        toast.success("Goal updated!");
    };

    const calculateStats = () => {
        const totalGoals = goals.length;
        const completedGoals = goals.filter(g => g.completed).length;
        const completionRate = totalGoals > 0 ? (completedGoals / totalGoals * 100).toFixed(1) : 0;
        
        // Goals by category
        const categoryStats = categories.map(category => {
            const categoryGoals = goals.filter(g => g.category === category.name);
            const completedCategoryGoals = categoryGoals.filter(g => g.completed).length;
            return {
                name: category.name,
                emoji: category.emoji,
                total: categoryGoals.length,
                completed: completedCategoryGoals,
                color: category.color
            };
        }).filter(stat => stat.total > 0);

        // Weekly completion trend
        const last7Days = [...Array(7)].map((_, i) => {
            const date = new Date();
            date.setDate(date.getDate() - i);
            return date.toLocaleDateString('en-US', { weekday: 'short' });
        }).reverse();

        const dailyCompletions = last7Days.map(day => {
            const dayGoals = goals.filter(goal => {
                if (!goal.completedAt) return false;
                const goalDate = new Date(goal.completedAt);
                return goalDate.toLocaleDateString('en-US', { weekday: 'short' }) === day;
            });
            return { day, completed: dayGoals.length };
        });

        return {
            totalGoals,
            completedGoals,
            completionRate,
            categoryStats,
            dailyCompletions
        };
    };

    const stats = calculateStats();

    const getGoalsByCategory = (categoryName) => {
        return goals.filter(goal => goal.category === categoryName);
    };

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 p-4 md:p-8">
            <ToastContainer 
                position="bottom-center"
                autoClose={3000}
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
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Your Goals & Aspirations</h1>
                <div className="flex gap-4">
                    {goals.length > 0 && (
                        <button
                            onClick={() => setShowStats(!showStats)}
                            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-4 py-2 rounded-lg transition"
                        >
                            {showStats ? "Hide Stats" : "Show Stats"} 📊
                        </button>
                    )}
                    <button
                        onClick={() => navigate("/")}
                        className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition"
                    >
                        Back to Home
                    </button>
                </div>
            </div>

            {modalIsOpen ? (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
                        <h2 className="font-bold text-2xl mb-6 text-center">Add New Category</h2>
                        <input
                            type="text"
                            value={newCategory}
                            onChange={(e) => setNewCategory(e.target.value)}
                            placeholder="Enter category name..."
                            className="w-full p-4 text-lg border-2 border-gray-200 rounded-xl focus:outline-none focus:border-pink-400 mb-6"
                        />
                        <div className="flex gap-4 justify-center">
                            <button
                                className="bg-pink-500 hover:bg-pink-600 text-white font-medium px-6 py-3 rounded-xl text-lg shadow-md transition transform hover:scale-105"
                                onClick={handleAddCategory}
                            >
                                Save Category
                            </button>
                            <button
                                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium px-6 py-3 rounded-xl text-lg transition"
                                onClick={() => setModalIsOpen(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <>
                    {/* Goal Input Section */}
                    <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
                        <div className="flex flex-col md:flex-row gap-6 mb-6">
                            <div className="flex-1">
                                <label className="block text-lg font-medium text-gray-700 mb-3">
                                    {editingGoal ? "Edit your goal" : "What do you want to achieve?"}
                                </label>
                                <textarea
                                    className="w-full h-32 p-4 text-lg border-2 border-gray-200 rounded-xl focus:outline-none focus:border-pink-400 resize-none"
                                    placeholder="I want to... Be specific and kind to yourself 🌸"
                                    value={goalText}
                                    onChange={(e) => setGoalText(e.target.value)}
                                />
                                <p className="text-sm text-gray-500 mt-2">
                                    Keep your goals SMART: Specific, Measurable, Achievable, Relevant, Time-bound
                                </p>
                            </div>
                            
                            <div className="md:w-1/3">
                                <label className="block text-lg font-medium text-gray-700 mb-3">Select Category</label>
                                <div className="grid grid-cols-2 gap-3">
                                    {categories.map((category) => (
                                        <button
                                            key={category.id}
                                            onClick={() => setActiveCategory(category.name)}
                                            className={`flex items-center justify-center gap-2 p-3 rounded-xl transition-all ${
                                                activeCategory === category.name
                                                    ? 'ring-2 ring-offset-2 transform scale-105'
                                                    : 'hover:scale-105'
                                            }`}
                                            style={{
                                                backgroundColor: `${category.color}20`,
                                                border: `2px solid ${activeCategory === category.name ? category.color : 'transparent'}`,
                                                color: category.color
                                            }}
                                        >
                                            <span className="text-xl">{category.emoji}</span>
                                            <span className="font-medium">{category.name}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
                            <button
                                onClick={editingGoal ? handleUpdateGoal : handleAddGoal}
                                className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white text-xl font-medium px-8 py-4 rounded-full shadow-lg transition transform hover:scale-105 w-full md:w-auto"
                            >
                                {editingGoal ? "💾 Update Goal" : "🎯 Add Goal"}
                            </button>
                            
                            <div className="flex gap-4">
                                {editingGoal && (
                                    <button
                                        onClick={() => {
                                            setEditingGoal(null);
                                            setGoalText("");
                                            setActiveCategory(null);
                                        }}
                                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium px-6 py-3 rounded-full transition"
                                    >
                                        Cancel Edit
                                    </button>
                                )}
                                <button
                                    onClick={() => setModalIsOpen(true)}
                                    className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-medium px-6 py-3 rounded-full transition"
                                >
                                    + Add Category
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Statistics Section */}
                    {showStats && goals.length > 0 && (
                        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">Goal Statistics</h2>
                            
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-xl">
                                    <p className="text-3xl font-bold text-blue-600">{stats.totalGoals}</p>
                                    <p className="text-gray-600">Total Goals</p>
                                </div>
                                <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl">
                                    <p className="text-3xl font-bold text-green-600">{stats.completedGoals}</p>
                                    <p className="text-gray-600">Completed</p>
                                </div>
                                <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl">
                                    <p className="text-3xl font-bold text-purple-600">{stats.completionRate}%</p>
                                    <p className="text-gray-600">Completion Rate</p>
                                </div>
                                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-xl">
                                    <p className="text-3xl font-bold text-yellow-600">
                                        {Math.round(goals.filter(g => !g.completed).length / 7)}
                                    </p>
                                    <p className="text-gray-600">Goals/Week</p>
                                </div>
                            </div>

                            {stats.categoryStats.length > 0 && (
                                <div className="grid md:grid-cols-2 gap-8">
                                    <div>
                                        <h3 className="text-lg font-semibold mb-4">Goals by Category</h3>
                                        <div className="h-64">
                                            <ResponsiveContainer width="100%" height="100%">
                                                <PieChart>
                                                    <Pie
                                                        data={stats.categoryStats}
                                                        cx="50%"
                                                        cy="50%"
                                                        labelLine={false}
                                                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                                        outerRadius={80}
                                                        fill="#8884d8"
                                                        dataKey="total"
                                                    >
                                                        {stats.categoryStats.map((entry, index) => (
                                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                                        ))}
                                                    </Pie>
                                                    <Tooltip />
                                                    <Legend />
                                                </PieChart>
                                            </ResponsiveContainer>
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold mb-4">Weekly Progress</h3>
                                        <div className="h-64">
                                            <ResponsiveContainer width="100%" height="100%">
                                                <BarChart data={stats.dailyCompletions}>
                                                    <CartesianGrid strokeDasharray="3 3" />
                                                    <XAxis dataKey="day" />
                                                    <YAxis />
                                                    <Tooltip />
                                                    <Bar dataKey="completed" fill="#8884d8" />
                                                </BarChart>
                                            </ResponsiveContainer>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Goals List */}
                    <div className="bg-white rounded-2xl shadow-xl p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-gray-800">Your Goals</h2>
                            <span className="text-gray-600">
                                {goals.filter(g => !g.completed).length} active, {goals.filter(g => g.completed).length} completed
                            </span>
                        </div>

                        {goals.length === 0 ? (
                            <div className="text-center py-12">
                                <p className="text-4xl mb-4">🎯</p>
                                <p className="text-xl font-semibold text-gray-700">No goals yet</p>
                                <p className="text-gray-500">Start by adding your first goal above!</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {goals.map((goal) => {
                                    const category = categories.find(c => c.name === goal.category);
                                    return (
                                        <div
                                            key={goal.id}
                                            className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all ${
                                                goal.completed
                                                    ? 'bg-green-50 border-green-200'
                                                    : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                                            }`}
                                        >
                                            <div className="flex items-center gap-4">
                                                <button
                                                    onClick={() => handleCompleteGoal(goal.id)}
                                                    className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition ${
                                                        goal.completed
                                                            ? 'bg-green-500 border-green-500'
                                                            : 'border-gray-300 hover:border-green-400'
                                                    }`}
                                                >
                                                    {goal.completed && (
                                                        <span className="text-white">✓</span>
                                                    )}
                                                </button>
                                                
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-3 mb-1">
                                                        {category && (
                                                            <span
                                                                className="px-3 py-1 rounded-full text-sm font-medium"
                                                                style={{
                                                                    backgroundColor: `${category.color}20`,
                                                                    color: category.color
                                                                }}
                                                            >
                                                                {category.emoji} {goal.category}
                                                            </span>
                                                        )}
                                                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                                                            goal.priority === 'high' ? 'bg-red-100 text-red-800' :
                                                            goal.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                                                            'bg-green-100 text-green-800'
                                                        }`}>
                                                            {goal.priority} priority
                                                        </span>
                                                    </div>
                                                    <p className={`text-lg ${goal.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                                                        {goal.text}
                                                    </p>
                                                    <p className="text-sm text-gray-500 mt-1">
                                                        Added on {goal.createdAt}
                                                    </p>
                                                </div>
                                            </div>
                                            
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => handleEditGoal(goal)}
                                                    className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition"
                                                    title="Edit goal"
                                                >
                                                    ✏️
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteGoal(goal.id)}
                                                    className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition"
                                                    title="Delete goal"
                                                >
                                                    🗑️
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default Goal;
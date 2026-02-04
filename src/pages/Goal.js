import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Import Components
import PageHeader from "../components/common/PageHeader";
import AnimatedButton from "../components/common/AnimatedButton";
import GoalForm from "../components/goals/GoalForm";
import GoalStats from "../components/goals/GoalStats";
import GoalList from "../components/goals/GoalList";
import AddCategoryModal from "../components/goals/AddCategoryModal";

// Import Data
import { defaultCategories } from "../data/goalData";

const Goal = () => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState(defaultCategories);
    const [newCategory, setNewCategory] = useState("");
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const [goals, setGoals] = useState([]);
    const [activeCategory, setActiveCategory] = useState(null);
    const [goalText, setGoalText] = useState("");
    const [showStats, setShowStats] = useState(false);
    const [editingGoal, setEditingGoal] = useState(null);

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
            emoji: '🎯',
            gradient: 'from-gray-500 to-slate-500'
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
        setActiveCategory(null);
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
        setActiveCategory(null);
        toast.success("Goal updated!");
    };

    const handleCancelEdit = () => {
        setEditingGoal(null);
        setGoalText("");
        setActiveCategory(null);
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

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 p-4 md:p-8">
            <ToastContainer 
                position="bottom-center"
                autoClose={3000}
                theme="light"
            />

            <PageHeader
                title="Your Goals & Aspirations"
                description="Set and track your personal goals. Dream big, start small!"
                actionButton={
                    <div className="flex gap-4">
                        {goals.length > 0 && (
                            <AnimatedButton
                                onClick={() => setShowStats(!showStats)}
                                gradient="from-purple-500 to-pink-500"
                                icon="📊"
                            >
                                {showStats ? "Hide Stats" : "Show Stats"}
                            </AnimatedButton>
                        )}
                        <AnimatedButton
                            onClick={() => navigate("/")}
                            gradient="from-gray-500 to-slate-500"
                        >
                            Back to Home
                        </AnimatedButton>
                    </div>
                }
            />

            {/* Add Category Modal */}
            <AddCategoryModal
                isOpen={modalIsOpen}
                newCategory={newCategory}
                setNewCategory={setNewCategory}
                onSave={handleAddCategory}
                onClose={() => setModalIsOpen(false)}
            />

            {/* Goal Form */}
            <GoalForm
                goalText={goalText}
                setGoalText={setGoalText}
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
                categories={categories}
                editingGoal={editingGoal}
                onSave={editingGoal ? handleUpdateGoal : handleAddGoal}
                onCancelEdit={handleCancelEdit}
                onAddCategory={() => setModalIsOpen(true)}
            />

            {/* Statistics Section */}
            {showStats && goals.length > 0 && (
                <GoalStats
                    stats={stats}
                    categoryStats={stats.categoryStats}
                    dailyCompletions={stats.dailyCompletions}
                />
            )}

            {/* Goals List */}
            <GoalList
                goals={goals}
                categories={categories}
                onComplete={handleCompleteGoal}
                onEdit={handleEditGoal}
                onDelete={handleDeleteGoal}
            />
        </div>
    );
};

export default Goal;
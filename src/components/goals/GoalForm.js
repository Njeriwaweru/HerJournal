import CategorySelector from "./CategorySelector";
import AnimatedButton from "../common/AnimatedButton";

const GoalForm = ({ 
    goalText, 
    setGoalText, 
    activeCategory, 
    setActiveCategory, 
    categories, 
    editingGoal, 
    onSave, 
    onCancelEdit, 
    onAddCategory 
}) => {
    return (
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
                    <CategorySelector
                        categories={categories}
                        activeCategory={activeCategory}
                        onSelect={setActiveCategory}
                    />
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
                <AnimatedButton
                    onClick={onSave}
                    gradient="from-pink-500 to-purple-500"
                    size="lg"
                    icon={editingGoal ? "💾" : "🎯"}
                    className="w-full md:w-auto"
                >
                    {editingGoal ? "Update Goal" : "Add Goal"}
                </AnimatedButton>
                
                <div className="flex gap-4">
                    {editingGoal && (
                        <AnimatedButton
                            onClick={onCancelEdit}
                            gradient="from-gray-500 to-slate-500"
                            size="md"
                        >
                            Cancel Edit
                        </AnimatedButton>
                    )}
                    <AnimatedButton
                        onClick={onAddCategory}
                        gradient="from-blue-500 to-cyan-500"
                        size="md"
                        icon="+"
                    >
                        Add Category
                    </AnimatedButton>
                </div>
            </div>
        </div>
    );
};

export default GoalForm;
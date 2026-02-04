import GoalCard from "./GoalCard";

const GoalList = ({ goals, categories, onComplete, onEdit, onDelete }) => {
    if (goals.length === 0) {
        return (
            <div className="text-center py-12 bg-white rounded-2xl shadow-xl">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No goals yet</h3>
                <p className="text-gray-500">Start by adding your first goal above!</p>
            </div>
        );
    }

    const activeGoals = goals.filter(g => !g.completed).length;
    const completedGoals = goals.filter(g => g.completed).length;

    return (
        <div className="bg-white rounded-2xl shadow-xl p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Your Goals</h2>
                <span className="text-gray-600">
                    {activeGoals} active, {completedGoals} completed
                </span>
            </div>

            <div className="space-y-4">
                {goals.map((goal) => (
                    <GoalCard
                        key={goal.id}
                        goal={goal}
                        categories={categories}
                        onComplete={onComplete}
                        onEdit={onEdit}
                        onDelete={onDelete}
                    />
                ))}
            </div>
        </div>
    );
};

export default GoalList;
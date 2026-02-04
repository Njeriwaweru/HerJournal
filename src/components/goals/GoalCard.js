import { motion } from "framer-motion";

const GoalCard = ({ goal, categories, onComplete, onEdit, onDelete }) => {
    const category = categories.find(c => c.name === goal.category);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all ${
                goal.completed
                    ? 'bg-green-50 border-green-200'
                    : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
            }`}
        >
            <div className="flex items-center gap-4">
                <button
                    onClick={() => onComplete(goal.id)}
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
                    onClick={() => onEdit(goal)}
                    className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition"
                    title="Edit goal"
                >
                    ✏️
                </button>
                <button
                    onClick={() => onDelete(goal.id)}
                    className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition"
                    title="Delete goal"
                >
                    🗑️
                </button>
            </div>
        </motion.div>
    );
};

export default GoalCard;
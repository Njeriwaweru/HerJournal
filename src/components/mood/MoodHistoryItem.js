import { Clock } from "lucide-react";

const MoodHistoryItem = ({ mood }) => {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-4 border border-gray-100 hover:border-gray-200 transition">
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
            <p className="text-sm text-gray-500 mb-2">{formatDate(mood.date)}</p>
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
        </div>
    );
};

export default MoodHistoryItem;
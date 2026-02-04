const MoodContextCard = ({ moodData }) => {
    if (!moodData) return null;

    return (
        <div className="bg-white rounded-xl p-6 mb-6 shadow-lg">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <span className="text-5xl">{moodData.mood}</span>
                    <div>
                        <p className="text-xl font-semibold">Current Mood: {moodData.description}</p>
                        <p className="text-gray-600">Reflect on how you're feeling today</p>
                    </div>
                </div>
                <div className="text-right">
                    <p className="text-sm text-gray-500">
                        {new Date().toLocaleDateString('en-US', { 
                            weekday: 'long', 
                            month: 'long', 
                            day: 'numeric' 
                        })}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default MoodContextCard;
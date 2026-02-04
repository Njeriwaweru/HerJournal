const ReflectionHistoryItem = ({ reflection, tags }) => {
    const getSentimentColor = (text) => {
        const positiveWords = ['happy', 'good', 'great', 'excited', 'love', 'grateful', 'thankful', 'blessed', 'joy', 'peace'];
        const negativeWords = ['sad', 'bad', 'angry', 'frustrated', 'stress', 'anxious', 'worried', 'tired', 'hurt'];
        
        const words = text.toLowerCase().split(/\s+/);
        let positiveCount = 0;
        let negativeCount = 0;
        
        words.forEach(word => {
            if (positiveWords.includes(word)) positiveCount++;
            if (negativeWords.includes(word)) negativeCount++;
        });
        
        if (positiveCount > negativeCount) return "bg-green-50 border-green-200";
        if (negativeCount > positiveCount) return "bg-red-50 border-red-200";
        return "bg-blue-50 border-blue-200";
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now - date);
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays === 0) return "Today";
        if (diffDays === 1) return "Yesterday";
        if (diffDays < 7) return `${diffDays} days ago`;
        
        return date.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric',
            year: 'numeric'
        });
    };

    return (
        <div className={`border rounded-xl p-6 transition-all hover:shadow-md ${getSentimentColor(reflection.reflection)}`}>
            <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                    {reflection.mood && <span className="text-3xl">{reflection.mood.mood}</span>}
                    <div>
                        <p className="font-semibold text-lg">
                            {reflection.formattedDate || formatDate(reflection.date)}
                        </p>
                        {reflection.mood && (
                            <p className="text-gray-600">{reflection.mood.description}</p>
                        )}
                    </div>
                </div>
                <div className="text-right">
                    <p className="text-sm text-gray-500">{reflection.wordCount || 0} words</p>
                </div>
            </div>

            <p className="text-gray-700 whitespace-pre-line mb-4">{reflection.reflection}</p>

            {reflection.tags && reflection.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                    {reflection.tags.map((tag, tagIndex) => {
                        const tagInfo = tags.find(t => t.name === tag);
                        return (
                            <span 
                                key={tagIndex} 
                                className={`px-3 py-1 rounded-full text-sm ${tagInfo?.color || 'bg-gray-100 text-gray-800'}`}
                            >
                                {tagInfo?.emoji} {tag}
                            </span>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default ReflectionHistoryItem;
const ReflectionInput = ({ 
    value, 
    onChange, 
    wordCount, 
    selectedTagsCount,
    placeholder = "Write your thoughts here..." 
}) => {
    return (
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
                <p className="text-lg font-medium text-gray-700">What's on your mind today?</p>
                <div className="flex items-center gap-4">
                    <span className={`text-sm font-medium px-3 py-1 rounded-full ${
                        wordCount === 0 ? "bg-gray-100 text-gray-600" :
                        wordCount < 50 ? "bg-yellow-100 text-yellow-800" :
                        wordCount < 200 ? "bg-green-100 text-green-800" :
                        "bg-blue-100 text-blue-800"
                    }`}>
                        {wordCount} words
                    </span>
                    <span className={`text-sm font-medium px-3 py-1 rounded-full ${
                        selectedTagsCount === 0 ? "bg-gray-100 text-gray-600" : "bg-purple-100 text-purple-800"
                    }`}>
                        {selectedTagsCount} tags
                    </span>
                </div>
            </div>

            <textarea
                className="w-full h-64 md:h-96 p-6 text-lg rounded-xl bg-gray-50 focus:outline-none focus:ring-4 focus:ring-pink-300 focus:bg-white transition-all resize-none"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
        </div>
    );
};

export default ReflectionInput;
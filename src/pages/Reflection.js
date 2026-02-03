import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Reflection = () => {
    const navigate = useNavigate();
    const [reflection, setReflection] = useState("");
    const [moodData, setMoodData] = useState(null);
    const [reflectionHistory, setReflectionHistory] = useState([]);
    const [showHistory, setShowHistory] = useState(false);
    const [selectedTags, setSelectedTags] = useState([]);
    const [wordCount, setWordCount] = useState(0);

    const tags = [
        { id: 1, name: "Gratitude", emoji: "🙏", color: "bg-green-100 text-green-800" },
        { id: 2, name: "Challenge", emoji: "💪", color: "bg-red-100 text-red-800" },
        { id: 3, name: "Learning", emoji: "📚", color: "bg-blue-100 text-blue-800" },
        { id: 4, name: "Achievement", emoji: "🏆", color: "bg-yellow-100 text-yellow-800" },
        { id: 5, name: "Struggle", emoji: "🌧️", color: "bg-gray-100 text-gray-800" },
        { id: 6, name: "Hope", emoji: "🌈", color: "bg-purple-100 text-purple-800" },
        { id: 7, name: "Relationships", emoji: "👥", color: "bg-pink-100 text-pink-800" },
        { id: 8, name: "Self-care", emoji: "🧘", color: "bg-indigo-100 text-indigo-800" },
    ];

    // Load current mood and reflection history
    useEffect(() => {
        loadMoodData();
        loadReflectionHistory();
    }, []);

    // Update word count when reflection changes
    useEffect(() => {
        const words = reflection.trim().split(/\s+/).filter(word => word.length > 0);
        setWordCount(words.length);
    }, [reflection]);

    const loadMoodData = () => {
        const savedMoods = JSON.parse(localStorage.getItem("moodHistory")) || [];
        if (savedMoods.length > 0) {
            const latestMood = savedMoods[savedMoods.length - 1];
            setMoodData(latestMood);
        }
    };

    const loadReflectionHistory = () => {
        const savedReflections = JSON.parse(localStorage.getItem("reflections")) || [];
        setReflectionHistory(savedReflections);
    };

    const handleChange = (e) => {
        setReflection(e.target.value);
    };

    const toggleTag = (tagName) => {
        if (selectedTags.includes(tagName)) {
            setSelectedTags(selectedTags.filter(tag => tag !== tagName));
        } else {
            setSelectedTags([...selectedTags, tagName]);
        }
    };

    const handleSaveReflection = () => {
        if (!reflection.trim()) {
            toast.error("Please write something before saving!", {
                position: "bottom-center",
                autoClose: 3000,
            });
            return;
        }

        const currentReflection = {
            reflection: reflection.trim(),
            tags: selectedTags,
            date: new Date().toISOString(),
            formattedDate: new Date().toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            }),
            wordCount: wordCount,
            mood: moodData || null
        };

        const savedReflections = JSON.parse(localStorage.getItem("reflections")) || [];
        savedReflections.push(currentReflection);
        localStorage.setItem("reflections", JSON.stringify(savedReflections));

        // Save with mood if available
        if (moodData) {
            const savedMoods = JSON.parse(localStorage.getItem("moodHistory")) || [];
            if (savedMoods.length > 0) {
                savedMoods[savedMoods.length - 1].reflection = reflection.trim();
                savedMoods[savedMoods.length - 1].reflectionTags = selectedTags;
                localStorage.setItem("moodHistory", JSON.stringify(savedMoods));
            }
        }

        toast.success("Reflection saved successfully! 📝", {
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });

        // Reset form
        setReflection("");
        setSelectedTags([]);
        setWordCount(0);
        loadReflectionHistory();
    };

    const analyzeReflections = () => {
        if (reflectionHistory.length === 0) return null;

        const totalWords = reflectionHistory.reduce((sum, entry) => sum + (entry.wordCount || 0), 0);
        const avgWords = totalWords / reflectionHistory.length;
        
        const tagCounts = {};
        reflectionHistory.forEach(entry => {
            if (entry.tags) {
                entry.tags.forEach(tag => {
                    tagCounts[tag] = (tagCounts[tag] || 0) + 1;
                });
            }
        });

        const mostUsedTag = Object.entries(tagCounts).reduce((a, b) => 
            a[1] > b[1] ? a : b, ["", 0]
        );

        // Group by date
        const byDate = {};
        reflectionHistory.forEach(entry => {
            const date = new Date(entry.date).toLocaleDateString();
            if (!byDate[date]) byDate[date] = [];
            byDate[date].push(entry);
        });

        return {
            totalReflections: reflectionHistory.length,
            avgWords: avgWords.toFixed(0),
            mostUsedTag: mostUsedTag[0] || "None",
            tagCounts,
            byDate
        };
    };

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

    const analysis = analyzeReflections();

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

            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Today's Reflection</h1>
                {reflectionHistory.length > 0 && (
                    <button
                        onClick={() => setShowHistory(!showHistory)}
                        className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition"
                    >
                        {showHistory ? "Hide History" : "Show History"}
                    </button>
                )}
            </div>

            {/* Mood Context */}
            {moodData && (
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
                            <p className="text-sm text-gray-500">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Tags Selection */}
            <div className="mb-6">
                <p className="text-lg font-medium text-gray-700 mb-3">Add tags to your reflection:</p>
                <div className="flex flex-wrap gap-2">
                    {tags.map(tag => (
                        <button
                            key={tag.id}
                            onClick={() => toggleTag(tag.name)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                                selectedTags.includes(tag.name) 
                                    ? `${tag.color} ring-2 ring-offset-2 ring-opacity-50`
                                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                            }`}
                        >
                            <span>{tag.emoji}</span>
                            <span>{tag.name}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Text Area */}
            <div className="flex-1">
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
                                selectedTags.length === 0 ? "bg-gray-100 text-gray-600" : "bg-purple-100 text-purple-800"
                            }`}>
                                {selectedTags.length} tags
                            </span>
                        </div>
                    </div>

                    <textarea
                        className="w-full h-64 md:h-96 p-6 text-lg rounded-xl bg-gray-50 focus:outline-none focus:ring-4 focus:ring-pink-300 focus:bg-white transition-all resize-none"
                        placeholder="Write your thoughts here... What made you feel this way? What are you grateful for? What challenges did you face?..."
                        value={reflection}
                        onChange={handleChange}
                    />
                </div>

                <div className="flex flex-col md:flex-row gap-4 justify-center items-center mt-8">
                    <button
                        className="bg-pink-500 hover:bg-pink-600 text-white text-xl font-medium w-full md:w-auto px-8 py-4 rounded-full shadow-lg transition transform hover:scale-105 active:scale-95"
                        onClick={handleSaveReflection}
                    >
                        💾 Save Reflection
                    </button>

                    <button
                        onClick={() => navigate("/goal")}
                        className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white text-xl font-medium w-full md:w-auto px-8 py-4 rounded-full shadow-lg transition transform hover:scale-105 active:scale-95"
                    >
                        🎯 Set Today's Goal
                    </button>
                </div>
            </div>

            {/* Reflection History & Analysis */}
            {showHistory && reflectionHistory.length > 0 && (
                <div className="mt-12 bg-white rounded-2xl shadow-xl p-6">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-2xl font-bold text-gray-800">Your Reflection History</h2>
                        {analysis && (
                            <div className="flex gap-4">
                                <div className="text-center">
                                    <p className="text-2xl font-bold text-blue-600">{analysis.totalReflections}</p>
                                    <p className="text-sm text-gray-600">Total Entries</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-2xl font-bold text-green-600">{analysis.avgWords}</p>
                                    <p className="text-sm text-gray-600">Avg Words</p>
                                </div>
                            </div>
                        )}
                    </div>

                    {analysis && (
                        <div className="mb-8">
                            <h3 className="text-lg font-semibold mb-4">📊 Reflection Insights</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-xl">
                                    <p className="font-medium">Most Used Tag</p>
                                    <p className="text-2xl font-bold mt-2">
                                        {analysis.mostUsedTag !== "None" 
                                            ? tags.find(t => t.name === analysis.mostUsedTag)?.emoji || "📝"
                                            : "📝"} {analysis.mostUsedTag}
                                    </p>
                                </div>
                                <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl">
                                    <p className="font-medium">Tag Usage</p>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {Object.entries(analysis.tagCounts).slice(0, 3).map(([tag, count]) => (
                                            <span key={tag} className="px-3 py-1 bg-white rounded-full text-sm">
                                                {tag}: {count}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl">
                                    <p className="font-medium">Writing Habit</p>
                                    <p className="text-lg mt-2">
                                        You reflect about every {(30 / analysis.totalReflections).toFixed(1)} days
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="space-y-6">
                        {reflectionHistory.slice().reverse().map((entry, index) => (
                            <div 
                                key={index} 
                                className={`border rounded-xl p-6 transition-all hover:shadow-md ${getSentimentColor(entry.reflection)}`}
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex items-center gap-3">
                                        {entry.mood && <span className="text-3xl">{entry.mood.mood}</span>}
                                        <div>
                                            <p className="font-semibold text-lg">{entry.formattedDate || formatDate(entry.date)}</p>
                                            {entry.mood && (
                                                <p className="text-gray-600">{entry.mood.description}</p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm text-gray-500">{entry.wordCount || 0} words</p>
                                    </div>
                                </div>

                                <p className="text-gray-700 whitespace-pre-line mb-4">{entry.reflection}</p>

                                {entry.tags && entry.tags.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mt-4">
                                        {entry.tags.map((tag, tagIndex) => {
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
                        ))}
                    </div>

                    {reflectionHistory.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-4xl mb-4">📝</p>
                            <p className="text-xl font-semibold text-gray-700">No reflections yet</p>
                            <p className="text-gray-500">Start writing to see your history here!</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Reflection;
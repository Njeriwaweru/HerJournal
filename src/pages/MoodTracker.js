import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Import Components
import PageHeader from "../components/common/PageHeader";
import AnimatedButton from "../components/common/AnimatedButton";
import MoodCard from "../components/mood/MoodCard";
import SelectedMoodDetails from "../components/mood/SelectedMoodDetails";
import MoodAnalytics from "../components/mood/MoodAnalytics";

// Import Data
import { moods, moodCategories } from "../data/moodData";

const MoodTracker = () => {
    const navigate = useNavigate();
    const [selectedMood, setSelectedMood] = useState(null);
    const [moodHistory, setMoodHistory] = useState([]);
    const [showHistory, setShowHistory] = useState(false);
    const [analysis, setAnalysis] = useState(null);
    const [selectedIntensity, setSelectedIntensity] = useState(3);
    const [activeCategory, setActiveCategory] = useState("all");

    // Load mood history on component mount
    useEffect(() => {
        loadMoodHistory();
    }, []);

    const loadMoodHistory = () => {
        const savedMoods = JSON.parse(localStorage.getItem("moodHistory")) || [];
        setMoodHistory(savedMoods);
        analyzeMoods(savedMoods);
    };

    // Add this analyzeMoods function
    const analyzeMoods = (moodsData) => {
        if (moodsData.length === 0) {
            setAnalysis(null);
            return;
        }

        // Simple analysis for now
        const positiveCount = moodsData.filter(m => m.category === "Positive").length;
        const totalCount = moodsData.length;
        
        setAnalysis({
            totalEntries: totalCount,
            positivePercentage: ((positiveCount / totalCount) * 100).toFixed(1),
            negativePercentage: (((totalCount - positiveCount) / totalCount) * 100).toFixed(1)
        });
    };

    const handleSelectMood = (mood) => {
        setSelectedMood(mood);
        toast.info(`Selected: ${mood.label}`, {
            position: "bottom-center",
            autoClose: 2000,
            icon: mood.emoji
        });
    };

    const handleSaveMood = () => {
        if (!selectedMood) return;

        const currentMood = {
            mood: selectedMood.emoji,
            label: selectedMood.label,
            description: selectedMood.description,
            category: selectedMood.category,
            intensity: selectedIntensity,
            color: selectedMood.color,
            date: new Date().toISOString(),
            timestamp: Date.now(),
            formattedDate: new Date().toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            })
        };
        
        const savedMoods = JSON.parse(localStorage.getItem("moodHistory")) || [];
        savedMoods.push(currentMood);
        localStorage.setItem("moodHistory", JSON.stringify(savedMoods));
        
        toast.success(
            <div className="flex items-center space-x-2">
                <span className="text-2xl">{selectedMood.emoji}</span>
                <span>Mood saved! Redirecting to reflection...</span>
            </div>,
            {
                position: "bottom-center",
                autoClose: 1500,
            }
        );
        
        setTimeout(() => {
            navigate("/reflection");
        }, 1500);
    };

    const filteredMoods = activeCategory === "all" 
        ? moods 
        : moods.filter(mood => mood.category === activeCategory);

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 p-4 md:p-8">
            <ToastContainer position="bottom-center" autoClose={2000} theme="light" />
            
            <PageHeader
                title="How are you feeling today?"
                description="Select how you're feeling right now. You can adjust the intensity and add notes."
                actionButton={
                    moodHistory.length > 0 && (
                        <AnimatedButton
                            onClick={() => setShowHistory(!showHistory)}
                            gradient="from-purple-500 to-pink-500"
                            icon={showHistory ? "📊" : "📈"}
                        >
                            {showHistory ? "Hide Insights" : "Show Insights"}
                        </AnimatedButton>
                    )
                }
            />

            {/* Mood Category Filter */}
            <div className="mb-8">
                <div className="flex flex-wrap gap-2 mb-4">
                    {moodCategories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => setActiveCategory(category.value)}
                            className={`px-4 py-2 rounded-full transition ${activeCategory === category.value 
                                ? `bg-gradient-to-r ${category.gradient} text-white` 
                                : 'bg-white text-gray-600 hover:bg-gray-100'
                            }`}
                        >
                            {category.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Mood Selection Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mb-12">
                {filteredMoods.map((mood, index) => (
                    <MoodCard
                        key={index}
                        mood={mood}
                        isSelected={selectedMood?.emoji === mood.emoji}
                        onSelect={handleSelectMood}
                    />
                ))}
            </div>

            {/* Selected Mood Details */}
            {selectedMood && (
                <SelectedMoodDetails
                    mood={selectedMood}
                    intensity={selectedIntensity}
                    onIntensityChange={setSelectedIntensity}
                    onSave={handleSaveMood}
                />
            )}

            {/* Mood Analytics Section */}
            {showHistory && moodHistory.length > 0 && (
                <MoodAnalytics
                    moodHistory={moodHistory}
                    analysis={analysis}
                    onClose={() => setShowHistory(false)}
                />
            )}

            {/* Empty State */}
            {showHistory && moodHistory.length === 0 && (
                <div className="text-center py-12 bg-white rounded-2xl shadow-lg">
                    <div className="text-4xl mb-4">📊</div>
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">No mood history yet</h3>
                    <p className="text-gray-500">Start tracking your mood to see insights and patterns!</p>
                </div>
            )}
        </div>
    );
};

export default MoodTracker;
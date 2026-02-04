import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Import Components
import PageHeader from "../components/common/PageHeader";
import AnimatedButton from "../components/common/AnimatedButton";
import TagSelector from "../components/reflection/TagSelector";
import ReflectionInput from "../components/reflection/ReflectionInput";
import MoodContextCard from "../components/reflection/MoodContextCard";
import ReflectionActions from "../components/reflection/ReflectionActions";
import ReflectionAnalytics from "../components/reflection/ReflectionAnalytics";
import ReflectionHistoryItem from "../components/reflection/ReflectionHistoryItem";

// Import Data
import { reflectionTags } from "../data/reflectionData";

const Reflection = () => {
    const navigate = useNavigate();
    const [reflection, setReflection] = useState("");
    const [moodData, setMoodData] = useState(null);
    const [reflectionHistory, setReflectionHistory] = useState([]);
    const [showHistory, setShowHistory] = useState(false);
    const [selectedTags, setSelectedTags] = useState([]);
    const [wordCount, setWordCount] = useState(0);

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

        return {
            totalReflections: reflectionHistory.length,
            avgWords: avgWords.toFixed(0),
            mostUsedTag: mostUsedTag[0] || "None",
            tagCounts
        };
    };

    const analysis = analyzeReflections();

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 p-4 md:p-8">
            <ToastContainer 
                position="bottom-center"
                autoClose={3000}
                theme="light"
            />

            <PageHeader
                title="Today's Reflection"
                description="Take a moment to reflect on your day. What's on your mind?"
                actionButton={
                    reflectionHistory.length > 0 && (
                        <AnimatedButton
                            onClick={() => setShowHistory(!showHistory)}
                            gradient="from-purple-500 to-pink-500"
                        >
                            {showHistory ? "Hide History" : "Show History"}
                        </AnimatedButton>
                    )
                }
            />

            {/* Mood Context */}
            <MoodContextCard moodData={moodData} />

            {/* Tags Selection */}
            <TagSelector
                tags={reflectionTags}
                selectedTags={selectedTags}
                onTagToggle={toggleTag}
            />

            {/* Text Area */}
            <div className="flex-1">
                <ReflectionInput
                    value={reflection}
                    onChange={handleChange}
                    wordCount={wordCount}
                    selectedTagsCount={selectedTags.length}
                    placeholder="Write your thoughts here... What made you feel this way? What are you grateful for? What challenges did you face?..."
                />

                <ReflectionActions
                    onSave={handleSaveReflection}
                    onSetGoals={() => navigate("/goal")}
                    isSaveDisabled={!reflection.trim()}
                />
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

                    <ReflectionAnalytics analysis={analysis} tags={reflectionTags} />

                    <div className="space-y-6">
                        {reflectionHistory.slice().reverse().map((entry, index) => (
                            <ReflectionHistoryItem
                                key={index}
                                reflection={entry}
                                tags={reflectionTags}
                            />
                        ))}
                    </div>
                </div>
            )}

            {/* Empty State for History */}
            {showHistory && reflectionHistory.length === 0 && (
                <div className="text-center py-12 bg-white rounded-2xl shadow-lg mt-8">
                    <div className="text-4xl mb-4">📝</div>
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">No reflections yet</h3>
                    <p className="text-gray-500">Start writing to see your history here!</p>
                </div>
            )}
        </div>
    );
};

export default Reflection;
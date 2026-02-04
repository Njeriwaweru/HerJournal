import { motion } from "framer-motion";
import AnimatedButton from "../common/AnimatedButton";

const SelectedMoodDetails = ({ mood, intensity, onIntensityChange, onSave }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="bg-white rounded-2xl shadow-xl p-6 mb-8"
        >
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center space-x-6">
                    <div className={`w-24 h-24 rounded-2xl flex items-center justify-center bg-gradient-to-br ${mood.gradient} shadow-lg`}>
                        <span className="text-6xl">{mood.emoji}</span>
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">
                            {mood.label}
                        </h3>
                        <p className="text-gray-600 mb-4 max-w-md">
                            {mood.description}
                        </p>
                        <div className="flex items-center space-x-4">
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                mood.category === "Positive" 
                                    ? "bg-green-100 text-green-800"
                                    : mood.category === "Negative"
                                    ? "bg-red-100 text-red-800"
                                    : "bg-blue-100 text-blue-800"
                            }`}>
                                {mood.category} Mood
                            </span>
                            <div className="flex items-center space-x-2">
                                <span className="text-sm text-gray-600">Intensity:</span>
                                <div className="flex space-x-1">
                                    {[...Array(5)].map((_, i) => (
                                        <button
                                            key={i}
                                            onClick={() => onIntensityChange(i + 1)}
                                            className={`w-6 h-6 rounded-full transition ${
                                                i < intensity
                                                    ? 'bg-current'
                                                    : 'bg-gray-200'
                                            }`}
                                            style={{ color: mood.color }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <AnimatedButton
                    onClick={onSave}
                    gradient="from-pink-500 to-purple-500"
                    size="lg"
                    icon="💾"
                    className="w-full md:w-auto"
                >
                    Save & Continue to Reflection
                </AnimatedButton>
            </div>
        </motion.div>
    );
};

export default SelectedMoodDetails;
import { motion } from "framer-motion";

const StatsCounter = ({ stats }) => {
    if (stats.moodEntries === 0) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mb-16"
        >
            <div className="inline-grid grid-cols-3 gap-8 bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                <div className="text-center">
                    <div className="text-3xl font-bold text-pink-600 mb-2">{stats.moodEntries}</div>
                    <div className="text-sm text-gray-600">Moods Tracked</div>
                </div>
                <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600 mb-2">{stats.reflections}</div>
                    <div className="text-sm text-gray-600">Reflections</div>
                </div>
                <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-2">{stats.goals}</div>
                    <div className="text-sm text-gray-600">Goals Set</div>
                </div>
            </div>
        </motion.div>
    );
};

export default StatsCounter;
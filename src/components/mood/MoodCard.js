import { motion } from "framer-motion";

const MoodCard = ({ mood, isSelected, onSelect, showIntensity = true }) => {
    return (
        <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSelect(mood)}
            className={`relative overflow-hidden rounded-2xl p-6 text-center transition-all duration-300 ${
                isSelected
                    ? 'ring-4 ring-offset-2 transform scale-105 shadow-2xl'
                    : 'shadow-lg hover:shadow-xl'
            }`}
            style={{
                background: isSelected 
                    ? `linear-gradient(135deg, ${mood.color}20, white)`
                    : 'white',
                border: `2px solid ${isSelected ? mood.color : 'transparent'}`
            }}
        >
            <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4 bg-gradient-to-br ${mood.gradient}`}>
                <span className="text-4xl">{mood.emoji}</span>
            </div>
            <h3 className="font-bold text-lg text-gray-800 mb-2">{mood.label}</h3>
            <p className="text-sm text-gray-600 mb-3">{mood.description}</p>
            
            {showIntensity && (
                <div className="flex justify-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                        <div 
                            key={i}
                            className={`w-2 h-2 rounded-full ${i < mood.intensity ? 'bg-current' : 'bg-gray-300'}`}
                            style={{ color: mood.color }}
                        />
                    ))}
                </div>
            )}
            
            {isSelected && (
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-2 right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center"
                >
                    <span className="text-white text-sm">✓</span>
                </motion.div>
            )}
        </motion.button>
    );
};

export default MoodCard;
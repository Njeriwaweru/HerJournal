import { motion } from "framer-motion";

const CategorySelector = ({ categories, activeCategory, onSelect }) => {
    return (
        <div className="mb-4">
            <label className="block text-lg font-medium text-gray-700 mb-3">Select Category</label>
            <div className="grid grid-cols-2 gap-3">
                {categories.map((category) => (
                    <motion.button
                        key={category.id}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => onSelect(category.name)}
                        className={`flex items-center justify-center gap-2 p-3 rounded-xl transition-all ${
                            activeCategory === category.name
                                ? 'ring-2 ring-offset-2 transform scale-105'
                                : 'hover:scale-105'
                        }`}
                        style={{
                            backgroundColor: `${category.color}20`,
                            border: `2px solid ${activeCategory === category.name ? category.color : 'transparent'}`,
                            color: category.color
                        }}
                    >
                        <span className="text-xl">{category.emoji}</span>
                        <span className="font-medium">{category.name}</span>
                    </motion.button>
                ))}
            </div>
        </div>
    );
};

export default CategorySelector;
import { motion } from "framer-motion";

const TagSelector = ({ tags, selectedTags, onTagToggle }) => {
    return (
        <div className="mb-6">
            <p className="text-lg font-medium text-gray-700 mb-3">Add tags to your reflection:</p>
            <div className="flex flex-wrap gap-2">
                {tags.map(tag => (
                    <motion.button
                        key={tag.id}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => onTagToggle(tag.name)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                            selectedTags.includes(tag.name) 
                                ? `${tag.color} ring-2 ring-offset-2 ring-opacity-50`
                                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                    >
                        <span>{tag.emoji}</span>
                        <span>{tag.name}</span>
                    </motion.button>
                ))}
            </div>
        </div>
    );
};

export default TagSelector;
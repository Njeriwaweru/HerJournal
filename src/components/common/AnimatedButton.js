import { motion } from "framer-motion";

const AnimatedButton = ({ 
    children, 
    onClick, 
    gradient = "from-pink-500 to-purple-500", 
    className = "", 
    icon = null,
    size = "md",
    disabled = false
}) => {
    const sizes = {
        sm: "px-4 py-2 text-sm",
        md: "px-6 py-3 text-base",
        lg: "px-8 py-4 text-lg"
    };

    return (
        <motion.button
            whileHover={{ scale: disabled ? 1 : 1.05 }}
            whileTap={{ scale: disabled ? 1 : 0.95 }}
            onClick={onClick}
            disabled={disabled}
            className={`bg-gradient-to-r ${gradient} text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all ${sizes[size]} ${className} ${
                disabled ? 'opacity-50 cursor-not-allowed' : ''
            }`}
        >
            <div className="flex items-center justify-center gap-2">
                {icon && <span>{icon}</span>}
                {children}
            </div>
        </motion.button>
    );
};

export default AnimatedButton;
import { motion } from "framer-motion";

const StatsCard = ({ icon, value, label, description, color, gradient, onClick }) => {
    return (
        <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            className={`bg-gradient-to-r ${gradient} p-4 rounded-xl border border-opacity-20 shadow-lg cursor-pointer ${onClick ? 'hover:shadow-xl' : ''}`}
            onClick={onClick}
        >
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-3xl font-bold text-white mb-2">{value}</p>
                    <p className="font-semibold text-white">{label}</p>
                    {description && (
                        <p className="text-sm text-white text-opacity-80 mt-1">{description}</p>
                    )}
                </div>
                <div className="text-white opacity-80">
                    {icon}
                </div>
            </div>
        </motion.div>
    );
};

export default StatsCard;
import { motion } from "framer-motion";

const FeatureCard = ({ feature, onClick }) => {
    return (
        <motion.div
            whileHover={{ y: -10 }}
            onClick={onClick}
            className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group"
        >
            <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <div className="text-white">
                    {feature.icon}
                </div>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">{feature.title}</h3>
            <p className="text-gray-600 mb-4">{feature.description}</p>
            <div className="flex items-center text-sm font-medium text-gray-500 group-hover:text-gray-700 transition">
                Explore feature
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </div>
        </motion.div>
    );
};

export default FeatureCard;
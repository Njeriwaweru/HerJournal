import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import AnimatedButton from "../common/AnimatedButton";

const HeroSection = ({ onStartJourney, onBrowseFeatures }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
        >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-pink-100 to-purple-100 mb-8">
                <Sparkles className="w-4 h-4 text-pink-500 mr-2" />
                <span className="text-sm font-medium text-pink-700">
                    Your personal wellness companion
                </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
                <span className="block bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                    Reflect. Grow. Shine
                </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-2xl mx-auto">
                Track your emotions, journal your journey, and achieve your goals 
                with our intuitive wellness platform designed just for you.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                <AnimatedButton
                    onClick={onStartJourney}
                    gradient="from-pink-500 to-purple-500"
                    size="lg"
                    className="px-8 py-4"
                >
                    Start Your Journey →
                </AnimatedButton>
                
                <AnimatedButton
                    onClick={onBrowseFeatures}
                    gradient="from-white to-gray-50"
                    size="lg"
                    className="px-8 py-4 border border-gray-200 text-gray-800"
                >
                    Browse Features
                </AnimatedButton>
            </div>
        </motion.div>
    );
};

export default HeroSection;
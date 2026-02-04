import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

// Import Components
import BackgroundBlobs from "../components/home/BackgroundBlobs";
import HeroSection from "../components/home/HeroSection";
import StatsCounter from "../components/home/StatsCounter";
import FeatureCard from "../components/home/FeatureCard";
import TestimonialCard from "../components/home/TestimonialCard";
import CTASection from "../components/home/CTASection";
import AppFooter from "../components/home/AppFooter";
import AnimatedButton from "../components/common/AnimatedButton";

// Import Data
import { features, testimonials } from "../data/homeData";

const Home = () => {
    const navigate = useNavigate();
    const [stats, setStats] = useState({ moodEntries: 0, reflections: 0, goals: 0 });

    // Load stats from localStorage
    useEffect(() => {
        const savedMoods = JSON.parse(localStorage.getItem("moodHistory")) || [];
        const savedReflections = JSON.parse(localStorage.getItem("reflections")) || [];
        const savedGoals = JSON.parse(localStorage.getItem("goals")) || [];
        
        setStats({
            moodEntries: savedMoods.length,
            reflections: savedReflections.length,
            goals: savedGoals.length
        });
    }, []);

    const handleFeatureClick = (path) => {
        navigate(path);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 overflow-hidden">
            <BackgroundBlobs />

            <div className="relative z-10">
                {/* Navigation */}
                <nav className="container mx-auto px-6 py-4">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                            <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-500 rounded-xl flex items-center justify-center">
                                <Sparkles className="w-6 h-6 text-white" />
                            </div>
                            <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                                HerJournal🌸
                            </h1>
                        </div>
                        <div className="flex items-center space-x-4">
                            <button 
                                onClick={() => navigate("/mood-tracker")}
                                className="px-4 py-2 text-gray-600 hover:text-gray-900 font-medium transition"
                            >
                                Start Tracking
                            </button>
                            {stats.moodEntries > 0 && (
                                <button 
                                    onClick={() => navigate("/reflection")}
                                    className="px-4 py-2 text-gray-600 hover:text-gray-900 font-medium transition"
                                >
                                    Your Journal
                                </button>
                            )}
                        </div>
                    </div>
                </nav>

                {/* Main Content */}
                <main className="container mx-auto px-6 pt-16 pb-24">
                    <div className="max-w-4xl mx-auto text-center">
                        <HeroSection
                            onStartJourney={() => navigate("/mood-tracker")}
                            onBrowseFeatures={() => navigate("/reflection")}
                        />

                        {/* Stats Counter */}
                        <StatsCounter stats={stats} />

                        {/* Features Grid */}
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="mb-24"
                        >
                            <h2 className="text-3xl font-bold text-gray-800 mb-12">
                                Everything you need for personal growth
                            </h2>
                            
                            <div className="grid md:grid-cols-3 gap-8">
                                {features.map((feature, index) => (
                                    <FeatureCard
                                        key={index}
                                        feature={feature}
                                        onClick={() => handleFeatureClick(feature.path)}
                                    />
                                ))}
                            </div>
                        </motion.div>

                        {/* Testimonials */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="mb-16"
                        >
                            <h2 className="text-3xl font-bold text-gray-800 mb-12">
                                Loved by our community
                            </h2>
                            
                            <div className="grid md:grid-cols-3 gap-6">
                                {testimonials.map((testimonial, index) => (
                                    <TestimonialCard
                                        key={index}
                                        testimonial={testimonial}
                                    />
                                ))}
                            </div>
                        </motion.div>

                        {/* CTA Section */}
                        <CTASection
                            onBeginFree={() => navigate("/mood-tracker")}
                            onSeeHowItWorks={() => navigate("/reflection")}
                        />
                    </div>
                </main>

                {/* Footer */}
                <AppFooter />
            </div>

            {/* Add animations to CSS */}
            <style jsx>{`
                @keyframes blob {
                    0% {
                        transform: translate(0px, 0px) scale(1);
                    }
                    33% {
                        transform: translate(30px, -50px) scale(1.1);
                    }
                    66% {
                        transform: translate(-20px, 20px) scale(0.9);
                    }
                    100% {
                        transform: translate(0px, 0px) scale(1);
                    }
                }
                .animate-blob {
                    animation: blob 7s infinite;
                }
                .animation-delay-2000 {
                    animation-delay: 2s;
                }
                .animation-delay-4000 {
                    animation-delay: 4s;
                }
            `}</style>
        </div>
    );
};

export default Home;
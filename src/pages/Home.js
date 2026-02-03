import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Heart, Target, PenTool, TrendingUp, Users } from "lucide-react";

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

    const features = [
        {
            icon: <Heart className="w-8 h-8" />,
            title: "Mood Tracking",
            description: "Track your emotions daily with beautiful emoji-based interface",
            color: "from-pink-500 to-rose-500",
            path: "/mood-tracker"
        },
        {
            icon: <PenTool className="w-8 h-8" />,
            title: "Daily Reflections",
            description: "Journal your thoughts with guided prompts and tags",
            color: "from-purple-500 to-indigo-500",
            path: "/reflection"
        },
        {
            icon: <Target className="w-8 h-8" />,
            title: "Goal Setting",
            description: "Set and track personal goals with progress monitoring",
            color: "from-blue-500 to-cyan-500",
            path: "/goal"
        }
    ];

    const testimonials = [
        {
            text: "This app helped me understand my emotional patterns better than anything else!",
            author: "Sarah M."
        },
        {
            text: "The daily reflections feature has become my morning ritual. Life-changing!",
            author: "Priya K."
        },
        {
            text: "Finally a journaling app that's actually beautiful and easy to use.",
            author: "Alex T."
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
            </div>

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

                {/* Hero Section */}
                <main className="container mx-auto px-6 pt-16 pb-24">
                    <div className="max-w-4xl mx-auto text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
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
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => navigate("/mood-tracker")}
                                    className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                                >
                                    Start Your Journey →
                                </motion.button>
                                
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => navigate("/reflection")}
                                    className="px-8 py-4 bg-white text-gray-800 font-semibold rounded-2xl shadow-lg hover:shadow-xl border border-gray-200 transition-all duration-300"
                                >
                                    Browse Features
                                </motion.button>
                            </div>
                        </motion.div>

                        {/* Stats Counter */}
                        {stats.moodEntries > 0 && (
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
                        )}

                        {/* Features Grid */}
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="mb-24"
                        >
                            <h2 className="text-3xl font-bold text-gray-800 mb-12">Everything you need for personal growth</h2>
                            
                            <div className="grid md:grid-cols-3 gap-8">
                                {features.map((feature, index) => (
                                    <motion.div
                                        key={index}
                                        whileHover={{ y: -10 }}
                                        onClick={() => navigate(feature.path)}
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
                            <h2 className="text-3xl font-bold text-gray-800 mb-12">Loved by our community</h2>
                            
                            <div className="grid md:grid-cols-3 gap-6">
                                {testimonials.map((testimonial, index) => (
                                    <div key={index} className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 shadow-lg">
                                        <div className="flex items-center mb-4">
                                            {[...Array(5)].map((_, i) => (
                                                <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                            ))}
                                        </div>
                                        <p className="text-gray-700 italic mb-4">"{testimonial.text}"</p>
                                        <p className="font-semibold text-gray-800">{testimonial.author}</p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* CTA Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8 }}
                            className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-3xl p-8 md:p-12 text-white shadow-2xl"
                        >
                            <div className="max-w-2xl mx-auto text-center">
                                <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to start your wellness journey?</h2>
                                <p className="text-lg opacity-90 mb-8">
                                    Join thousands of women who have transformed their self-care routine with HerJournal.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => navigate("/mood-tracker")}
                                        className="px-8 py-4 bg-white text-pink-600 font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                                    >
                                        Begin for Free
                                    </motion.button>
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => navigate("/reflection")}
                                        className="px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-2xl hover:bg-white/10 transition-all duration-300"
                                    >
                                        See How It Works
                                    </motion.button>
                                </div>
                                <p className="text-sm opacity-80 mt-6">
                                    No credit card required • 100% private • Your data stays with you
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </main>

                {/* Footer */}
                <footer className="container mx-auto px-6 py-8 text-center text-gray-600">
                    <p className="mb-4">Made with ❤️ for women's wellness and self-discovery</p>
                    <p className="text-sm">© {new Date().getFullYear()} HerJournal. All rights reserved.</p>
                </footer>
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
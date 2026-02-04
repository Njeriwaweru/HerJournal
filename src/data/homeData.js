import { Heart, PenTool, Target } from "lucide-react";

export const features = [
    {
        icon: <Heart className="w-8 h-8" />,
        title: "Mood Tracking",
        description: "Track your emotions daily with beautiful emoji-based interface",
        color: "from-pink-500 to-rose-500",
        gradient: "bg-gradient-to-r from-pink-500 to-rose-500",
        path: "/mood-tracker"
    },
    {
        icon: <PenTool className="w-8 h-8" />,
        title: "Daily Reflections",
        description: "Journal your thoughts with guided prompts and tags",
        color: "from-purple-500 to-indigo-500",
        gradient: "bg-gradient-to-r from-purple-500 to-indigo-500",
        path: "/reflection"
    },
    {
        icon: <Target className="w-8 h-8" />,
        title: "Goal Setting",
        description: "Set and track personal goals with progress monitoring",
        color: "from-blue-500 to-cyan-500",
        gradient: "bg-gradient-to-r from-blue-500 to-cyan-500",
        path: "/goal"
    }
];

export const testimonials = [
    {
        text: "This app helped me understand my emotional patterns better than anything else!",
        author: "Sarah M.",
        rating: 5
    },
    {
        text: "The daily reflections feature has become my morning ritual. Life-changing!",
        author: "Priya K.",
        rating: 5
    },
    {
        text: "Finally a journaling app that's actually beautiful and easy to use.",
        author: "Alex T.",
        rating: 5
    }
];
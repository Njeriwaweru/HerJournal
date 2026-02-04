export const moods = [
    { 
        emoji: "🌞", 
        label: "Excellent", 
        description: "Feeling wonderful and energized",
        color: "#FBBF24",
        gradient: "from-yellow-400 to-orange-400",
        category: "Positive",
        intensity: 5
    },
    { 
        emoji: "😌", 
        label: "Relaxed", 
        description: "Calm, peaceful, and content",
        color: "#34D399",
        gradient: "from-emerald-400 to-teal-400",
        category: "Positive",
        intensity: 4
    },
    { 
        emoji: "🤩", 
        label: "Excited", 
        description: "Full of energy and enthusiasm",
        color: "#A78BFA",
        gradient: "from-purple-400 to-violet-400",
        category: "Positive",
        intensity: 5
    },
    { 
        emoji: "😓", 
        label: "Anxious", 
        description: "Feeling worried or nervous",
        color: "#F97316",
        gradient: "from-orange-400 to-amber-400",
        category: "Negative",
        intensity: 3
    },
    { 
        emoji: "😰", 
        label: "Stressed", 
        description: "Under pressure or overwhelmed",
        color: "#EF4444",
        gradient: "from-red-400 to-rose-400",
        category: "Negative",
        intensity: 4
    },
    { 
        emoji: "😡", 
        label: "Frustrated", 
        description: "Feeling annoyed or upset",
        color: "#DC2626",
        gradient: "from-rose-600 to-pink-600",
        category: "Negative",
        intensity: 5
    },
    { 
        emoji: "😊", 
        label: "Happy", 
        description: "Feeling joyful and satisfied",
        color: "#10B981",
        gradient: "from-green-400 to-emerald-400",
        category: "Positive",
        intensity: 4
    },
    { 
        emoji: "😔", 
        label: "Sad", 
        description: "Feeling down or disappointed",
        color: "#6B7280",
        gradient: "from-gray-400 to-slate-400",
        category: "Negative",
        intensity: 3
    },
    { 
        emoji: "😴", 
        label: "Tired", 
        description: "Low energy, needing rest",
        color: "#8B5CF6",
        gradient: "from-indigo-400 to-purple-400",
        category: "Neutral",
        intensity: 2
    }
];

export const moodCategories = [
    { id: 1, value: "all", label: "All Moods", gradient: "from-pink-500 to-purple-500" },
    { id: 2, value: "Positive", label: "😊 Positive", gradient: "from-green-500 to-emerald-500" },
    { id: 3, value: "Negative", label: "😔 Negative", gradient: "from-red-500 to-rose-500" },
    { id: 4, value: "Neutral", label: "😐 Neutral", gradient: "from-blue-500 to-cyan-500" }
];
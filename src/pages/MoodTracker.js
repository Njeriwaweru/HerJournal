import { useState } from "react";
import Logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";


const MoodTracker = () => {
    const navigate = useNavigate()

    const moods = ["🌞", "😌", "🤩", "😓", "😰", "😡"];
    const [selectedMood, setSelectedMood] = useState(null);

    const handleSaveMood = () => {
        const currentMood = {mood: selectedMood, date: new Date().toISOString()}

        const savedMoods = JSON.parse(localStorage.getItem("moodHistory")) || [];
        savedMoods.push(currentMood)
        localStorage.setItem("moodHistory", JSON.stringify(savedMoods))

        navigate("/reflection")
    }

    return (
        <div className = "min-h-screen flex flex-col  bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200">
            <h1 className="text-center font-bold text-4xl mt-12 p-2">How are you feeling today?</h1>
            <div className="grid grid-cols-3 gap-y-56 md:gap-y-48 justify-items-center mt-28">
                {moods.map((mood)=> (
                    <button
                        className="transform transition-transform duration-300 ease-in-out hover:scale-125" key={mood}
                        onClick={() => setSelectedMood(mood)}
                    >
                        <p className="text-7xl md:text-8xl">{mood}</p>
                    </button>
                ))}
            </div>

             {selectedMood && (
                <div className="flex justify-center">
                <button
                    className="bg-pink-500 text-xl text-white font-medium mt-32 w-56 px-6 py-5 rounded-full shadow-md hover:bg-pink-600 transition"
                    onClick={handleSaveMood}
                >
                    Write Reflection
                </button>
             </div>
             )} 
        </div>
    )
}

export default MoodTracker;
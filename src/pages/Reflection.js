import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Reflection = () => {
    const navigate = useNavigate();
    const [reflection, setReflection] = useState("");

    const handleChange = (e) => {
        setReflection(e.target.value)
    }

    const handleSaveReflection = () => {
        const currentReflection = {reflection: reflection, date: new Date().toISOString()}

        const savedReflections = JSON.parse(localStorage.getItem("reflections")) || [];
        savedReflections.push(currentReflection)
        localStorage.setItem("reflections", JSON.stringify(savedReflections))
    }

    return (
        <div className="min-h-screen flex flex-col  bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200">
            <h1 className="text-center font-bold text-4xl mt-12 p-2 mr-8">Today's Reflection</h1>
            <div className="flex flex-col justify-center items-center mt-16 mr-12">
                <textarea
                    className="rounded-3xl bg-gray-200 w-3/4 md:w-2/3 h-96 p-6 text-lg shadow-md focus:outline-none focus:ring-4 focus:ring-pink-300"
                    placeholder="Write your thoughts here..."
                    value={reflection}
                    onChange={handleChange}
                ></textarea>

                <button
                    className="bg-pink-500 text-xl text-white font-medium mt-10 md:mt-15 w-56 px-6 py-5 rounded-full shadow-md hover:bg-pink-600 transition"
                    onClick={handleSaveReflection}
                >
                    Save Reflection
                </button>

                <button onClick={() => navigate("/goal")}>
                    <p className="mt-4 text-blue-600 font-bold text-xl hover:text-blue-800 transition">Set a goal for today?</p>
                </button>
            </div>
            
        </div>
    )
}

export default Reflection;
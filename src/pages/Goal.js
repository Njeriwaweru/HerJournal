import { useState } from "react";

const Goal = () => {
    const [categories, setCategories] = useState([
        {name: 'Well-being'},
        {name: 'Career'},
        {name: 'Habit'},
        {name: 'Self-care'},
        {name: 'Relationships'},
        {name: 'Personal Growth'},
    ])
    const [newCategory, setNewCategory] = useState("");
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const handleAddCategory = () => {
        if (newCategory.trim() === "") return;
        setCategories([...categories, {name: newCategory}])
        setNewCategory("");
        setModalIsOpen(false);
    }

    return (
        <div className="min-h-screen flex flex-col  bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200">
          {modalIsOpen ? (
            <div className="flex flex-col justify-center items-center mt-32">
                <h2 className="font-bold text-xl mb-8">Add new category</h2>
                <input
                    type="text"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="rounded-3xl bg-gray-200 w-3/4 h-32 ml-10 text-xl md:w-1/3 p-6 shadow-md focus:outline-none focus:ring-4 focus:ring-pink-300"
                />
                <div className="flex gap-6">
                    <button
                    className="bg-pink-500 p-4 text-white font-medium rounded-3xl px-8 text-xl shadow-md hover:bg-pink-600 transition mt-8"
                    onClick={handleAddCategory}
                    >
                        Save
                    </button>
                    <button
                        className="bg-pink-500 p-4 text-white font-medium rounded-3xl px-8 text-xl shadow-md hover:bg-pink-600 transition mt-8"
                        onClick={() => setModalIsOpen(false)}
                    >
                        Close
                    </button>
                </div>
            </div>
          ) : (
            <>
                <h1 className="text-center font-bold text-4xl mt-12 p-2">Your Daily Goal</h1>
                <div className="flex flex-col justify-center items-center mt-16 mr-12">
                    <textarea
                        className="rounded-3xl bg-gray-200 w-3/4 ml-10 md:w-1/3 p-6 shadow-md focus:outline-none focus:ring-4 focus:ring-pink-300"
                        placeholder="I want to..."
                    ></textarea>
                    <p className="mt-5 font-medium ml-10">Be specific and kind to yourself🌸</p>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-8 mx-12 md:grid-cols-5 md:gap-10">
                    {categories.map((category, index) => (
                        <button
                            key={index}
                            className="bg-purple-300 p-4 rounded-full font-medium hover:bg-purple-600 hover:scale-110 transform transition duration-300 hover:text-white"
                        >
                            {category.name}
                        </button>
                    ))}
                </div>
        
                <div className="flex justify-center mt-8">
                    <button
                        className="bg-pink-500 p-4 text-white font-medium rounded-full shadow-md hover:bg-pink-600 transition"
                        onClick={() => setModalIsOpen(true)}
                    >
                        Add category
                    </button>
                </div>
            </>
            )}
        </div>
            
    )
}

export default Goal;
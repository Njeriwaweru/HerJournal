import AnimatedButton from "../common/AnimatedButton";

const AddCategoryModal = ({ isOpen, newCategory, setNewCategory, onSave, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
                <h2 className="font-bold text-2xl mb-6 text-center">Add New Category</h2>
                <input
                    type="text"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    placeholder="Enter category name..."
                    className="w-full p-4 text-lg border-2 border-gray-200 rounded-xl focus:outline-none focus:border-pink-400 mb-6"
                />
                <div className="flex gap-4 justify-center">
                    <AnimatedButton
                        onClick={onSave}
                        gradient="from-pink-500 to-purple-500"
                        size="lg"
                    >
                        Save Category
                    </AnimatedButton>
                    <AnimatedButton
                        onClick={onClose}
                        gradient="from-gray-500 to-slate-500"
                        size="lg"
                    >
                        Cancel
                    </AnimatedButton>
                </div>
            </div>
        </div>
    );
};

export default AddCategoryModal;
import AnimatedButton from "../common/AnimatedButton";

const ReflectionActions = ({ onSave, onSetGoals, isSaveDisabled = false }) => {
    return (
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center mt-8">
            <AnimatedButton
                onClick={onSave}
                gradient="from-pink-500 to-purple-500"
                size="lg"
                icon="💾"
                disabled={isSaveDisabled}
                className="w-full md:w-auto"
            >
                Save Reflection
            </AnimatedButton>

            <AnimatedButton
                onClick={onSetGoals}
                gradient="from-purple-500 to-blue-500"
                size="lg"
                icon="🎯"
                className="w-full md:w-auto"
            >
                Set Today's Goal
            </AnimatedButton>
        </div>
    );
};

export default ReflectionActions;
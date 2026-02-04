import { motion } from "framer-motion";
import AnimatedButton from "../common/AnimatedButton";

const CTASection = ({ onBeginFree, onSeeHowItWorks }) => {
    return (
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
                    <AnimatedButton
                        onClick={onBeginFree}
                        gradient="from-white to-gray-50"
                        size="lg"
                        className="text-black"
                    >
                        Begin for Free
                    </AnimatedButton>
                    <AnimatedButton
                        onClick={onSeeHowItWorks}
                        gradient="from-transparent to-transparent"
                        size="lg"
                        className="border-2 border-white hover:bg-white/10"
                    >
                        See How It Works
                    </AnimatedButton>
                </div>
                <p className="text-sm opacity-80 mt-6">
                    No credit card required • 100% private • Your data stays with you
                </p>
            </div>
        </motion.div>
    );
};

export default CTASection;
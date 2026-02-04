import StatsCard from "../common/StatsCard";

const ReflectionAnalytics = ({ analysis, tags }) => {
    if (!analysis) return null;

    return (
        <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">📊 Reflection Insights</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <StatsCard
                    value={analysis.mostUsedTag !== "None" 
                        ? tags.find(t => t.name === analysis.mostUsedTag)?.emoji || "📝"
                        : "📝"
                    }
                    label="Most Used Tag"
                    description={analysis.mostUsedTag}
                    gradient="from-blue-500 to-cyan-500"
                    icon={analysis.mostUsedTag}
                />
                <StatsCard
                    value={analysis.totalReflections}
                    label="Total Entries"
                    description="Reflections saved"
                    gradient="from-purple-500 to-pink-500"
                    icon="📝"
                />
                <StatsCard
                    value={analysis.avgWords}
                    label="Average Words"
                    description="Per reflection"
                    gradient="from-green-500 to-emerald-500"
                    icon="📖"
                />
            </div>
        </div>
    );
};

export default ReflectionAnalytics;
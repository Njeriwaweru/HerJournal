const ChartContainer = ({ title, icon, children, className = "" }) => {
    return (
        <div className={`bg-gray-50 p-6 rounded-2xl ${className}`}>
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-800">{title}</h3>
                {icon}
            </div>
            <div className="h-64">
                {children}
            </div>
        </div>
    );
};

export default ChartContainer;
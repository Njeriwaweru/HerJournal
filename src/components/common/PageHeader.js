const PageHeader = ({ title, description, actionButton, stats }) => {
    return (
        <div className="mb-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                <div className="mb-4 md:mb-0">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800">{title}</h1>
                    {description && (
                        <p className="text-gray-600 mt-2">{description}</p>
                    )}
                </div>
                {actionButton && (
                    <div className="flex-shrink-0">
                        {actionButton}
                    </div>
                )}
            </div>
            
            {stats && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                    {stats.map((stat, index) => (
                        <div key={index} className="bg-white p-4 rounded-xl shadow">
                            <p className="text-sm text-gray-600">{stat.label}</p>
                            <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default PageHeader;
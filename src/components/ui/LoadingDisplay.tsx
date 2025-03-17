import React from 'react';

const LoadingDisplay = () => {
    return (
        <div className="fixed inset-0 bg-gray-800/50 backdrop-blur-md flex justify-center items-center z-50">
            <div className="flex flex-col items-center space-y-4 p-6 bg-white rounded-lg shadow-xl">
                <div className="animate-spin rounded-full border-t-4 border-[#a63e36] w-16 h-16"></div>
                <span className="text-xl font-medium text-gray-700">Veuillez patienter...</span>
            </div>
        </div>
    );
};

export default LoadingDisplay;

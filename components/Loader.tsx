import React from 'react'

const Loader = () => {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="text-center flex flex-col items-center">
                {/* Spinner */}
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-500 dark:border-purple-400 mb-4"></div>

                {/* Loading Text */}
                <h1 className="text-2xl font-semibold border-purple-500 dark:border-purple-400">Loading...</h1>
            </div>
        </div>
    )
}

export default Loader

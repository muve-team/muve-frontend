import React from 'react';

const Loading: React.FC = () => {
    return (
        <div className="loading-screen">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="shopping-bag-icon"
                width="80"
                height="80"
                viewBox="0 0 14 14"
            >
                <path
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M.508.5H2.95l.87 8.65a1 1 0 0 0 1 .85h6.3a1 1 0 0 0 1-.68l1.33-4a1 1 0 0 0-.14-.9a1 1 0 0 0-.86-.42H3.3m7.65 9.5a.5.5 0 1 1 0-1a.5.5 0 0 1 0 1m-6.5 0a.5.5 0 1 1 0-1a.5.5 0 0 1 0 1"
                />
            </svg>
        </div>
    );
};

export default Loading;

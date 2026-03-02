import React from 'react';

export const AnimatedApplyButton = ({ disabled, onClick, children }) => (
    <button className="btn-apply" disabled={disabled} onClick={onClick}>
        <div className="btn-apply__line" />
        <div className="btn-apply__line" />
        <span className="btn-apply__text">{children}</span>
        <div className="btn-apply__drow1" />
        <div className="btn-apply__drow2" />
    </button>
);

export const AnimatedBackToTop = () => {
    const scrollToTop = () => {
        document.getElementById('main-scroll-container')?.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <button className="btn-btt" onClick={scrollToTop}>
            <div className="text">
                <span>Back</span>
                <span>to</span>
                <span>top</span>
            </div>
            <div className="clone">
                <span>Back</span>
                <span>to</span>
                <span>top</span>
            </div>
            <svg strokeWidth={2} stroke="currentColor" viewBox="0 0 24 24" fill="none" className="h-6 w-6" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeLinejoin="round" strokeLinecap="round" />
            </svg>
        </button>
    );
};

export const AnimatedSubmitButton = ({ onClick, isLoading, disabled, children }) => (
    <button className="btn-submit" onClick={onClick} disabled={disabled || isLoading}>
        <span className="circle1" />
        <span className="circle2" />
        <span className="circle3" />
        <span className="circle4" />
        <span className="circle5" />
        <span className="text flex items-center gap-2">
            {isLoading && (
                <svg className="animate-spin -ml-1 h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            )}
            {children}
        </span>
    </button>
);

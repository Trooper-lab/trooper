import React from 'react';

export const IconJaggedStar = ({ size = 24, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
        <path d="M12 0L14.5 9.5H24L16.5 14.5L19 24L12 18.5L5 24L7.5 14.5L0 9.5H9.5L12 0Z" />
    </svg>
);

export const IconZBolt = ({ size = 24, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
        <path d="M13 2L3 14H12V22L22 10H13V2Z" />
    </svg>
);

export const IconComplexAsterisk = ({ size = "200", className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className={className} xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2V22M2 12H22M4.93 4.93L19.07 19.07M4.93 19.07L19.07 4.93" />
    </svg>
);

export const IconStarBurst = ({ size = 24, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
        <path d="M12 0L13.5 8.5L22 10L13.5 11.5L12 20L10.5 11.5L2 10L10.5 8.5L12 0Z" />
    </svg>
);

export const IconNordicStar = ({ size = 24, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className={className} xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L14 10L22 12L14 14L12 22L10 14L2 12L10 10L12 2Z" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

export const IconCart = ({ size = 24, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} xmlns="http://www.w3.org/2000/svg">
        <path d="M4 4H5L6 16H19" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M6 8H20L19 13H6" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="9" cy="20" r="1" fill="currentColor"/>
        <circle cx="17" cy="20" r="1" fill="currentColor"/>
    </svg>
);

export const IconProfile = ({ size = 24, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} xmlns="http://www.w3.org/2000/svg">
        <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M6 21V19C6 16.7909 7.79086 15 10 15H14C16.2091 15 18 16.7909 18 19V21" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

import React from 'react';

export function Logo({ className = "w-16 h-16" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 220" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Text Path */}
      <path id="textPath" d="M 20 80 A 80 80 0 0 1 180 80" fill="none" />
      <text fill="#ef4444" fontSize="22" fontWeight="bold" fontFamily="serif" letterSpacing="1">
        <textPath href="#textPath" startOffset="50%" textAnchor="middle">Chanomin Express</textPath>
      </text>
      
      {/* Chef Hat Outline */}
      <path d="M 60 110 C 40 90, 60 60, 85 75 C 95 50, 135 55, 135 80 C 160 70, 165 100, 145 110" stroke="#ef4444" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M 60 110 C 65 120, 75 125, 85 125" stroke="#ef4444" strokeWidth="5" strokeLinecap="round" />
      <path d="M 145 110 C 140 120, 130 125, 120 125" stroke="#ef4444" strokeWidth="5" strokeLinecap="round" />
      
      {/* Waves / 'C' Shape */}
      <path d="M 110 95 C 50 95, 40 160, 90 190 C 130 210, 160 190, 160 190 C 160 190, 120 195, 90 160 C 65 130, 110 110, 110 110 Z" fill="#ef4444" />
      <path d="M 100 110 C 60 120, 60 170, 100 195 C 135 215, 170 195, 170 195 C 170 195, 125 200, 100 165 C 80 135, 100 120, 100 120 Z" fill="#ef4444" />
      <path d="M 90 125 C 65 140, 75 180, 110 200 C 145 220, 180 200, 180 200 C 180 200, 135 205, 110 175 C 95 150, 90 135, 90 135 Z" fill="#ef4444" />
      
      {/* Spiral & Dots */}
      <path d="M 55 135 C 45 135, 45 150, 55 150 C 60 150, 60 140, 55 140" stroke="#ef4444" strokeWidth="4" strokeLinecap="round" />
      <circle cx="45" cy="160" r="5" fill="#ef4444" />
      <circle cx="45" cy="175" r="4" fill="none" stroke="#ef4444" strokeWidth="3" />
      
      {/* Fork & Knife */}
      <g stroke="#ef4444" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        {/* Fork */}
        <path d="M 135 135 L 135 150 M 140 135 L 140 150 M 145 135 L 145 150" />
        <path d="M 135 150 C 135 160, 145 160, 145 150" />
        <path d="M 140 160 L 140 185" />
        {/* Knife */}
        <path d="M 155 135 C 160 135, 160 155, 155 155 L 155 185" />
      </g>
    </svg>
  );
}

// src/components/Card.tsx
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  gradient?: string;
  hoverEffect?: boolean;
}

const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  gradient = '', 
  hoverEffect = false 
}) => {
  return (
    <div 
      className={`
        rounded-3xl shadow-xl p-6 
        ${gradient ? `bg-gradient-to-br ${gradient} text-white` : 'bg-white'}
        ${hoverEffect ? 'transform hover:scale-105 transition-all duration-300' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default Card;
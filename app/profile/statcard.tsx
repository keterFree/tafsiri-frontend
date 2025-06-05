// src/components/profile/StatCard.tsx
import React from 'react';
import Card from './card';

interface StatCardProps {
  title: string;
  value: React.ReactNode;
  gradient: string;
  children?: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  gradient, 
  children 
}) => {
  return (
    <Card gradient={gradient} hoverEffect>
      <div className="text-lg font-medium mb-2">{title}</div>
      <div className="text-5xl font-bold mb-4">{value}</div>
      {children}
    </Card>
  );
};

export default StatCard;
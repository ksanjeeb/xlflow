import React from 'react';

const GradientOverlay: React.FC = () => {
  return (
    <div
    className="fixed top-0 left-0 w-full h-20 z-10 border-border/40 bg-[#141514]/95 backdrop-blur supports-[backdrop-filter]:bg-[#141514]/60"
  />
  );
};

export default GradientOverlay;

import React, { useState, useEffect } from 'react';

const GradientOverlay: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 w-full h-28 z-10 bg-[#141514]/95 backdrop-blur supports-[backdrop-filter]:bg-[#141514]/90 
        ${isScrolled ? 'border-b-2 border-border/40' : ''}`}
    />
  );
};

export default GradientOverlay;

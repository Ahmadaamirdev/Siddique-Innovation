import React from 'react';
import { CLOUDINARY_ASSETS } from '@/data/cloudinaryAssets';

const logoImg = CLOUDINARY_ASSETS.logo.url;

interface WingLogoProps {
  className?: string;
  size?: number;
}

export const WingLogo: React.FC<WingLogoProps> = ({ className = 'w-6 h-6', size }) => {
  const style = size ? { width: `${size}px`, height: `${size}px` } : undefined;

  return (
    <img
      src={logoImg}
      alt="Siddiqui Innovations Logo"
      className={`inline-block object-contain ${className}`}
      style={style}
    />
  );
};

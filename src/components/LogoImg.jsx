import React from 'react';

/**
 * Brand logo that swaps between its dark-theme and light-theme file.
 * Pass the dark-theme file (the "-dark" recolour); the light file is the same name without "-dark".
 */
export default function LogoImg({ src, alt, className = '', style }) {
  const light = src.replace('-dark.png', '.png');
  return (
    <>
      <img src={src} alt={alt} title={alt} className={`theme-dark-only ${className}`} style={style} />
      <img src={light} alt={alt} title={alt} className={`theme-light-only ${className}`} style={style} />
    </>
  );
}

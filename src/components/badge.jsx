import React from 'react';

const Badge = ({ text, color = 'border-[#37C848]', textColor = 'text-[#37C848]', className = '' }) => {
  return (
    <span
      className={`inline-block text-[10px] font-semibold border ${color} ${textColor} ${className} py-0.25 px-2 rounded-full`}
    >
      {text}
    </span>
  );
};

export default Badge;

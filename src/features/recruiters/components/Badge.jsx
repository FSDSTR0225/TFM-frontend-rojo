import React from "react";

const Badge = ({
  text,
  color = "border-primary-50",
  textColor = "text-primary-50",
  className = "",
}) => {
  return (
    <span
      className={`inline-block text-[10px] font-semibold border ${color} ${textColor} ${className} py-0.25 px-2 rounded-full`}
    >
      {text}
    </span>
  );
};

export default Badge;

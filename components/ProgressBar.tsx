import React from "react";

interface ProgressBarProps {
  bg_color: string;
  progress: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ bg_color, progress }) => {
  return (
    <div className="w-[300px] bg-[#18243c] rounded-full h-8 relative border-[2px] border-gray-600">
      <div
        className={`${bg_color} h-7 rounded-full transition-all duration-300`}
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
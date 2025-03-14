import React from "react";

interface ProgressBarProps {
  progress: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <div className="w-[300px] bg-[#18243c] rounded-full h-8 relative border-[2px] border-gray-600">
      <div
        className="bg-[#30c4e4] h-7 rounded-full transition-all duration-300"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
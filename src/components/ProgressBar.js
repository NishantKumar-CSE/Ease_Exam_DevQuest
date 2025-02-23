import React from 'react';

const ProgressBar = ({ currentQuestion, totalQuestions }) => {
  const progressPercentage = ((currentQuestion + 1) / totalQuestions) * 100;
  const angle = (progressPercentage / 100) * 360;

  return (
    <div className="progress-bar">
      <div className="progress-circle">
        <div className="progress-slice" style={{ transform: `rotate(${angle}deg)` }}></div>
        <div className="progress-text">{currentQuestion + 1} / {totalQuestions}</div>
      </div>
    </div>
  );
};

export default ProgressBar;


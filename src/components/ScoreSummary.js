import React from 'react';

const ScoreSummary = ({ score, totalQuestions }) => {
  return (
    <div className="score-summary">
      <img src="images/score.png" alt="Score Icon" className="score-icon" />
      <h2>Quiz Completed!</h2>
      <p>Your Score: {score} / {totalQuestions}</p>
      <button onClick={() => window.location.reload()}>Retry</button>
    </div>
  );
};

export default ScoreSummary;


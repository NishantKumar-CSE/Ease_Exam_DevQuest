import React from 'react';

const Timer = ({ timeLeft }) => {
  return (
    <div className="timer">
      <img src="images/clock.png" alt="Clock Icon" className="clock-icon" />
      Time Left: {timeLeft} seconds
    </div>
  );
};

export default Timer;


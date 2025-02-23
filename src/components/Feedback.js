import React from 'react';

const Feedback = ({ feedback }) => {
  return (
    <div className={`feedback ${feedback.correct ? 'correct' : 'incorrect'}`}>
      <img
        src={feedback.correct ? 'images/correct.png' : 'images/incorrect.png'}
        alt={feedback.correct ? 'Correct Icon' : 'Incorrect Icon'}
        className="feedback-icon"
      />
      {feedback.correct ? (
        <p>Correct!</p>
      ) : (
        <>
          <p>Incorrect!</p>
          <p>{feedback.explanation}</p>
        </>
      )}
    </div>
  );
};

export default Feedback;


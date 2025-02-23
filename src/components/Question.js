import React from 'react';

const Question = ({ question, options, onAnswer, selectedOption }) => {
  return (
    <div className="question">
      <img src="images/question.png" alt="Question Icon" className="question-icon" />
      <h2>{question}</h2>
      <ul>
        {options.map((option, index) => (
          <li
            key={index}
            onClick={() => onAnswer(option)}
            className={selectedOption === option ? 'selected' : ''}
          >
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Question;


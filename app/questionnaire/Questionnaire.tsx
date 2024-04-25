"use client"
import React, { useState } from 'react';
import questions from './questions';
import './styles.css'; 
import DateInput from './dateInput';


const renderDateInput = () => {
    return <DateInput />
}
  

const renderSearchInput = () => {
    return (
      <input
        type="text"
        className="search-input"
        placeholder="Type your destination here"
      />
    );
  };
  


  const renderSingleOptions = (options: string[], selectedOption: string | null, handleOptionClick: (option: string) => void) => {
    return (
      <div className="options-container">
        {options.map((option, index) => (
          <button
            key={index}
            className={`option-button ${selectedOption === option ? 'selected' : ''}`}
            onClick={() => handleOptionClick(option)}
          >
            {option}
          </button>
        ))}
      </div>
    );
  };
  


  const renderMultipleOptions = (options: string[], selectedOptions: string[], handleOptionClick: (option: string) => void) => {
    return (
      <div className="options-container multiple">
        {options.map((option, index) => (
          <button
            key={index}
            className={`option-button ${selectedOptions.includes(option) ? 'selected' : ''}`}
            onClick={() => handleOptionClick(option)}
          >
            {option}
          </button>
        ))}
      </div>
    );
  };
  


  const Question: React.FC<{ question: string; inputType: string; options?: string[] }> = ({ question, inputType, options }) => {
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  
    const handleSingleOptionClick = (option: string) => {
      setSelectedOption(option);
    };
  
    const handleMultipleOptionClick = (option: string) => {
      const updatedOptions = selectedOptions.includes(option)
        ? selectedOptions.filter(item => item !== option)
        : [...selectedOptions, option];
      setSelectedOptions(updatedOptions);
    };
  
    return (
      <div className="question">
        <h2 className="question-text">{question}</h2>
        {(() => {
          switch (inputType) {
            case 'date':
              return renderDateInput() || null;
            case 'search':
              return renderSearchInput() || null;
            case 'singleOptions':
              return renderSingleOptions(options || [], selectedOption, handleSingleOptionClick);
            case 'multipleOptions':
              return renderMultipleOptions(options || [], selectedOptions, handleMultipleOptionClick);
            default:
              return null;
          }
        })()}
      </div>
    );
};


const Questionnaire: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);

  const handleNext = () => {
    setCurrentQuestionIndex(prevIndex => prevIndex + 1);
  };

  return (
    <div className="container">
      {questions.length > 0 && (
        <>
          <h2 className="step-count">Step {currentQuestionIndex + 1} of {questions.length}</h2>
          <Question
            question={questions[currentQuestionIndex].question}
            inputType={questions[currentQuestionIndex].inputType}
            options={questions[currentQuestionIndex].options}
          />
          <NextButton onClick={handleNext} />
        </>
      )}
    </div>
  );
};



const NextButton: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return <button className="next-button" onClick={onClick}>Next</button>;
};

export default Questionnaire;

// React Component (CustomQuizComponent.js)
import React, { useState } from 'react';
// Make sure the path is correct based on your project structure
import './Questions.css'; 
// Replace with the actual path to your quiz data
import quizData from '../questions';


// Define the CustomQuizComponent functional component
const CustomQuizComponent = () => {
  // State variables to manage quiz state
  const [currentQuesIndex, setCurrentQuesIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isHighlighted, setIsHighlighted] = useState(false);
  const [isLightMode, setIsLightMode] = useState(false);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);

  // Function to handle option selection
  const handleOptionSelection = (optionId) => {
    const isOptionCorrect =
      quizData[currentQuesIndex].options.find((option) => option.id === optionId)?.isCorrect || false;

    // Update state based on selected option
    setSelectedOption(optionId);
    setCorrectAnswersCount(correctAnswersCount + (isOptionCorrect ? 1 : 0));

    // Move to the next question or complete the quiz
    if (currentQuesIndex < quizData.length - 1) {
      setCurrentQuesIndex(currentQuesIndex + 1);
      setSelectedOption(null);
      removeHighlight();
    } else {
      setIsQuizCompleted(true);
    }
  };

  // Function to handle quiz restart
  const handleRestartQuiz = () => {
    setCurrentQuesIndex(0);
    setSelectedOption(null);
    setIsHighlighted(false);
    setIsLightMode(false);
    setCorrectAnswersCount(0);
    setIsQuizCompleted(false);
  };

  // Function to get an uppercase letter based on the index (0 corresponds to 'A', 1 to 'B', and so on)
  const getOptionLetter = (index) => String.fromCharCode(68 + index);

  // Function to set the state variable isHighlighted to true, indicating something is highlighted
  const handleHighlight = () => setIsHighlighted(true);

  // Function to set the state variable isHighlighted to false, indicating the highlight has been removed
  const removeHighlight = () => setIsHighlighted(false);

  // Function to handle light mode toggle
  const handleLightModeToggle = () => {
    setIsLightMode(!isLightMode);
  
    // Get the body element
    const body = document.body;
  
    // Set background color and text color based on the mode
    body.style.backgroundColor = isLightMode ? '#857c76' : '#f0f0f0';
    body.style.color = isLightMode ? 'white' : 'black';
  
    // Get the button element
    const button = document.getElementsByClassName('btn');
  
    // Set the background color of the button to violet
    button.style.backgroundColor = 'violet';
  
    // Toggle 'light-mode' class
    body.classList.toggle('light-mode');
  };

  // Render result component if the quiz is completed
  if (isQuizCompleted) {
    const percentage = ((correctAnswersCount / quizData.length) * 100).toFixed(2);

    return (
      <div className={`QuizResult ${isHighlighted ? 'highlightedResult' : ''} ${isLightMode ? 'lightResult' : ''}`}>
        <h1 className="ResultHeader">Quiz Result</h1>
        <p>{` yay!! You got ${correctAnswersCount} out of ${quizData.length} questions correct!`}</p>
        <p>{`(${percentage}%)`}</p>
        <button onClick={handleRestartQuiz} className="RestartButton btn">Restart</button>
      </div>
    );
  }

  // Render quiz component if the quiz is not completed
  const { text, options } = quizData[currentQuesIndex];
  const questionHeader = `Question ${currentQuesIndex + 1} of ${quizData.length}`;

  return (
    <div className={`QuizContainer ${isHighlighted ? 'highlightedQuestion' : ''} ${isLightMode ? 'lightQuestion' : ''}`}>
      <h1 className="QuizTitle">Quizer!!!</h1>
      <h3 className="QuestionHeader">{questionHeader}</h3>
      <div className="QuestionTextContainer">
        <h2 className={`QuestionText ${isHighlighted ? 'highlightedText' : ''}`}>{`Question ${currentQuesIndex + 1}: ${text}`}</h2>
      </div>
      <ul className="OptionList">
        {options.map((option, index) => (
          <li
            key={option.id}
            className={`OptionListItem ${selectedOption === option.id ? 'selectedOption' : ''}`}
            onClick={() => handleOptionSelection(option.id)}
          >
            {`${getOptionLetter(index)}. ${option.text}`}
          </li>
        ))}
      </ul>
      <button className="HighlightButton btn" onClick={handleHighlight} disabled={isHighlighted}>
        Highlight
      </button>
      <button className="RemoveHighlightButton btn" onClick={removeHighlight} disabled={!isHighlighted}>
        Remove Highlight
      </button>
      <button className="ToggleModeButton btn" onClick={handleLightModeToggle}>
        {isLightMode ? 'Dark' : 'Light'}
      </button>
    </div>
  );
};

// Export the CustomQuizComponent
export default CustomQuizComponent;

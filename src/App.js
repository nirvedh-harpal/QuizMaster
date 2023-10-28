import React, { useState } from "react";
import questionSet from "./QuestionSet";
import Result from "./components/result";
export default function App() {
  const [showResult, setShowResult] = useState(false);
  const [liveQuestion, setliveQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [List, setList] = useState([]);

  const handleAnswerButtonClick = (correctAns, user_choice) => {
    if (correctAns === user_choice) {
      setScore(score + 1);
    }
    setList(List.concat(user_choice));
    console.log(List);
    const nextQuestion = liveQuestion + 1;
    if (nextQuestion < questionSet.length) {
      setliveQuestion(nextQuestion);
    } else {
      setShowResult(true);
    }
  };

  const handlePlayAgainButtonClick = () => {
    setList([]);
    setliveQuestion(0);
    setShowResult(false);
    setScore(0);
  };
  return (
    <div className="container">
      {showResult ? (
        <div className="result-section fd-column">
          <Result List={List} score={score} questionSet={questionSet} />
          <div className="answer-section">
            <button id="handlePlayAgainButtonClick"
              onClick={() => handlePlayAgainButtonClick()}>
              Play Again
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="question-section">
            <div className="question-count">
              <span>Question {liveQuestion + 1}</span>/{questionSet.length}
            </div>
            <div className="question-text">
              {questionSet[liveQuestion].Text}
            </div>
          </div>
          <div className="answer-section">
            {questionSet[liveQuestion].answerOptions.map((answerOption) => (
              <button
                key={answerOption.answerValue}
                onClick={() =>
                  handleAnswerButtonClick(
                    questionSet[liveQuestion].CorrectAnswer,
                    answerOption.answerValue
                  )
                }>
                {answerOption.answerValue}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css';
import Result from "./components/result";

const App = () => {
  const [questionSet, setQuestions] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [liveQuestion, setliveQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [List, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
	setLoading(true);
    try {
      const response = await axios.post(
        'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyBiYR1HqQq49_76fyY1fG_Ke5KaMZypv1g',
        {
			"contents": [{
			  "parts":[{
					"text": `Generate a list of 10 multiple-choice questions about Basic Chemistry. Each question should have the following structure json:
{
  "Text": "Question text",
  "answerOptions": [
    { "answerValue": "Answer option 1" },
    { "answerValue": "Answer option 2" },
    { "answerValue": "Answer option 3" },
    { "answerValue": "Answer option 4" }
  ],
  "CorrectAnswer": "Correct answer value"
}`
				}]
			}]
		},
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );

	  const questionsResponse = response.data.candidates[0].content.parts[0].text;
	  const jsonObject = JSON.parse(questionsResponse.slice(8, -3));
	  console.log("QuestionsResponse: ", jsonObject);

      setQuestions(jsonObject);
	  setLoading(false);
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

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
	fetchQuestions();
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
          { loading ? <div><div className="spinner">
    <div className="dot"></div>
    <div className="dot"></div>
    <div className="dot"></div>
  </div></div> : <><div className="question-section">
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
          </div></>}
        </>
      )}
    </div>
  );
};

export default App;

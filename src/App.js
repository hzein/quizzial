import React from "react";
import Question from "./Question";
import { nanoid } from "nanoid";

export default function App() {
  const [quizStarted, setQuizStarted] = React.useState(false);
  const [quizData, setQuizData] = React.useState([]);
  const [questionSubmitted, setQuestionSubmitted] = React.useState(false);
  const [correctAnswersCount, setCorrectAnswersCount] = React.useState(0);

  const quizQuestions = quizData.map((data) => {
    return (
      <Question
        key={data.id}
        id={data.id}
        question={data.question}
        incorrectAnswers={data.incorrect_answers}
        correctAnswer={data.correct_answer}
        selectedAnswer={data.selected_answer}
        updateSelectedAnswer={updateSelectedAnswer}
        questionSubmitted={questionSubmitted}
      />
    );
  });

  const topImageStyles = {
    position: "absolute",
    right: !quizStarted ? "0px" : "-20px",
    top: !quizStarted ? "0px" : "-50px",
  };

  const bottomImageStyles = {
    position: "absolute",
    left: !quizStarted ? "0px" : "-50px",
    bottom: !quizStarted ? "0px" : "-50px",
  };

  function updateSelectedAnswer(id, answer) {
    setQuizData((prevQuizData) => {
      return prevQuizData.map((data) => {
        return data.id === id ? { ...data, selected_answer: answer } : data;
      });
    });
  }

  function startQuiz() {
    setQuizStarted(true);
    setQuestionSubmitted(false);
    setCorrectAnswersCount(0);
    fetch(
      "https://opentdb.com/api.php?amount=5&category=21&difficulty=medium&type=multiple"
    )
      .then((res) => res.json())
      .then((data) => {
        const questionsData = data.results.map((question) => {
          question["selected_answer"] = "";
          question["id"] = nanoid();
          return question;
        });
        setQuizData(questionsData);
      });
  }

  function checkAnswers() {
    setQuestionSubmitted(true);
    quizData.map((data) => {
      data.correct_answer === data.selected_answer &&
        setCorrectAnswersCount((prevCount) => prevCount + 1);
    });
  }

  return (
    <main>
      <img style={topImageStyles} src="../images/blob5.png" />
      {!quizStarted ? (
        <div className="start-page">
          <h1 className="main-header">Quizzical</h1>
          <p className="main-desc">Some description if needed</p>
          <button className="start-button" onClick={startQuiz}>
            Start quiz
          </button>
        </div>
      ) : (
        <div className="quiz-content">
          {quizQuestions}
          {questionSubmitted ? (
            <div className="form-submit">
              <div>
                {`You scored ${correctAnswersCount}/${quizData.length} correct answers`}
              </div>
              <button className="button-check-answers" onClick={startQuiz}>
                Play Again
              </button>
            </div>
          ) : (
            <div className="form-submit">
              <div>
                <button className="button-check-answers" onClick={checkAnswers}>
                  Check Answers
                </button>
              </div>
            </div>
          )}
        </div>
      )}
      <img style={bottomImageStyles} src="../images/blob6.png" />
    </main>
  );
}

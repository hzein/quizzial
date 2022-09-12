import React from "react";

export default function Question(props) {
  const [allAnswers, setAllAnswers] = React.useState([]);

  React.useEffect(() => {
    setAllAnswers(() => {
      const CorrectAndIncorrectAnswers = props.incorrectAnswers;
      const index = Math.floor(
        Math.random() * CorrectAndIncorrectAnswers.length
      );
      CorrectAndIncorrectAnswers.splice(index, 0, props.correctAnswer);
      return CorrectAndIncorrectAnswers;
    });
  }, []);

  function handleClick(answer) {
    if (props.selectedAnswer === "") {
      props.updateSelectedAnswer(props.id, answer);
    } else if (props.selectedAnswer === answer) {
      props.updateSelectedAnswer(props.id, "");
    }
  }

  function getStyle(answer) {
    if (props.questionSubmitted) {
      if (answer === props.selectedAnswer) {
        if (answer === props.correctAnswer) {
          return {
            backgroundColor: "#94D7A2",
            color: "#293264",
          };
        } else {
          return {
            backgroundColor: "#F8BCBC",
            color: "#293264",
          };
        }
      } else {
        if (answer === props.correctAnswer) {
          return {
            backgroundColor: "#94D7A2",
            color: "#293264",
          };
        } else {
          return {
            color: "#293264",
            opacity: "0.5",
            border: "0.794239px solid #4D5B9E",
          };
        }
      }
    } else {
      if (answer === props.selectedAnswer) {
        return {
          backgroundColor: "#94D7A2",
          color: "#293264",
        };
      } else {
        return {};
      }
    }
  }

  const answers = allAnswers.map((answer) => {
    return (
      <div
        key={answer}
        value={answer}
        className="answer"
        onClick={() => {
          return handleClick(answer);
        }}
        style={getStyle(answer)}
      >
        {answer}
      </div>
    );
  });

  return (
    <div className="question-content">
      <div>{props.question}</div>
      <div className="answers">{answers}</div>
    </div>
  );
}

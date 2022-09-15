import React from "react"

export default function StartQuiz(props) {
  return (
    <div className="screen-start">
      <h1>Quizzical</h1>
      <p>A quiz game that challenges your knowledge!</p>
      <button onClick={props.handleStartQuiz}>Start quiz</button>
    </div>
  )
}

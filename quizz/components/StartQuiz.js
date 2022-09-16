import React from "react"

export default function StartQuiz(props) {
  return (
    <div className="screen-start">
      <h1>Quizzical</h1>
      <p>A quiz game that challenges your knowledge</p>
      <p><i>Select the answers that you think are correct. Find out how you did afterwards!</i></p>
      <button onClick={props.handleStartQuiz}>Start quiz</button>
    </div>
  )
}

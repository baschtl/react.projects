import React from "react"

export default function Question(props) {
  let answerElements = props.answers.map(e => {
    return <div
      key={e.id}
      className={`answer${ e.selected ? " selected" : ""}`}
      onClick={() => props.onAnswerClick(props.id, e.id)}
    >
      {atob(e.value)}
    </div>
  })

  return (
    <div className="question-container">
      <h3>{atob(props.question, "base64")}</h3>
      <div className="answers-container">
        {answerElements}
      </div>
    </div>
  )
}

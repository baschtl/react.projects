import React from "react"

export default function Question(props) {
  function answerSelectable(answerId) {
    const currentSelected = props.answers.find(e => e.selected)

    // No answer selected
    if (currentSelected === undefined) {
      return true
    }

    // Allow un-selecting an already selected answer
    if (currentSelected && currentSelected.id === answerId) {
      return true
    }

    // Another answer has been selected already
    return false
  }

  let answerElements = props.answers.map(e => {
    return <div
      key={e.id}
      className={`answer${ e.selected ? " selected" : ""}`}
      onClick={() => {
        answerSelectable(e.id) && props.onAnswerClick(props.id, e.id)
      }
    }
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

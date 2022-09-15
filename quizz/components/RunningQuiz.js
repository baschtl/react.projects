import React from "react"

import Question from "./Question"

export default function RunningQuiz(props) {
  let questionElements = props.data.map(e => {
    return <Question
      key={e.id}
      id={e.id}
      type={e.type}
      question={e.question}
      answers={e.answers}
      onAnswerClick={props.onAnswerClick}
    />
  })

  return (
    <div className="screen-running">
      {questionElements}
      <button>Check answers</button>
    </div>
  )
}

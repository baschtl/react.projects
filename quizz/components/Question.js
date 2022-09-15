import React from "react"
import { GameState } from "./enums"

import {GameStateContext} from "./GameStateContext"

export default function Question(props) {
  function answerSelectable(answerId, gameState) {
    if (gameState === GameState.RESULT) {
      return false
    }

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

  const gameState = React.useContext(GameStateContext)

  let answerElements = props.answers.map(a => {
    let additionalClassName = ""

    if (gameState === GameState.RUNNING) {
      if (a.selected) {
        additionalClassName = "selected"
      }
    } else if (gameState === GameState.RESULT) {
      if (a.correct) {
        additionalClassName = "correct-result"
      } else if (!a.correct && a.selected) {
        additionalClassName = "incorrect-result"
      } else {
        additionalClassName = "not-selected-result"
      }
    }

    return <div
      key={a.id}
      className={`answer ${additionalClassName}`}
      onClick={() => {
        answerSelectable(a.id, gameState) && props.onAnswerClick(props.id, a.id)
      }
    }
    >
      {atob(a.value)}
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

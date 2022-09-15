import React from "react"
import { GameState } from "./enums"

import {GameStateContext} from "./GameStateContext"

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

  const gameState = React.useContext(GameStateContext)

  // TODO: Extract into function to avoid running in wrong state.
  const maxCorrectAnswers = props.data.length
  let correctAnswers = 0
  props.data.forEach(q => {
    q.answers.forEach(a => {
      if (a.selected && a.correct) {
        correctAnswers++
      }
    });
  })

  return (
    <div className="screen-running">
      {questionElements}
      {gameState === GameState.RUNNING &&
        <button onClick={props.onCheckAnswerClick}>Check answers</button>
      }
      {gameState === GameState.RESULT &&
        <div>
          You scored {correctAnswers}/{maxCorrectAnswers} correct answers
          <button onClick={props.onPlayAgainClick}>Play again</button>
        </div>
      }
    </div>
  )
}

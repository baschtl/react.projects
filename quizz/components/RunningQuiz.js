import React from "react"
import { GameState } from "./enums"

import {GameStateContext} from "./GameStateContext"

import Question from "./Question"

export default function RunningQuiz(props) {
  function getResultText(questions) {
    let correctAnswers = 0
    questions.forEach(q => {
      q.answers.forEach(a => {
        if (a.selected && a.correct) {
          correctAnswers++
        }
      });
    })

    return `You scored ${correctAnswers}/${questions.length} correct answers`
  }

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

  return (
    <div className="screen-running">
      {questionElements}
      {gameState === GameState.RUNNING &&
        <button onClick={props.onCheckAnswerClick}>Check answers</button>
      }
      {gameState === GameState.RESULT &&
        <div className="result-container">
          <span className="result-container--text">{getResultText(props.data)}</span>
          <button onClick={props.onPlayAgainClick}>Play again</button>
        </div>
      }
    </div>
  )
}

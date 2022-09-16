import React from "react"
import { nanoid } from "nanoid"

import StartQuiz from "./StartQuiz"
import RunningQuiz from "./RunningQuiz"

import { GameState } from "./enums"
import { GameStateContext } from "./GameStateContext"

export default function App() {
  const [gameState, setGameState] = React.useState(GameState.START)
  const [questionData, setQuestionData] = React.useState([])

  React.useEffect(() => {
    if (gameState === GameState.RUNNING) {
      fetch("https://opentdb.com/api.php?amount=5&encode=base64")
        .then(res => res.json())
        .then(data => setQuestionData(generateQuestionData(data.results)))
        .catch(error => {
          console.error("Error fetching opentdb: ", error)
        });
    }
  }, [gameState])

  function generateQuestionData(data) {
    return data.map(e => {
      return {
        id: nanoid(),
        type: e.type,
        question: e.question,
        answers: generateAnswerData(e.correct_answer, e.incorrect_answers)
      }
    })
  }

  function generateAnswerData(correct, incorrect) {
    let answers = incorrect.map(e => {
      return {
        id: nanoid(),
        value: e,
        correct: false,
        selected: false
      }
    })

    answers.push({
      id: nanoid(),
      value: correct,
      correct: true,
      selected: false
    })

    return answers.sort(() => Math.random() - 0.5)
  }

  // Event handlers
  function handleQuizStateChange(newState) {
    setGameState(newState)
  }

  function onAnswerClick(questionId, answerId) {
    setQuestionData(prevQuestionData => {
      return prevQuestionData.map(q => {
        if (q.id === questionId) {
          return { ...q,
            answers: q.answers.map(a => {
              if (a.id === answerId) {
                return { ...a, selected: !a.selected}
              } else {
                return a
              }
            })
          }
        } else {
          return q
        }
      })
    })
  }

  function onCheckAnswerClick() {
    console.log("Check answers clicked")
    handleQuizStateChange(GameState.RESULT)
  }

  function onPlayAgainClick() {
    console.log("Play again clicked")
    handleQuizStateChange(GameState.RUNNING)
  }

  return (
    <div>
      <GameStateContext.Provider value={gameState}>
      {gameState === GameState.START &&
        <StartQuiz handleStartQuiz={() => handleQuizStateChange(GameState.RUNNING)}/>
      }
      {[GameState.RUNNING, GameState.RESULT].includes(gameState) &&
        <RunningQuiz
          data={questionData}
          onAnswerClick={onAnswerClick}
          onCheckAnswerClick={onCheckAnswerClick}
          onPlayAgainClick={onPlayAgainClick}
        />
      }
      </GameStateContext.Provider>
    </div>
  )
}

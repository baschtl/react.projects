import React from "react"
import {nanoid} from "nanoid"

import StartQuiz from "./StartQuiz"
import RunningQuiz from "./RunningQuiz"

import { GameState } from "./enums"
import { GameStateContext } from "./GameStateContext"

let rawData = {"response_code":0,"results":[{"category":"R2VvZ3JhcGh5","type":"bXVsdGlwbGU=","difficulty":"ZWFzeQ==","question":"VGhlIGJvZHkgb2YgdGhlIEVneXB0aWFuIFNwaGlueCB3YXMgYmFzZWQgb24gd2hpY2ggYW5pbWFsPw==","correct_answer":"TGlvbg==","incorrect_answers":["QnVsbA==","SG9yc2U=","RG9n"]},{"category":"R2VuZXJhbCBLbm93bGVkZ2U=","type":"Ym9vbGVhbg==","difficulty":"bWVkaXVt","question":"VGhlIGJpa2luaSBpcyBuYW1lZCBhZnRlciB0aGUgIkJpa2luaSBBdG9sbCIsIGFuIGlzbGFuZCB3aGVyZSB0aGUgVW5pdGVkIFN0YXRlcyBjb25kdWN0ZWQgdGVzdHMgb24gYXRvbWljIGJvbWJzLg==","correct_answer":"VHJ1ZQ==","incorrect_answers":["RmFsc2U="]},{"category":"RW50ZXJ0YWlubWVudDogVmlkZW8gR2FtZXM=","type":"bXVsdGlwbGU=","difficulty":"bWVkaXVt","question":"SW4gd2hpY2ggTWFyaW8gZ2FtZSBkaWQgdGhlIE1lZ2EgTXVzaHJvb20gbWFrZSBpdHMgZGVidXQ\/","correct_answer":"TWFyaW8gUGFydHkgNA==","incorrect_answers":["TmV3IFN1cGVyIE1hcmlvIEJyb3Mu","TWFyaW8gS2FydCBXaWk=","U3VwZXIgTWFyaW8gM0QgV29ybGQ="]},{"category":"RW50ZXJ0YWlubWVudDogVmlkZW8gR2FtZXM=","type":"bXVsdGlwbGU=","difficulty":"ZWFzeQ==","question":"SW4gRG90YSAyLCBXcmFpdGggS2luZyB3YXMgcHJldmlvdXNseSBrbm93biBhcy4uLg==","correct_answer":"U2tlbGV0b24gS2luZw==","incorrect_answers":["UmVhcGVyIEtpbmc=","U2t1bGwgS2luZw==","SGVsbCBLaW5n"]},{"category":"RW50ZXJ0YWlubWVudDogSmFwYW5lc2UgQW5pbWUgJiBNYW5nYQ==","type":"Ym9vbGVhbg==","difficulty":"bWVkaXVt","question":"SW4gRnVsbCBNZXRhbCBQYW5pYyEsIFdoaXNwZXJlZCBhcmUgdGhvc2Ugd2hvIGFyZSBjYXBhYmxlIG9mIGNyZWF0aW5nIEJsYWNrIFRlY2hub2xvZ3ku","correct_answer":"VHJ1ZQ==","incorrect_answers":["RmFsc2U="]}]}

export default function App() {
  const [gameState, setGameState] = React.useState(GameState.RUNNING)
  const [questionData, setQuestionData] = React.useState([])

  React.useEffect(() => {
    if (gameState === GameState.RUNNING) {
      // TODO: Use real API call after development
      setQuestionData(generateQuestionData(rawData.results))
      // fetch("https://opentdb.com/api.php?amount=5&encode=base64")
      //   .then(res => res.json())
      //   .then(data => setQuestionData(generateQuestionData(data.results)))
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

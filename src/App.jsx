import { useState, useRef, useEffect } from "react"
import Die from "./components/Die"
import { nanoid } from "nanoid"
import Confetti from "react-confetti"

export default function App() {

  const [dice, setDice] = useState(() => genNewDice())

  const gameWon = dice.every(die => die.isHeld) && dice.every(die => die.value === dice[0].value)

  const buttonRef = useRef(null)

  useEffect(() => {
    if (gameWon) {
        buttonRef.current.focus()
    }
}, [gameWon])

  function genNewDice() {
    const newDice = []
    for (let i = 0; i < 10; i++) {
      newDice.push({
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid()
      })
    }
    return newDice
  }

  function roll() {
    if (gameWon) {
      setDice(genNewDice())
    }
    else {
      setDice(prev => prev.map((die) => {
        return die.isHeld ? die : {...die, value: Math.ceil(Math.random() * 6)}
      }))
    }
  }

  function hold(id) {
    setDice(prev => prev.map(die => {
      return die.id === id ? {...die, isHeld: !die.isHeld} : die
    }))
  }

  const dieElements = dice.map(die => <Die hold={hold} isHeld={die.isHeld} key={die.id} id={die.id} value={die.value}/>)

  return (
    <main>
      {gameWon && <Confetti />}
      <div aria-live="polite" className="sr-only">
          {gameWon && <p>Congratulations! You won! Press "New Game" to start again.</p>}
      </div>
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="die-container">
        {dieElements}
      </div>
      <button ref={buttonRef} onClick={roll}>{gameWon ? "New Game" : "Roll"}</button>
    </main>
  )
}

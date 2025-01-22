import { useState } from "react"
import Die from "./components/Die"
import { nanoid } from "nanoid"

export default function App() {

  const [dice, setDice] = useState(genNewDice())

  const gameWon = dice.every(die => die.isHeld) && dice.every(die => die.value === dice[0].value)

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

  function getNewDice() {
    setDice(prev => prev.map((die) => {
      return die.isHeld ? die : {...die, value: Math.ceil(Math.random() * 6)}
    }))
  }

  function hold(id) {
    setDice(prev => prev.map(die => {
      return die.id === id ? {...die, isHeld: !die.isHeld} : die
    }))
  }

  const dieElements = dice.map(die => <Die hold={hold} isHeld={die.isHeld} key={die.id} id={die.id} value={die.value}/>)

  return (
    <main>
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="die-container">
        {dieElements}
      </div>
      <button onClick={getNewDice}>{gameWon ? "New Game" : "Roll"}</button>
    </main>
  )
}

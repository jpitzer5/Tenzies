import { useState } from "react"
import Die from "./components/Die"

export default function App() {

  function genNewDice() {
    const dice = []
    for (let i = 0; i < 10; i++) {
      dice.push(Math.ceil(Math.random() * 6))
    }
    return dice
  }

  const [dice, setDice] = useState(genNewDice())

  function getNewDice() {
    setDice(genNewDice())
  }

  const dieElements = dice.map(die => <Die value={die}/>)

  return (
    <main>
      <div className="die-container">
        {dieElements}
      </div>

      <button onClick={getNewDice}>Roll</button>
    </main>
  )
}

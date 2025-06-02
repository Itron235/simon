import { useEffect, useState } from 'react'
import './App.css'
import Button from './Button';

const turnNames = new Map([
  ['computer', 'Computer'],
  ['player', 'Player'],
  ['game-over', 'Game Over']
])

function randomButtonNumber() {
  return Math.floor(Math.random() * 4)
}

function App() {
  const [turn, setTurn] = useState<'computer' | 'player' | 'game-over'>('computer')
  const [sequence, setSequence] = useState<number[]>([randomButtonNumber(), randomButtonNumber()])
  const [onButton, setOnButton] = useState(-1)
  const [playerStep, setPlayerStep] = useState(0)

  useEffect(() => {
    if (turn !== 'computer') {
      return
    }
    let buttonIndex = 0;
    let isOn = false;
    const interval = setInterval(() => {
      if (!isOn) {
        setOnButton(sequence[buttonIndex]);
        isOn = true;
        return
      }
      // isOn is true
      setOnButton(-1);
      isOn = false;
      buttonIndex += 1;
      if (buttonIndex >= sequence.length) {
        clearInterval(interval);
        setTurn('player')
        setPlayerStep(0)
      }
    }, 500);
    return () => clearInterval(interval)
  }, [turn, sequence])

  function handleClick(buttonNumber: number) {
    console.info(`clicked button ${buttonNumber}`)
    if (turn !== 'player') {
      return
    }
    setOnButton(buttonNumber)
    if (buttonNumber === sequence[playerStep]) {
      const newPlayerStep = playerStep + 1
      if (newPlayerStep < sequence.length) {
        setPlayerStep(newPlayerStep)
      } else {
        setTurn('computer')
        setSequence([
          ...sequence,
          randomButtonNumber()
        ])
      }
    } else {
      setTurn('game-over')
    }
  }

  function handleRestart() {
    setTurn('computer')
    setSequence([randomButtonNumber(), randomButtonNumber()])
    setOnButton(-1)
    setPlayerStep(0)
  }

  return (
    <>
      <h1>Simon</h1>
      <h2>
        Turn: {turnNames.get(turn)}
      </h2>
      {
        (turn === 'game-over') && (
          <h3>
            <a href="#" onClick={handleRestart}>
              Restart Game
            </a>
          </h3>
        )
      }
      <div className="card">
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <Button offColor="darkred" onColor="red" isOn={onButton === 0}  onClick={() => handleClick(0)} />
          <Button offColor="darkgreen" onColor="green" isOn={onButton === 1} onClick={() => handleClick(1)} />
        </div>
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <Button offColor="darkblue" onColor="blue" isOn={onButton === 2} onClick={() => handleClick(2)} />
          <Button offColor="#8B8000" onColor="yellow" isOn={onButton === 3} onClick={() => handleClick(3)} />
        </div>
      </div>
    </>
  )
}

export default App

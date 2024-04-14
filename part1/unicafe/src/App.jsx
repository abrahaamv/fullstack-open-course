import { useState } from 'react'
import Button from './components/Button'
import Statistics from './components/Statistics'

function App() {
  const [ good, setGood ] = useState(0)
  const [ neutral, setNeutral ] = useState(0)
  const [ bad, setBad ] = useState(0) 

  return (
    <>
      <h2>give feedback</h2>
      <Button handleClick={() => setGood(prevValue => prevValue + 1)} text='Good'/>
      <Button handleClick={() => setNeutral(prevValue => prevValue + 1)} text='Neutral'/>
      <Button handleClick={() => setBad(prevValue => prevValue + 1)} text='Bad'/>
      <h2>statistics</h2>
      <Statistics feedback={[good, neutral, bad]}/>
    </>
  )
}

export default App
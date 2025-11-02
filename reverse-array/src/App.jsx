import { useState } from 'react'
import './App.css'

function App() {

  const [text,setText]= useState("");

  const handleChange=(e)=>{
    setText(e.target.value);
  }

  const rotateValue= (k)=>{
    let val= text;
    k%=val.length;
    return val.slice(-k)+ val.slice(0,-k);
  }

  return (
    <div>
      <input type="text" value={text} onChange={handleChange}/>
      <p>{rotateValue(1)}</p>
      <p>{rotateValue(2)}</p>
      <p>{rotateValue(3)}</p>
      <p>{rotateValue(4)}</p>
      <p>{rotateValue(5)}</p>
      <p>{rotateValue(6)}</p>
    </div>
  )
}

export default App

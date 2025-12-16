import { useState } from 'react'
import './App.css'
import Seats from './components/Seats';

function App() {
  const initialSeats = Array(10).fill(Array(10).fill(0));
  const [amt, setAmt] = useState(1);
  const [seats, setSeats] = useState(initialSeats);
  const [isBooking, setIsBooking] = useState(false)
  return (
    <div className='container'>
      <h1>Welcome to RJM Cinema</h1>
      {!isBooking &&
        <div>
          <label htmlFor='amount'>
            Seats:
          </label>
          <input type="number" name='amount' id='name' value={amt} onChange={(e) => setAmt(e.target.value)} />
          <button onClick={() => setIsBooking(true)}>Book Seats</button>
        </div>
      }
      {isBooking &&
        <>
          <Seats seats={seats} setSeats={setSeats} amt={amt} setIsBooking={setIsBooking} />
          <div className='screen'></div>
        </>

      }
    </div>
  )
}

export default App

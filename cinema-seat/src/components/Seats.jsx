import { useState } from "react"

export default function Seats({ seats, setSeats, amt, setIsBooking }) {
    const [count, setCount] = useState(amt);
    const [isBooked, setIsBooked] = useState(false);

    const handleClick = (i, j) => {
        if (seats[i][j] === 1) {
            console.log(seats[i][j])
            setSeats(p => {
                const val = p.map((r, idx) => {
                    if (i === idx) {
                        const res = r.map((c, jdx) => {
                            if (jdx === j) {
                                return 0;
                            }
                            return c;
                        })
                        return res;
                    }
                    return r;
                })
                return val;
            })
            setCount(p => p + 1);
            return;
        }
        setSeats(p => {
            const val = p.map((r, idx) => {
                if (i === idx) {
                    let x = count;
                    const res = r.map((c, jdx) => {
                        if (c === 0 && x > 0 && jdx >= j) {
                            x--;
                            return 1;
                        }
                        return c;
                    })
                    setCount(x);
                    return res;
                }
                return r;
            })
            return val;
        })
    }

    const handleAction = (x) => {
        setSeats(p => {
            const val = p.map((r) => {
                const res = r.map((c) => {
                    if (c === 1) {
                        return x;
                    }
                    return c;
                })
                return res;
            })
            return val;
        })
    }

    return (
        <div className="container">
            {!isBooked && <div>
                <button disabled={count > 0} onClick={() => {
                    handleAction(2)
                    setIsBooked(true)
                }}>Book</button>
                <button disabled={isBooked} onClick={() => {
                    setCount(amt);
                    handleAction(0)
                }}>Clear</button>
            </div>}
            {isBooked && <div>
                <button onClick={() => {
                    setIsBooking(false)
                }}>Go Back</button>
            </div>}
            <div className="seats">
                {seats?.map((row, i) => {
                    
                    return (
                        <div className="row" key={i}>
                            {row.map((cell, j) => {
                                return (
                                    <div className={`cell ${cell === 1 ? "selected" : cell === 0 ? "empty" : "booked"}`} key={j} onClick={() => handleClick(i, j)}>
                                        {String.fromCharCode(i+65)}{j+1}
                                    </div>
                                )
                            })}
                        </div>
                    )
                })}
            </div>

        </div>
    )
}
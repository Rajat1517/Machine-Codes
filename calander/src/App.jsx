import { useState, useEffect, useCallback } from "react";
import "./App.css";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const week = ["S", "M", "T", "W", "T", "F", "S"];

const today = new Date();

const lastDates = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function App() {
  const [mat, setMat] = useState([]);
  const [month, setMonth] = useState(0);
  const [year, setYear] = useState(0);

  useEffect(() => {
    const now = new Date();
    setYear(now.getFullYear());
    setMonth(now.getMonth());
  }, []);

  const isLeapYear = (y) => (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;

  const populateMat = useCallback((year, month) => {
    const startDay = new Date(year, month, 1).getDay();
    const daysInMonth =
      lastDates[month] + (month === 1 && isLeapYear(year) ? 1 : 0);
    const matrix = Array.from({ length: 6 }, () => Array(7).fill(0));
    let date = 1;
    for (let i = 0; i < 6 && date <= daysInMonth; i++) {
      for (let j = i === 0 ? startDay : 0; j < 7 && date <= daysInMonth; j++) {
        matrix[i][j] = date++;
      }
    }
    setMat(matrix);
  }, []);

  useEffect(() => {
    if (year && month >= 0) populateMat(year, month);
  }, [month, year, populateMat]);

  const handlePrev = () => {
    if (month === 0) {
      setYear((y) => y - 1);
      setMonth(11);
    } else setMonth((m) => m - 1);
  };

  const handleNext = () => {
    if (month === 11) {
      setYear((y) => y + 1);
      setMonth(0);
    } else setMonth((m) => m + 1);
  };

  return (
    <div>
      <p>
        {months[month]} {year}
      </p>
      <div className="calendar-grid">
        {week.map((d, idx) => (
          <div key={idx + d} className="calendar-cell">
            {d || ""}
          </div>
        ))}
        {mat.flat().map((d, idx) => {
          const now = new Date(year, month, d);
          today.setHours(0, 0, 0, 0);
          now.setHours(0, 0, 0, 0);
          console.log(today.getTime() === now.getTime());
          return (
            <div
              key={idx}
              className={`calendar-cell ${
                today.getTime() === now.getTime() ? "today" : ""
              }`}
            >
              {d || ""}
            </div>
          );
        })}
      </div>
      <button onClick={handlePrev}>Prev</button>
      <button onClick={handleNext}>Next</button>
    </div>
  );
}

export default App;

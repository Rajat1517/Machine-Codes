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

const years = Array.from({ length: 2030 - 1960 + 1 }, (_, index) => 1960 + index);


function App() {
  const [mat, setMat] = useState([]);
  const [month, setMonth] = useState(0);
  const [year, setYear] = useState(0);
  const [selectMonth, setSelectMonth] = useState(false);
  const [selectYear, setSelectYear] = useState(false);

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
    populateMat(year, month);
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
        <button onClick={handlePrev}>&#9668;</button>
        <span onClick={() => {
          setSelectMonth(true)
        }}>{selectMonth ? <select onChange={(e) => { setMonth(Number(e.target.value)); setSelectMonth(false) }}>
          <option value={month}>{months[month]}</option>
          {months.map((mon, index) => {
            if (index === month) return null;
            return (
              <option key={mon} value={index}>{mon}</option>
            )
          })}
        </select> : months[month]}</span> <span onClick={() => {
          setSelectYear(true)
        }}>{selectYear ? <select onChange={(e) => { setYear(Number(e.target.value)); setSelectYear(false) }}>
          <option value={year}>{year}</option>
          {years.map((yr) => {
            if (yr === year) return null;
            return (
              <option key={yr} value={yr}>{yr}</option>
            )
          })}
        </select> : year}</span>
        <button onClick={handleNext}>&#9658;</button>
      </p>
      <div className="calendar-grid">
        {week.map((d, idx) => (
          <div key={idx + d}>
            {d || ""}
          </div>
        ))}
        {mat.flat().map((d, idx) => {
          const now = new Date(year, month, d);
          today.setHours(0, 0, 0, 0);
          now.setHours(0, 0, 0, 0);
          return (
            <div
              key={idx}
              className={`calendar-cell ${today.getTime() === now.getTime() ? "today" : ""
                } ${d ? "bordered" : ""}`}
            >
              {d || ""}
            </div>
          );
        })}
      </div>


    </div>
  );
}

export default App;

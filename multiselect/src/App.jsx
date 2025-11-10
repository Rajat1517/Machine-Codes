import React, { useState } from "react";
import "./App.css";

const data = [
  "Iron Man",
  "Captain America",
  "Thor",
  "Hulk",
  "Black Widow",
  "Hawkeye",
  "War Machine",
  "Scarlet Witch",
  "Vision",
  "Falcon",
  "Quicksilver",
  "Spider-Man",
  "Ant-Man",
  "Captain Marvel",
  "Rocket Raccoon",
  "Nebula",
  "Okoye"
];


function App() {
  const [selected, setSelected] = useState([]);
  const [filter,setFilter]= useState("");

  return (
    <div className="border-2 rounded border-black p-4 text-black-800">
      <div className="rounded pb-0 border-box min-w-fit-content ">
        <div className="flex w-full gap-2 flex-wrap" >
          {selected.map((item, index) => (
            <div className="rounded-md bg-slate-200 p-1" key={item}>
              <span >{item}</span>
              <button
                onClick={() =>
                  setSelected((p) => p.filter((_, i) => i !== index))
                }
              >
                x
              </button>
            </div>
          ))}
        </div>
        <input placeholder="Your favuorite avenger" className=" placeholder-black-400 p-2 w-full my-4 border-2 border-black rounded-md" type="text" onChange={(e)=>{
          setFilter(e.target.value)
        }} />
      </div>
      <ul className="text-left border-2  border-black scroll max-h-36 overflow-y-scroll">
        {data.map((option) => {
          if(!option.toLowerCase().includes(filter.toLowerCase()) || selected.includes(option)) return null;
          return (
            <li className="w-[80%]" key={option}>
              <button onClick={()=>setSelected(p=>[...p,option])}>{option}</button>
            </li>
          );
        })}
        {data.every(option=> !option.toLowerCase().includes(filter.toLowerCase()))&& <li>No matches</li>}
        {data.length ===  selected.length && <li>Selected All</li>}
      </ul>
    </div>
  );
}

export default App;

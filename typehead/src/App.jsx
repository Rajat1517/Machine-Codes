import { useState } from "react";
import "./App.css";
import TypeHead from "./components/TypeHead";

function App() {
  const [filter, setFilter] = useState("");

  return (
    <div style={{color: "white"}}>
      <TypeHead setFilter={setFilter} />
      <p>{filter}</p>
    </div>
  );
}

export default App;

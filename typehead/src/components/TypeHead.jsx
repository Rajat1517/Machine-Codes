import { useEffect, useState } from "react";
import useDebounce from "../hooks/useDebounce";
import fetchData from "../utils/fetchData";

export default function TypeHead({ setFilter }) {
  const [suggestions, setSuggestions] = useState([]);
  const [val, setVal] = useState("");

  

  const fetchSuggestions = useDebounce(async () => {
    try {
      const data = await fetchData(val);
      setSuggestions(data);
    } catch (error) {
      console.error(error);
    }
  }, 400);

  const handleChange = (e) => {
    setVal(e.target.value);
  };

  useEffect(() => {
    // fetch suggestions
    fetchSuggestions(val);
  }, [val, fetchSuggestions]);

  return (
    <header style={{ background: "green" }}>
      <div>
        <label htmlFor="search">Search: </label>
        <input type="text" name="search" value={val} onChange={handleChange} />
      </div>

      {suggestions.length > 0 && (
        <ul>
          {suggestions.map((suggest) => {
            return (
              <li>
                {suggest} <button onClick={() => setFilter(suggest)}>Go</button>
              </li>
            );
          })}
        </ul>
      )}
    </header>
  );
}

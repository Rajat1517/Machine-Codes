import { useMemo } from "react";
import data from "./assets/data.json";
import { useState } from "react";

function App() {
  const [page, setPage] = useState(0);
  const [rowsPerPage,setRowsPerPage] = useState(2);
  const lastPage = useMemo(()=>Math.ceil(data.length / rowsPerPage)-1,[rowsPerPage]);
  const list= useMemo(()=>{
    const first= page*rowsPerPage;
    const last= first+rowsPerPage;
    return data.slice(first,last);
  },[page,rowsPerPage])

  return (
    <div>
      {list.map((item) => {
        return <div key={item.id}>{item.name}</div>;
      })}
      <button disabled={page === 0} onClick={() => setPage((p) => p - 1)}>
        back
      </button>
      <button
        disabled={page === lastPage}
        onClick={() => setPage((p) => p + 1)}
      >
        next
      </button>
      <select name="rowsperpage" onChange={(e)=>{
        setRowsPerPage(Number(e.target.value))
        setPage(0);
      }}>
        <option value="2">2</option>
        <option value="4">4</option>
        <option value="7">7</option>
      </select>
    </div>
  );
}

export default App;

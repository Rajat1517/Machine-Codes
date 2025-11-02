import { useEffect, useLayoutEffect, useState } from "react";

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore,setHasMore]= useState(true);
  const [start,setStart]= useState(0)
  
  const fetchData = async () => {
    try {
      if(loading || !hasMore) return;
      console.log("loading");
      setLoading(true);
      let res = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_start=${start}&_limit=30`
      );
      res = await res.json();
      
      setData(prev=>{
        const ans= [...prev,...res]
        localStorage.setItem("data",JSON.stringify(ans));
        return ans;
      });
      if(res.length<30) setHasMore(false);
      setStart(prev=>prev+1);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useLayoutEffect(()=>{
    const scroll= Number(localStorage.getItem("scrollTop"));
    if(scroll && data.length>0){
      const elem= document.getElementById("scrollable");
      elem.scrollTo({
        top:scroll,
        behavior: "smooth",
      });
    }
  },[data])

  useEffect(() => {
    const data= JSON.parse(localStorage.getItem("data"));
    if(!data)fetchData();   
    else setData(data); 
  }, []);

  const handleScroll= (e)=>{
    const {clientHeight, scrollTop, scrollHeight}= e.target; 
    localStorage.setItem("scrollTop", scrollTop);
    if(scrollHeight-Math.round(scrollTop)<= clientHeight+1)fetchData();
  }

  return (
    <div id="scrollable" style={{height: "50vh", border: "1px solid blue", overflowY: "scroll"}} onScroll={handleScroll} >
      <ol >
      {data.map((item,index) => {
        return <li key={item.id+"a"+index}>{item.title}</li>;
      })}
      </ol>
      {loading && <p>Loading...</p>}
      {!hasMore && <p>No more data left</p>}
    </div>
  );
}

export default App;

import { useEffect, useState } from "react"

function Incremental() {
    const [marked,setMarked]= useState(13);
    
    useEffect(()=>{
        const timer= setTimeout(()=>{
            setMarked(prev=>prev===15?-1:prev+1);
        },100)

        return ()=> clearTimeout(timer);
    },[marked])

  return (
    <div>
      <div className="container">
         {Array.from({length: 16},()=>0).map((_,index)=>{
            return(
                <div className={`item ${index<=marked? "marked":""}`}>
                </div>
            )
         })}
      </div>
    </div>
  )
}

export default Incremental

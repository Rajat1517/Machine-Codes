import { useState } from 'react'
import './App.css'
import Input from "./components/Input";
import Comment from './components/Comment';



function App() {

  const [comments, setComments] = useState([]);



  return (
    <div className='flex w-screen min-h-screen justify-center p-16 bg-slate-300 items-start'>
      <div className='flex flex-col justify-center items-left border-2 border-black rounded p-2 min-w-[40%] px-8 border-box h-fit-content'>
        <Input setComments={setComments} parentId={null} type="new" />
        {comments?.map((comment) => {
          return <Comment key={comment.id} comment={comment} parentId={null} setComments={setComments} />
        })}
      </div>
    </div>
  )
}

export default App
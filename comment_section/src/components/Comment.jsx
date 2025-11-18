import { useState } from "react"
import Input from "./Input"

export default function Comment({ comment, setComments }) {

    const [edit, setEdit] = useState(false);
    const [reply, setReply] = useState(false);


    function deleteNode(tree, idToDelete) {
        return tree
            .filter(node => node.id !== idToDelete)
            .map(node => ({
                ...node,
                children: deleteNode(node.children, idToDelete)
            }));
    }



    const handleDelete = (id) => {

        setComments(p => {
            return deleteNode(p, id);
        })
    }

    return (
        <div className="m-2 p-2 border-2 border-slate-400 rounded w-fit-content border-box " style={{ marginLeft:"1rem" }}>
            <p>{comment.content}</p>
            <button className="bg-slate-200 px-1 rounded mx-[0.2rem]" onClick={() => setReply(p => !p)}>reply</button>
            <button className="bg-slate-200 px-1 rounded mx-[0.2rem]" onClick={() => setEdit(p => !p)}>edit</button>
            <button className="bg-slate-200 px-1 rounded mx-[0.2rem]" onClick={() => handleDelete(comment.id)}>delete</button>
            {edit && <Input setComments={setComments} onClose={() => setEdit(false)} parentId={comment.id} type={"edit"} />}
            {reply && <Input setComments={setComments} parentId={comment.id} type={"reply"} onClose={() => setReply(false)} />}
            {comment.children?.map((child) => {
                return <Comment comment={child} setComments={setComments} />
            })}
        </div>
    )
}
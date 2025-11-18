import { useState } from "react";
import { nanoid } from "nanoid";


export default function Input({ setComments, parentId, type, onClose }) {
    const [comment, setComment] = useState("");

    const handleChange = (e) => {
        setComment(e.target.value);
    }

    function addReply(tree, parentId, content) {
        return tree.map(node => {
            if (node.id === parentId) {
                return {
                    ...node,
                    children: [...node.children, { id: nanoid(), content, children: [] }]
                };
            }

            return {
                ...node,
                children: addReply(node.children, parentId, content)
            };
        });
    }



    const editComment = (p, parentId, comment) => {
        console.log(p);
        return p.map(node => {
            if (node.id === parentId) {
                console.log(node);
                return { ...node, content: comment }
            }   
            return {
                ...node,
                children: editComment(node.children, parentId, comment)
            };
        })
    }


    const handleComment = (e) => {
        e.preventDefault();
        setComments(p => {
            if (type === "new") return [...p, { id: nanoid(), content: comment, children: [] }];
            if (type === "reply") return addReply(p, parentId, comment);
            if (type === "edit") return editComment(p, parentId, comment);
        })

        onClose?.();
        setComment("");
    }

    return (
        <form onSubmit={handleComment} className="w-[90%] m-2 border-box ">
            <input autoComplete="off" autoCorrect="off" className="w-full my-2 rounded px-2" type="text" name='comment' placeholder={`${type==="new"? "comment...": type==="reply"? "reply...":"edit..."}`} value={comment} onChange={handleChange} />
            <button className="rounded bg-slate-200 p-[1px]" >Comment</button>
        </form>
    )
}
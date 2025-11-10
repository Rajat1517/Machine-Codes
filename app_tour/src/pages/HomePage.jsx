import { useState } from "react"
import Card from "../components/Card"
import { TourPopup } from "../components/Tour";





const cards = [
    {
        id: 1,
        heading: "heading1",
        details: "details 2details 2details 2details 2details 2details 2details 2"
    },
    {
        id: 2,
        heading: "heading1",
        details: "details 2details 2details 2details 2details 2details 2details 2"
    },
    {
        id: 3,
        heading: "heading1",
        details: "details 2details 2details 2details 2details 2details 2details 2"
    },
    {
        id: 4,
        heading: "heading1",
        details: "details 2details 2details 2details 2details 2details 2details 2"
    },
    {
        id: 5,
        heading: "heading1",
        details: "details 2details 2details 2details 2details 2details 2details 2"
    },
    {
        id: 6,
        heading: "heading1",
        details: "details 2details 2details 2details 2details 2details 2details 2"
    },
    {
        id: 7,
        heading: "heading1",
        details: "details 2details 2details 2details 2details 2details 2details 2"
    },
]


const sides = [
    "Home",
    "About",
    "Detials",
    "Brother",
]

export default function HomePage() {

    const [half,setHalf]= useState(3);

    return (
        <div className=" flex w-full h-full">
            <aside className=" w-[30%] h-full flex flex-col justify-between gap-8">
                {sides.map((side,index) => {
                    return (
                        <h2 key={side}>
                            {side}
                            <TourPopup passedStep={index}/>
                        </h2>
                    )
                })}
            </aside>

            {half===3 && <main className=" w-[60%] h-full flex flex-wrap gap-2">
                {cards.map((card, index) => {
                    if(index<=half)
                    return <Card key={card.id} card={card} index={index} setHalf={setHalf}/>
                    return null;
                })}
            </main>}

            <hr /><hr /><hr />
            {half===4 && <main className=" w-[60%] h-full flex flex-wrap gap-2">
                {cards.map((card, index) => {
                    if(index>=half)
                    return <Card key={card.id} card={card} index={index} setHalf={setHalf}/>
                    return null;
                })}
            </main>}

        </div>
    )
}
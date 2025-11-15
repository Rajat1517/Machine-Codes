import { useState } from "react"
import Card from "../components/Card"
import { Highlighter, TourPopup } from "../components/Tour";
import { useTourNavigate } from "../hooks/useTourNavigate";





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

    const { navigateTour } = useTourNavigate();
    const [half, setHalf] = useState(3);

    const handleRoute = () => {
        navigateTour("/second");
    }

    const handleBack = () => {
        navigateTour("/second");
    }


    return (
        <div className="w-full h-full">

            <Highlighter passedStep={0}><h2><button onClick={handleRoute}>Home</button> <TourPopup nextHandler={handleRoute} passedStep={0} /></h2></Highlighter>
            <Highlighter passedStep={2}><h2><button>About </button> <TourPopup passedStep={2} backHandler={handleBack} /></h2></Highlighter>
            <Highlighter passedStep={3}><h2><button>Details</button><TourPopup passedStep={3} /></h2></Highlighter>
            <Highlighter passedStep={4}><h2><button>Brother</button><TourPopup passedStep={4} /></h2></Highlighter>
            <Highlighter passedStep={5}><h2><button>Brother</button><TourPopup passedStep={5} /></h2></Highlighter>
            <Highlighter passedStep={6}><h2><button>Brother</button><TourPopup passedStep={6} /></h2></Highlighter>
            <Highlighter passedStep={7}><h2><button>Brother</button><TourPopup passedStep={7} /></h2></Highlighter>
            <Highlighter passedStep={8}><h2><button>Brother</button><TourPopup passedStep={8} /></h2></Highlighter>
            <Highlighter passedStep={9}><h2><button>Brother</button><TourPopup passedStep={9} /></h2></Highlighter>
            <Highlighter passedStep={10}><h2><button>Brother</button><TourPopup passedStep={10} /></h2></Highlighter>
            <Highlighter passedStep={11}><h2><button>Brother</button><TourPopup passedStep={11} /></h2></Highlighter>

        </div>
    )

    // return (
    //     <div className=" flex w-full h-full">
    //         <aside className=" w-[30%] h-full flex flex-col justify-between gap-8">
    //             {sides.map((side,index) => {
    //                 return (
    //                     <h2 key={side}>
    //                         {side}
    //                         <TourPopup passedStep={index}/>
    //                     </h2>
    //                 )
    //             })}
    //         </aside>

    //         {half===3 && <main className=" w-[60%] h-full flex flex-wrap gap-2">
    //             {cards.map((card, index) => {
    //                 if(index<=half)
    //                 return <Card key={card.id} card={card} index={index} setHalf={setHalf}/>
    //                 return null;
    //             })}
    //         </main>}

    //         <hr /><hr /><hr />
    //         {half===4 && <main className=" w-[60%] h-full flex flex-wrap gap-2">
    //             {cards.map((card, index) => {
    //                 if(index>=half)
    //                 return <Card key={card.id} card={card} index={index} setHalf={setHalf}/>
    //                 return null;
    //             })}
    //         </main>}

    //     </div>
    // )
}
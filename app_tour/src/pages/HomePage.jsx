import { Highlighter, TourPopup } from "../components/Tour";
import { useTourNavigate } from "../hooks/useTourNavigate";





// const cards = [
//     {
//         id: 1,
//         heading: "heading1",
//         details: "details 2details 2details 2details 2details 2details 2details 2"
//     },
//     {
//         id: 2,
//         heading: "heading1",
//         details: "details 2details 2details 2details 2details 2details 2details 2"
//     },
//     {
//         id: 3,
//         heading: "heading1",
//         details: "details 2details 2details 2details 2details 2details 2details 2"
//     },
//     {
//         id: 4,
//         heading: "heading1",
//         details: "details 2details 2details 2details 2details 2details 2details 2"
//     },
//     {
//         id: 5,
//         heading: "heading1",
//         details: "details 2details 2details 2details 2details 2details 2details 2"
//     },
//     {
//         id: 6,
//         heading: "heading1",
//         details: "details 2details 2details 2details 2details 2details 2details 2"
//     },
//     {
//         id: 7,
//         heading: "heading1",
//         details: "details 2details 2details 2details 2details 2details 2details 2"
//     },
// ]

export default function HomePage() {

    const { navigateTour } = useTourNavigate();

    const handleRoute = () => {
        navigateTour("/second");
    }

    const handleBack = () => {
        navigateTour("/second");
    }


    return (
        <div className="w-full h-full flex flex-col justify-center">

            <Highlighter passedStep={0}><span className="w-24"><button onClick={handleRoute}>0</button> <TourPopup nextHandler={handleRoute} passedStep={0} /></span></Highlighter>
            <Highlighter passedStep={2}><span className="w-24"><button>2 </button> <TourPopup passedStep={2} backHandler={handleBack} /></span></Highlighter>
            <Highlighter passedStep={3}><span className="w-24"><button>3</button><TourPopup passedStep={3} /></span></Highlighter>
            <Highlighter passedStep={4}><span className="w-24"><button>4</button><TourPopup passedStep={4} /></span></Highlighter>
            <Highlighter passedStep={5}><span className="w-24"><button>5</button><TourPopup passedStep={5} /></span></Highlighter>
            <Highlighter passedStep={6}><span className="w-24"><button>6</button><TourPopup passedStep={6} /></span></Highlighter>
            <Highlighter passedStep={7}><span className="w-24"><button>7</button><TourPopup passedStep={7} /></span></Highlighter>
            <Highlighter passedStep={8}><span className="w-24"><button>8</button><TourPopup passedStep={8} /></span></Highlighter>
            <Highlighter passedStep={9}><span className="w-24"><button>9</button><TourPopup passedStep={9} /></span></Highlighter>
            <Highlighter passedStep={10}><span className="w-24"><button>10</button><TourPopup passedStep={10} /></span></Highlighter>

        </div>
    )
}
import { Content, Title, TourPopup, TourButtonBack, TourButtonNext } from "./Tour";



export default function Card({ card, index, setHalf }) {
    

    return (
        <div  className="border-2 border-black rounded p-4 text-left max-w-48 relative">
            <h2>{card.heading}</h2>
            <p>{card.details}</p>
            {index !== 3 && index !==4 && <TourPopup passedStep={index + 4} />}
            {index === 3 &&
                <TourPopup passedStep={index + 4}>
                    <article className={`bg-white rounded min-w-fit-content min-h-fit-content border-box p-4`}>
                        <h3><Title/></h3>
                        <p><Content/></p>
                        <div className="flex w-full justify-between">
                            <TourButtonBack>back</TourButtonBack>
                            <TourButtonNext onClick={()=>setHalf(4)} >next</TourButtonNext>
                        </div>
                    </article>
                </TourPopup>}
            {index === 4 &&
                <TourPopup passedStep={index + 4}>
                    <article className={`bg-white rounded min-w-fit-content min-h-fit-content border-box p-4`}>
                        <h3><Title/></h3>
                        <p><Content/></p>
                        <div className="flex w-full justify-between">
                            <TourButtonBack onClick={()=>setHalf(3)} >back</TourButtonBack>
                            <TourButtonNext>next</TourButtonNext>
                        </div>
                    </article>
                </TourPopup>}
        </div>
    )
}
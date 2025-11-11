import { TourPopup } from "../components/Tour"
import { useTourNavigate } from "../hooks/useTourNavigate";

export default function SecondPage(){

    const {navigateTour}= useTourNavigate();

    const handleClick= ()=>{
        navigateTour("/");
    }

    return(
        <div>
            <h2>Hello</h2>
            <TourPopup backHandler={handleClick} nextHandler={handleClick} passedStep={1}/>
        </div>
    )
}
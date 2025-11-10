import { useContext } from "react";
import { TourContext } from "../components/Tour";

export default function useTour(){
    const {step, steps, setStep}= useContext(TourContext);

    return {step, steps, setStep};
}
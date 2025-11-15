import { createContext, useContext, useEffect, useRef, useState } from "react"
import { useTourNavigate } from "../hooks/useTourNavigate";
import "../App.css";

export const TourContext = createContext();

export default function Tour({ steps, children, id }) {

    const [step, setStep] = useState(0);
    const [doneTour, setDoneTour] = useState(false);

    useEffect(() => {
        const val = JSON.parse(localStorage.getItem(`tour-${id}`))
        if (val) {
            setDoneTour(val.doneTour);
            setStep(val.step);
        }
        else localStorage.setItem(`tour-${id}`, JSON.stringify({
            doneTour: false,
            step: 0,
        }));
    }, [id])

    return (
        <TourContext.Provider value={{ step, setStep, steps, doneTour, id, setDoneTour }}>
            {children}
        </TourContext.Provider>
    )
}


export function TourPopup({ passedStep, children, left, top, nextHandler, finishHandler, backHandler }) {

    const { steps, step, doneTour } = useContext(TourContext);

    if (doneTour) return null;


    if (step !== passedStep) return null;


    if (!children)
        return (
            <article className={`bg-white popups rounded min-w-fit-content min-h-fit-content border-box p-4 absolute opacity-100 z-10 top-[${top}px] left-[${left}px]`}>
                <h3>{steps[step].title ?? "Title"}</h3>
                <p>{steps[step].content ?? "Content"}</p>
                <div className="flex w-full justify-between">
                    <TourButtonBack onClick={backHandler}>back</TourButtonBack>
                    {step === steps.length - 1 ? <TourButtonFinish onClick={finishHandler}>finish</TourButtonFinish> : <TourButtonNext onClick={nextHandler}>next</TourButtonNext>}
                </div>
            </article>
        )

    return <div className={`absolute popups opacity-100 top-[${steps[step].top}px] left-[${steps[step].left}px]`}>{children}</div>
}


export function TourButtonNext({ onClick: handler, children }) {

    const { steps, setStep, step, id } = useContext(TourContext);

    const handleClick = () => {
        if (handler) handler();
        setStep(p => {
            const val = JSON.parse(localStorage.getItem(`tour-${id}`));
            val.step = p + 1;
            localStorage.setItem(`tour-${id}`, JSON.stringify(val));
            return p + 1
        })
        if (step === steps.length - 1) {
            localStorage.setItem(`tour-${id}`, JSON.stringify(true));
        }
    }

    return (

        <button className="bg-slate-300 p-2 rounded disabled:bg-slate-100 disabled:cursor-not-allowed" disabled={step === steps.length - 1} onClick={handleClick} >
            {children}
        </button>

    )
}



export function TourButtonBack({ onClick: handler, children }) {

    const { setStep, step, id } = useContext(TourContext);

    const handleClick = () => {
        if (handler) handler();
        setStep(p => {
            const val = JSON.parse(localStorage.getItem(`tour-${id}`));
            val.step = p - 1;
            localStorage.setItem(`tour-${id}`, JSON.stringify(val));
            return p - 1
        })
    }


    return (
        <button className="bg-slate-300 p-2 rounded disabled:bg-slate-100 disabled:cursor-not-allowed" disabled={step === 0} onClick={handleClick}>
            {children}
        </button>
    )

}


export function TourButtonFinish({ onClick: handler, children }) {

    const { id, setDoneTour } = useContext(TourContext);

    const handleClick = () => {
        if (handler) handler();
        const val = JSON.parse(localStorage.getItem(`tour-${id}`));
        val.doneTour = true;
        localStorage.setItem(`tour-${id}`, JSON.stringify(val));
        setDoneTour(true);
    }

    return (
        <button className="bg-slate-300 p-2 rounded" onClick={handleClick}>
            {children}
        </button>
    )

}

export function Title() {
    const { steps, step } = useContext(TourContext);
    return <span>{steps[step].title ?? "Title"}</span>
}


export function Content() {
    const { steps, step } = useContext(TourContext);
    return <span>{steps[step].content ?? "Content"}</span>
}



export function TourRoute({ children }) {

    const { id } = useContext(TourContext);
    const [isWrongOrder, setIsWrongOrder] = useState(false);
    const { navigateTour } = useTourNavigate();
    useEffect(() => {
        const { doneTour, route } = JSON.parse(localStorage.getItem(`tour-${id}`));
        console.log(route);
        if (!route) return;
        if (!doneTour && route !== window.location.pathname) {
            console.log("wrong route")
            setIsWrongOrder(true);
        }
    }, [id])


    return (
        <>
            {isWrongOrder &&
                <div className=" absolute top-0 left-0 bg-gray-100 w-[100vw] h-[100vh] flex justify-center align-center">
                    <div className="min-w-fit-content min-h-fit-content p-4 rounded bg-white">
                        <h3 className="font-2xl">Tour</h3>
                        <p>Do you want to pick up where you left??</p>
                        <div className="flex w-full justify-end gap-4">
                            <button onClick={() => {
                                setIsWrongOrder(false);
                                navigateTour((JSON.parse(localStorage.getItem(`tour-${id}`))).route)
                            }} className="bg-slate-200 p-2">resume</button>
                            <button onClick={() => {
                                setIsWrongOrder(false);
                            }} className="bg-slate-200 p-2">exit</button>
                        </div>
                    </div>
                </div>}
            {children}
        </>
    )
}


export function Highlighter({ children, passedStep }) {

    const { step } = useContext(TourContext);

    const elemRef= useRef(null);

    if (step === passedStep)
        return (
            <div className="z-200  w-[100vw] h-[100vh] absolute top-0 left-0 bg-black opacity-60 border-box">
                <div className={`border-white border-2 z-400 relative top-${elemRef.current?.getBoundingClientReact?.top} left-${elemRef.current?.getBoundingClientReact?.left}   w-fit-content h-fit-content opacity-100`}>
                    {children}
                </div>
            </div>
        )


    return (
        <div ref={elemRef}>
            {children}
        </div>
    )
}


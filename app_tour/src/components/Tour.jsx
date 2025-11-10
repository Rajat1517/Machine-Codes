import { createContext, useContext, useEffect, useState } from "react"

export const TourContext = createContext();

export default function Tour({ steps, children, id }) {

    const [step, setStep] = useState(0);
    const [doneTour, setDoneTour] = useState(false);

    useEffect(() => {
        const val = JSON.parse(localStorage.getItem(`tour-${id}`))
        if (val) setDoneTour(val);
        else localStorage.setItem(`tour-${id}`, JSON.stringify(false));
    }, [id])

    return (
        <TourContext.Provider value={{ step, setStep, steps, doneTour, id }}>
            {children}
        </TourContext.Provider>
    )
}


export function TourPopup({ passedStep, children, left, top }) {

    const { steps, step } = useContext(TourContext);


    if (step !== passedStep) return null;


    if (!children)
        return (
            <article className={`bg-white rounded min-w-fit-content min-h-fit-content border-box p-4 absolute z-10 top-[${top}px] left-[${left}px]`}>
                <h3>{steps[step].title ?? "Title"}</h3>
                <p>{steps[step].content ?? "Content"}</p>
                <div className="flex w-full justify-between">
                    <TourButtonBack>back</TourButtonBack>
                    <TourButtonNext>next</TourButtonNext>
                </div>
            </article>
        )

    return <div className={`absolute top-[${steps[step].top}px] left-[${steps[step].left}px]`}>{children}</div>
}


export function TourButtonNext({ onClick: handler, children }) {

    const { steps, setStep, step, id } = useContext(TourContext);

    const handleClick = () => {
        if (handler) handler();
        setStep(p => p + 1)
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

    const { setStep, step } = useContext(TourContext);

    const handleClick = () => {
        if (handler) handler();
        setStep(p => p - 1)
    }


    return (
        <button className="bg-slate-300 p-2 rounded disabled:bg-slate-100 disabled:cursor-not-allowed" disabled={step === 0} onClick={handleClick}>
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



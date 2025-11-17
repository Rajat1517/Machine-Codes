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
            <article className={`bg-white popups rounded w-fit-content h-fit-content min-w-48 border-box p-4 absolute opacity-100 z-60 top-[${top}px] left-[${left}px]`}>
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
        if (JSON.parse(!localStorage.getItem(`tour-${id}`))) return;
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

    const { step, doneTour } = useContext(TourContext);

    const elemRef = useRef(null);


    const [rect, setRect] = useState(null);

    useEffect(() => {
        const compute = () => {
            if (!elemRef.current) return setRect(null);
            const r = elemRef.current.getBoundingClientRect();
            setRect({
                top: Math.round(r.top + window.scrollY),
                left: Math.round(r.left + window.scrollX),
                width: Math.round(r.width),
                height: Math.round(r.height),
                right: Math.round(r.right + window.scrollX),
                bottom: Math.round(r.bottom + window.scrollY)
            });
        }

        if (step === passedStep) {
            compute();
            window.addEventListener('resize', compute);
            window.addEventListener('scroll', compute, true);
        }

        return () => {
            window.removeEventListener('resize', compute);
            window.removeEventListener('scroll', compute, true);
        }
    }, [step, passedStep]);

    if (step === passedStep && rect && !doneTour) {
        return (
            <div style={{ position: 'relative', zIndex: 70, width: "fit-content", height: "fit-content" }} ref={elemRef}>
                <div style={{ position: 'relative', zIndex: 71 }}>
                    {children}
                </div>

                <div aria-hidden style={{ position: 'fixed', inset: 0, zIndex: 60, pointerEvents: 'auto' }}>
                    <div className="overlay" style={{ position: 'absolute', left: 0, top: 0, right: 0, height: rect.top, background: 'rgba(0,0,0,0.6)' }} />
                    <div className="overlay" style={{ position: 'absolute', left: 0, top: rect.top, width: rect.left, height: rect.height, background: 'rgba(0,0,0,0.6)' }} />
                    <div className="overlay" style={{ position: 'absolute', left: rect.left + rect.width, top: rect.top, right: 0, height: rect.height, background: 'rgba(0,0,0,0.6)' }} />
                    <div className="overlay" style={{ position: 'absolute', left: 0, top: rect.top + rect.height, right: 0, bottom: 0, background: 'rgba(0,0,0,0.6)' }} />
                </div>
                <div style={{ position: 'fixed', top: rect.top, left: rect.left, width: rect.width, height: rect.height, boxShadow: '0 0 0 3px rgba(255,255,255,0.9)', borderRadius: 6, pointerEvents: 'none', zIndex: 72 }} />
            </div>
        )
    }

    return (
        <div style={{ width: "fit-content", height: "fit-content" }} ref={elemRef}>
            {children}
        </div>
    )
}


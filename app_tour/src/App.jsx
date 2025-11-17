import { Route, Routes, BrowserRouter } from "react-router-dom"
import HomePage from "./pages/HomePage"
import Tour, { TourRoute } from "./components/Tour"
import SecondPage from "./pages/SecondPage"

const tour = [
  {
    title: "First Step",
    content: "First Step content",
    left: 2,
    top: 5,
  },
  {
    title: "Second Step",
    content: "Second Step content",
    left: 9,
    top: 9,
  },
  {
    title: "third Step",
    content: "third Step content",
    left: 5,
    top: 9,
  },
  {
    title: "fourth Step",
    content: "fourth Step content",
    left: 10,
    top: 100,
  },
  {
    title: "fifth Step",
    content: "fifth Step content",
    left: 2,
    top: 6,
  },
  {
    title: "sixth Step",
    content: "sixth Step content",
    left: 2,
    top: 5,
  },
  {
    title: "seventh Step",
    content: "seventh Step content",
    left: 8,
    top: 7,
  },
  {
    title: "eigth Step",
    content: "eigth Step content",
    left: 9,
    top: 3,
  },
  {
    title: "9 Step",
    content: "eigth Step content",
    left: 9,
    top: 3,
  },
  {
    title: "10 Step",
    content: "eigth Step content",
    left: 9,
    top: 3,
  },
  {
    title: "11 Step",
    content: "eigth Step content",
    left: 9,
    top: 3,
  }
]

function App() {

  return (
    <Tour steps={tour} id={0}>
      <div className="min-h-[100vh] min-w-[100vw] bg-slate-300">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<TourRoute><HomePage /></TourRoute>} />
            <Route path="/second" element={<TourRoute><SecondPage /></TourRoute>} />
          </Routes>
        </BrowserRouter>
      </div>
    </Tour>
  )
}

export default App

/**
 * If you ever want to evolve it further, next natural steps could be:

🧭 Add a global overlay or spotlight around the focused element

🔄 Support multi-page continuation (persisting step across routes) done

🎨 Animate popups or transitions done

🧩 Add a “resume tour” mode if the user closes and reopens it later done
 */
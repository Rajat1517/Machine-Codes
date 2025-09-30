import { useState, useRef } from "react";
import useDebounce from "./hooks/useDebounce";
import Modal from "./components/Modal";
import "./App.css";
import Grid from "./components/Grid";

function App() {
  const [isVisible, setIsVisible] = useState(false);

  const handleClose = () => {
    setIsVisible(false);
    openButtonRef.current.focus();
  };

  const openButtonRef = useRef(null);
  const clicker = useDebounce((count) => console.log(`clicked ${count} times`),500);

  const handleDouble = () => {
    clicker();
  };


  return (
    <div>
      <h1>Custom Modal Demo</h1>
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit.
        Exercitationem, temporibus cupiditate ad nemo, fugit nostrum ut
        consequuntur libero cum voluptatem, optio esse sunt eos velit dolorem
        tenetur culpa facilis odit. Aut expedita id molestias facere suscipit,
        ut quae mollitia exercitationem consequuntur a maxime excepturi. Qui eos
        unde similique magni fugiat?Lorem ipsum dolor sit amet consectetur,
        adipisicing elit. Doloremque velit ipsum cum rem aliquid blanditiis,
        unde nihil ab, numquam ut similique. Tempore voluptatem labore cum et
        laborum amet pariatur ut?
      </p>
      <button ref={openButtonRef} onClick={() => setIsVisible(true)}>
        Open
      </button>
      {isVisible && <Modal onClose={handleClose} />}

      <button onClick={handleDouble}>Multi Click</button>
      <Grid/>
    </div>
  );
}

export default App;

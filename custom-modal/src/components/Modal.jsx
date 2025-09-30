import React from "react";

function Modal({ onClose }) {
  

  return (
    <div className="underlay" onClick={onClose}>
      <div
        className="container"
        autoFocus
        tabIndex={-1}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse iure a
          maxime at dolore cum laborum maiores perspiciatis blanditiis ipsum
          quibusdam officia enim vitae in velit sed ab, rem aut!
        </p>
        <button onClick={onClose}>Ok</button>
      </div>
    </div>
  );
} 

export default Modal;

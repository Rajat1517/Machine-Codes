import { useState } from "react";
function ReverseAndMark() {
  const [arr, setArr] = useState(Array.from({ length: 16 }, () => 0));
  const [order, setOrder] = useState([]);

  const handleMark = (index) => {
    setOrder((prev) => {
      return [...prev, index];
    });
    setArr((prev) => {
      return [...prev.slice(0, index), 1, ...prev.slice(index + 1)];
    });
  };

  const handleBack = () => {
    const last = order.at(-1);
    setOrder((prev) => prev.slice(0, -1));
    setArr((prev) => [...prev.slice(0, last), 0, ...prev.slice(last + 1)]);
  };

  return (
    <div>
      <div className="container">
        {arr.map((item, index) => {
          return (
            <button
              key={index}
              disabled={item === 1}
              className={`item ${item === 1 ? "marked" : ""}`}
              onClick={() => handleMark(index)}
            ></button>
          );
        })}

        <button disabled={order.length === 0} onClick={handleBack}>
          Back
        </button>
      </div>
    </div>
  );
}

export default ReverseAndMark;

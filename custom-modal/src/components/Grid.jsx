import React from "react";

function Grid() {
  const noOfGuesses = 10;
  const noOfLetters = 10;

  return (
    <div>
      {Array.from({ length: noOfGuesses }, (_, i) => i + 1).map(() => {
        return (
          <div className="flex gap-2 max-w-[52%] flex-wrap">
            {Array.from({ length: noOfLetters }, (_, i) => i + 1).map(
              (item) => {
                return <div>{item}</div>;
              }
            )}
          </div>
        );
      })}
    </div>
  );
}

export default Grid;

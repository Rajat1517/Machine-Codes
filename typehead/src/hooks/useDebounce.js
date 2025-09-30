import { useCallback, useRef } from "react";

function useDebounce(cb, delay) {
  let timer = useRef(null);
  return useCallback(
    (...args) => {
      clearTimeout(timer.current);
      timer.current = setTimeout(() => {
        console.log("calling")
        cb(...args);
        clearTimeout(timer.current);
      }, delay);
    },
    [cb, delay]
  );
}


export default useDebounce;

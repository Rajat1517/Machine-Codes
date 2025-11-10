import { useCallback, useRef } from "react";

export default function useDebounce(fn, gap) {
  const count = useRef(0);
  const timer = useRef(null);
  return useCallback(() => {
    count.current+=1;
    clearTimeout(timer.current);
    timer.current= setTimeout(()=>{
        fn(count.current);
        count.current=0;
    },gap)
  }, [fn, gap]);
}

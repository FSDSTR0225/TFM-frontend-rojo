// hooks/useContainerWidth.js
import { useState, useEffect } from "react";

export function useContainerWidth(ref) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (!ref.current) return;

    const updateWidth = () => {
      if (ref.current) {
        setWidth(ref.current.offsetWidth);
      }
    };

    updateWidth(); // run once

    const observer = new ResizeObserver(() => {
      updateWidth();
    });

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [ref]);

  return width;
}

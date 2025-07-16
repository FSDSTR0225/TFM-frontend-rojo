import { useEffect, useState, useRef } from "react";

// Ease-out: empieza rápido, termina lento
function easeOutQuad(t) {
  return t * (2 - t);
}

export function useCounter(targetNumber, duration = 800, animate = true) {
  const [count, setCount] = useState(targetNumber);
  const started = useRef(false);

  useEffect(() => {
    if (!animate || targetNumber === 0) {
      setCount(targetNumber);
      return;
    }
    if (started.current) return;
    started.current = true;

    const startTime = performance.now();
    const startNumber = targetNumber * 0.8; // Empieza desde el 80%

    const animateCount = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutQuad(progress);
      const value = Math.floor(
        startNumber + (targetNumber - startNumber) * easedProgress
      );
      setCount(value);

      if (progress < 1) {
        requestAnimationFrame(animateCount);
      } else {
        setCount(targetNumber);
      }
    };

    requestAnimationFrame(animateCount);

    return () => {
      started.current = false;
    };
  }, [targetNumber, duration, animate]);

  return count;
}

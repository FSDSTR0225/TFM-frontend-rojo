import { useEffect, useState, useRef } from "react";

function easeInOutQuad(t) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

export function useCounter(targetNumber, duration = 1000, animate = true) {
  const [count, setCount] = useState(targetNumber);
  const started = useRef(false);

  useEffect(() => {
    if (!animate || targetNumber === 0) {
      // No animar, poner el número directamente
      setCount(targetNumber);
      return;
    }
    if (started.current) return; // Evitar animar más de una vez
    started.current = true;

    const startTime = performance.now();

    const animateCount = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeInOutQuad(progress);
      const value = Math.floor(easedProgress * targetNumber);
      setCount(value);

      if (progress < 1) {
        requestAnimationFrame(animateCount);
      } else {
        setCount(targetNumber);
      }
    };

    requestAnimationFrame(animateCount);

    // Si targetNumber cambia, reiniciar animación
    return () => {
      started.current = false;
    };
  }, [targetNumber, duration, animate]);

  return count;
}

import { memo, useEffect, useState } from "react";

const CHARACTERS =
  "01アカサタナハマヤラワガザダバパイキシチニヒミリヰギジヂビピウクスツヌフムユルグズブヅプエケセテネヘメレヱゲゼデベペオコソトノホモヨロヲゴゾドボポ";

// Lightweight Matrix Rain effect that focuses on performance
const MatrixRain = memo(() => {
  // Only render once mounted to avoid hydration issues
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  // Generate columns - this is simpler than using state for better performance
  const columns = Array.from({ length: 25 }, (_, i) => ({
    id: `matrix-col-${i}`,
    left: `${Math.random() * 100}%`,
    duration: `${Math.random() * 10 + 5}s`,
    delay: `${Math.random() * 5}s`,
    opacity: Math.random() * 0.5 + 0.3,
    characters: Array.from(
      { length: 20 },
      () => CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)]
    ).join(),
  }));

  return (
    <div className="matrix-rain">
      {columns.map((column) => (
        <div
          key={column.id}
          className="matrix-column"
          style={{
            left: column.left,
            opacity: column.opacity,
            animationDuration: column.duration,
            animationDelay: column.delay,
          }}
        >
          {column.characters.split("").map((char, i) => (
            <div key={`${column.id}-${i}`}>{char}</div>
          ))}
        </div>
      ))}
    </div>
  );
});

MatrixRain.displayName = "MatrixRain";

export default MatrixRain;

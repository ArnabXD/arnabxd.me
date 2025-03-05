export default function MatrixRain() {
  const matrixLines = Array.from({ length: 20 }, (_, index) => ({
    id: `matrix-line-${index}`,
    left: `${Math.random() * 100}%`,
    duration: `${Math.random() * 10 + 5}s`,
    delay: `${Math.random() * 5}s`,
    characters: Array.from({ length: 20 }, (_, i) => ({
      id: `matrix-line-${index}-char-${i}`,
      char: String.fromCharCode(Math.floor(Math.random() * 93) + 33),
    })),
  }));

  return (
    <div className="fixed inset-0 overflow-hidden">
      {matrixLines.map((line) => (
        <div
          key={line.id}
          className="absolute text-green-500 text-xs animate-matrix-fall"
          style={{
            left: line.left,
            animationDuration: line.duration,
            animationDelay: line.delay,
          }}
        >
          {line.characters.map((char) => (
            <div key={char.id}>{char.char}</div>
          ))}
        </div>
      ))}
    </div>
  );
}

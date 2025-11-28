import { useMatrixRain } from "../hooks/use-matrix-rain";

const MatrixRain = () => {
  const canvasRef = useMatrixRain();

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0, // Set to 0 so it's behind content but visible
        opacity: 0.8,
        pointerEvents: "none", // Let clicks go through to content underneath
      }}
    />
  );
};

export default MatrixRain;

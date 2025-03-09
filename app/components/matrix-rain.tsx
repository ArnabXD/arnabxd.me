import { useRef, useEffect } from "react";

const MatrixRain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Make canvas fill the screen
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Matrix characters
    const chars =
      "01アカサタナハマヤラワガザダバパイキシチニヒミリヰギジヂビピウクスツヌフムユルグズブヅプエケセテネヘメレヱゲゼデベペオコソトノホモヨロヲゴゾドボポヴッン";

    // Setup
    const fontSize = 14;
    // Add column spacing by increasing the gap between columns
    const columnSpacing = 2.5; // Spacing multiplier (higher = more space)
    const columns = Math.floor(canvas.width / (fontSize * columnSpacing));
    const drops: number[] = [];

    // Initialize drops
    for (let i = 0; i < columns; i++) {
      // Start at different positions
      drops[i] = Math.floor((Math.random() * canvas.height) / fontSize) * -1;
    }

    // Drawing function
    const draw = () => {
      // Semi-transparent black to create the fade effect
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Green text
      ctx.fillStyle = "#0F0";
      ctx.font = `${fontSize}px monospace`;

      // Loop through drops
      for (let i = 0; i < drops.length; i++) {
        // Get random character
        const char = chars.charAt(Math.floor(Math.random() * chars.length));

        // Draw character - distribute columns evenly across the canvas width
        const x = Math.floor(i * (canvas.width / columns));
        const y = drops[i] * fontSize;
        ctx.fillText(char, x, y);

        // Reset when it reaches the bottom and randomize start position
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.99) {
          drops[i] = 0;
        }

        // Move drop
        drops[i]++;
      }
    };

    // Animation loop
    const animationId = setInterval(draw, 100); // ~30fps

    // Cleanup
    return () => {
      clearInterval(animationId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

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

import { useRef, useEffect } from "react";
import { useIsClient } from "./use-client";

export const useMatrixRain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isClient = useIsClient();

  useEffect(() => {
    if (!isClient) return;
    
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
    const columnSpacing = 2.5;
    const columns = Math.floor(canvas.width / (fontSize * columnSpacing));
    const drops: number[] = [];

    // Initialize drops
    for (let i = 0; i < columns; i++) {
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

        // Draw character
        const x = Math.floor(i * (canvas.width / columns));
        const y = drops[i] * fontSize;
        ctx.fillText(char, x, y);

        // Reset when it reaches the bottom
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.99) {
          drops[i] = 0;
        }

        // Move drop
        drops[i]++;
      }
    };

    // Animation loop
    const animationId = setInterval(draw, 100);

    // Cleanup
    return () => {
      clearInterval(animationId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [isClient]);

  return canvasRef;
};
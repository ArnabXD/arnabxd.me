// Optimized Easter Egg Implementation
import React, {
  useState,
  useRef,
  useCallback,
  useEffect,
  useMemo,
} from "react";

// Function to play sound effects
const playEasterEggSound = (type: "konami" | "terminal") => {
  try {
    const audioContext = new (window.AudioContext ||
      // @ts-expect-error to do
      window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    if (type === "konami") {
      // Play a mario-like sound
      oscillator.type = "square";
      oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
      oscillator.frequency.setValueAtTime(
        659.25,
        audioContext.currentTime + 0.1
      ); // E5
      oscillator.frequency.setValueAtTime(
        783.99,
        audioContext.currentTime + 0.2
      ); // G5
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(
        0.01,
        audioContext.currentTime + 0.3
      );
      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.3);
    } else {
      // Play a terminal/computer sound
      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(880, audioContext.currentTime); // A5
      oscillator.frequency.exponentialRampToValueAtTime(
        220,
        audioContext.currentTime + 0.2
      ); // A3
      gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(
        0.01,
        audioContext.currentTime + 0.2
      );
      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.2);
    }
  } catch (error) {
    console.log("Audio not supported or user interaction required first");
  }
};

// Define a custom hook for handling Easter eggs with improved performance
export const useEasterEgg = () => {
  const [activeEasterEgg, setActiveEasterEgg] = useState<string | null>(null);
  const keysPressed = useRef<string[]>([]);
  const keySequenceTimeout = useRef<NodeJS.Timeout | null>(null);
  const isTyping = useRef<boolean>(false);

  // Konami code sequence
  const konamiSequence = useMemo(
    () => [
      "ArrowUp",
      "ArrowUp",
      "ArrowDown",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
      "ArrowLeft",
      "ArrowRight",
      "b",
      "a",
    ],
    []
  );

  // Setup event listener only once with useCallback to minimize re-renders
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      // Skip if user is typing in an input field
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        isTyping.current = true;
        return;
      } else {
        isTyping.current = false;
      }

      // Reset sequence timeout on each keypress
      if (keySequenceTimeout.current) {
        clearTimeout(keySequenceTimeout.current);
      }

      // Add the key to the sequence
      keysPressed.current.push(e.key);

      // Keep only the last N keys where N is the length of our longest sequence
      if (keysPressed.current.length > konamiSequence.length) {
        keysPressed.current.shift();
      }

      // Check for Konami code
      if (
        JSON.stringify(keysPressed.current) === JSON.stringify(konamiSequence)
      ) {
        setActiveEasterEgg("matrix");

        // Automatically remove after 5 seconds
        setTimeout(() => setActiveEasterEgg(null), 5000);

        // Play 8-bit sound effect for Konami code
        playEasterEggSound("konami");
      }

      // Check for 'hack' command (using a more efficient method)
      const lastFour = keysPressed.current.slice(-4).join("");
      if (lastFour === "hack") {
        setActiveEasterEgg("terminal");

        // Play terminal activation sound
        playEasterEggSound("terminal");
      }

      // Reset the sequence after a delay if no keys are pressed
      keySequenceTimeout.current = setTimeout(() => {
        keysPressed.current = [];
      }, 2000);
    },
    [konamiSequence]
  );

  // Initialize and cleanup event listener
  const initEasterEggs = useCallback(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      if (keySequenceTimeout.current) {
        clearTimeout(keySequenceTimeout.current);
      }
    };
  }, [handleKeyDown]);

  // Method to manually close easter eggs
  const closeEasterEgg = useCallback(() => {
    setActiveEasterEgg(null);
  }, []);

  return { activeEasterEgg, initEasterEggs, closeEasterEgg };
};

// Lightweight Matrix Effect Component (Canvas-based for better performance)
export const MatrixEffect = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions to match window
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Matrix effect characters
    const characters =
      "01アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン";
    const fontSize = 16;
    const columns = canvas.width / fontSize;

    // Create drops - one per column
    const drops: number[] = [];
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.floor((Math.random() * canvas.height) / fontSize);
    }

    // Animation frame ID for cleanup
    let animationFrameId: number;

    // Drawing function
    const draw = () => {
      // Black with alpha for trails
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#0f0"; // green text
      ctx.font = `${fontSize}px monospace`;

      // For each column
      for (let i = 0; i < drops.length; i++) {
        // Get a random character
        const text = characters.charAt(
          Math.floor(Math.random() * characters.length)
        );

        // Draw the character
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // Move drops down and reset if needed
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      // Request next frame
      animationFrameId = requestAnimationFrame(draw);
    };

    // Start animation
    draw();

    // Clean up animation on unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-50 opacity-80"
      style={{ pointerEvents: "none" }}
    />
  );
};

// Hidden Terminal Component
export const HiddenTerminal: React.FC<{ onClose: () => void }> = ({
  onClose,
}) => {
  // Terminal commands history
  const [commandHistory, setCommandHistory] = useState<string[]>([
    "whoami",
    "Arnab Paryali - Developer",
    "cat secret.txt",
    "You found the easter egg! Here's a joke: Why do programmers prefer dark mode? Because light attracts bugs!",
  ]);

  const [currentCommand, setCurrentCommand] = useState("");
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Automatically scroll to bottom when command history updates
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [commandHistory]);

  // Ensure terminal stays in viewport on small screens
  useEffect(() => {
    if (window.innerHeight < 500) {
      document.documentElement.scrollTop =
        document.documentElement.scrollHeight;
    }
    let timeout: NodeJS.Timeout;
    if (inputRef.current) {
      timeout = setTimeout(() => {
        setCurrentCommand("");
        inputRef.current?.focus();
      }, 100);
    }
    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, []);

  // Handle command submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentCommand.trim()) return;

    // Add the command to history
    setCommandHistory((prev) => [...prev, currentCommand]);

    // Simple terminal response logic
    let response = "Command not recognized.";

    if (currentCommand.toLowerCase() === "help") {
      response =
        "Available commands: help, clear, exit, joke, about, skills, social, status";
    } else if (currentCommand.toLowerCase() === "clear") {
      setCommandHistory([]);
      setCurrentCommand("");
      return;
    } else if (currentCommand.toLowerCase() === "exit") {
      setCommandHistory([
        "whoami",
        "Arnab Paryali - Developer",
        "cat secret.txt",
        "You found the easter egg! Here's a joke: Why do programmers prefer dark mode? Because light attracts bugs!",
      ]);
      setCurrentCommand("");
      onClose();
      return;
    } else if (currentCommand.toLowerCase() === "joke") {
      const jokes = [
        "Why did the developer quit his job? He didn't get arrays.",
        "How many programmers does it take to change a light bulb? None, that's a hardware problem.",
        'A SQL query walks into a bar, sees two tables and asks, "May I join you?"',
        "Why do programmers always mix up Halloween and Christmas? Because Oct 31 == Dec 25.",
      ];
      response = jokes[Math.floor(Math.random() * jokes.length)];
    } else if (currentCommand.toLowerCase() === "about") {
      response =
        "Arnab Paryali - Software Engineer specializing in React Native, Next.js, and TypeScript. Currently based in Kolkata.";
    } else if (currentCommand.toLowerCase() === "skills") {
      response =
        "Skills: TypeScript, React Native, React, Next.js, Node.js, Firebase, Git, Debugging, UI Animation";
    } else if (currentCommand.toLowerCase() === "social") {
      response = "GitHub: @ArnabXD | Email: arnabxd@proton.me";
    } else if (currentCommand.toLowerCase() === "status") {
      response = "STATUS: AVAILABLE FOR HIRE";
    }

    // Add the response to history
    setCommandHistory((prev) => [...prev, response]);

    // Clear current command
    setCurrentCommand("");
  };

  return (
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 w-96 max-w-[90vw] bg-black border border-green-500 p-4 rounded shadow-xl z-50 backdrop-blur-lg animate-fadeIn">
      <div className="flex items-center justify-between mb-2">
        <div className="flex space-x-2">
          <button
            className="w-3 h-3 bg-red-500 rounded-full hover:scale-110"
            onClick={onClose}
          />
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        </div>
        <span className="text-green-500 text-sm font-mono flex-1 text-center">
          Secret Terminal
        </span>
        <div className="w-12" />
      </div>

      <div
        ref={terminalRef}
        className="h-64 overflow-y-auto mb-2 font-mono text-xs scrollbar-thin scrollbar-thumb-green-800 scrollbar-track-black p-2 bg-black bg-opacity-80"
      >
        {commandHistory.map((line, index) => (
          <div
            key={index}
            className={index % 2 === 0 ? "text-green-500" : "text-gray-300"}
          >
            {index % 2 === 0 ? "$ " : ""}
            {line}
          </div>
        ))}
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex items-center border-t border-green-900 pt-2"
      >
        <span className="text-green-500 mr-2">$</span>
        <input
          type="text"
          value={currentCommand}
          onChange={(e) => setCurrentCommand(e.target.value)}
          className="flex-1 bg-transparent border-none outline-none text-white text-xs font-mono"
          ref={inputRef}
          placeholder="Type 'help' for commands..."
        />
      </form>
    </div>
  );
};

// Usage in your Portfolio component
// const PortfolioWithOptimizedEasterEggs: React.FC = () => {
//   const { activeEasterEgg, initEasterEggs, closeEasterEgg } = useEasterEgg();

//   // Initialize easter eggs
//   React.useEffect(() => {
//     const cleanup = initEasterEggs();
//     return cleanup;
//   }, [initEasterEggs]);

//   return (
//     <div
//       className={`min-h-screen bg-black text-green-500 font-mono p-4 md:p-8 overflow-x-hidden transition-all duration-300 ${
//         activeEasterEgg === "terminal" ? "blur-sm" : ""
//       }`}
//     >
//       {/* Your portfolio content here */}

//       {/* Render Easter Eggs when active */}
//       {activeEasterEgg === "matrix" && <MatrixEffect />}
//       {activeEasterEgg === "terminal" && (
//         <>
//           <div
//             className="fixed inset-0 bg-black/50 z-40"
//             onClick={closeEasterEgg}
//           ></div>
//           <HiddenTerminal onClose={closeEasterEgg} />
//         </>
//       )}

//       {/* Small hint about Easter eggs */}
//       <div className="text-center text-xs opacity-50 mt-16 pt-4">
//         <p>[ Try Konami code or type 'hack' anywhere ]</p>
//       </div>
//     </div>
//   );
// };

// export default PortfolioWithOptimizedEasterEggs;

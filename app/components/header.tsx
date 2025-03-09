import type { ReactNode } from "react";

interface HeaderProps {
  contactInfo: {
    icon: ReactNode;
    text: string;
    link: string;
  }[];
}

export default function Header({ contactInfo }: HeaderProps) {
  return (
    <header className="mb-16 relative">
      <div className="absolute -right-20 -top-20 w-64 h-64 bg-green-500/10 rounded-full blur-3xl"></div>

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
        <div>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
            <p className="text-xs md:text-sm text-green-500 font-mono">
              System:~$ whoami
            </p>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mt-2 text-white tracking-tight">
            ARNAB PARYALI
          </h1>
        </div>

        <div className="mt-4 md:mt-0 bg-black border border-green-900 p-2 rounded-md">
          <pre className="text-xs text-green-500 font-mono">
            STATUS: <span className="text-white">AVAILABLE FOR HIRE</span>
          </pre>
        </div>
      </div>

      <div className="bg-gradient-to-r from-green-900/20 to-transparent p-4 rounded-md border-l-2 border-green-500 mb-6">
        <p className="text-sm md:text-base">
          Highly adaptable and motivated developer specializing in React Native,
          UI animations, Next.js, and TypeScript.
        </p>
      </div>

      <div className="flex flex-wrap gap-4 text-sm border-t border-green-900/50 pt-6">
        {contactInfo.map((item, index) => (
          <a
            href={item.link}
            target="_blank"
            rel="noreferrer"
            key={`contact-info-${index}`}
            className="flex items-center bg-black/50 px-3 py-2 rounded-md border border-green-900 hover:border-green-500 transition-colors"
          >
            {item.icon}
            <span>{item.text}</span>
          </a>
        ))}
      </div>
    </header>
  );
}

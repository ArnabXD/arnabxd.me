export interface LoaderProps {
  text: string;
  fullText: string;
}

export default function Loader({ text, fullText }: LoaderProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
      <div className="w-full max-w-xl border border-green-500 p-4 rounded bg-black">
        <div className="flex items-center mb-2">
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <div className="ml-2 text-xs opacity-60">
            root@arnab-paryali:~# access_portfolio.sh
          </div>
        </div>
        <div>
          <p className="text-sm md:text-base">
            {text}
            <span
              className={`inline-block w-2 h-4 ml-1 bg-green-500 ${
                text.length === fullText.length ? "animate-pulse" : ""
              }`}
            ></span>
          </p>
        </div>
      </div>
    </div>
  );
}

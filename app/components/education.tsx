import { Book } from "lucide-react";

export default function Education() {
  return (
    <div className="mt-4 bg-gradient-to-br from-black to-gray-900 p-5 rounded-lg border border-green-900 hover:border-green-500 transition-all duration-300 group hover:shadow-lg hover:shadow-green-900/30">
      <div className="flex flex-col md:flex-row gap-2 justify-between items-start lg:items-center mb-4">
        <div className="flex items-center">
          <div className="hidden md:flex items-center justify-center w-10 h-10 rounded-md bg-green-900/30 border border-green-900 mr-3">
            <Book className="w-5 h-5 text-green-500" />
          </div>
          <h3 className="font-bold text-lg text-white group-hover:text-green-400 transition-colors">
            Prabhat Kumar College, Contai
          </h3>
        </div>
        <span className="text-xs bg-black border border-green-700 text-green-500 px-2 py-1 rounded-full">
          2018-21
        </span>
      </div>
      <div className="flex items-center pl-4 border-l-2 border-green-500">
        <div className="text-sm">
          <p className="text-white mb-1">B.Sc Computer Science</p>
          <p className="opacity-80">
            CGPA: <span className="text-green-400">7.32</span>
          </p>
        </div>
        <div className="ml-auto hidden md:block">
          <div className="px-3 py-2 border border-green-900 rounded-md bg-black">
            <pre className="text-xs text-green-500 font-mono">
              {"./education/completed"}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}

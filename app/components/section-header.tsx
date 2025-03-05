import type { ReactNode } from "react";

export interface SectionHeaderProps {
  icon: ReactNode;
  title: string;
}

export default function SectionHeader({ icon, title }: SectionHeaderProps) {
  return (
    <div className="flex items-center mb-6 relative">
      <div className="absolute left-0 top-0 w-10 h-10 flex items-center justify-center border border-green-500 rounded-md bg-black">
        {icon}
      </div>
      <div className="ml-14 flex flex-col">
        <div className="flex items-center">
          <span className="text-xs text-green-500 opacity-70">
            ./system/section/
          </span>
          <h2 className="ml-1 text-md lg:text-xl font-bold text-white">
            {"<"}
            {title}
            {"/>"}
          </h2>
        </div>
        <div className="w-full h-px bg-gradient-to-r from-green-500 via-green-300 to-transparent mt-2"></div>
      </div>
    </div>
  );
}

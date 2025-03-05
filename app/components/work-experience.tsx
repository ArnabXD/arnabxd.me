interface WorkExperienceCardProps {
  title: string;
  company: string;
  period: string;
  responsibilities: string[];
}

function WorkExperienceCard({
  title,
  company,
  period,
  responsibilities,
}: WorkExperienceCardProps) {
  return (
    <div className="flex group">
      <div className="flex flex-col items-center mr-4">
        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        <div className="w-px h-full bg-green-900 group-hover:bg-green-500 transition-colors duration-300 mt-1"></div>
      </div>
      <div className="flex-1 bg-black border border-green-900 p-5 rounded-lg hover:border-green-500 transition-all duration-300 mb-6 group-hover:shadow-lg group-hover:shadow-green-900/30">
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-bold text-lg text-white group-hover:text-green-400 transition-colors">
            {title}
          </h3>
          <span className="text-xs bg-black border border-green-700 text-green-500 px-2 py-1 rounded-full">
            {period}
          </span>
        </div>
        <div className="bg-gradient-to-r from-green-900/20 to-transparent p-2 rounded mb-3">
          <span className="text-green-400 font-medium text-sm">{company}</span>
        </div>
        <ul className="pl-4 text-sm space-y-2 opacity-80">
          {responsibilities.map((item, index) => (
            <li key={index} className="flex items-start">
              <span className="mr-2 text-green-500">&gt;</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

interface WorkExperienceProps {
  data: {
    title: string;
    company: string;
    period: string;
    responsibilities: string[];
  }[];
}

export default function WorkExperience({ data }: WorkExperienceProps) {
  return (
    <div className="space-y-0">
      {data.map((exp, index) => (
        <WorkExperienceCard key={`experience-${index}`} {...exp} />
      ))}
    </div>
  );
}

interface SkillCategoryProps {
  title: string;
  skills: string[];
}

function SkillCategory({ title, skills }: SkillCategoryProps) {
  return (
    <div className="bg-black border border-green-900 rounded-lg p-4 hover:border-green-500 transition-all duration-300 group">
      <h3 className="text-green-500 text-sm font-mono mb-3 flex items-center">
        <span className="mr-2 opacity-70">&gt;</span>
        {title}
      </h3>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <span
            key={`skill-${title}-${index}`}
            className="px-3 py-2 rounded-md border border-green-900 bg-gradient-to-r from-black to-gray-900 hover:border-green-500 hover:from-green-900/20 hover:to-black transition-all duration-300 text-sm cursor-pointer flex items-center group-hover:transform group-hover:translate-y-[-2px]"
          >
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></span>
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}

interface SkillsProps {
  data: SkillCategoryProps[];
}

export default function Skills({ data }: SkillsProps) {
  return (
    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
      {data.map((category, index) => (
        <SkillCategory key={`skill-category-${index}`} {...category} />
      ))}
    </div>
  );
}

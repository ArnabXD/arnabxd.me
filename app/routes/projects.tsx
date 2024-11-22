import { MetaFunction } from "@remix-run/cloudflare";

export const meta: MetaFunction = () => {
  return [
    { title: "Projects - ArnabXD" },
    { name: "description", content: "Projects of Arnab Paryali" },
  ];
};

export default function Projects() {
  return (
    <div className="s-middle flex flex-col items-center justify-center main">
      <img src="/wip.svg" alt="coming soon" className="h-64 md:h-80" />
      <p className="text-lg md:text-2xl mt-8">This page is under construction</p>
    </div>
  );
}

import { Link } from "@remix-run/react";

export const NavigationBar = () => {
  return (
    <nav className="flex items-center justify-between p-8 md:px-16 md:py-12 border-b border-surface">
      <Link to="/">
        <h1 className="font-bold text-4xl text-primary">{"<Arnab />"}</h1>
      </Link>
      <ul className="hidden md:flex items-center justify-between">
        <li className="mx-6">
          <Link to="/projects">
            <h1 className="text-3xl hover:text-primary hover:scale-105">Projects</h1>
          </Link>
        </li>
        <li className="mx-6">
          <Link to="/contact">
            <h1 className="text-3xl hover:text-primary hover:scale-105">Contact</h1>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

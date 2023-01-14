import React from "react";
import { Link } from "@tanstack/react-location";

export const NavigationBar = () => {
  return (
    <nav className="flex items-center justify-between px-12 py-12 md:px-16 md:py-12">
      <Link to="/">
        <h1 className="font-bold text-4xl text-primary">{"<Arnab />"}</h1>
      </Link>
      <ul className="hidden md:flex items-center justify-between">
        <li className="mx-6">
          <Link to="/projects">
            <h1 className="text-4xl">Projects</h1>
          </Link>
        </li>
        <li className="mx-6">
          <Link to="/contact">
            <h1 className="text-4xl">Contact</h1>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

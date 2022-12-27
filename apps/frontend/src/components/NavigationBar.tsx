import React from "react";

const NavigationBar = () => {
  return (
    <nav className="flex items-center justify-between px-12 py-12 md:px-16 md:py-12 lg:px-24 lg:py-16">
      <a href="/">
        <h1 className="font-bold text-4xl text-primary">{"<Arnab/>"}</h1>
      </a>
      <ul className="hidden md:flex items-center justify-between">
        <li className="mx-6">
          <a href="/projects">
            <h1 className="text-4xl">Projects</h1>
          </a>
        </li>
        <li className="mx-6">
          <a href="/contact">
            <h1 className="text-4xl">Contact</h1>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default NavigationBar;

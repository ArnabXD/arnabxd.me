import React from "react";
import { Link } from "@tanstack/react-location";
import NavigationBar from "../components/NavigationBar";

export const Home = () => {
  return (
    <div>
      <NavigationBar />

      <div className="main flex flex-row justify-between items-center">
        <div className="flex flex-col justify-center">
          <div>
            <p className="text-2xl py-1">Hi there, I am</p>
            <h1 className="text-7xl font-bold text-primary">Arnab Paryali</h1>
            <p className="text-xl py-1">
              Developer, Freelancer, Open-Source Enthusiast
            </p>
            <div className="pt-10 grid md:grid-cols-2 gap-x-1.5">
              <Link to="/contact">
                <div className="bg-primary text-bg-dark text-2xl inline-block px-8 py-4 my-2 rounded-lg font-semibold">
                  Contact Me
                </div>
              </Link>
              <Link to="/projects">
                <span className="text-lg md:text-2xl py-4 my-2 font-semibold inline-flex flex-row">
                  <svg
                    width="52"
                    height="44"
                    viewBox="0 0 52 44"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 md:h-8 text-white"
                  >
                    <path
                      d="M44.552 7.45319H31.6287C29.9074 7.45282 28.2567 6.7704 27.0397 5.55604L24.3525 2.87542C23.1355 1.66106 21.4848 0.978638 19.7634 0.978271H7.84623C6.12476 0.978271 4.47378 1.66045 3.25651 2.87473C2.03924 4.08901 1.35539 5.73593 1.35539 7.45319L1.4852 10.2698C0.628952 11.5115 0.236196 13.0134 0.37527 14.5141L2.4426 37.1763C2.58916 38.785 3.33323 40.281 4.52875 41.3706C5.72428 42.4602 7.2849 43.0646 8.90424 43.0652H42.4879C44.1072 43.0646 45.6678 42.4602 46.8634 41.3706C48.0589 40.281 48.803 38.785 48.9495 37.1763L51.0169 14.5141C51.0985 13.618 50.992 12.7148 50.7042 11.8621C50.4164 11.0094 49.9536 10.2258 49.3453 9.56149C48.737 8.89713 47.9966 8.36653 47.1713 8.00353C46.346 7.64053 45.4539 7.45309 44.552 7.45319V7.45319ZM6.84015 7.45319C6.06125 7.45319 5.3148 7.58916 4.62353 7.84168L4.60081 7.38844C4.6178 6.54108 4.96722 5.73416 5.57402 5.14095C6.18082 4.54775 6.99662 4.21556 7.84623 4.21573H19.7634C20.6241 4.21591 21.4495 4.55712 22.0579 5.1643L24.3525 7.45319H6.84015ZM38.0222 24.5178L27.6952 30.8956C26.819 31.433 25.6961 30.7791 25.6961 29.6913V27.2017C25.6961 27.2017 17.3521 26.2304 12.7144 34.9716C14.5675 19.4318 22.9147 19.4318 25.6961 19.4318V16.9422C25.6961 15.8544 26.819 15.2004 27.6952 15.7411L38.0222 22.1156C38.8984 22.6531 38.8984 23.9804 38.0222 24.5178Z"
                      fill="currentColor"
                    />
                  </svg>
                  View Projects
                </span>
              </Link>
            </div>
          </div>
        </div>
        <img className="hidden xl:block" src="/dev.svg" />
      </div>
    </div>
  );
};

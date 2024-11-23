import { BlueSky, GitHub, LinkedIn, StackOverflow } from "./icons";

export default function Footer() {
  return (
    <footer className="px-8 md:px-16 py-10 border-t border-surface">
      <div className="container mx-auto flex items-center sm:flex-row flex-col">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} - Arnab Paryali
        </p>
        <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
          <a
            href="https://github.com/ArnabXD"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GitHub className="w-5 h-5" />
          </a>
          <a
            href="https://linkedin.com/in/arnabparyali"
            target="_blank"
            rel="noopener noreferrer"
          >
            <LinkedIn className="w-5 h-5 ml-4" />
          </a>
          <a
            href="https://stackoverflow.com/users/12250600/arnabxd"
            target="_blank"
            rel="noopener noreferrer"
          >
            <StackOverflow className="w-5 h-5 ml-4" />
          </a>
          <a
            href="https://bsky.app/profile/arnabxd.bsky.social"
            target="_blank"
            rel="noopener noreferrer"
          >
            <BlueSky className="w-5 h-5 ml-4" />
          </a>
        </span>
      </div>
    </footer>
  );
}

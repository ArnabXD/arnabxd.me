export default function Footer() {
  return (
    <footer className="text-center text-xs opacity-60 mt-16 pt-4 border-t border-green-900">
      <div className="mb-4">
        <span className="mr-1">~/</span>
        <span className="animate-pulse">_</span>
      </div>
      <p>SYSTEM_STATUS: ONLINE</p>
      <p className="mt-2 text-xs opacity-40">
        {"[ Try Konami code or type 'hack' anywhere ]"}
      </p>
    </footer>
  );
}

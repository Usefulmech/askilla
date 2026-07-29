export default function LogoIcon({ className = "w-full h-full" }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className={className}>
      {/* The 'A' (Inverted V) - Uses currentColor to adapt to text color in light/dark mode */}
      <path 
        d="M 15 90 L 50 20 L 85 90" 
        stroke="currentColor" 
        strokeWidth="10" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        fill="none" 
      />
      {/* The Checkmark (Crossbar) - Uses the Terracotta brand color */}
      <path 
        d="M 30 58 L 45 72 L 75 35" 
        stroke="#C25B32" 
        strokeWidth="10" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        fill="none" 
      />
    </svg>
  );
}

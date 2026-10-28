import React from "react";

export const WindowsOrbIcon = ({ className = "w-7 h-7" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="orbBg" cx="50%" cy="35%" r="55%">
        <stop offset="0%" stopColor="#69d2ff" />
        <stop offset="45%" stopColor="#1268b3" />
        <stop offset="85%" stopColor="#072c59" />
        <stop offset="100%" stopColor="#051d3d" />
      </radialGradient>
      <linearGradient id="orbGloss" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="rgba(255,255,255,0.85)" />
        <stop offset="50%" stopColor="rgba(255,255,255,0.2)" />
        <stop offset="100%" stopColor="rgba(255,255,255,0)" />
      </linearGradient>
    </defs>
    <circle cx="24" cy="24" r="22" fill="url(#orbBg)" stroke="#70bfff" strokeWidth="1.5" />
    {/* Windows 4-color wave flag */}
    <path d="M13 15.5C16.2 14.1 19.3 14.5 22.8 16V23.2C19.3 21.7 16.2 21.3 13 22.7V15.5Z" fill="#F25022" />
    <path d="M24.8 16.6C28.3 18.1 31.4 18.5 34.6 17.1V24.3C31.4 25.7 28.3 25.3 24.8 23.8V16.6Z" fill="#7FBA00" />
    <path d="M13 24.8C16.2 23.4 19.3 23.8 22.8 25.3V32.5C19.3 31 16.2 30.6 13 32V24.8Z" fill="#00A4EF" />
    <path d="M24.8 25.9C28.3 27.4 31.4 27.8 34.6 26.4V33.6C31.4 35 28.3 34.6 24.8 33.1V25.9Z" fill="#FFB900" />
    {/* Top specular reflection */}
    <ellipse cx="24" cy="13" rx="15" ry="8" fill="url(#orbGloss)" />
  </svg>
);

export const Win7FolderIcon = ({ className = "w-10 h-10" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="folderBack" x1="0" y1="6" x2="0" y2="40" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FFE88C" />
        <stop offset="100%" stopColor="#D89E28" />
      </linearGradient>
      <linearGradient id="folderFront" x1="0" y1="15" x2="0" y2="42" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FFF2AD" />
        <stop offset="40%" stopColor="#F8D25C" />
        <stop offset="100%" stopColor="#DA9D26" />
      </linearGradient>
    </defs>
    {/* Back flap */}
    <path
      d="M5 10C5 8.34315 6.34315 7 8 7H19L23 11H40C41.6569 11 43 12.3431 43 14V38C43 39.6569 41.6569 41 40 41H8C6.34315 41 5 39.6569 5 38V10Z"
      fill="url(#folderBack)"
      stroke="#B27D14"
      strokeWidth="1.2"
    />
    {/* White document peeking inside */}
    <rect x="9" y="12" width="28" height="16" rx="1" fill="#FFFFFF" stroke="#D0D7DE" strokeWidth="1" />
    {/* Front flap */}
    <path
      d="M4 18C4 16.3431 5.34315 15 7 15H41C42.6569 15 44 16.3431 44 18L42.5 39C42.38 40.6 41.1 41.5 39.5 41.5H8.5C6.9 41.5 5.62 40.6 5.5 39L4 18Z"
      fill="url(#folderFront)"
      stroke="#B88218"
      strokeWidth="1.2"
    />
    {/* Gloss line */}
    <path d="M6 17H42" stroke="rgba(255,255,255,0.75)" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

export const Win7ComputerIcon = ({ className = "w-10 h-10" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="screenGrad" x1="8" y1="8" x2="40" y2="32" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#67D4FF" />
        <stop offset="50%" stopColor="#1B81D2" />
        <stop offset="100%" stopColor="#0A3D73" />
      </linearGradient>
      <linearGradient id="bezelGrad" x1="0" y1="6" x2="0" y2="36" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#E6ECF2" />
        <stop offset="100%" stopColor="#7C8B99" />
      </linearGradient>
    </defs>
    {/* Stand */}
    <path d="M19 34H29L32 41H16L19 34Z" fill="#9AA8B6" stroke="#5A6875" strokeWidth="1.2" />
    <rect x="13" y="40" width="22" height="3" rx="1.5" fill="#BCC8D4" stroke="#5A6875" strokeWidth="1" />
    {/* Monitor Frame */}
    <rect x="5" y="6" width="38" height="28" rx="3" fill="url(#bezelGrad)" stroke="#485563" strokeWidth="1.5" />
    {/* Screen */}
    <rect x="8" y="9" width="32" height="22" rx="1" fill="url(#screenGrad)" stroke="#082B52" strokeWidth="1" />
    {/* Screen Gloss */}
    <path d="M8 9H32L18 31H8V9Z" fill="rgba(255,255,255,0.18)" />
    {/* Power LED */}
    <circle cx="24" cy="32.3" r="1" fill="#37E8FF" />
  </svg>
);

export const Win7TerminalIcon = ({ className = "w-10 h-10" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="7" width="40" height="34" rx="3" fill="#1E242B" stroke="#788896" strokeWidth="1.8" />
    <path d="M4 10C4 8.34315 5.34315 7 7 7H41C42.6569 7 44 8.34315 44 10V14H4V10Z" fill="#3B6EA5" />
    <circle cx="39" cy="10.5" r="1.5" fill="#E85D4A" />
    <circle cx="34.5" cy="10.5" r="1.5" fill="#F0C24B" />
    <path d="M11 21L17 26L11 31" stroke="#E6EDF3" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M20 31H29" stroke="#56D364" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

export const Win7MailIcon = ({ className = "w-10 h-10" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="envGrad" x1="4" y1="10" x2="44" y2="38" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="100%" stopColor="#CFE4FA" />
      </linearGradient>
    </defs>
    <rect x="4" y="10" width="40" height="28" rx="3" fill="url(#envGrad)" stroke="#4C7FB0" strokeWidth="1.5" />
    <path d="M5 37L19 24M43 37L29 24" stroke="#7FAAD4" strokeWidth="1.4" />
    <path d="M5 11L24 26L43 11" fill="#E5F1FD" />
    <path d="M5 11L24 26L43 11" stroke="#3B73A8" strokeWidth="1.5" strokeLinejoin="round" />
  </svg>
);

export const Win7PdfIcon = ({ className = "w-10 h-10" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M10 5H30L39 14V41C39 42.1046 38.1046 43 37 43H10C8.89543 43 8 42.1046 8 41V7C8 5.89543 8.89543 5 10 5Z"
      fill="#FFFFFF"
      stroke="#8C9AA8"
      strokeWidth="1.5"
    />
    <path d="M30 5V14H39" fill="#E1E8F0" stroke="#8C9AA8" strokeWidth="1.5" strokeLinejoin="round" />
    <rect x="6" y="22" width="28" height="12" rx="2" fill="#D93829" />
    <text x="11" y="31" fill="#FFFFFF" fontSize="9" fontWeight="bold" fontFamily="monospace">
      PDF
    </text>
    <path d="M13 15H25M13 38H33" stroke="#9AA8B6" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const Win7NotepadIcon = ({ className = "w-10 h-10" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="9" y="6" width="30" height="37" rx="2" fill="#FFFFFF" stroke="#68849E" strokeWidth="1.5" />
    <rect x="9" y="6" width="30" height="7" rx="1" fill="#5294E2" />
    {/* Spiral rings */}
    <rect x="13" y="4" width="2.5" height="5" rx="1" fill="#465666" />
    <rect x="19" y="4" width="2.5" height="5" rx="1" fill="#465666" />
    <rect x="25" y="4" width="2.5" height="5" rx="1" fill="#465666" />
    <rect x="31" y="4" width="2.5" height="5" rx="1" fill="#465666" />
    {/* Lines */}
    <path d="M14 19H34M14 25H34M14 31H28M14 37H24" stroke="#8AB4E1" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

export const Win7CodeAppIcon = ({ className = "w-10 h-10" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="appWinGrad" x1="6" y1="8" x2="42" y2="40" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#F0F7FF" />
        <stop offset="100%" stopColor="#BFD9F5" />
      </linearGradient>
    </defs>
    <rect x="6" y="8" width="36" height="32" rx="3" fill="url(#appWinGrad)" stroke="#3D6E9E" strokeWidth="1.5" />
    <path d="M6 11C6 9.34315 7.34315 8 9 8H39C40.6569 8 42 9.34315 42 11V15H6V11Z" fill="#2A6BB2" />
    <path d="M18 22L13 27L18 32M30 22L35 27L30 32M26 20L22 34" stroke="#1E538C" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const Win7BrainChipIcon = ({ className = "w-10 h-10" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="11" y="11" width="26" height="26" rx="4" fill="#1F5E9C" stroke="#76C4FF" strokeWidth="1.6" />
    <rect x="16" y="16" width="16" height="16" rx="2" fill="#0D2F52" stroke="#53B2FF" strokeWidth="1.2" />
    <circle cx="24" cy="24" r="3.5" fill="#47D7FF" />
    {/* Pins */}
    <path
      d="M17 6V11M24 6V11M31 6V11M17 37V42M24 37V42M31 37V42M6 17H11M6 24H11M6 31H11M37 17H42M37 24H42M37 31H42"
      stroke="#D4A437"
      strokeWidth="2.2"
      strokeLinecap="round"
    />
  </svg>
);

export const GithubIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export const LinkedinIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export const Win7IEIcon = ({ className = "w-10 h-10" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="ieBlue" cx="35%" cy="30%" r="65%">
        <stop offset="0%" stopColor="#7AE2FF" />
        <stop offset="45%" stopColor="#1B88E5" />
        <stop offset="100%" stopColor="#08428C" />
      </radialGradient>
      <linearGradient id="ieGold" x1="6" y1="36" x2="42" y2="10" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#F5A623" />
        <stop offset="50%" stopColor="#FFE066" />
        <stop offset="100%" stopColor="#E68A00" />
      </linearGradient>
    </defs>
    {/* Golden swoosh orbit ring (back) */}
    <ellipse
      cx="24"
      cy="24"
      rx="20"
      ry="9"
      transform="rotate(-28 24 24)"
      stroke="url(#ieGold)"
      strokeWidth="3.2"
    />
    {/* Blue 'e' sphere body */}
    <circle cx="24" cy="24" r="15" fill="url(#ieBlue)" stroke="#073773" strokeWidth="1.2" />
    {/* Inner cutouts of 'e' */}
    <path
      d="M17 21.5C17 17.8 20.1 15 24.2 15C28.1 15 31 17.8 31 21.5H17Z"
      fill="#073A7A"
    />
    <rect x="16" y="21.5" width="16.5" height="3.2" fill="#FFFFFF" rx="1" />
    <path
      d="M30.5 28.5C29 31.2 26.5 32.5 23.5 32.5C19.2 32.5 16.5 29.5 16.5 25.5"
      stroke="#AEEBFF"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    {/* Golden swoosh front highlight */}
    <path
      d="M7 33C11 36.5 22 33.5 31 27.5C39 22 43 15.5 41 12.5"
      stroke="url(#ieGold)"
      strokeWidth="3.2"
      strokeLinecap="round"
    />
  </svg>
);

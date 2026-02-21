export function UserAvatarIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="userGradient" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#8B5CF6" />
          <stop offset="50%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#06B6D4" />
        </linearGradient>
      </defs>
      {/* Outer circle */}
      <circle cx="50" cy="50" r="46" stroke="url(#userGradient)" strokeWidth="3" fill="none" />
      {/* Head circle */}
      <circle cx="50" cy="38" r="14" stroke="url(#userGradient)" strokeWidth="3" fill="none" />
      {/* Body/shoulders arc */}
      <path
        d="M 22 82 C 22 62 35 55 50 55 C 65 55 78 62 78 82"
        stroke="url(#userGradient)"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  )
}

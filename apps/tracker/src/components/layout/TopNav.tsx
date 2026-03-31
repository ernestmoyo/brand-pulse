import { useAuthStore } from '@/stores/auth.store';

export default function TopNav() {
  const user = useAuthStore((s) => s.user);

  return (
    <header className="h-16 border-b border-[rgba(0,212,255,0.1)] bg-[#0A0F1A]/80 backdrop-blur-lg flex items-center justify-between px-6">
      {/* Left: Date */}
      <div className="flex items-center gap-3">
        <div className="w-2 h-2 rounded-full bg-pulse-cyan animate-pulse" />
        <span className="text-sm text-pulse-body font-mono">
          {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </span>
      </div>

      {/* Center: Brand Pulse wordmark (subtle) */}
      <div className="hidden md:flex items-center gap-1.5">
        <span className="text-xs font-display text-white/40 tracking-widest">BRAND</span>
        <span className="text-xs font-mono font-light text-pulse-cyan/40 tracking-widest">PULSE</span>
      </div>

      {/* Right: User info */}
      <div className="flex items-center gap-4">
        {/* Notification bell */}
        <button className="relative p-2 rounded-lg text-pulse-meta hover:text-pulse-body hover:bg-[rgba(255,255,255,0.04)] transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-pulse-amber rounded-full" />
        </button>

        {/* User display (no dropdown since no logout) */}
        <div className="flex items-center gap-3 p-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pulse-teal to-pulse-purple flex items-center justify-center text-sm font-medium text-white">
            {user.name.charAt(0)}
          </div>
          <div className="text-left hidden md:block">
            <div className="text-sm text-white font-medium">{user.name}</div>
            <div className="text-xs text-pulse-meta">{user.role}</div>
          </div>
        </div>
      </div>
    </header>
  );
}

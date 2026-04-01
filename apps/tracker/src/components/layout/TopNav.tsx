import { useState, useRef, useEffect } from 'react';
import { useAuthStore } from '@/stores/auth.store';

const demoNotifications = [
  { id: '1', message: 'TOM Awareness up 2pp in Q2-2024', time: '2 hours ago' },
  { id: '2', message: 'New wave Q2-2024 processing complete', time: '5 hours ago' },
  { id: '3', message: 'Bru Coffee ad spend surge detected', time: '1 day ago' },
  { id: '4', message: 'Monthly report ready for download', time: '2 days ago' },
];

export default function TopNav() {
  const user = useAuthStore((s) => s.user);
  const [notifOpen, setNotifOpen] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="h-16 border-b border-[rgba(0,212,255,0.1)] bg-[#0A0F1A]/80 backdrop-blur-lg flex items-center justify-between px-6">
      {/* Left: Date */}
      <div className="flex items-center gap-3">
        <div className="w-2 h-2 rounded-full bg-pulse-cyan animate-pulse" />
        <span className="text-sm text-pulse-body font-mono">
          {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </span>
      </div>

      {/* Center: Nestle Brand Pulse wordmark (subtle) */}
      <div className="hidden md:flex items-center gap-1.5">
        <span className="text-xs font-display text-white/40 tracking-widest">NESTLE</span>
        <span className="text-xs font-display text-white/40 tracking-widest">BRAND</span>
        <span className="text-xs font-mono font-light text-pulse-cyan/40 tracking-widest">PULSE</span>
      </div>

      {/* Right: User info */}
      <div className="flex items-center gap-4">
        {/* Notification bell */}
        <div className="relative" ref={notifRef}>
          <button
            aria-label="Notifications"
            onClick={() => setNotifOpen((prev) => !prev)}
            className="relative p-2 rounded-lg text-pulse-meta hover:text-pulse-body hover:bg-[rgba(255,255,255,0.04)] transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-pulse-amber rounded-full" />
          </button>

          {notifOpen && (
            <div className="absolute right-0 top-full mt-2 w-80 rounded-lg border border-[rgba(0,212,255,0.15)] bg-[#0A0F1A] shadow-xl z-50">
              <div className="px-4 py-3 border-b border-[rgba(0,212,255,0.1)]">
                <span className="text-xs font-mono text-pulse-meta uppercase tracking-wider">Notifications</span>
              </div>
              <ul className="max-h-64 overflow-y-auto">
                {demoNotifications.map((n) => (
                  <li key={n.id} className="px-4 py-3 border-b border-[rgba(0,212,255,0.05)] hover:bg-[rgba(255,255,255,0.03)] transition-colors">
                    <p className="text-xs text-pulse-body">{n.message}</p>
                    <span className="text-[10px] text-pulse-meta mt-1 block">{n.time}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

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

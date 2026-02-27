export default function TrackFieldFooter({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 text-pulse-meta text-xs font-mono ${className}`}>
      <img src="/logo-icon.png" alt="TP" className="w-5 h-5" />
      <span>
        Powered by <span className="text-pulse-teal">TrackField Projects</span> | trackfieldprojects.com
      </span>
    </div>
  );
}

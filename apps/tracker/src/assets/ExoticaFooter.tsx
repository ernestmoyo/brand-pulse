export default function ExoticaFooter({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 text-pulse-meta text-xs font-mono ${className}`}>
      <span className="text-[10px] opacity-60">
        Powered by <span className="text-pulse-teal">Exotica Agency</span> | Port Louis, Mauritius
      </span>
    </div>
  );
}

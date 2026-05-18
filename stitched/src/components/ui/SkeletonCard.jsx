export default function SkeletonCard() {
  return (
    <div className="animate-pulse">
      <div className="skeleton rounded-2xl mb-3" style={{ aspectRatio: '3/4' }} />
      <div className="px-1 space-y-2">
        <div className="skeleton h-4 w-3/4 rounded" />
        <div className="skeleton h-3 w-1/2 rounded" />
        <div className="skeleton h-3 w-1/3 rounded" />
      </div>
    </div>
  );
}

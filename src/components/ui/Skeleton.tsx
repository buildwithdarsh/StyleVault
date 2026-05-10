"use client";

export function Skeleton({ className = "", dark = false }: { className?: string; dark?: boolean }) {
  return <div className={`${dark ? "skeleton-dark" : "skeleton"} ${className}`} />;
}

export function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
      <Skeleton className="w-full h-64" />
      <div className="p-4 space-y-3">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <div className="flex gap-2 pt-1">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-5 w-12" />
        </div>
      </div>
    </div>
  );
}

export function BoutiqueSkeleton() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
      <Skeleton className="w-full h-40" />
      <div className="p-4 space-y-3">
        <div className="flex items-center gap-3">
          <Skeleton className="w-12 h-12 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-3 w-24" />
          </div>
        </div>
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    </div>
  );
}

export function StatCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm space-y-3">
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-8 w-32" />
      <Skeleton className="h-3 w-20" />
    </div>
  );
}

export function TableRowSkeleton({ cols = 5 }: { cols?: number }) {
  return (
    <tr>
      {Array.from({ length: cols }).map((_, i) => (
        <td key={i} className="px-4 py-3">
          <Skeleton className="h-4 w-full" />
        </td>
      ))}
    </tr>
  );
}

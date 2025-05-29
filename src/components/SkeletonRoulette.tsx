"use client";

export default function SkeletonRoulette() {
  return (
    <div className="relative w-full aspect-square max-w-[445px]">
      <div className="absolute inset-0 rounded-full bg-gray-300 animate-pulse" />
    </div>
  );
}

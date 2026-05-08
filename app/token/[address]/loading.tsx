import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 lg:px-6">
      <Skeleton className="h-44 rounded-[2rem]" />
      <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Skeleton className="h-[32rem] rounded-3xl" />
        <Skeleton className="h-[32rem] rounded-3xl" />
      </div>
    </div>
  );
}

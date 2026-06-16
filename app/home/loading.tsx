import { Skeleton } from "../ui/atoms/skeleton";
import { Container } from "../ui/atoms/container";

export default function HomeLoading() {
  return (
    <div className="flex-1 w-full h-full p-6 space-y-8 bg-gray-50/50">
      {/* Header skeleton */}
      <div className="space-y-3">
        <Skeleton className="h-8 w-40 rounded-lg" />
        <Skeleton className="h-5 w-60 rounded-lg" />
      </div>
      {/* Stats cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <Container key={i} className="p-4 rounded-2xl border border-gray-100 shadow-sm space-y-3">
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-6 w-3/4 rounded-lg" />
            <Skeleton className="h-4 w-1/2 rounded-lg" />
          </Container>
        ))}
      </div>
      {/* Program list skeleton */}
      <div className="space-y-4">
        <Skeleton className="h-6 w-48 rounded-lg" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Container key={i} className="p-4 rounded-2xl border border-gray-100 shadow-sm space-y-3">
              <Skeleton className="h-32 w-full rounded-xl" />
              <Skeleton className="h-5 w-full rounded-lg" />
              <Skeleton className="h-4 w-2/3 rounded-lg" />
            </Container>
          ))}
        </div>
      </div>
    </div>
  );
}

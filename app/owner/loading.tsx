import { Skeleton } from "../ui/atoms/skeleton";
import { Container } from "../ui/atoms/container";

export default function Loading() {
  return (
    <div className="flex-1 w-full h-full p-6 lg:p-10 space-y-8 bg-gray-50/50">
      <div className="flex justify-between items-center mb-8">
        <div className="space-y-4 w-1/2">
          <Skeleton className="h-10 w-1/2 rounded-lg" />
          <Skeleton className="h-6 w-3/4 rounded-lg" />
        </div>
        <div className="flex gap-4">
          <Skeleton className="h-10 w-24 rounded-lg" />
          <Skeleton className="h-10 w-24 rounded-lg" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <Container key={i} className="p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <Skeleton className="h-6 w-1/2 rounded-lg" />
            <Skeleton className="h-8 w-3/4 rounded-lg" />
          </Container>
        ))}
      </div>
      <Container className="p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
        <Skeleton className="h-8 w-1/4 rounded-lg mb-6" />
        {[1, 2].map((i) => (
          <div key={i} className="flex gap-4 p-4 border border-gray-100 rounded-2xl">
            <Skeleton className="h-14 w-14 rounded-xl" />
            <div className="space-y-3 flex-1">
              <Skeleton className="h-6 w-1/3 rounded-lg" />
              <Skeleton className="h-4 w-1/4 rounded-lg" />
            </div>
          </div>
        ))}
      </Container>
    </div>
  );
}

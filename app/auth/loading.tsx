import { Skeleton } from "../ui/atoms/skeleton";
import { Container } from "../ui/atoms/container";

export default function Loading() {
  return (
    <div className="w-full flex justify-center py-10">
      <Container className="w-full max-w-md p-8 rounded-3xl shadow-xl border border-gray-100 space-y-8 bg-white">
        <div className="text-center space-y-4">
          <Skeleton className="h-8 w-2/3 mx-auto rounded-lg" />
          <Skeleton className="h-4 w-full mx-auto rounded-lg" />
        </div>
        <div className="space-y-6">
          <div className="space-y-2">
            <Skeleton className="h-4 w-1/4 rounded-lg" />
            <Skeleton className="h-12 w-full rounded-xl" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-1/4 rounded-lg" />
            <Skeleton className="h-12 w-full rounded-xl" />
          </div>
          <Skeleton className="h-12 w-full rounded-2xl mt-4" />
        </div>
      </Container>
    </div>
  );
}

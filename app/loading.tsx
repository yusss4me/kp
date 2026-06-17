import { Skeleton } from "@/app/ui/atoms/skeleton";
import { Container } from "@/app/ui/atoms/container";
import { BtnSkeleton } from "@/app/ui/atoms/button";
import { InputSkeleton } from "@/app/ui/atoms/input";

export default function Loading() {
  return (
    <Container className="max-w-7xl mx-auto px-6 py-12 space-y-8 animate-in fade-in duration-500">
      <div className="space-y-6">
        <Skeleton variant="rectangle" height={48} width="60%" className="rounded-2xl" />
        <div className="flex gap-4">
          <InputSkeleton hasLabel={false} className="max-w-sm" />
          <BtnSkeleton size="md" shape="rounded" className="mt-auto" />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Container key={i} className="space-y-4 p-6 border border-lightdark-neutral/10 rounded-[2.5rem] bg-white shadow-sm">
            <Skeleton variant="rectangle" height={220} className="w-full rounded-3xl" />
            <Skeleton variant="rectangle" height={28} width="85%" className="rounded-lg" />
            <Skeleton variant="rectangle" height={18} width="50%" className="rounded-md" />
            <div className="flex justify-between items-center pt-6">
              <Skeleton variant="circle" height={44} width={44} />
              <BtnSkeleton size="sm" shape="rounded" />
            </div>
          </Container>
        ))}
      </div>
    </Container>
  );
}
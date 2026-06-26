import Link from "next/link";
import { Txt } from "@/app/ui/atoms/text";
import { Btn } from "@/app/ui/atoms/button";
import { Container } from "@/app/ui/atoms/container";

export default function OwnerNotFound() {
  return (
    <Container className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
      <Txt
        variant="h1"
        weight="bold"
        className="text-7xl md:text-8xl text-red-primary tracking-tight"
      >
        404
      </Txt>
      <Txt variant="h2" weight="bold" className="mt-4 text-gray-900">
        Halaman Owner Tidak Ditemukan
      </Txt>
      <Txt variant="body" className="mt-3 text-gray-500 max-w-md">
        Halaman yang Anda cari tidak ada dalam panel owner.
        Silakan kembali ke dashboard.
      </Txt>
      <Link href="/super_admin" className="mt-8">
        <Btn variant="red" size="lg" shape="rounded" className="px-10 shadow-lg shadow-red-primary/20">
          Kembali ke Dashboard
        </Btn>
      </Link>
    </Container>
  );
}

import { Txt } from "../atoms/text";
import { Btn } from "../atoms/button";
import Link from "next/link";

export const CTASection = () => {
    return (
        <section className="py-16 md:py-24">
          <div className="max-w-5xl mx-auto px-6">
            <div className="bg-red-primary rounded-[32px] md:rounded-[48px] p-8 md:p-16 text-center space-y-8 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-48 md:w-64 h-48 md:h-64 bg-white/5 rounded-full -ml-24 md:-ml-32 -mt-24 md:-mt-32" />
              <div className="absolute bottom-0 right-0 w-48 md:w-64 h-48 md:h-64 bg-white/5 rounded-full -mr-24 md:-mr-32 -mb-24 md:-mb-32" />
              
              <div className="relative z-10 space-y-4">
                <Txt variant="h2" weight="bold" color="white" className="text-2xl md:text-4xl">Siap Untuk Menebar Kebaikan?</Txt>
                <Txt variant="body" color="white" className="opacity-80 max-w-xl mx-auto text-sm md:text-base">
                  Bergabunglah sekarang dan jadilah alasan seseorang tersenyum hari ini. Sekecil apa pun bantuan Anda, akan sangat berarti bagi mereka.
                </Txt>
              </div>
              <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/auth/daftar" className="w-full sm:w-auto">
                  <Btn variant="light" size="lg" shape="circle" className="w-full sm:w-auto px-12 h-14 md:h-16 text-red-primary font-black text-sm md:text-base">
                    Daftar Sekarang
                  </Btn>
                </Link>
                <Link href="#bantuan" className="w-full sm:w-auto">
                  <Btn variant="red" size="lg" shape="circle" className="w-full sm:w-auto px-12 h-14 md:h-16 border border-white/20 text-sm md:text-base">
                    Tanya Kami
                  </Btn>
                </Link>
              </div>
            </div>
          </div>
        </section>
    )
}
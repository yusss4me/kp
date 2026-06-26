"use client";

import { useYamutiStore } from "@/app/lib/stores/yamuti-store";
import { Txt } from "@/app/ui/atoms/text";
import { useEffect, useState } from "react";
import { Globe, MapPin, Mail, Phone } from "lucide-react";

export function LandingFoundationProfile() {
  const { foundationProfile } = useYamutiStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !foundationProfile) return null;

  return (
    <section className="py-20 px-6 max-w-7xl mx-auto">
      <div className="bg-white rounded-[40px] p-10 md:p-16 shadow-xl border border-gray-100 flex flex-col md:flex-row gap-12 items-center">
        {foundationProfile.logoUrl ? (
          <div className="w-48 h-48 md:w-64 md:h-64 flex-shrink-0 rounded-full overflow-hidden border-4 border-red-50 shadow-md">
            <img src={foundationProfile.logoUrl} alt="Logo" className="w-full h-full object-cover" />
          </div>
        ) : (
          <div className="w-48 h-48 md:w-64 md:h-64 flex-shrink-0 bg-red-50 rounded-full flex items-center justify-center text-red-300 border-4 border-red-100 shadow-md">
            <Globe size={80} />
          </div>
        )}

        <div className="flex-1 space-y-6">
          <div>
            <Txt variant="h2" weight="bold" className="text-gray-900 mb-2">
              {foundationProfile.name}
            </Txt>
            <Txt variant="body" className="text-gray-600 leading-relaxed whitespace-pre-wrap">
              {foundationProfile.aboutUs}
            </Txt>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-gray-100">
            <div>
              <Txt variant="h5" weight="bold" className="text-red-primary mb-2">Visi Kami</Txt>
              <Txt variant="body" className="text-gray-600 italic">"{foundationProfile.vision}"</Txt>
            </div>
            <div>
              <Txt variant="h5" weight="bold" className="text-red-primary mb-2">Misi Kami</Txt>
              <Txt variant="body" className="text-gray-600 whitespace-pre-wrap">{foundationProfile.mission}</Txt>
            </div>
          </div>

          <div className="flex flex-wrap gap-6 pt-6 border-t border-gray-100">
            <a 
              href="https://maps.app.goo.gl/RKtcchKJMf968yi66" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-3 text-gray-600 hover:text-red-primary transition-colors cursor-pointer group"
            >
              <div className="p-2 bg-red-50 text-red-primary rounded-full group-hover:bg-red-100 transition-colors">
                <MapPin size={18} />
              </div>
              <Txt variant="caption" className="underline-offset-4 group-hover:underline">{foundationProfile.address}</Txt>
            </a>
            <div className="flex items-center gap-3 text-gray-600">
              <div className="p-2 bg-red-50 text-red-primary rounded-full">
                <Mail size={18} />
              </div>
              <Txt variant="caption">{foundationProfile.email}</Txt>
            </div>
            <div className="flex items-center gap-3 text-gray-600">
              <div className="p-2 bg-red-50 text-red-primary rounded-full">
                <Phone size={18} />
              </div>
              <Txt variant="caption">{foundationProfile.phone}</Txt>
            </div>
          </div>
        </div>
      </div>
      
      {/* Lokasi Peta Iframe */}
      <div className="mt-8 bg-white rounded-[40px] p-8 md:p-12 shadow-xl border border-gray-100">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <Txt variant="h4" weight="bold" className="text-gray-900 mb-1">Lokasi Kami</Txt>
            <Txt variant="body" className="text-gray-500">Kunjungi yayasan kami di alamat berikut.</Txt>
          </div>
          <a href="https://maps.app.goo.gl/RKtcchKJMf968yi66" target="_blank" rel="noopener noreferrer" className="hidden md:flex items-center gap-2 px-6 py-3 bg-red-50 text-red-600 rounded-full font-bold hover:bg-red-100 transition-colors">
            <MapPin size={18} /> Buka di Google Maps
          </a>
        </div>
        <div className="w-full h-80 md:h-96 rounded-3xl overflow-hidden border border-gray-100 shadow-inner bg-gray-50 relative">
           <iframe 
            src="https://maps.google.com/maps?q=Yayasan+Mutiara+Titipan+Ilahi+Tasikmalaya&t=&z=15&ie=UTF8&iwloc=&output=embed" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen={false} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Peta Lokasi Yayasan"
            className="absolute inset-0"
          />
        </div>
        <a href="https://maps.app.goo.gl/RKtcchKJMf968yi66" target="_blank" rel="noopener noreferrer" className="mt-6 w-full flex md:hidden items-center justify-center gap-2 px-6 py-4 bg-red-50 text-red-600 rounded-2xl font-bold hover:bg-red-100 transition-colors">
          <MapPin size={18} /> Buka di Google Maps
        </a>
      </div>
    </section>
  );
}

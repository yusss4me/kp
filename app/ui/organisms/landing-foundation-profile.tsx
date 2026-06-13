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
            <div className="flex items-center gap-3 text-gray-600">
              <div className="p-2 bg-red-50 text-red-primary rounded-full">
                <MapPin size={18} />
              </div>
              <Txt variant="caption">{foundationProfile.address}</Txt>
            </div>
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
    </section>
  );
}

"use client";

import { useState, useEffect } from "react";
import { ProfileSubpageTemplate } from "@/app/ui/templates/profile-subpage";
import { Container } from "@/app/ui/atoms/container";
import { Txt } from "@/app/ui/atoms/text";
import { Bell } from "lucide-react";

export interface NotificationSetting {
  title: string;
  desc: string;
  active: boolean;
}

export interface ProfileNotificationsTemplateProps {
  settings: NotificationSetting[];
}

export function ProfileNotificationsTemplate({ settings: defaultSettings }: ProfileNotificationsTemplateProps) {
  const [settings, setSettings] = useState<NotificationSetting[]>(defaultSettings);

  useEffect(() => {
    const saved = localStorage.getItem("yamuti_notification_settings");
    if (saved) {
      try {
        // eslint-disable-next-line
        setSettings(JSON.parse(saved));
      } catch (e) {
        // ignore
      }
    }
  }, []);

  const handleToggle = (index: number) => {
    const newSettings = [...settings];
    newSettings[index].active = !newSettings[index].active;
    setSettings(newSettings);
    localStorage.setItem("yamuti_notification_settings", JSON.stringify(newSettings));
  };

  return (
    <ProfileSubpageTemplate
      backHref="/user/profil/settings"
      backLabel="Kembali ke Pengaturan"
      title="Notifikasi"
      icon={Bell}
      maxWidth="3xl"
    >
      <Container variant="light" radius="2xl" padding="none" shadow="sm" className="border border-gray-100 overflow-hidden">
        {settings.map((s, i) => (
          <div key={i} className={`flex items-center justify-between p-6 ${i !== settings.length - 1 ? "border-b border-gray-50" : ""}`}>
            <div>
              <Txt weight="bold">{s.title}</Txt>
              <Txt className="text-gray-400 text-sm">{s.desc}</Txt>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={s.active} 
                onChange={() => handleToggle(i)}
                className="sr-only peer" 
              />
              <div className="w-12 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-primary" />
            </label>
          </div>
        ))}
      </Container>
    </ProfileSubpageTemplate>
  );
}

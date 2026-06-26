"use client";

import { Bell, CheckCheck, Trash2, HandCoins, Calendar, BookOpen, Radio, Info } from "lucide-react";
import { Container } from "@/app/ui/atoms/container";
import { Txt } from "@/app/ui/atoms/text";
import { Btn } from "@/app/ui/atoms/button";
import { Icn } from "@/app/ui/atoms/Icn";
import { cn } from "@/app/lib/utils";
import {
  useNotificationStore,
  type AppNotification,
  type NotificationType,
} from "@/app/lib/stores/notification-store";

const TYPE_CONFIG: Record<
  NotificationType,
  { icon: typeof Bell; color: string; bg: string; label: string }
> = {
  donation: { icon: HandCoins, color: "text-green-600", bg: "bg-green-100", label: "Donasi" },
  kunjungan: { icon: Calendar, color: "text-blue-600", bg: "bg-blue-100", label: "Kunjungan" },
  program: { icon: BookOpen, color: "text-purple-600", bg: "bg-purple-100", label: "Program" },
  broadcast: { icon: Radio, color: "text-orange-600", bg: "bg-orange-100", label: "Broadcast" },
  system: { icon: Info, color: "text-gray-600", bg: "bg-gray-100", label: "Sistem" },
};

function formatTimestamp(ts: number): string {
  const diff = Date.now() - ts;
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Baru saja";
  if (mins < 60) return `${mins} menit lalu`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours} jam lalu`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days} hari lalu`;
  return new Date(ts).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function NotificationRow({
  notif,
  onRead,
  onRemove,
}: {
  notif: AppNotification;
  onRead: (id: string) => void;
  onRemove: (id: string) => void;
}) {
  const cfg = TYPE_CONFIG[notif.type] || TYPE_CONFIG.system;
  const TypeIcon = cfg.icon;

  return (
    <div
      className={cn(
        "flex gap-4 px-6 py-4 border-b border-gray-50 last:border-b-0 hover:bg-gray-50 transition-colors cursor-pointer group",
        !notif.read && "bg-red-primary/[0.03]"
      )}
      onClick={() => onRead(notif.id)}
    >
      <div className={cn("shrink-0 w-11 h-11 rounded-full flex items-center justify-center", cfg.bg)}>
        <TypeIcon size={18} className={cfg.color} />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <Txt weight="bold" className="text-sm text-gray-800 truncate flex-1">
            {notif.title}
          </Txt>
          <span className={cn("text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0", cfg.bg, cfg.color)}>
            {cfg.label}
          </span>
          {!notif.read && <span className="w-2 h-2 rounded-full bg-red-primary shrink-0" />}
        </div>
        <Txt className="text-sm text-gray-500">{notif.message}</Txt>
        <Txt className="text-xs text-gray-400 mt-1">{formatTimestamp(notif.timestamp)}</Txt>
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onRemove(notif.id);
        }}
        className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity self-center p-1.5 text-gray-400 hover:text-red-primary rounded-lg hover:bg-red-50"
        aria-label="Hapus notifikasi"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
}

export interface NotificationListTemplateProps {
  className?: string;
  title?: string;
}

export function NotificationListTemplate({
  className = "",
  title = "Notifikasi",
}: NotificationListTemplateProps) {
  const notifications = useNotificationStore((s) => s.notifications);
  const markAsRead = useNotificationStore((s) => s.markAsRead);
  const markAllAsRead = useNotificationStore((s) => s.markAllAsRead);
  const clearAll = useNotificationStore((s) => s.clearAll);
  const removeNotification = useNotificationStore((s) => s.removeNotification);
  const unreadCount = useNotificationStore((s) => s.unreadCount);

  const unread = unreadCount();

  return (
    <div className={cn("p-6 max-w-3xl mx-auto", className)}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-red-primary/10 flex items-center justify-center">
            <Bell size={20} className="text-red-primary" />
          </div>
          <div>
            <Txt variant="h4" weight="bold" className="text-gray-900">
              {title}
            </Txt>
            <Txt className="text-sm text-gray-500">
              {unread > 0 ? `${unread} belum dibaca` : "Semua sudah dibaca"}
            </Txt>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {unread > 0 && (
            <Btn
              variant="light"
              size="sm"
              onClick={markAllAsRead}
              className="text-red-primary font-semibold rounded-lg text-xs gap-1.5"
            >
              <CheckCheck size={14} />
              Tandai semua dibaca
            </Btn>
          )}
          {notifications.length > 0 && (
            <Btn
              variant="light"
              size="sm"
              onClick={clearAll}
              className="text-gray-500 font-semibold rounded-lg text-xs gap-1.5"
            >
              <Trash2 size={14} />
              Hapus semua
            </Btn>
          )}
        </div>
      </div>

      {/* Notification List */}
      <Container
        variant="light"
        radius="2xl"
        shadow="sm"
        padding="none"
        className="border border-gray-100 overflow-hidden"
      >
        {notifications.length === 0 ? (
          <div className="py-16 text-center">
            <Icn icon={Bell} size={48} color="current" className="text-gray-200 mx-auto mb-3" />
            <Txt className="text-gray-400 mb-1">Belum ada notifikasi</Txt>
            <Txt className="text-xs text-gray-300">
              Notifikasi baru akan muncul di sini saat ada aktivitas.
            </Txt>
          </div>
        ) : (
          notifications.map((notif) => (
            <NotificationRow
              key={notif.id}
              notif={notif}
              onRead={markAsRead}
              onRemove={removeNotification}
            />
          ))
        )}
      </Container>
    </div>
  );
}


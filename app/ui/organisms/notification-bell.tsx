"use client";

import { useState, useRef, useEffect } from "react";
import { Bell, X, CheckCheck, Trash2, HandCoins, Calendar, BookOpen, Radio, Info } from "lucide-react";
import { Btn } from "@/app/ui/atoms/button";
import { Txt } from "@/app/ui/atoms/text";
import { Icn } from "@/app/ui/atoms/Icn";
import { cn } from "@/app/lib/utils";
import {
  useNotificationStore,
  type AppNotification,
  type NotificationType,
} from "@/app/lib/stores/notification-store";

/** Map notification type to icon and color */
const TYPE_CONFIG: Record<
  NotificationType,
  { icon: typeof Bell; color: string; bg: string }
> = {
  donation: { icon: HandCoins, color: "text-green-600", bg: "bg-green-100" },
  kunjungan: { icon: Calendar, color: "text-blue-600", bg: "bg-blue-100" },
  program: { icon: BookOpen, color: "text-purple-600", bg: "bg-purple-100" },
  broadcast: { icon: Radio, color: "text-orange-600", bg: "bg-orange-100" },
  system: { icon: Info, color: "text-gray-600", bg: "bg-gray-100" },
};

/** Format timestamp to relative time */
function timeAgo(ts: number): string {
  const diff = Date.now() - ts;
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Baru saja";
  if (mins < 60) return `${mins} menit lalu`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours} jam lalu`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days} hari lalu`;
  return new Date(ts).toLocaleDateString("id-ID");
}

/** Single notification item */
function NotificationItem({
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
        "flex gap-3 px-4 py-3 border-b border-gray-50 last:border-b-0 hover:bg-gray-50 transition-colors cursor-pointer group",
        !notif.read && "bg-red-primary/[0.03]"
      )}
      onClick={() => onRead(notif.id)}
    >
      {/* Icon */}
      <div className={cn("shrink-0 w-9 h-9 rounded-full flex items-center justify-center", cfg.bg)}>
        <TypeIcon size={16} className={cfg.color} />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <Txt weight="bold" className="text-sm text-gray-800 truncate flex-1">
            {notif.title}
          </Txt>
          {!notif.read && (
            <span className="w-2 h-2 rounded-full bg-red-primary shrink-0" />
          )}
        </div>
        <Txt className="text-xs text-gray-500 line-clamp-2 mt-0.5">{notif.message}</Txt>
        <Txt className="text-[10px] text-gray-400 mt-1">{timeAgo(notif.timestamp)}</Txt>
      </div>

      {/* Remove button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onRemove(notif.id);
        }}
        className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity p-1 text-gray-400 hover:text-red-primary"
        aria-label="Hapus notifikasi"
      >
        <X size={14} />
      </button>
    </div>
  );
}

/**
 * NotificationBell
 *
 * Organism that renders a bell icon with unread badge count
 * and a dropdown panel listing all notifications.
 * Adapts to both desktop sidebar and mobile header contexts.
 */
export function NotificationBell({ className }: { className?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const notifications = useNotificationStore((s) => s.notifications);
  const markAsRead = useNotificationStore((s) => s.markAsRead);
  const markAllAsRead = useNotificationStore((s) => s.markAllAsRead);
  const clearAll = useNotificationStore((s) => s.clearAll);
  const removeNotification = useNotificationStore((s) => s.removeNotification);
  const unreadCount = useNotificationStore((s) => s.unreadCount);

  const unread = unreadCount();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);

  return (
    <div ref={ref} className={cn("relative", className)}>
      {/* Bell Button */}
      <Btn
        variant="transparent"
        onClick={() => setIsOpen(!isOpen)}
        className="relative text-white hover:bg-white/10 rounded-full p-2.5"
        aria-label={`Notifikasi${unread > 0 ? `, ${unread} belum dibaca` : ""}`}
        aria-expanded={isOpen}
      >
        <Bell size={20} />
        {unread > 0 && (
          <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] rounded-full bg-yellow-400 text-[10px] font-bold text-gray-900 flex items-center justify-center px-1 shadow">
            {unread > 99 ? "99+" : unread}
          </span>
        )}
      </Btn>

      {/* Dropdown Panel */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-80 max-h-96 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-[70] animate-in fade-in slide-in-from-top-2 duration-200">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
            <Txt weight="bold" className="text-gray-800">
              Notifikasi
            </Txt>
            <div className="flex items-center gap-1">
              {unread > 0 && (
                <Btn
                  variant="transparent"
                  size="sm"
                  onClick={markAllAsRead}
                  className="text-xs text-red-primary font-semibold px-2 py-1 hover:bg-red-primary/5 rounded-lg"
                >
                  <CheckCheck size={14} className="mr-1" />
                  Tandai semua
                </Btn>
              )}
              {notifications.length > 0 && (
                <Btn
                  variant="transparent"
                  size="sm"
                  onClick={clearAll}
                  className="text-xs text-gray-500 font-semibold px-2 py-1 hover:bg-gray-100 rounded-lg"
                >
                  <Trash2 size={14} className="mr-1" />
                  Hapus
                </Btn>
              )}
            </div>
          </div>

          {/* Notification List */}
          <div className="overflow-y-auto max-h-72">
            {notifications.length === 0 ? (
              <div className="py-12 text-center">
                <Icn icon={Bell} size={32} color="current" className="text-gray-300 mx-auto mb-2" />
                <Txt className="text-sm text-gray-400">Belum ada notifikasi</Txt>
              </div>
            ) : (
              notifications.map((notif) => (
                <NotificationItem
                  key={notif.id}
                  notif={notif}
                  onRead={markAsRead}
                  onRemove={removeNotification}
                />
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default NotificationBell;

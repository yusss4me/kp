import { create } from "zustand";
import { persist } from "zustand/middleware";

/** Notification type categories */
export type NotificationType =
  | "donation"
  | "kunjungan"
  | "program"
  | "broadcast"
  | "system";

/** Single notification entity */
export interface AppNotification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  read: boolean;
  timestamp: number;
  /** Optional deep link within the app */
  link?: string;
}

interface NotificationState {
  notifications: AppNotification[];
  /** Add a new notification (prepends to list) */
  addNotification: (n: Omit<AppNotification, "id" | "read" | "timestamp">) => void;
  /** Mark a single notification as read */
  markAsRead: (id: string) => void;
  /** Mark all notifications as read */
  markAllAsRead: () => void;
  /** Remove all notifications */
  clearAll: () => void;
  /** Remove a single notification */
  removeNotification: (id: string) => void;
  /** Computed: count of unread notifications */
  unreadCount: () => number;
}

let _counter = 0;
function generateNotifId(): string {
  _counter += 1;
  return `notif-${Date.now()}-${_counter}`;
}

export const useNotificationStore = create<NotificationState>()(
  persist(
    (set, get) => ({
      notifications: [],

      addNotification: (partial) => {
        const notif: AppNotification = {
          ...partial,
          id: generateNotifId(),
          read: false,
          timestamp: Date.now(),
        };
        set((s) => ({ notifications: [notif, ...s.notifications].slice(0, 100) }));
      },

      markAsRead: (id) => {
        set((s) => ({
          notifications: s.notifications.map((n) =>
            n.id === id ? { ...n, read: true } : n
          ),
        }));
      },

      markAllAsRead: () => {
        set((s) => ({
          notifications: s.notifications.map((n) => ({ ...n, read: true })),
        }));
      },

      clearAll: () => {
        set({ notifications: [] });
      },

      removeNotification: (id) => {
        set((s) => ({
          notifications: s.notifications.filter((n) => n.id !== id),
        }));
      },

      unreadCount: () => {
        return get().notifications.filter((n) => !n.read).length;
      },
    }),
    { name: "yamuti-notifications" }
  )
);

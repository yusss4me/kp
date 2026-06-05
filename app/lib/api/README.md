# Integrasi API (nanti)

Saat backend siap, ganti implementasi di `app/lib/stores/yamuti-store.ts` dengan pemanggilan HTTP (axios/React Query) pada setiap action:

- `addProgram` → `POST /programs`
- `updateProgram` → `PATCH /programs/:id`
- `deleteProgram` → `DELETE /programs/:id`
- (dan seterusnya untuk orphans, inventory, transactions, bookings, admins)

UI (templates + pages) tidak perlu diubah jika signature store tetap sama.

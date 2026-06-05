/** Helper path navigasi detail berbasis ID — ganti prefix jika struktur URL berubah */

export const routes = {
  donasi: (id: string) => `/home/donasi/${id}`,
  explore: () => `/home/explore`,
  visitor: {
    donasi: (id: string) => `/donasi/${id}`,
    donasiDetail: (id: string) => `/donasi/${id}/detail`,
    program: (id: string) => `/program/${id}`,
    explore: () => `/explore`,
    kunjungan: () => `/kunjungan`,
  },
  aktivitas: {
    root: () => `/home/aktivitas`,
    anak: {
      detail: (id: string | number) => `/home/aktivitas/anak/${id}`,
      donasi: (anakId?: string | number) =>
        anakId != null ? `/home/aktivitas/anak/donasi?anakId=${anakId}` : `/home/aktivitas/anak/donasi`,
    },
    program: {
      detail: (id: string) => `/home/aktivitas/program/${id}`,
    },
    kunjungan: {
      detail: (id: string | number) => `/home/aktivitas/kunjungan/${id}`,
    },
    barang: {
      detail: (id: string | number) => `/home/aktivitas/barang/${id}`,
    },
  },
  admin: {
    orphanEdit: (id: string | number) => `/admin/anak-asuh/${id}/edit`,
    programEdit: (id: string) => `/admin/donasi/edit-donasi/${id}`,
    inventoryEdit: (id: number) => `/admin/inventory/${id}/edit`,
    kunjunganEdit: (id: number) => `/admin/kunjungan/${id}/edit`,
  },
  
} as const;

/** Helper path navigasi detail berbasis ID — ganti prefix jika struktur URL berubah */

const super_admin_routes = {
  root: () => `/super_admin`,
  admins: {
    root: () => `/super_admin/admins`,
    add: () => `/super_admin/admins/tambah`,
    edit: (id: string | number) => `/super_admin/admins/${id}/edit`,
  },
  donations: {
    root: () => `/super_admin/donations`,
  },
  foundation: {
    root: () => `/super_admin/foundation`,
  },
  quickAccess: {
    root: () => `/super_admin/quick-access`,
  },
  reports: {
    root: () => `/super_admin/reports`,
  },
  settings: {
    root: () => `/super_admin/settings`,
  },
  profile: {
    root: () => `/super_admin/profile`,
  },
  explore: {
    root: () => `/super_admin/explore`,
  },
  notifications: {
    root: () => `/super_admin/notifications`,
  },
} as const;

export const routes = {
  donasi: (id: string) => `/user/donasi/${id}`,
  explore: () => `/user/explore`,
  visitor: {
    donasi: (id: string) => `/donasi/${id}`,
    donasiDetail: (id: string) => `/donasi/${id}/detail`,
    program: (id: string) => `/program/${id}`,
    explore: () => `/explore`,
    kunjungan: () => `/kunjungan`,
  },
  user: {
    root: () => `/user`,
    aktivitas: {
      root: () => `/user/aktivitas`,
      program: {
        root: () => `/user/aktivitas/program`,
        detail: (id: string) => `/user/aktivitas/program/${id}`,
        donation : (id: string) => `/user/aktivitas/program/${id}/donasi`,
      },
      kunjungan : {
        root: () => `/user/aktivitas/kunjungan`,
        detail: (id: string) => `/user/aktivitas/kunjungan/${id}`,
      },
      explore: {
        root: () => `/user/explore`,
        
      },
      profile: {
        root: () => `/user/profil`,
      },

    },
    notifications: {
      root: () => `/user/profil/notifications`,
    },
    
    
  },

  super_admin: super_admin_routes,
  owner: super_admin_routes,
  
  admin: {
    root: () => `/admin`,
    anakAsuh: {
      root: () => `/admin/anak-asuh`,
      add: () => `/admin/anak-asuh/tambah`,
      edit: (id: string | number) => `/admin/anak-asuh/${id}/edit`,
    },
    program: {
      root: () => `/admin/program`,
      add: () => `/admin/program/tambah`,
      edit: (id: string | number) => `/admin/program/${id}/edit`,
    },
    inventaris: {
      root: () => `/admin/inventaris`,
      add: () => `/admin/inventaris/tambah`,
      edit: (id: string | number) => `/admin/inventaris/${id}/edit`,
    },
    kunjungan: {
      root: () => `/admin/kunjungan`,
      add: () => `/admin/kunjungan/tambah`,
      edit: (id: string | number) => `/admin/kunjungan/${id}/edit`,
      detail: (id: string | number) => `/admin/kunjungan/${id}/detail`,
    },
    profile: {
      root: () => `/admin/profile`,
    },
    donasi: {
      root: () => `/admin/donasi`,
      add: () => `/admin/donasi/tambah-donasi`,
      edit: (id: string | number) => `/admin/donasi/edit-donasi/${id}`,
    },
    keuangan: {
      root: () => `/admin/keuangan`,
      add: () => `/admin/keuangan/tambah`,
    },
    cms: {
      root: () => `/admin/cms`,
      berita: () => `/admin/cms/berita`,
    },
    quickAccess: {
      root: () => `/admin/quick-access`,
    },
    explore: {
      root: () => `/admin/explore`,
    },
    notifications: {
      root: () => `/admin/notifications`,
    },
  },

  
} as const;

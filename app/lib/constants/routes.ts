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
  user: {
    root: () => `/home`,
    aktivitas: {
      root: () => `/home/aktivitas`,
      program: {
        root: () => `/home/aktivitas/program`,
        detail: (id: string) => `/home/aktivitas/program/${id}`,
        donation : (id: string) => `/home/aktivitas/program/${id}/donasi`,
      },
      kunjungan : {
        root: () => `/home/aktivitas/kunjungan`,
        detail: (id: string) => `/home/aktivitas/kunjungan/${id}`,
      },
      explore: {
        root: () => `/home/explore`,
        
      },
      broadcast: {
        root: () => `/home/broadcast`,
      },
      profile: {
        root: () => `/home/profil`,
      },

    },
    
    
  },

  owner: {
    root: () => `/owner`,
    admins: {
      root: () => `/owner/admins`,
      add: () => `/owner/admins/tambah`,
      edit: (id: string | number) => `/owner/admins/${id}/edit`,
    },
    donations: {
      root: () => `/owner/donations`,
    },
    foundation: {
      root: () => `/owner/foundation`,
    },
    quickAccess: {
      root: () => `/owner/quick-access`,
    },
    reports: {
      root: () => `/owner/reports`,
    },
    settings: {
      root: () => `/owner/settings`,
    },
    profile: {
      root: () => `/owner/profile`,
    },
  },
  
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
    },
    broadcast: {
      root: () => `/admin/broadcast`,
      add: () => `/admin/broadcast/tambah`,
      edit: (id: string | number) => `/admin/broadcast/${id}/edit`,
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
  },

  
} as const;

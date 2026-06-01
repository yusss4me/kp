import { AdminDashboard } from '@/app/ui/templates/admin-dashboardTemplate';


export default function Page() {
  return (
    <AdminDashboard
      anak={[
        {
          id: "1",
          nama: "Ahmad Fauzi",
          jenisKelamin: "Laki-laki",
          umur: 11,
          status: "Baru",
          image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
        },
        {
          id: "2",
          nama: "Ahmad Fauzi",
          jenisKelamin: "Laki-laki",
          umur: 10,
          status: "Baru",
          image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
        },
        {
          id: "3",
          nama: "Ahmad Fauzi",
          jenisKelamin: "Laki-laki",
          umur: 10,
          status: "Baru",
          image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
        },
        {
          id: "4",
          nama: "Siti Aminah",
          jenisKelamin: "Perempuan",
          umur: 12,
          status: "Baru",
          image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
        },
        {
          id: "5",
          nama: "Ahmad Fauzi",
          jenisKelamin: "Laki-laki",
          umur: 10,
          status: "Baru",
          image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
        }
      ]}
      donasi={[
        {
          id: "1",
          jumlah: 1000,
        },
        {
          id: "2",
          jumlah: 2000,
        },
        {
          id: "3",
          jumlah: 3000,
        },
        {
          id: "4",
          jumlah: 4000,
        }
      ]}
      program={[
        {
          id: "1",
          
        },
        {
          id: "2",

        },
        {
          id: "3",

        },
        {
          id: "4",

        },
        {
          id: "5",

        },
        {
          id: "7",

        }
      ]}
      stokBarang={[
        {
          id: "1",
          jumlah: 10,
        },
        {
          id: "2",
          jumlah: 2000,
        },
        {
          id: "3",
          jumlah: 3000,
        },
        {
          id: "4",
          jumlah: 4000,
        }
      ]}
      user={{
        name: "Admin Yamuti",
        role: "Super Administrator"
      }}
      headerTitle="Dashboard Utama" />


  );
}

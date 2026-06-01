import { ProfileCard } from "../organisms/profile-card";
import { MenuListItems } from "../organisms/menuListItems";
import { Txt } from "../atoms/text";
import { LogOut, LucideIcon } from "lucide-react";
import { Btn } from "../atoms/button";

export interface ProfileTemplateProps {
    user: {
        name: string;
        role: string;
        image: string;
    };
    amountProgramUser: string;
    amountVisitUser: string;
    amountDonatedUser: string;
    listMenu: {
        title: string;
        items: {
            label: string;
            icon: LucideIcon;
            href: string;
        }[];
    }[];
    className?: string;
    /** 
     * @param {boolean} isFlyout - Menentukan apakah template ditampilkan sebagai overlay flyout 
     * (misal: di sidebar desktop) atau sebagai halaman penuh. 
     */
    isFlyout?: boolean;
}

/**
 * ProfileTemplate
 * 
 * Template untuk halaman profil pengguna.
 * Menampilkan kartu profil (ProfileCard), daftar menu aksi yang 
 * dikelompokkan, serta tombol keluar akun.
 * 
 * @param {ProfileTemplateProps} props - Properti komponen
 * @returns {JSX.Element} Komponen ProfileTemplate
 */
export const ProfileTemplate = ({
    user,
    amountProgramUser,
    amountVisitUser,
    amountDonatedUser,
    listMenu,
    className = "",
    isFlyout = false
}: ProfileTemplateProps) => {
    return (
        <div className={`h-full w-full ${isFlyout ? 'max-w-md bg-white shadow-2xl' : 'max-w-4xl mx-auto'} overflow-hidden flex flex-col transition-all duration-500 ${className}`}>
            {/* Header for Page Mode */}
            {!isFlyout && (
                <div className="p-8 md:p-12 pb-0 flex items-center justify-between">
                    <div className="animate-in slide-in-from-left-4 duration-500">
                        <Txt variant="h2" weight="bold" className="text-3xl text-gray-900">Profil Saya</Txt>
                        <Txt className="text-gray-500 mt-1">Kelola akun dan pantau aktivitas donasi Anda</Txt>
                    </div>
                </div>
            )}

            {/* Main Content */}
            <div className={`flex-1 overflow-y-auto custom-scrollbar ${isFlyout ? 'p-6' : 'p-8 md:p-12'} flex flex-col gap-10`}>
                {/* Profile Section */}
                <div className="animate-in slide-in-from-top-4 duration-700">
                    <ProfileCard
                        nameUser={user.name}
                        roleUser={user.role}
                        imageUser={user.image}
                        amountProgramUser={amountProgramUser}
                        amountVisitUser={amountVisitUser}
                        amountDonatedUser={amountDonatedUser}
                    
                    />
                </div>

                {/* Menu Lists */}
                <div className={`grid ${isFlyout ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'} gap-8 pb-10`}>
                    {listMenu.map((group, idx) => (
                        <div
                            key={group.title}
                            className="animate-in slide-in-from-bottom-4 duration-700"
                            style={{ animationDelay: `${(idx + 1) * 150}ms`, animationFillMode: 'both' }}
                        >
                            <MenuListItems title={group.title} listItems={group.items} />
                        </div>
                    ))}
                </div>
            </div>

            {/* Footer / Logout Button */}
            <div className={`p-6 ${isFlyout ? 'bg-gray-50/50 border-t' : 'bg-white'} mt-auto animate-in fade-in duration-1000 delay-500`}>
                <Btn variant="light" className={`w-full py-4 ${isFlyout ? 'text-red-primary' : 'bg-red-50 text-red-primary hover:bg-red-100'} font-bold transition-all flex items-center justify-center gap-2 rounded-xl active:scale-[0.98]`}>
                    <LogOut size={18} />
                    Keluar Akun
                </Btn>
                {!isFlyout && (
                    <Txt className="text-center text-[10px] text-gray-400 mt-4 tracking-widest uppercase font-bold opacity-50">
                        YAMUTI Version 1.1.0
                    </Txt>
                )}
            </div>
        </div>
    )
}


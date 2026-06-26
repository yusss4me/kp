import { ProfileAboutTemplate, ABOUT_STATS_DEFAULT } from "@/app/ui/templates/profile-about";

const MISSIONS = [
  "Memberikan pendidikan berkualitas bagi anak yatim.",
  "Menyalurkan donasi secara tepat sasaran dan transparan.",
  "Membangun kemandirian ekonomi umat melalui program pemberdayaan.",
  "Menginspirasi gaya hidup berbagi di masyarakat modern.",
];

export default function Page() {
  return (
    <ProfileAboutTemplate
      stats={ABOUT_STATS_DEFAULT}
      vision="Menjadi lembaga filantropi Islam terdepan yang profesional, transparan, dan amanah dalam memberdayakan umat, khususnya anak-anak yatim dan dhuafa di seluruh penjuru Indonesia."
      missions={MISSIONS}
    />
  );
}

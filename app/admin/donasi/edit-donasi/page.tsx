import { redirect } from "next/navigation";
import { routes } from "@/app/lib/constants/routes";

export default function EditDonasiIndexPage() {
  redirect(routes.admin.donasi.root());
}

import { redirect } from "next/navigation";
import { routes } from "@/app/lib/constants/routes";

export default function Page() {
  redirect(routes.user.aktivitas.root());
}

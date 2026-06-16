import { Metadata } from "next";
import LoginForm from "../ui/templates/login-form"

export const metadata: Metadata = {
  title: "Login Admin",
  description: "Masuk ke sistem manajemen Yayasan Mutiara Titipan Ilahi.",
};

export default function Page(){

    return(
        <LoginForm variant="admin" />
    )
}
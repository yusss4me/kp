import { Metadata } from "next";
import LoginForm from "../ui/templates/login-form"

export const metadata: Metadata = {
  title: "Login | Yamuti Foundation",
  description: "Masuk ke sistem manajemen Yayasan Mutiara Titipan Illahi.",
};

export default function Page(){

    return(
        <LoginForm />
    )
}
'use client';

import { useState, forwardRef, InputHTMLAttributes } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "../atoms/input";
import { Btn } from "../atoms/button";

export interface PasswordFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    placeholder: string;
    error?: string;
}

/**
 * PasswordField
 * 
 * Komponen input password khusus yang menyertakan tombol 
 * untuk menampilkan/menyembunyikan karakter password.
 * 
 * @param {string} label - Label teks di atas input password
 * @param {string} placeholder - Teks petunjuk di dalam input
 * @param {string} error - Pesan kesalahan validasi
 * @param {PasswordFieldProps} props - Properti komponen
 * @returns {JSX.Element} Komponen PasswordField
 */
export const PasswordField = forwardRef<HTMLInputElement, PasswordFieldProps>(
    ({ label, placeholder, error, ...props }, ref) => {
        const [showPassword, setShowPassword] = useState(false);

        const togglePasswordVisibility = () => {
            setShowPassword((prev) => !prev);
        };

        return (
            <Input 
                ref={ref}
                type={showPassword ? "text" : "password"} 
                placeholder={placeholder} 
                label={label}
                error={error}
                suffix={
                    <Btn 
                        type="button"                    
                        onClick={togglePasswordVisibility}
                        variant="transparent"
                        textColor="dark"
                        
                        className="transition-colors hover:text-lightdark-neutral"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </Btn>
                }
                {...props}
            />
        );
    }
);

PasswordField.displayName = 'PasswordField';

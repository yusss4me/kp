import { useState, forwardRef, InputHTMLAttributes } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "../atoms/input";
import { Btn } from "../atoms/button";

interface PasswordFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    placeholder: string;
    error?: string;
}

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
                        variant="orange"
                        className=" text-orange-secondary hover:text-orange-neutral transition-colors cursor-pointer w-full h-full rounded-r-xl"
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

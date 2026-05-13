import { Input } from "@/app/ui/atoms/input";
import { LucideIcon } from "lucide-react";
import { Container } from "@/app/ui/atoms/container";
import { Txt } from "@/app/ui/atoms/text";
import { Btn } from "@/app/ui/atoms/button";

interface FormFieldProps {
  label: string;
  icon?: LucideIcon;
  error?: string;
  placeholder?: string;
  type?: string;
  name?: string;
}

export const FormField = ({
  label,
  icon: Icon,
  error,
  ...props
}: FormFieldProps) => {
  return (
    <Container className="group space-y-2">
      <div className="flex items-center gap-2 text-slate-700 group-focus-within:text-brand-secondary transition-colors">
        {Icon && <Icon size={18} />}
        <span className="text-sm font-bold uppercase tracking-wider">
          {label}
        </span>
      </div>
      <Input label="hallo" error={error} {...props} />
      <Btn variant="red" size="lg" shape="square">
        {" "}
        test
      </Btn>
    </Container>
  );
};

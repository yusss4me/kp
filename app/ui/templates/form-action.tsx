







import React, { FormEvent, ReactNode, InputHTMLAttributes, TextareaHTMLAttributes, SelectHTMLAttributes, } from 'react';
import { Container } from '@/app/ui/atoms/container';
import { Input, InputProps } from '@/app/ui/atoms/input';
import { Textarea } from '@/app/ui/atoms/textarea';
import { Select } from '@/app/ui/atoms/select';
import { Img } from '../atoms/image';

export interface inputConfigProps extends InputHTMLAttributes<HTMLInputElement>{
    name: string;
    label: string;
    type: 'text' | 'number' | 'email' | 'password' | 'date';
    placeholder?: string;
    required?: boolean;
    options?: { value: string; label: string }[]; // Khusus untuk select
    min?: string | number;
    rows?: number;
    Props?: InputProps ;
    error?: string;
     // Khusus untuk textarea
}

export interface selectConfigProps extends InputHTMLAttributes<HTMLSelectElement>{
    name: string;
    label: string;
    placeholder?: string;
    required?: boolean;
    options?: { value: string; label: string }[]; // Khusus untuk select
    min?: string | number;
    rows?: number;
    Props?: InputProps ;
    error?: string;
     // Khusus untuk textarea
}

export interface textareaConfigProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    name: string;
    label: string;
    placeholder?: string;
    required?: boolean;
    options?: { value: string; label: string }[]; // Khusus untuk select
    min?: string | number;
    rows?: number;
    Props?: InputProps ;
    error?: string;
     // Khusus untuk textarea
}



export interface FormActionTemplateProps {
    // src?: string;
    // title: string;
    // description?: string;
    inputs?: inputConfigProps[];
    selects?: selectConfigProps[];
    textareas?: textareaConfigProps[];
    children?: ReactNode;
    actions?: ReactNode;
    onSubmit?: (e: FormEvent<HTMLFormElement>) => void;
    className?: string;
}

export const FormActionTemplate = ({ 
    // src,
    // title,
    // description,
    inputs,
    selects,
    textareas,
    children, 
    actions,
    onSubmit,
    className = '',
    ...props
}: FormActionTemplateProps) => {
    return (
        <Container className={`flex flex-col min-h-screen bg-gray-50 pb-24 ${className}`}>
            <div className="px-4 py-6 bg-white shadow-sm mb-4">
                <div className='flex items-center gap-3'>
                {/* {src ? <Img src={src} alt={title} width={50} height={50} /> : <Img src="/images/no-image.png" alt={title} width={50} height={50} />} */}
                {/* <h1 className="text-xl font-bold text-gray-900">{title}</h1> */}
                </div>
                {/* {description && <p className="text-sm text-gray-500 mt-1">{description}</p>} */}
            </div>
            
            <form onSubmit={onSubmit} className="flex-grow px-4 flex flex-col gap-4">
                {inputs && inputs.map((field) => (
                    <div key={field.name}>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            {field.label} {field.required && <span className="text-red-500">*</span>}
                        </label>
                        {(
                            <Input 
                                type={field.type}
                                name={field.name}
                                placeholder={field.placeholder}
                                required={field.required}
                                min={field.min}
                                error={field.error}
                                {...props}
                            />
                        )}
                    </div>
                ))}
                
                {children}
            </form>

            {actions && (
                <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-10">
                    <div className="w-full max-w-3xl mx-auto flex gap-3">
                        {actions}
                    </div>
                </div>
            )}
        </Container>
    );
};
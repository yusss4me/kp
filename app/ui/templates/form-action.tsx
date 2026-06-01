







import React, { FormEvent, ReactNode } from 'react';
import { Container } from '@/app/ui/atoms/container';
import { Input } from '@/app/ui/atoms/input';
import { Textarea } from '@/app/ui/atoms/textarea';

export interface FormFieldConfig {
    name: string;
    label: string;
    type: 'text' | 'number' | 'email' | 'password' | 'textarea' | 'select' | 'date';
    placeholder?: string;
    required?: boolean;
    options?: { value: string; label: string }[]; // Khusus untuk select
    min?: string | number;
    rows?: number; // Khusus untuk textarea
}

export interface FormActionTemplateProps {
    title: string;
    description?: string;
    fields?: FormFieldConfig[];
    children?: ReactNode;
    actions?: ReactNode;
    onSubmit?: (e: FormEvent<HTMLFormElement>) => void;
    className?: string;
}

export const FormActionTemplate = ({ 
    title,
    description,
    fields,
    children, 
    actions,
    onSubmit,
    className = ''
}: FormActionTemplateProps) => {
    return (
        <Container className={`flex flex-col min-h-screen bg-gray-50 pb-24 ${className}`}>
            <div className="px-4 py-6 bg-white shadow-sm mb-4">
                <h1 className="text-xl font-bold text-gray-900">{title}</h1>
                {description && <p className="text-sm text-gray-500 mt-1">{description}</p>}
            </div>
            
            <form onSubmit={onSubmit} className="flex-grow px-4 flex flex-col gap-4">
                {fields && fields.map((field) => (
                    <div key={field.name}>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            {field.label} {field.required && <span className="text-red-500">*</span>}
                        </label>
                        {field.type === 'textarea' ? (
                            <Textarea 
                                name={field.name}
                                placeholder={field.placeholder} 
                                required={field.required}
                                rows={field.rows || 3}
                            />
                        ) : field.type === 'select' ? (
                            <select 
                                name={field.name}
                                required={field.required}
                                className="w-full border border-gray-300 rounded-md p-2 focus:ring-primary focus:border-primary bg-white text-sm"
                            >
                                <option value="">Pilih {field.label}</option>
                                {field.options?.map(opt => (
                                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                                ))}
                            </select>
                        ) : (
                            <Input 
                                type={field.type}
                                name={field.name}
                                placeholder={field.placeholder}
                                required={field.required}
                                min={field.min}
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
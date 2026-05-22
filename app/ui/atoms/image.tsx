import Image, { ImageProps as NextImageProps } from "next/image";
import { cn } from "@/app/lib/utils";

export interface ImgProps extends NextImageProps {
    rounded?: "none" | "sm" | "md" | "lg" | "full";
    aspect?: "square" | "video" | "auto" | "portrait";
    shadow?: boolean;
    w?: number ;
    h?: number ;
}

/**
 * Image (Img)
 * 
 * Komponen Image kustom yang membungkus Next.js Image untuk memberikan 
 * kemudahan dalam pengaturan aspek rasio, radius, dan bayangan.
 * 
 * @param {"none" | "sm" | "md" | "lg" | "full"} rounded - Radius sudut gambar
 * @param {"square" | "video" | "auto" | "portrait"} aspect - Rasio aspek gambar
 * @param {boolean} shadow - Menambahkan efek shadow lembut
 * @param {number} w - Lebar gambar dalam pixel
 * @param {number} h - Tinggi gambar dalam pixel
 * @param {ImgProps} props - Properti komponen
 * @returns {JSX.Element} Komponen Image yang telah diformat
 */
export const Img: React.FC<ImgProps> = ({ 
    src, 
    alt, 
    w = 100,
    h = 100,
    rounded = "md", 
    aspect = "auto",
    shadow = false,
    className, 
    ...props 
}) => {
    const rounds = {
        none: "rounded-none",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        full: "rounded-full",
    };

    const aspects = {
        square: "aspect-square object-cover",
        video: "aspect-video object-cover",
        auto: "aspect-auto",
        portrait: "aspect-[3/4] object-cover",
    };

    return (
        <Image
            src={src}
            alt={alt}
            width={w}
            height={h}
            className={cn(
                "max-w-full h-auto transition-transform duration-300",
                rounds[rounded],
                aspects[aspect],
                shadow && "shadow-md",
                className
            )}
            {...props}
        />
    );
};
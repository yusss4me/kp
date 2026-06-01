import { Img } from "../atoms/image"

export interface UsersAvatarProps {
    listImage: {
        id: string,
        src: string,
        alt: string
    }[];
}

export const UsersAvatar = ({ listImage }: UsersAvatarProps) => {

    return (
        <div className="flex -space-x-3">
            {listImage.map((i) => (
                <div key={i.id} className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-white bg-gray-200 overflow-hidden shadow-sm">
                    <Img
                        src={i.src}
                        alt={i.alt}
                        w={40}
                        h={40}
                        rounded="full"
                        aspect="square"
                        className="w-full h-full"
                    />
                </div>
            ))}
        </div>
    )
}


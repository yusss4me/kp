import { Txt } from "../atoms/text";

export interface UserContributionProps {
    count: number;
}

export const UserContribution = ({ count }: UserContributionProps) => {
    return (
        <Txt variant="small" className="text-lightdark-neutral text-xs md:text-sm">
            Bergabung bersama <span className="text-lightdark-tertiary font-bold">{count}+</span> donatur aktif
        </Txt>
    )
}
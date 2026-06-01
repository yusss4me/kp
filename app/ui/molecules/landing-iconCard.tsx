
import React from "react";
import { Container } from "../atoms/container";
import { Txt } from "../atoms/text";
import { Icn } from "../atoms/icon";
import { Btn } from "../atoms/button";
import { LucideIcon } from "lucide-react";

export interface StatusCardProps {
    statusIcon: LucideIcon;
    title: string;
    description: string;
};



export const Statuscard = ({
    statusIcon, 
    title, 
    description
    }: StatusCardProps ) => {

    return (
        <Container variant="light" className="space-y-3 p-6 bg-current/5 rounded-[32px] border border-white/5">
            <Container className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center">
                <Icn icon={statusIcon} size={24} color="current" className="text-red-primary" />
            </Container>
            <Txt variant="h6" weight="bold" color="light">{title}</Txt>
            <Txt variant="small" className="text-white/40">{description}</Txt>
        </Container>
    );
}
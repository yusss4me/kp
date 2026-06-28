import { Container } from "../atoms/container";
import { Btn } from "../atoms/button";
import { Badge } from "../atoms/badge";
import { Txt } from "../atoms/text";
import {Calendar, Clock} from "lucide-react"
import { Lnk } from "../atoms/link";

interface VisitingCardProps {
    id: number | string;
    visitor: string;
    date: string;
    time: string;
    type: string;
    status: string;
    className?: string;
}


export const VisitingCard= ({
    id,
    visitor,
    date,
    time,
    type,
    status,
    className,
    }:VisitingCardProps)=>{
    return (
        <Container
            key={id}
            className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm flex flex-col gap-6 hover:shadow-lg transition-all duration-300"
        >
            <Container className="flex justify-between items-start">
              <Container className="flex flex-col gap-1">
                <Txt weight="bold" className="text-lg text-gray-900">
                  {visitor}
                </Txt>
                <Badge variant="soft" color="primary">
                  {type}
                </Badge>
              </Container>
              <Badge
                variant="solid"
                color={
                  status === "Dikonfirmasi" ? "success" : "warning"
                }
              >
                {status}
              </Badge>
            </Container>

            <Container className="flex flex-col gap-3">
              <Container className="flex items-center gap-3 text-gray-500">
                <Container className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center">
                  <Calendar size={16} className="text-red-primary" />
                </Container>
                <Txt variant="small" weight="medium">
                  {date}
                </Txt>
              </Container>
              <Container className="flex items-center gap-3 text-gray-500">
                <Container className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center">
                  <Clock size={16} className="text-red-primary" />
                </Container>
                <Txt variant="small" weight="medium">
                  {time} WIB
                </Txt>
              </Container>
            </Container>

            <Container className="pt-2 flex flex-col">
              <Lnk href={`/admin/kunjungan/${id}/detail`} className="flex-1">
              
              <Btn 
                variant="transparent" 
                textColor="dark"
                shape="rounded"
                size="sm"
                className="w-full py-3 bg-gray-50 hover:bg-red-primary/5 text-gray-400 hover:text-red-primary text-xs font-bold rounded-2xl border-none transition-all"
              >
                Detail Kunjungan
              </Btn>
              </Lnk>
            </Container>
          </Container>
    )
}



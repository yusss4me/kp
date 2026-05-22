import { Container } from "../atoms/container";
import { Txt } from "../atoms/text";
import { Btn } from "../atoms/button";

const Bar: React.FC<{ height: string; active?: boolean }> = ({ height, active }) => (
  <Container className="flex flex-col items-center gap-2">
    <Container className="w-8 bg-gray-100 rounded-lg relative h-32 overflow-hidden">
      <Container 
        className={`absolute bottom-0 w-full rounded-t-lg transition-all ${active ? 'bg-[#96E072]' : 'bg-gray-300'}`}
        style={{ height }}
      />
    </Container>
  </Container>
);

export interface ActivityChartProps {
  className?: string;
}

/**
 * ActivityChart
 * 
 * Komponen grafik batang untuk memvisualisasikan aktivitas donasi bulanan.
 * Menampilkan ringkasan total donasi dan grafik perbandingan antar bulan.
 * 
 * @param {string} className - Class tambahan Tailwind CSS
 * @param {ActivityChartProps} props - Properti komponen
 * @returns {JSX.Element} Komponen ActivityChart
 */
export const ActivityChart: React.FC<ActivityChartProps> = () => {
  return (
    <Container className="mt-8 px-4 flex flex-col">
      <Container className="flex justify-between items-end mb-6">
        <Container className="flex flex-col">
          <Txt variant="caption" weight="bold" className="text-gray-400 mb-1 uppercase">Your Activity</Txt>
          <Txt variant="h4" weight="bold" className="text-gray-900">$2500 Donated</Txt>
        </Container>
        <Btn 
          variant="transparent" 
          textColor="dark" 
          border="border"
          size="sm" 
          shape="circle" 
          className="bg-gray-50 flex items-center gap-1 font-bold text-xs"
        >
          Month <Txt as="span" className="text-[10px]">▼</Txt>
        </Btn>
      </Container>
      <Container className="flex justify-between items-end h-40">
        <Bar height="40%" />
        <Bar height="85%" />
        <Bar height="60%" />
        <Bar height="90%" />
        <Bar height="30%" />
        <Bar height="75%" active />
      </Container>
      <Container className="flex justify-between text-[10px] font-bold text-gray-400 mt-3 px-1 uppercase">
        <Txt as="span">Jun</Txt>
        <Txt as="span">Feb</Txt>
        <Txt as="span">Mar</Txt>
        <Txt as="span">Apr</Txt>
        <Txt as="span">May</Txt>
        <Txt as="span" className="text-green-500">Jun</Txt>
      </Container>
    </Container>
  );
};
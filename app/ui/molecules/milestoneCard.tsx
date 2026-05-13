interface MilestoneProps {
  title: string;
  range: string;
  image: string;
}

export const MilestoneCard: React.FC<MilestoneProps> = ({ title, range, image }) => (
  <div className="bg-gray-50 p-5 rounded-3xl flex flex-col items-center text-center w-full">
    <img src={image} className="w-16 h-16 mb-3 object-contain" alt={title} />
    <h4 className="font-bold text-gray-900 text-sm leading-tight">{title}</h4>
    <p className="text-[10px] text-gray-400 mt-1">{range}</p>
  </div>
);
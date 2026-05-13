import { Container } from "../atoms/container";
import { ListItem } from "../molecules/ListItem";
import { Label } from "../molecules/label";

interface items {
  label: string;
  icon: React.ReactNode;
  href?: string;
}

interface Props {
  title: string;
  listItems: items[];
}

export const MenuListItems = ({title, listItems}: Props) => {
  return (
    <Container className="flex flex-col gap-3">
        <Label text={title} className="px-1 text-gray-400 font-semibold uppercase text-[10px] tracking-widest" />
        <Container className="flex flex-col overflow-hidden" variant="white" padding="none" radius="xl">
            {listItems.map((item, index) => (
                <ListItem 
                    key={index}
                    icon={item.icon} 
                    label={item.label} 
                    href={item.href}
                />
            ))}
        </Container>
    </Container>
  );
};
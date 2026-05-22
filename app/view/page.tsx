import { Statuscard } from "../ui/molecules/statusCard";
import { SearchGroup } from "../ui/molecules/search-group";
import { Home } from "lucide-react";


export default function Page() {
  return (
    <div className="flex items-center justify-center h-screen gap-4 p-10">
      <div className="flex bg-black flex-col item-center justify-center gap-4 p-5">
        <SearchGroup placeholder="Cari..." />
        <Statuscard statusIcon={Home} title="Title" description="Description" />
      </div>
    </div>
  );
}

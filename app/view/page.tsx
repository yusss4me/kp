import { Txt } from "@/app/ui/atoms/text";
import { Container } from "@/app/ui/atoms/container";
import { Btn } from "@/app/ui/atoms/button";
import { Icn } from "@/app/ui/atoms/Icn";
import { Lnk } from "@/app/ui/atoms/link";
import { Atom, FlaskConical, LayoutGrid, Layers, Eye } from "lucide-react";

const wireframePages = [
  {
    title: "Atoms",
    description: "Basic building blocks: Txt, Btn, Input, Badge, Avatar, Icn, Container, Img, Lnk, ProgressBar, Select, Skeleton, Textarea, Table, and more.",
    href: "/wireframe/atoms",
    icon: Atom,
    color: "bg-info/10 text-info",
  },
  {
    title: "Molecules",
    description: "Combinations of atoms: DonationCard, StatCard, OrphanCard, ProgramCard, VisitingCard, Toast, ConfirmationModal, SearchGroup, PasswordField, and more.",
    href: "/wireframe/molecules",
    icon: FlaskConical,
    color: "bg-success/10 text-success",
  },
  {
    title: "Organisms",
    description: "Complex UI sections: DashboardHeader, MenuListItems, ProfileCard, ImpactStats, InventoryTable, TransactionTable, BookingList, CategoryList, CTASection, and more.",
    href: "/wireframe/organisms",
    icon: LayoutGrid,
    color: "bg-warning/10 text-warning",
  },
  {
    title: "Templates",
    description: "Full-page layouts: LandingTemplate, ExploreTemplate, DonationDetailTemplate, ProfileTemplate, QuickAccessTemplate, and more.",
    href: "/wireframe/templates",
    icon: Layers,
    color: "bg-red-primary/10 text-red-primary",
  },
];

const previewCard = {
  title: "Component Preview",
  description: "Isolated single-component viewer. Browse all components by Atomic Design level and preview each one individually.",
  href: "/wireframe/preview",
  icon: Eye,
  color: "bg-lightdark-tertiary text-white",
};

export default function WireframeIndexPage() {
  return (
    <div className="min-h-screen bg-neutral-200 p-6 md:p-10">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Header */}
        <header className="space-y-2">
          <Txt variant="h1" weight="bold" className="text-gray-900">
            YAMUTI Wireframe
          </Txt>
          <Txt variant="body" color="grey">
            Interactive code-based wireframe for all Atomic Design UI components. Select a level below to preview components with placeholder data.
          </Txt>
        </header>

        {/* Cards Grid — Hierarchy */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wireframePages.map((page) => (
            <Lnk key={page.href} href={page.href} className="block">
              <Container
                variant="light"
                radius="2xl"
                shadow="md"
                padding="lg"
                className="h-full hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100"
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${page.color}`}>
                  <Icn icon={page.icon} size={24} color="current" />
                </div>
                <Txt variant="h4" weight="bold" className="text-gray-900 mb-2">
                  {page.title}
                </Txt>
                <Txt variant="small" color="grey" className="mb-6 line-clamp-3">
                  {page.description}
                </Txt>
                <Btn variant="light" textColor="red" size="sm" shape="rounded" className="w-full">
                  View Components
                </Btn>
              </Container>
            </Lnk>
          ))}
        </div>

        {/* Single Component Preview Card */}
        <div>
          <Txt variant="h5" weight="bold" className="text-gray-700 mb-4">Isolated Preview</Txt>
          <Lnk href={previewCard.href} className="block">
            <Container
              variant="light"
              radius="2xl"
              shadow="md"
              padding="lg"
              className="hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 flex items-center gap-6 max-w-xl"
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${previewCard.color}`}>
                <Icn icon={previewCard.icon} size={28} color="current" />
              </div>
              <div className="flex-1">
                <Txt variant="h5" weight="bold" className="text-gray-900 mb-1">
                  {previewCard.title}
                </Txt>
                <Txt variant="small" color="grey" className="line-clamp-2">
                  {previewCard.description}
                </Txt>
              </div>
              <Btn variant="red" size="sm" shape="rounded" className="shrink-0">
                Open
              </Btn>
            </Container>
          </Lnk>
        </div>
      </div>
    </div>
  );
}

import { Txt } from "@/app/ui/atoms/text";
import { Btn, BtnSkeleton } from "@/app/ui/atoms/button";
import { Input, InputSkeleton } from "@/app/ui/atoms/input";
import { Badge } from "@/app/ui/atoms/badge";
import { Avatar } from "@/app/ui/atoms/avatar";
import { Icn } from "@/app/ui/atoms/Icn";
import { Container } from "@/app/ui/atoms/container";
import { Img } from "@/app/ui/atoms/image";
import { Lnk } from "@/app/ui/atoms/link";
import { ProgressBar } from "@/app/ui/atoms/progressBar";
import { Select } from "@/app/ui/atoms/select";
import { Skeleton } from "@/app/ui/atoms/skeleton";
import { Textarea } from "@/app/ui/atoms/textarea";
import { ActivityBadge } from "@/app/ui/atoms/activityBadge";
import { CalendarDay } from "@/app/ui/atoms/calenderDay";
import {
  Table,
  THead,
  TBody,
  TR,
  TH,
  TD,
} from "@/app/ui/atoms/table";
import {
  Heart,
  Search,
  User,
  Settings,
  Bell,
  Home,
  Star,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Info,
  Mail,
  Lock,
  Calendar,
} from "lucide-react";

/* ────────────────────────────────────────────
 * Helper: Section Wrapper
 * ──────────────────────────────────────────── */
function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-4">
      <Txt variant="h4" weight="bold" className="text-gray-800 border-b border-gray-200 pb-2">
        {title}
      </Txt>
      <div className="space-y-6">{children}</div>
    </section>
  );
}

function SubSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-3">
      <Txt variant="h6" weight="semibold" color="grey" className="uppercase tracking-wider text-xs">
        {title}
      </Txt>
      <div className="flex flex-wrap items-start gap-3">{children}</div>
    </div>
  );
}

/* ────────────────────────────────────────────
 * Page
 * ──────────────────────────────────────────── */
export default function AtomsWireframePage() {
  return (
    <div className="min-h-screen bg-neutral-200 p-6 md:p-10 space-y-12">
      {/* Page Header */}
      <header className="space-y-2">
        <Txt variant="h2" weight="bold" className="text-gray-900">
          Atoms Wireframe
        </Txt>
        <Txt variant="body" color="grey">
          Preview of all atomic-level UI components with placeholder data.
        </Txt>
      </header>

      {/* ── Txt (Typography) ── */}
      <Section title="Txt (Typography)">
        <SubSection title="Variants">
          <Txt variant="h1">Heading 1</Txt>
          <Txt variant="h2">Heading 2</Txt>
          <Txt variant="h3">Heading 3</Txt>
          <Txt variant="h4">Heading 4</Txt>
          <Txt variant="h5">Heading 5</Txt>
          <Txt variant="h6">Heading 6</Txt>
          <Txt variant="body">Body text – the quick brown fox jumps over the lazy dog.</Txt>
          <Txt variant="small">Small text – caption-like content.</Txt>
          <Txt variant="caption">Caption text – tiny helper text.</Txt>
        </SubSection>
        <SubSection title="Colors">
          <Txt color="default">Default</Txt>
          <Txt color="light">Light</Txt>
          <Txt color="dark">Dark</Txt>
          <Txt color="grey">Grey</Txt>
          <Txt color="red">Red</Txt>
          <Txt color="danger">Danger</Txt>
          <Txt color="success">Success</Txt>
          <Txt color="warning">Warning</Txt>
          <Txt color="info">Info</Txt>
        </SubSection>
        <SubSection title="Weights">
          <Txt weight="light">Light</Txt>
          <Txt weight="normal">Normal</Txt>
          <Txt weight="medium">Medium</Txt>
          <Txt weight="semibold">Semibold</Txt>
          <Txt weight="bold">Bold</Txt>
        </SubSection>
        <SubSection title="Alignments">
          <div className="w-full space-y-2">
            <Txt align="left">Left aligned</Txt>
            <Txt align="center">Center aligned</Txt>
            <Txt align="right">Right aligned</Txt>
            <Txt align="justify">
              Justified – Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua.
            </Txt>
          </div>
        </SubSection>
        <SubSection title="Decorations">
          <Txt decoration="italic">Italic</Txt>
          <Txt decoration="underline">Underline</Txt>
        </SubSection>
      </Section>

      {/* ── Btn (Button) ── */}
      <Section title="Btn (Button)">
        <SubSection title="Variants">
          <Btn variant="red">Red</Btn>
          <Btn variant="light">Light</Btn>
          <Btn variant="transparent" border="border" borderColor="dark">Transparent</Btn>
        </SubSection>
        <SubSection title="Sizes">
          <Btn size="sm">Small</Btn>
          <Btn size="md">Medium</Btn>
          <Btn size="lg">Large</Btn>
        </SubSection>
        <SubSection title="Shapes">
          <Btn shape="circle">Circle</Btn>
          <Btn shape="rounded">Rounded</Btn>
          <Btn shape="square">Square</Btn>
        </SubSection>
        <SubSection title="Text Colors">
          <Btn variant="red" textColor="light">Text Light</Btn>
          <Btn variant="light" textColor="dark">Text Dark</Btn>
          <Btn variant="transparent" textColor="red">Text Red</Btn>
          <Btn variant="transparent" textColor="darkred">Text DarkRed</Btn>
        </SubSection>
        <SubSection title="With Borders">
          <Btn variant="transparent" border="border" borderColor="red">Border Red</Btn>
          <Btn variant="transparent" border="border" borderColor="dark">Border Dark</Btn>
          <Btn variant="transparent" border="border" borderColor="light">Border Light</Btn>
        </SubSection>
        <SubSection title="States">
          <Btn isLoading>Loading</Btn>
          <Btn disabled>Disabled</Btn>
        </SubSection>
        <SubSection title="Skeleton">
          <BtnSkeleton size="sm" />
          <BtnSkeleton size="md" />
          <BtnSkeleton size="lg" shape="rounded" />
        </SubSection>
      </Section>

      {/* ── Input ── */}
      <Section title="Input">
        <SubSection title="States">
          <div className="w-full max-w-md space-y-4">
            <Input placeholder="Default input" />
            <Input label="With Label" placeholder="Enter text..." />
            <Input label="With Error" placeholder="Invalid input" error="This field is required" />
            <Input label="With Suffix Icon" placeholder="Search..." suffix={<Search size={20} />} />
            <Input label="Loading" placeholder="Loading..." isLoading />
            <Input label="Disabled" placeholder="Disabled" disabled />
          </div>
        </SubSection>
        <SubSection title="Skeleton">
          <div className="w-full max-w-md space-y-4">
            <InputSkeleton />
            <InputSkeleton hasLabel={false} />
          </div>
        </SubSection>
      </Section>

      {/* ── Textarea ── */}
      <Section title="Textarea">
        <div className="w-full max-w-md space-y-4">
          <Textarea placeholder="Default textarea" />
          <Textarea label="With Label" placeholder="Enter description..." />
          <Textarea label="With Error" placeholder="Invalid" error="Description is required" />
          <Textarea label="Loading" placeholder="Loading..." isLoading />
        </div>
      </Section>

      {/* ── Select ── */}
      <Section title="Select">
        <div className="w-full max-w-md space-y-4">
          <Select
            label="Category"
            options={[
              { value: "pendidikan", label: "Pendidikan" },
              { value: "kemanusiaan", label: "Kemanusiaan" },
              { value: "pemberdayaan", label: "Pemberdayaan" },
            ]}
          />
          <Select label="With Error" options={[{ value: "a", label: "Option A" }]} error="Required" />
          <Select label="Disabled" options={[{ value: "a", label: "Option A" }]} disabled />
        </div>
      </Section>

      {/* ── Badge ── */}
      <Section title="Badge">
        <SubSection title="Solid">
          <Badge variant="solid" color="primary">Primary</Badge>
          <Badge variant="solid" color="success">Success</Badge>
          <Badge variant="solid" color="warning">Warning</Badge>
          <Badge variant="solid" color="danger">Danger</Badge>
          <Badge variant="solid" color="info">Info</Badge>
          <Badge variant="solid" color="secondary">Secondary</Badge>
        </SubSection>
        <SubSection title="Soft">
          <Badge variant="soft" color="primary">Primary</Badge>
          <Badge variant="soft" color="success">Success</Badge>
          <Badge variant="soft" color="warning">Warning</Badge>
          <Badge variant="soft" color="danger">Danger</Badge>
          <Badge variant="soft" color="info">Info</Badge>
          <Badge variant="soft" color="secondary">Secondary</Badge>
        </SubSection>
        <SubSection title="Outline">
          <Badge variant="outline" color="primary">Primary</Badge>
          <Badge variant="outline" color="success">Success</Badge>
          <Badge variant="outline" color="warning">Warning</Badge>
          <Badge variant="outline" color="danger">Danger</Badge>
          <Badge variant="outline" color="info">Info</Badge>
          <Badge variant="outline" color="secondary">Secondary</Badge>
        </SubSection>
        <SubSection title="With Icon">
          <Badge variant="soft" color="success" icon={CheckCircle2}>Verified</Badge>
          <Badge variant="soft" color="danger" icon={XCircle}>Rejected</Badge>
          <Badge variant="soft" color="warning" icon={AlertTriangle}>Pending</Badge>
          <Badge variant="soft" color="info" icon={Info}>Info</Badge>
        </SubSection>
      </Section>

      {/* ── Avatar ── */}
      <Section title="Avatar">
        <SubSection title="Sizes">
          <Avatar src="/logo/icon.png" size="sm" alt="SM" />
          <Avatar src="/logo/icon.png" size="md" alt="MD" />
          <Avatar src="/logo/icon.png" size="lg" alt="LG" />
          <Avatar src="/logo/icon.png" size={100} alt="Custom 100px" />
        </SubSection>
      </Section>

      {/* ── Icn (Icon) ── */}
      <Section title="Icn (Icon)">
        <SubSection title="Colors">
          <Icn icon={Heart} color="default" size={24} />
          <Icn icon={Heart} color="red" size={24} />
          <Icn icon={Heart} color="light" size={24} />
          <Icn icon={Heart} color="danger" size={24} />
          <Icn icon={Heart} color="success" size={24} />
          <Icn icon={Heart} color="warning" size={24} />
          <Icn icon={Heart} color="info" size={24} />
          <Icn icon={Heart} color="dark" size={24} />
        </SubSection>
        <SubSection title="Sizes">
          <Icn icon={Star} size={14} />
          <Icn icon={Star} size={20} />
          <Icn icon={Star} size={28} />
          <Icn icon={Star} size={36} />
          <Icn icon={Star} size={48} />
        </SubSection>
      </Section>

      {/* ── Container ── */}
      <Section title="Container">
        <SubSection title="Variants">
          <Container variant="light" padding="md" radius="lg" className="w-40 text-center">Light</Container>
          <Container variant="red" padding="md" radius="lg" className="w-40 text-center text-white">Red</Container>
          <Container variant="dark" padding="md" radius="lg" className="w-40 text-center text-white">Dark</Container>
        </SubSection>
        <SubSection title="Shadows">
          <Container variant="light" padding="md" radius="lg" shadow="sm" className="w-32 text-center">SM</Container>
          <Container variant="light" padding="md" radius="lg" shadow="md" className="w-32 text-center">MD</Container>
          <Container variant="light" padding="md" radius="lg" shadow="lg" className="w-32 text-center">LG</Container>
          <Container variant="light" padding="md" radius="lg" shadow="xl" className="w-32 text-center">XL</Container>
        </SubSection>
        <SubSection title="Radii">
          <Container variant="light" padding="md" radius="none" className="w-24 text-center">None</Container>
          <Container variant="light" padding="md" radius="sm" className="w-24 text-center">SM</Container>
          <Container variant="light" padding="md" radius="md" className="w-24 text-center">MD</Container>
          <Container variant="light" padding="md" radius="lg" className="w-24 text-center">LG</Container>
          <Container variant="light" padding="md" radius="xl" className="w-24 text-center">XL</Container>
          <Container variant="light" padding="md" radius="2xl" className="w-24 text-center">2XL</Container>
          <Container variant="light" padding="md" radius="full" className="w-24 text-center">Full</Container>
        </SubSection>
        <SubSection title="Borders">
          <Container variant="light" padding="md" radius="lg" border="default" bordercolor="dark" className="w-32 text-center">Default</Container>
          <Container variant="light" padding="md" radius="lg" border="sm" bordercolor="red" className="w-32 text-center">Red</Container>
          <Container variant="light" padding="md" radius="lg" border="sm" bordercolor="dark" className="w-32 text-center">Dark</Container>
        </SubSection>
      </Section>

      {/* ── Img (Image) ── */}
      <Section title="Img (Image)">
        <SubSection title="Rounded">
          <Img src="/logo/icon.png" alt="none" rounded="none" w={80} h={80} aspect="square" />
          <Img src="/logo/icon.png" alt="sm" rounded="sm" w={80} h={80} aspect="square" />
          <Img src="/logo/icon.png" alt="md" rounded="md" w={80} h={80} aspect="square" />
          <Img src="/logo/icon.png" alt="lg" rounded="lg" w={80} h={80} aspect="square" />
          <Img src="/logo/icon.png" alt="full" rounded="full" w={80} h={80} aspect="square" />
        </SubSection>
        <SubSection title="Aspects">
          <Img src="/images/slider-1.jpg" alt="square" aspect="square" w={160} h={160} rounded="lg" />
          <Img src="/images/slider-1.jpg" alt="video" aspect="video" w={200} h={120} rounded="lg" />
          <Img src="/images/slider-1.jpg" alt="portrait" aspect="portrait" w={120} h={160} rounded="lg" />
        </SubSection>
        <SubSection title="With Shadow">
          <Img src="/images/slider-1.jpg" alt="shadow" aspect="square" w={120} h={120} rounded="lg" shadow />
        </SubSection>
      </Section>

      {/* ── Lnk (Link) ── */}
      <Section title="Lnk (Link)">
        <SubSection title="Variants">
          <Lnk href="#" variant="default">Default</Lnk>
          <Lnk href="#" variant="primary">Primary</Lnk>
          <Lnk href="#" variant="secondary">Secondary</Lnk>
          <Lnk href="#" variant="muted">Muted</Lnk>
          <Lnk href="#" variant="underline">Underline</Lnk>
        </SubSection>
        <SubSection title="Colors">
          <Lnk href="#" color="red">Red</Lnk>
          <Lnk href="#" color="dark">Dark</Lnk>
          <Lnk href="#" color="light">Light</Lnk>
        </SubSection>
      </Section>

      {/* ── ProgressBar ── */}
      <Section title="ProgressBar">
        <div className="w-full max-w-md space-y-4">
          <ProgressBar current={25} target={100} />
          <ProgressBar current={75} target={100} />
          <ProgressBar current={100} target={100} />
        </div>
      </Section>

      {/* ── ActivityBadge ── */}
      <Section title="ActivityBadge">
        <SubSection title="Types">
          <Container className="flex items-center gap-2">
            <ActivityBadge type="pemberdayaan" />
            <Txt variant="small">Pemberdayaan</Txt>
          </Container>
          <Container className="flex items-center gap-2">
            <ActivityBadge type="pendidikan" />
            <Txt variant="small">Pendidikan</Txt>
          </Container>
          <Container className="flex items-center gap-2">
            <ActivityBadge type="kemanusiaan" />
            <Txt variant="small">Kemanusiaan</Txt>
          </Container>
        </SubSection>
      </Section>

      {/* ── CalendarDay ── */}
      <Section title="CalendarDay">
        <SubSection title="States">
          <CalendarDay day={1} />
          <CalendarDay day={15} isCurrentMonth />
          <CalendarDay day={20} isSelected />
          <CalendarDay day={28} isCurrentMonth={false} />
        </SubSection>
      </Section>

      {/* ── Skeleton ── */}
      <Section title="Skeleton">
        <SubSection title="Variants">
          <Skeleton variant="circle" width={48} height={48} />
          <Skeleton variant="rectangle" width={200} height={24} />
          <Skeleton variant="rounded" width={300} height={100} />
        </SubSection>
      </Section>

      {/* ── Table ── */}
      <Section title="Table">
        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <Table>
            <THead>
              <TR>
                <TH>Name</TH>
                <TH>Category</TH>
                <TH>Amount</TH>
                <TH>Status</TH>
              </TR>
            </THead>
            <TBody>
              <TR>
                <TD>Donasi Pendidikan</TD>
                <TD>Pendidikan</TD>
                <TD>Rp 500.000</TD>
                <TD>
                  <Badge variant="solid" color="success">Success</Badge>
                </TD>
              </TR>
              <TR>
                <TD>Donasi Kemanusiaan</TD>
                <TD>Kemanusiaan</TD>
                <TD>Rp 250.000</TD>
                <TD>
                  <Badge variant="solid" color="warning">Pending</Badge>
                </TD>
              </TR>
              <TR>
                <TD>Donasi Pemberdayaan</TD>
                <TD>Pemberdayaan</TD>
                <TD>Rp 1.000.000</TD>
                <TD>
                  <Badge variant="solid" color="danger">Failed</Badge>
                </TD>
              </TR>
            </TBody>
          </Table>
        </div>
      </Section>
    </div>
  );
}

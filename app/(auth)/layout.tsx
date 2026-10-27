import { LockFill, TagFill } from "@/components/icons";
import { Label } from "@/components/ui";
import ServiceCard from "@/components/ui/ServiceCard";
import { Zap } from "lucide-react";

const services = [
  {
    title: "15-Min Express",
    description: "Spool direct to high-speed laser duplex machines.",
    icon: Zap,
  },
  {
    title: "From ₹1.20/Page",
    description: "Transparent rates, spiral binding & color pricing.",
    icon: Zap,
  },
  {
    title: "Zero-Leak Purge",
    description: "Uploaded documents auto- deleted 30 mins after print.",
    icon: Zap,
  },
];

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="max-h-screen overflow-hidden flex w-full flex-col items-center justify-center gap-8 p-5 lg:flex-row lg:gap-4 lg:py-10">
            <div className="w-full max-w-2xl space-y-5 lg:flex-1">
                <Label dot dotColor='bg-success'>
                    Tamil Nadu&apos;s #1 Digital Printing Network
                </Label>
                <h2 className="font-heading text-4xl leading-tight font-extrabold sm:text-5xl lg:text-[64px] lg:leading-18">
                    Scan. Upload. Print.
                    <span className="block text-primary">
                        Zero Queue Counter Pickup.
                    </span>
                </h2>
                <p className="text-lg text-secondary max-w-2xl  ">
                    Upload engineering theses, lecture notes, lab manuals, or documents in seconds. Compare nearby Chennai & Tamil Nadu print shops, lock in lowest student rates, and pick up ready copies without waiting.
                </p>
                <aside className="w-full grid grid-cols-1 items-stretch gap-4 mt-5 sm:grid-cols-2 lg:grid-cols-3">
                    {services.map(({ title, description, icon }) => (
                        <ServiceCard
                            key={title}
                            title={title}
                            description={description}
                            icon={icon}
                        />
                    ))}
                </aside>
            </div>
            <main className="w-full sm:w-2/5">
              {children}
            </main>
        </section>
  );
}

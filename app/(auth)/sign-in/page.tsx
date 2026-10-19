import SignIn from '@/components/forms/SignIn'
import { Label } from '@/components/ui'
import ServiceCard from '@/components/ui/ServiceCard';
import { Lock, Tag, Zap } from 'lucide-react';
import React from 'react'
const services = [
  {
    title: "15-Min Express",
    description: "Spool direct to high-speed laser duplex machines.",
    icon: Zap,
  },
  {
    title: "From ₹1.20/Page",
    description: "Transparent rates, spiral binding & color pricing.",
    icon: Tag,
  },
  {
    title: "Zero-Leak Purge",
    description: "Uploaded documents auto- deleted 30 mins after print.",
    icon: Lock,
  },
];
const page = () => {
  return (
    <>
    <section className="w-full h-auto max-h-screen flex items-center justify-center gap-4 p-5">
        <main className="flex-1 space-y-5">
            <Label dot dotColor='bg-success'>
                Tamil Nadu's #1 Digital Printing Network
            </Label>
            <h2 className="font-heading text-[64px] leading-18 font-extrabold">
                Scan. Upload. Print.
                <span className="block text-primary">
                    Zero Queue Counter Pickup.
                </span>
            </h2>
            <p className="text-lg text-secondary max-w-2xl  ">
                Upload engineering theses, lecture notes, lab manuals, or documents in seconds. Compare nearby Chennai & Tamil Nadu print shops, lock in lowest student rates, and pick up ready copies without waiting.
            </p>
            <aside className="w-full grid grid-cols-3 items-center justify-center gap-5 mt-5">
                {services.map(({ title, description, icon }) => (
                    <ServiceCard
                        key={title}
                        title={title}
                        description={description}
                        icon={icon}
                    />
                ))}
            </aside>
        </main>
        <SignIn/>
    </section>
    </>
  )
}

export default page
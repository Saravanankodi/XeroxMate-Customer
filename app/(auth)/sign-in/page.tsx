import SignIn from '@/components/forms/SignIn'
import { Label } from '@/components/ui'
import React from 'react'

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
        </main>
        <SignIn/>
    </section>
    </>
  )
}

export default page

"use client";

import { useState } from "react";
import Footer from "@/components/layout/Footer";

import {
  ProfileHeader,
  PersonalDetails,
  SavedAddresses,
  initialAddresses,
} from "@/components/profile";

import type { SavedAddress } from "@/components/profile";
import { Header } from "@/components/layout/Header";
import PayoutMethod from "@/components/forms/PayoutMethod";
import AddAddressForm from "@/components/forms/AddAddressForm";

export default function ProfilePage() {
  const [addresses, setAddresses] =
    useState<SavedAddress[]>(initialAddresses);

  const [editingAddress, setEditingAddress] =
    useState<SavedAddress | null>(null);

  function startAddAddress() {
    setEditingAddress(null);

    document.getElementById("add-address")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  function startEditAddress(address: SavedAddress) {
    setEditingAddress(address);

    window.setTimeout(() => {
      document.getElementById("add-address")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 0);
  }

  function saveAddress(address: SavedAddress) {
    setAddresses((current) => {
      const exists = current.some((item) => item.id === address.id);

      let next = exists
        ? current.map((item) =>
            item.id === address.id ? address : item
          )
        : [...current, address];

      if (address.isDefault) {
        next = next.map((item) => ({
          ...item,
          isDefault: item.id === address.id,
        }));
      } else if (!next.some((item) => item.isDefault)) {
        next = next.map((item, index) => ({
          ...item,
          isDefault: index === 0,
        }));
      }

      return next;
    });

    setEditingAddress(null);
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#f8f8fd]">
      <Header />

      <main className="mx-auto w-full max-w-330 flex-1 px-5 pb-6 pt-3 lg:px-8">
        <div className="space-y-5">
          <ProfileHeader />

          <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-[0.82fr_1.18fr]">
            <div className="min-w-0 space-y-5">
              <PersonalDetails />
              <PayoutMethod />
            </div>

            <div className="min-w-0 space-y-5">
              <SavedAddresses
                addresses={addresses}
                onAddressesChange={setAddresses}
                onAddAddress={startAddAddress}
                onEditAddress={startEditAddress}
              />

              <AddAddressForm
                addresses={addresses}
                editingAddress={editingAddress}
                onSave={saveAddress}
                onCancelEdit={() => setEditingAddress(null)}
              />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

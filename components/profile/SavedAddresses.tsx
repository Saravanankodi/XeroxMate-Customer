
"use client";

import { useState } from "react";
import {
  Building2,
  Check,
  Home,
  Pencil,
  Plus,
  Trash2,
} from "lucide-react";

export type SavedAddress = {
  id: string;
  label: string;
  name: string;
  phone: string;
  building: string;
  street: string;
  area: string;
  city: string;
  pin: string;
  isDefault: boolean;
};

const initialAddresses: SavedAddress[] = [
  {
    id: "1",
    label: "Home",
    name: "Saravanan K.",
    phone: "90925 79460",
    building: "14/B, Bismi Nagar, Near Cauvery River Road",
    street: "Babarajapuram",
    area: "Kumbakonam",
    city: "Kumbakonam",
    pin: "612001",
    isDefault: true,
  },
  {
    id: "2",
    label: "College",
    name: "Kings College of Engineering",
    phone: "90925 79460",
    building: "Main Engineering Block, 2nd Floor",
    street: "Staff / Lab Dispatch Rack, Campus Gate 2",
    area: "Punalkulam",
    city: "Pudukkottai",
    pin: "622303",
    isDefault: false,
  },
  {
    id: "3",
    label: "Hostel",
    name: "Saravanan K. (Room 304)",
    phone: "94431 82910",
    building: "Kaveri Men's Hostel, West Wing 3rd Floor",
    street: "University Residential Zone",
    area: "Kumbakonam",
    city: "Kumbakonam",
    pin: "612001",
    isDefault: false,
  },
];

type Props = {
  addresses: SavedAddress[];
  onAddressesChange: (addresses: SavedAddress[]) => void;
  onAddAddress: () => void;
  onEditAddress: (address: SavedAddress) => void;
};

export default function SavedAddresses({
  addresses,
  onAddressesChange,
  onAddAddress,
  onEditAddress,
}: Props) {
  const [notice, setNotice] = useState("");
  const [confirmingId, setConfirmingId] = useState<string | null>(null);

  function setDefault(id: string) {
    onAddressesChange(
      addresses.map((address) => ({
        ...address,
        isDefault: address.id === id,
      }))
    );
    setNotice("Default address updated.");
  }

  function removeAddress(id: string) {
    const target = addresses.find((address) => address.id === id);
    if (!target) return;

    const remaining = addresses.filter((address) => address.id !== id);

    if (target.isDefault && remaining.length > 0) {
      remaining[0] = { ...remaining[0], isDefault: true };
    }

    onAddressesChange(remaining);
    setConfirmingId(null);
    setNotice("Address removed.");
  }

  return (
    <section className="rounded-2xl border border-slate-200/70 bg-white p-4 shadow-sm sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-50 text-cyan-800">
            <Building2 size={19} />
          </span>
          <div>
            <h2 className="font-heading text-base font-bold text-slate-900">
              Saved Addresses &amp; Hubs
            </h2>
            <p className="mt-0.5 text-xs text-slate-500">
              Pick where your printed files, reports, and bound theses get delivered.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onAddAddress}
          className="flex min-h-10 items-center gap-1.5 rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-xs font-bold text-blue-900 hover:bg-blue-100"
        >
          <Plus size={12} />
          Add New Address
        </button>
      </div>

      <div className="mt-4 space-y-2.5">
        {addresses.map((address) => {
          const Icon = address.label === "Home" ? Home : Building2;

          return (
            <article
              key={address.id}
              className={`rounded-xl border p-3 transition ${
                address.isDefault
                  ? "border-blue-900 bg-blue-50/20 ring-1 ring-blue-900/20"
                  : "border-slate-200 bg-white"
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="flex items-center gap-1 rounded-md bg-slate-100 px-2 py-1 text-xs font-bold uppercase text-slate-700">
                    <Icon size={11} />
                    {address.label}
                  </span>

                  {address.isDefault && (
                    <span className="flex items-center gap-1 rounded-full bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-800">
                      <Check size={10} />
                      Default Address
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-2.5 text-xs">
                  {!address.isDefault && (
                    <button
                      type="button"
                      onClick={() => setDefault(address.id)}
                      className="font-medium text-slate-500 hover:text-blue-800"
                    >
                      Set Default
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => onEditAddress(address)}
                    className="flex items-center gap-1 font-medium text-slate-600 hover:text-blue-800"
                  >
                    <Pencil size={12} />
                    Edit
                  </button>

                  {confirmingId === address.id ? (
                    <span className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => removeAddress(address.id)}
                        className="rounded bg-rose-600 px-2 py-1 font-semibold text-white hover:bg-rose-700"
                      >
                        Confirm
                      </button>
                      <button
                        type="button"
                        onClick={() => setConfirmingId(null)}
                        className="font-medium text-slate-500 hover:text-slate-700"
                      >
                        Cancel
                      </button>
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setConfirmingId(address.id)}
                      className="flex items-center gap-1 font-semibold text-rose-600 hover:text-rose-800"
                    >
                      <Trash2 size={12} />
                      Delete
                    </button>
                  )}
                </div>
              </div>

              <h3 className="mt-3 text-sm font-bold text-slate-800">
                {address.name}
              </h3>

              <p className="mt-1 text-xs text-slate-500">
                +91 {address.phone}
              </p>

              <p className="mt-2 text-xs leading-5 text-slate-600">
                {address.building}, {address.street}, {address.area},{" "}
                {address.city} - {address.pin}
              </p>
            </article>
          );
        })}

        {addresses.length === 0 && (
          <div className="rounded-xl border border-dashed border-slate-300 p-6 text-center">
            <p className="text-xs text-slate-500">
              You have no saved addresses yet.
            </p>
            <button
              type="button"
              onClick={onAddAddress}
              className="mt-3 text-xs font-bold text-blue-800"
            >
              Add your first address
            </button>
          </div>
        )}
      </div>

      {notice && (
        <p role="status" className="mt-3 text-xs text-blue-800">
          {notice}
        </p>
      )}
    </section>
  );
}

export { initialAddresses };

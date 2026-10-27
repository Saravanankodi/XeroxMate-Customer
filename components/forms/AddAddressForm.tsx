
"use client";

import { useEffect, useState } from "react";
import { Check, Plus, RotateCcw } from "lucide-react";
import { SavedAddress } from "../profile";


const emptyForm = {
  label: "Home",
  name: "",
  phone: "",
  building: "",
  street: "",
  area: "",
  city: "Kumbakonam",
  pin: "",
  isDefault: false,
};

type Props = {
  addresses: SavedAddress[];
  editingAddress: SavedAddress | null;
  onSave: (address: SavedAddress) => void;
  onCancelEdit: () => void;
};

export default function AddAddressForm({
  addresses,
  editingAddress,
  onSave,
  onCancelEdit,
}: Props) {
  const [form, setForm] = useState(emptyForm);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (editingAddress) {
      setForm({
        label: editingAddress.label,
        name: editingAddress.name,
        phone: editingAddress.phone,
        building: editingAddress.building,
        street: editingAddress.street,
        area: editingAddress.area,
        city: editingAddress.city,
        pin: editingAddress.pin,
        isDefault: editingAddress.isDefault,
      });
    } else {
      setForm(emptyForm);
    }
    setMessage("");
  }, [editingAddress]);

  function update(field: keyof typeof form, value: string | boolean) {
    setForm((current) => ({ ...current, [field]: value }));
    setMessage("");
  }

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!/^\d{10}$/.test(form.phone.replace(/\D/g, ""))) {
      setMessage("Enter a valid 10-digit mobile number.");
      return;
    }

    if (!/^\d{6}$/.test(form.pin)) {
      setMessage("Enter a valid 6-digit postal PIN code.");
      return;
    }

    const address: SavedAddress = {
      ...form,
      id: editingAddress?.id ?? crypto.randomUUID(),
      isDefault:
        form.isDefault ||
        addresses.length === 0 ||
        (editingAddress?.isDefault ?? false),
    };

    onSave(address);
    setForm(emptyForm);
    setMessage("");
  }

  const inputClass =
    "mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs text-slate-800 outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

  const labels = [
    { value: "Home", icon: "⌂" },
    { value: "Office", icon: "▣" },
    { value: "College / Lab", icon: "▤" },
    { value: "Hostel / PG", icon: "▥" },
  ];

  return (
    <section
      id="add-address"
      className="rounded-2xl border border-slate-200/70 bg-white p-4 shadow-sm sm:p-5"
    >
      <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-900">
          <Plus size={20} />
        </span>

        <div>
          <h2 className="font-serif text-base font-bold text-slate-900">
            {editingAddress ? "Edit Address" : "Add a New Address"}
          </h2>
          <p className="mt-0.5 text-[10px] text-slate-500">
            Provide complete details to ensure accurate desk and room delivery.
          </p>
        </div>
      </div>

      <form onSubmit={submit} className="mt-4 space-y-4">
        <fieldset>
          <legend className="text-[10px] font-bold uppercase tracking-wide text-slate-600">
            Address Label *
          </legend>

          <div className="mt-2 flex flex-wrap gap-2">
            {labels.map((item) => (
              <button
                key={item.value}
                type="button"
                onClick={() => update("label", item.value)}
                className={`flex items-center gap-1.5 rounded-lg border px-2.5 py-2 text-[10px] font-semibold transition ${
                  form.label === item.value
                    ? "border-blue-900 bg-blue-900 text-white"
                    : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                }`}
              >
                <span>{item.icon}</span>
                {item.value}
              </button>
            ))}
          </div>
        </fieldset>

        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label htmlFor="address-name" className="text-[10px] font-bold uppercase tracking-wide text-slate-600">
              Receiver Full Name *
            </label>
            <input
              id="address-name"
              required
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              placeholder="Your full name"
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="address-phone" className="text-[10px] font-bold uppercase tracking-wide text-slate-600">
              Contact Phone Number *
            </label>
            <input
              id="address-phone"
              required
              type="tel"
              value={form.phone}
              onChange={(e) => update("phone", e.target.value)}
              placeholder="10-digit mobile number"
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label htmlFor="address-building" className="text-[10px] font-bold uppercase tracking-wide text-slate-600">
            House / Flat / Building / Department Name *
          </label>
          <input
            id="address-building"
            required
            value={form.building}
            onChange={(e) => update("building", e.target.value)}
            placeholder="e.g. Flat 302, Cauvery Heights / Dept of Mechanical"
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="address-street" className="text-[10px] font-bold uppercase tracking-wide text-slate-600">
            Street / Landmark / Campus Gate *
          </label>
          <input
            id="address-street"
            required
            value={form.street}
            onChange={(e) => update("street", e.target.value)}
            placeholder="e.g. Near New Bus Stand, Cauvery River Road"
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="address-area" className="text-[10px] font-bold uppercase tracking-wide text-slate-600">
            Area / Locality *
          </label>
          <input
            id="address-area"
            required
            value={form.area}
            onChange={(e) => update("area", e.target.value)}
            placeholder="e.g. Babarajapuram"
            className={inputClass}
          />
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label htmlFor="address-city" className="text-[10px] font-bold uppercase tracking-wide text-slate-600">
              City *
            </label>
            <input
              id="address-city"
              required
              value={form.city}
              onChange={(e) => update("city", e.target.value)}
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="address-pin" className="text-[10px] font-bold uppercase tracking-wide text-slate-600">
              PIN / Postal Code *
            </label>
            <input
              id="address-pin"
              required
              inputMode="numeric"
              maxLength={6}
              value={form.pin}
              onChange={(e) =>
                update("pin", e.target.value.replace(/\D/g, "").slice(0, 6))
              }
              placeholder="6-digit PIN code"
              className={inputClass}
            />
          </div>
        </div>

        <label className="flex cursor-pointer items-start gap-2 text-[10px] leading-4 text-slate-600">
          <input
            type="checkbox"
            checked={form.isDefault}
            onChange={(e) => update("isDefault", e.target.checked)}
            className="mt-0.5 accent-blue-900"
          />
          Make this my default address for all campus deliveries
        </label>

        {message && (
          <p role="alert" className="rounded-lg bg-rose-50 p-2.5 text-xs text-rose-700">
            {message}
          </p>
        )}

        <div className="flex flex-wrap gap-2">
          <button
            type="submit"
            className="flex items-center gap-2 rounded-xl bg-blue-900 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-blue-800"
          >
            <Check size={14} />
            {editingAddress ? "Update Address" : "Save Address"}
          </button>

          <button
            type="button"
            onClick={() => {
              setForm(emptyForm);
              setMessage("");
              onCancelEdit();
            }}
            className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-50"
          >
            <RotateCcw size={12} />
            {editingAddress ? "Cancel" : "Clear"}
          </button>
        </div>
      </form>
    </section>
  );
}

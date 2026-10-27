import { useSyncExternalStore } from "react";

import type { FulfillmentMode } from "@/data/store-types";

export type PrintSettings = {
  paper: string;
  color: string;
  sides: string;
  binding: string;
  layout: string;
  finishing: string;
  orientation: string;
  quantity: number;
  pageRange: string;
  instructions: string;
};

export type OrderDraft = {
  fileName?: string;
  fileSize?: number;
  pageCount: number;
  settings?: PrintSettings;
  shopId?: string;
  shopName?: string;
  shopAddress?: string;
  fulfillment?: FulfillmentMode;
  deliveryAddress?: string;
  wrapper: boolean;
  deliveryFee: number;
  wrapperFee: number;
  printingCost: number;
  operatorNotes?: string;
};

const STORAGE_KEY = "xeroxmate-order-draft";

const EMPTY_DRAFT: OrderDraft = {
  pageCount: 2,
  wrapper: false,
  deliveryFee: 0,
  wrapperFee: 0,
  printingCost: 0,
};

let cachedDraft: OrderDraft | null = null;
const listeners = new Set<() => void>();

function readStoredDraft(): OrderDraft {
  if (typeof window === "undefined") return EMPTY_DRAFT;

  if (cachedDraft) return cachedDraft;

  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);

    if (raw) {
      const parsed = JSON.parse(raw) as Partial<OrderDraft>;
      cachedDraft = { ...EMPTY_DRAFT, ...parsed };
    } else {
      cachedDraft = EMPTY_DRAFT;
    }
  } catch {
    cachedDraft = EMPTY_DRAFT;
  }

  return cachedDraft;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function emit() {
  for (const listener of listeners) listener();
}

export function updateOrderDraft(patch: Partial<OrderDraft>) {
  const next = { ...readStoredDraft(), ...patch };
  cachedDraft = next;

  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    cachedDraft = next;
  }

  emit();
}

export function resetOrderDraft() {
  cachedDraft = EMPTY_DRAFT;

  try {
    window.sessionStorage.removeItem(STORAGE_KEY);
    window.sessionStorage.removeItem("xeroxmate-fulfillment");
  } catch {
    return;
  }

  emit();
}

export function useOrderDraft() {
  const draft = useSyncExternalStore(
    subscribe,
    readStoredDraft,
    () => EMPTY_DRAFT,
  );

  return {
    draft,
    updateDraft: updateOrderDraft,
    resetDraft: resetOrderDraft,
  };
}

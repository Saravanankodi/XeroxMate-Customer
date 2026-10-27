import { useSyncExternalStore } from "react";

import type { PrintOrder } from "@/types/order";

const STORAGE_KEY = "xeroxmate-placed-orders";
const EMPTY_ORDERS: PrintOrder[] = [];

let cachedOrders: PrintOrder[] | null = null;
const listeners = new Set<() => void>();

function readPlacedOrders(): PrintOrder[] {
  if (typeof window === "undefined") return EMPTY_ORDERS;

  if (cachedOrders) return cachedOrders;

  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    const parsed = raw ? (JSON.parse(raw) as PrintOrder[]) : [];
    cachedOrders = Array.isArray(parsed) ? parsed : EMPTY_ORDERS;
  } catch {
    cachedOrders = EMPTY_ORDERS;
  }

  return cachedOrders;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function emit() {
  for (const listener of listeners) listener();
}

export function addPlacedOrder(order: PrintOrder) {
  const next = [
    order,
    ...readPlacedOrders().filter((item) => item.id !== order.id),
  ].slice(0, 20);

  cachedOrders = next;

  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    cachedOrders = next;
  }

  emit();
}

export function usePlacedOrders() {
  return useSyncExternalStore(
    subscribe,
    readPlacedOrders,
    () => EMPTY_ORDERS,
  );
}

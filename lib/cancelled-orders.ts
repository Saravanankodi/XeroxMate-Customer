import { useSyncExternalStore } from "react";

const STORAGE_KEY = "xeroxmate-cancelled-orders";
const EMPTY_IDS: string[] = [];

let cachedIds: string[] | null = null;
const listeners = new Set<() => void>();

function readCancelledIds(): string[] {
  if (typeof window === "undefined") return EMPTY_IDS;

  if (cachedIds) return cachedIds;

  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    const parsed = raw ? (JSON.parse(raw) as string[]) : [];
    cachedIds = Array.isArray(parsed) ? parsed : EMPTY_IDS;
  } catch {
    cachedIds = EMPTY_IDS;
  }

  return cachedIds;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function emit() {
  for (const listener of listeners) listener();
}

export function markOrderCancelled(id: string) {
  if (readCancelledIds().includes(id)) return;

  const next = [...readCancelledIds(), id];
  cachedIds = next;

  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    cachedIds = next;
  }

  emit();
}

export function useCancelledOrderIds() {
  return useSyncExternalStore(
    subscribe,
    readCancelledIds,
    () => EMPTY_IDS,
  );
}

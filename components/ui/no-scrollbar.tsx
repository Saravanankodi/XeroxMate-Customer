"use client";

import { ReactNode } from "react";

interface NoScrollbarProps {
  children: ReactNode;
  className?: string;
}

export function NoScrollbar({ children, className = "" }: NoScrollbarProps) {
  return (
    <div className={`no-scrollbar overflow-auto ${className}`}>
      {children}
    </div>
  );
}

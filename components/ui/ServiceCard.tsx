
import type { LucideIcon } from "lucide-react";
import { Zap } from "lucide-react";

interface ServiceCardProps {
  title: string;
  description: string;
  icon?: LucideIcon;
  className?: string;
}

export default function ServiceCard({
  title,
  description,
  icon: Icon = Zap,
  className = "",
}: ServiceCardProps) {
  return (
    <div
      className={`box-border flex min-h-38 w-full flex-col items-start gap-2 rounded-[17px] border border-slate-200/80 bg-white p-4 shadow-[0_1px_2px_rgba(0,0,0,0.05)] ${className}`}
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-md bg-blue-50">
        <Icon
          size={18}
          strokeWidth={2.5}
          className="fill-blue-600 text-blue-600"
        />
      </div>

      <h3 className="text-base font-bold leading-tight text-slate-900">
        {title}
      </h3>

      <p className="text-sm leading-4.75 text-slate-500">
        {description}
      </p>
    </div>
  );
}

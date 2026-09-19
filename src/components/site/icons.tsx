import {
  Bean,
  Cherry,
  CircleDot,
  Cookie,
  Gem,
  Gift,
  HeartPulse,
  Mountain,
  Nut,
  Shell,
  Sprout,
  Zap,
  type LucideIcon,
} from "lucide-react";

export const iconMap: Record<string, LucideIcon> = {
  cookie: Cookie,
  sprout: Sprout,
  nut: Nut,
  mountain: Mountain,
  zap: Zap,
  shell: Shell,
  "heart-pulse": HeartPulse,
  cherry: Cherry,
  bean: Bean,
  "circle-dot": CircleDot,
  gem: Gem,
  gift: Gift,
};

export function CategoryIcon({ name, className }: { name: string; className?: string }) {
  const Icon = iconMap[name] ?? Cookie;
  return <Icon className={className} aria-hidden />;
}

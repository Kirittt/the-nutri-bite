import almonds from "@/assets/clean/almonds.jpg";
import berryFruit from "@/assets/clean/berry-fruit.jpg";
import cashews from "@/assets/clean/cashews.jpg";
import edamame from "@/assets/clean/edamame.jpg";
import gifting from "@/assets/clean/gifting.jpg";
import healthMix from "@/assets/clean/health-mix.jpg";
import makhana from "@/assets/clean/makhana.jpg";
import nutMix from "@/assets/clean/nut-mix.jpg";
import specialty from "@/assets/clean/specialty.jpg";
import superSnack from "@/assets/clean/super-snack.jpg";
import sweets from "@/assets/clean/sweets.jpg";
import trailMix from "@/assets/clean/trail-mix.jpg";

export const categoryImages: Record<string, string> = {
  "natural-sweets-bites": sweets,
  almonds,
  cashews,
  "trail-mix": trailMix,
  "super-snack": superSnack,
  "nut-mix": nutMix,
  "health-mix": healthMix,
  "berry-fruit-mix": berryFruit,
  edamame,
  "mastana-makhana": makhana,
  "specialty-collection": specialty,
  "gift-assorted": gifting,
};

const productImages: Record<string, string> = {};

export function getProductImage(slug: string, category: string) {
  return productImages[slug] ?? categoryImages[category] ?? null;
}

export const heroVisuals = [
  sweets,
  almonds,
  cashews,
  trailMix,
  nutMix,
  healthMix,
  superSnack,
  berryFruit,
  edamame,
  makhana,
  gifting,
];
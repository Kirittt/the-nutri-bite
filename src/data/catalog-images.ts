import almonds from "@/assets/catalog/almonds.jpg.asset.json";
import berryFruit from "@/assets/catalog/berry-fruit.jpg.asset.json";
import cashews from "@/assets/catalog/cashews.jpg.asset.json";
import healthMix from "@/assets/catalog/health-mix.jpg.asset.json";
import makhanaCheese from "@/assets/catalog/makhana-cheese.jpg.asset.json";
import makhanaHimalayan from "@/assets/catalog/makhana-himalayan.jpg.asset.json";
import makhanaMint from "@/assets/catalog/makhana-mint.jpg.asset.json";
import makhanaPeri from "@/assets/catalog/makhana-peri-peri.jpg.asset.json";
import makhanaRange from "@/assets/catalog/makhana-range.jpg.asset.json";
import morningAlmonds from "@/assets/catalog/morning-almonds.jpg.asset.json";
import nutMix from "@/assets/catalog/nut-mix.jpg.asset.json";
import proteinCrunch from "@/assets/catalog/protein-crunch.jpg.asset.json";
import superSnack from "@/assets/catalog/super-snack.jpg.asset.json";
import trailMix from "@/assets/catalog/trail-mix.jpg.asset.json";

export const categoryImages: Record<string, string> = {
  almonds: almonds.url,
  cashews: cashews.url,
  "trail-mix": trailMix.url,
  "super-snack": superSnack.url,
  "nut-mix": nutMix.url,
  "health-mix": healthMix.url,
  "berry-fruit-mix": berryFruit.url,
  "mastana-makhana": makhanaRange.url,
};

const productImages: Record<string, string> = {
  "morning-activated-almonds": morningAlmonds.url,
  "powerfull-protein-bar": proteinCrunch.url,
  "mastana-makhana-peri-peri": makhanaPeri.url,
  "mastana-makhana-mint": makhanaMint.url,
  "mastana-makhana-himalayan-salt": makhanaHimalayan.url,
  "mastana-makhana-cheese": makhanaCheese.url,
};

export function getProductImage(slug: string, category: string) {
  return productImages[slug] ?? categoryImages[category] ?? null;
}

export const heroVisuals = [
  morningAlmonds.url,
  proteinCrunch.url,
  almonds.url,
  cashews.url,
  trailMix.url,
  nutMix.url,
  healthMix.url,
  superSnack.url,
  berryFruit.url,
  makhanaRange.url,
  makhanaPeri.url,
];
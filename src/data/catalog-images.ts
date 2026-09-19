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
import naturalLaddu from "@/assets/products/natural-laddu.jpg";
import anjeerBite from "@/assets/products/anjeer-bite.jpg";
import proteinBar from "@/assets/products/protein-bar.jpg";
import darkChocolate from "@/assets/products/dark-chocolate-exotica.jpg";
import morningAlmonds from "@/assets/products/morning-almonds.jpg";
import spicyAlmonds from "@/assets/products/spicy-almonds.jpg";
import edamameKimchi from "@/assets/products/edamame-kimchi.jpg";

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

const productImages: Record<string, string> = {
  "number-1-natural-laddu": naturalLaddu,
  "aflatoon-anjeer-bite": anjeerBite,
  "powerfull-protein-bar": proteinBar,
  "blockbuster-dark-chocolate-exotica": darkChocolate,
  "morning-activated-almonds": morningAlmonds,
  "spicy-almonds": spicyAlmonds,
  "edamame-korean-kimchi": edamameKimchi,
};

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
export type Variant = {
  label: string;
  price: number | null; // null = price pending
};

export type Product = {
  slug: string;
  name: string;
  category: string; // category slug
  subcategory?: string;
  tagline: string;
  description: string;
  ingredients: string[];
  highlights?: string[];
  variants: Variant[];
  status: "active" | "coming-soon";
  bestSeller?: boolean;
  newLaunch?: boolean;
  note?: string;
};

export type Category = {
  slug: string;
  name: string;
  icon: string; // lucide icon name key used in iconMap
  blurb: string;
};

export const categorySubcategories: Record<string, string[]> = {
  "natural-sweets-bites": ["Natural Laddu", "Dry Fruit Bites", "Date & Khajoor Bites", "Protein Sweets", "Rose & Gulkand Collection", "Chocolate Collection"],
  almonds: ["Roasted & Salted", "Smoky BBQ", "Spicy", "Salt & Pepper", "Mexican Salsa", "Morning – Activated"],
  cashews: ["320 Count", "240 Count", "Roasted & Salted", "Lime & Pepper", "Sriracha", "Thai Chilli Sweet", "Salted Caramel", "Tangique", "Mexican Salsa", "Korean Kimchi", "Habanero Spicy", "Smoky BBQ"],
  "trail-mix": ["Roasted & Salted", "Protein Booster", "Teekha Chatpata", "Achari Masti", "Lime & Pepper", "Peri Peri"],
  "super-snack": ["Achari Masti", "Lime & Pepper", "Honey BBQ", "Peri Peri", "Herbs & Spices", "Korean Kimchi", "Mexican Salsa"],
  "nut-mix": ["Smoky BBQ", "Honey Roasted", "Korean Kimchi", "Mexican Salsa", "Herbs & Spices", "Achari Masti", "Lime & Pepper"],
  "health-mix": ["Omega Boost", "Antioxidant Mix", "Trail Mix – Daily Dose", "Trail Mix – Fruit & Nut", "Trail Mix – Power Nut", "Panchmewa Mix"],
  "berry-fruit-mix": ["Masala Berry Mix", "Masala Fruit Mix", "Masala Cranberry", "Mango Raisins"],
  edamame: ["Roasted & Salted", "Honey Cinnamon", "Korean Kimchi"],
  "mastana-makhana": ["Peri Peri", "Mint", "Himalayan Salt", "Cheese"],
  "specialty-collection": ["Dry Fruit Mix", "Almond Dragees", "Almond Stuffed Dates"],
  "gift-assorted": ["Assorted Bites", "Corporate Gifting", "Festive Gifting"],
};

export const categories: Category[] = [
  {
    slug: "natural-sweets-bites",
    name: "Natural Sweets & Bites",
    icon: "cookie",
    blurb: "Handcrafted laddu, dry-fruit bites and date bites made without refined sugar.",
  },
  {
    slug: "almonds",
    name: "Almonds",
    icon: "sprout",
    blurb: "Premium almonds in roasted, smoky and activated styles.",
  },
  {
    slug: "cashews",
    name: "Cashews",
    icon: "nut",
    blurb: "320 and 240 count cashews in bold everyday flavours.",
  },
  {
    slug: "trail-mix",
    name: "Trail Mix",
    icon: "mountain",
    blurb: "Nuts, seeds and berries balanced for daily snacking.",
  },
  {
    slug: "super-snack",
    name: "Super Snack",
    icon: "zap",
    blurb: "Nut and seed snack packs with playful Indian flavours.",
  },
  {
    slug: "nut-mix",
    name: "Nut Mix",
    icon: "shell",
    blurb: "Almond and cashew mixes, simply and boldly seasoned.",
  },
  {
    slug: "health-mix",
    name: "Health Mix",
    icon: "heart-pulse",
    blurb: "Seed and berry mixes for wholesome everyday nutrition.",
  },
  {
    slug: "berry-fruit-mix",
    name: "Berry & Fruit Mix",
    icon: "cherry",
    blurb: "Sun-dried berries and fruit slices with a masala twist.",
  },
  {
    slug: "edamame",
    name: "Edamame",
    icon: "bean",
    blurb: "Crunchy roasted edamame in three flavours.",
  },
  {
    slug: "mastana-makhana",
    name: "Mastana Makhana",
    icon: "circle-dot",
    blurb: "Light, crunchy roasted foxnuts in four lively flavours.",
  },
  {
    slug: "specialty-collection",
    name: "Specialty Collection",
    icon: "gem",
    blurb: "Dragees, stuffed dates and assorted bites.",
  },
  {
    slug: "gift-assorted",
    name: "Gift & Assorted Collection",
    icon: "gift",
    blurb: "Thoughtful gifting boxes for festivals and corporate orders.",
  },
];

const g = (label: string, price: number | null): Variant => ({ label, price });

const sweetNote =
  "Handcrafted and hygienically prepared, then packed with extra care and love.";

const pet = (p50: number, p100: number, p150: number, p200: number): Variant[] => [
  g("50 g", p50),
  g("100 g", p100),
  g("150 g", p150),
  g("200 g", p200),
];

const pendingFlavours: Product[] = [
  ...["Teekha Chatpata", "Achari Masti", "Lime & Pepper", "Peri Peri"].map((flavour) => ({ slug: `trail-mix-${flavour.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`, name: `Trail Mix — ${flavour}`, category: "trail-mix", subcategory: flavour, tagline: `${flavour} seasoning on a balanced nut, seed and berry mix.`, description: `Almonds, cashews, peanuts, raisins, cranberry, pumpkin and sunflower seeds finished with ${flavour.toLowerCase()} seasoning.`, ingredients: ["Almonds", "Cashews", "Peanuts", "Black Raisins", "Cranberry", "Pumpkin Seeds", "Sunflower Seeds"], variants: pet(58, 101, 149, 191), status: "active" as const })),
  ...["Lime & Pepper", "Honey BBQ", "Peri Peri", "Herbs & Spices", "Korean Kimchi", "Mexican Salsa"].map((flavour) => ({ slug: `super-snack-${flavour.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`, name: `Super Snack — ${flavour}`, category: "super-snack", subcategory: flavour, tagline: `${flavour} flavour across premium nuts, raisins and seeds.`, description: `Almonds, cashews, green raisins, pumpkin and sunflower seeds with ${flavour.toLowerCase()} seasoning.`, ingredients: ["Almonds", "Cashews", "Green Raisins", "Pumpkin Seeds", "Sunflower Seeds"], variants: pet(64, 115, 169, 219), status: "active" as const })),
  ...["Honey Roasted", "Korean Kimchi", "Mexican Salsa", "Herbs & Spices", "Achari Masti", "Lime & Pepper"].map((flavour) => ({ slug: `nut-mix-${flavour.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`, name: `Nut Mix — ${flavour}`, category: "nut-mix", subcategory: flavour, tagline: `${flavour} almonds and cashews for satisfying everyday crunch.`, description: `A premium almond and cashew blend finished with ${flavour.toLowerCase()} seasoning.`, ingredients: ["Almonds", "Cashews"], variants: pet(85, 155, 229, 229), status: "active" as const })),
  ...(["320", "240"] as const).flatMap((count) => ["Sriracha", "Thai Chilli Sweet", "Salted Caramel", "Tangique", "Mexican Salsa", "Korean Kimchi", "Habanero Spicy", "Smoky BBQ"].map((flavour) => ({ slug: `cashews-${count}-${flavour.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`, name: `Cashews ${count} — ${flavour}`, category: "cashews", subcategory: `${count} Count`, tagline: `Premium ${count} count cashews with ${flavour.toLowerCase()} flavour.`, description: `Carefully roasted ${count} count cashews finished with ${flavour.toLowerCase()} seasoning.`, ingredients: ["Cashews"], variants: count === "320" ? pet(79, 145, 215, 279) : pet(82, 150, 223, 290), status: "active" as const }))),
];

export const products: Product[] = [
  {
    slug: "number-1-natural-laddu",
    name: "Number 1 Natural Laddu",
    category: "natural-sweets-bites",
    subcategory: "Natural Laddu",
    tagline: "Without ghee, refined sugar, jaggery, flour or oil.",
    description:
      "Our signature laddu blends coconut, rose, cashew, raisins and dates bound with honey, finished with herbal goodness. Individually capsule packed for an easy wholesome everyday snack.",
    ingredients: [
      "Coconut",
      "Rose",
      "Cashew",
      "Raisins",
      "Dates",
      "Honey",
      "Poppy Seeds",
      "Ashwagandha",
      "Tulsi",
      "Bilipatra",
    ],
    highlights: [
      "Without Ghee",
      "Without Refined Sugar",
      "Without Jaggery",
      "Without Flour",
      "Individual Capsule Packing",
    ],
    variants: [g("200 g (1 box)", 250), g("1 kg (5 boxes)", 1050)],
    status: "active",
    bestSeller: true,
    note: sweetNote,
  },
  {
    slug: "aflatoon-anjeer-bite",
    name: "Aflatoon Anjeer Bite",
    category: "natural-sweets-bites",
    subcategory: "Dry Fruit Bites",
    tagline: "Premium fig and dry-fruit bite with a rich nutty texture.",
    description:
      "Anjeer slow-blended with almonds, cashew and pistachio, brought together with honey and cow ghee for a naturally satisfying bite.",
    ingredients: ["Almonds", "Cashew", "Pistachio", "Anjeer", "Honey", "Cow Ghee"],
    highlights: ["Dry-fruit goodness", "Anjeer-based snack", "Handcrafted"],
    variants: [g("250 g", 240), g("500 g", 470), g("1 kg", 900)],
    status: "active",
    bestSeller: true,
    note: sweetNote,
  },
  {
    slug: "dhurandhar-dry-fruit-punch",
    name: "Dhurandhar Dry Fruit Punch",
    category: "natural-sweets-bites",
    subcategory: "Dry Fruit Bites",
    tagline: "A rich combination of premium dry fruits in one indulgent bite.",
    description:
      "Almonds, cashew and pistachio meet dates, honey and cow ghee in a wholesome bite crafted for celebrations and everyday cravings alike.",
    ingredients: ["Almonds", "Cashew", "Pistachio", "Dates", "Honey", "Cow Ghee"],
    variants: [g("250 g", 240), g("500 g", 470), g("1 kg", 900)],
    status: "active",
    note: sweetNote,
  },
  {
    slug: "damdar-date-khajoor-bite",
    name: "Damdar Date (Khajoor) Bite",
    category: "natural-sweets-bites",
    subcategory: "Date & Khajoor Bites",
    tagline: "Soft khajoor bites layered with premium nuts.",
    description:
      "Dates and khajoor folded with almonds, cashew and pistachio, finished with honey and cow ghee.",
    ingredients: ["Almonds", "Cashew", "Pistachio", "Dates / Khajoor", "Honey", "Cow Ghee"],
    variants: [g("250 g", 220), g("500 g", 415), g("1 kg", 800)],
    status: "active",
    note: sweetNote,
  },
  {
    slug: "bindaas-black-khajoor-bite",
    name: "Bindaas Black Khajoor Bite",
    category: "natural-sweets-bites",
    subcategory: "Date & Khajoor Bites",
    tagline: "Premium black dates with a generous nut crunch.",
    description:
      "Made with premium black dates, cashew, pistachio and almonds, bound with honey and cow ghee.",
    ingredients: ["Premium Black Dates", "Cashew", "Pistachio", "Almonds", "Honey", "Cow Ghee"],
    variants: [g("250 g", 230), g("500 g", 435), g("1 kg", 850)],
    status: "active",
    note: sweetNote,
  },
  {
    slug: "powerfull-protein-bar",
    name: "Powerfull Protein Bar",
    category: "natural-sweets-bites",
    subcategory: "Protein Sweets",
    tagline: "Seeds, nuts and berries in a everyday protein bite.",
    description:
      "Chia, quinoa and pumpkin seeds with magajtari, almonds, cashew, hazelnuts, pistachio, raisins and cranberry, bound with honey and cow ghee.",
    ingredients: [
      "Chia Seeds",
      "Quinoa Seeds",
      "Pumpkin Seeds",
      "Magajtari",
      "Almonds",
      "Cashew",
      "Hazelnuts",
      "Pistachio",
      "Raisins",
      "Cranberry",
      "Honey",
      "Cow Ghee",
    ],
    variants: [g("250 g", 270), g("500 g", 520), g("1 kg", 1000)],
    status: "active",
    bestSeller: true,
    note: sweetNote,
  },
  {
    slug: "pista-gulkand-jugalbandhi",
    name: "Pista Gulkand Jugalbandhi",
    category: "natural-sweets-bites",
    subcategory: "Rose & Gulkand Collection",
    tagline: "Pistachio and rose in perfect harmony.",
    description:
      "A pistachio-forward bite made with almond, cashewnuts, honey and cow ghee.",
    ingredients: ["Almond", "Cashewnuts", "Pistachio", "Honey", "Cow Ghee"],
    variants: [g("250 g", 270), g("500 g", 520), g("1 kg", 1000)],
    status: "active",
    note: "Ingredient list requires final confirmation.",
  },
  {
    slug: "shahi-gulab-bite",
    name: "Shahi Gulab Bite",
    category: "natural-sweets-bites",
    subcategory: "Rose & Gulkand Collection",
    tagline: "Traditional rose and gulkand with premium nuts.",
    description:
      "Rose petals and gulkand blended with almond, cashew and pistachios in cow ghee.",
    ingredients: ["Rose Petals", "Almond", "Cashew", "Pistachios", "Gulkand", "Cow Ghee"],
    variants: [g("250 g", 270), g("500 g", 520), g("1 kg", 1000)],
    status: "active",
    note: sweetNote,
  },
  {
    slug: "panchtatva-protein-laddu",
    name: "Panchtatva Protein Laddu",
    category: "natural-sweets-bites",
    subcategory: "Protein Sweets",
    tagline: "Five-element goodness of nuts, dates and seeds.",
    description:
      "Almond, cashew and dates with pumpkin, sunflower and flax seeds, prepared in cow ghee.",
    ingredients: [
      "Almond",
      "Cashew",
      "Dates",
      "Pumpkin Seeds",
      "Sunflower Seeds",
      "Flax Seeds",
      "Cow Ghee",
    ],
    variants: [g("250 g", 300), g("500 g", 580), g("1 kg", 1150)],
    status: "active",
    note: sweetNote,
  },
  {
    slug: "dildar-dry-fruit-laddu",
    name: "Dildar Dry Fruit Laddu",
    category: "natural-sweets-bites",
    subcategory: "Natural Laddu",
    tagline: "Generous dry fruit laddu for festive tables.",
    description:
      "Almond, cashew, dates, pistachio and seeds prepared in cow ghee.",
    ingredients: ["Almond", "Cashew", "Dates", "Pistachio", "Seeds", "Cow Ghee"],
    variants: [g("250 g", 300), g("500 g", 580), g("1 kg", 1150)],
    status: "active",
    note: sweetNote,
  },
  {
    slug: "blockbuster-dark-chocolate-exotica",
    name: "Blockbuster Dark Chocolate Exotica",
    category: "natural-sweets-bites",
    subcategory: "Chocolate Collection",
    tagline: "70% dark chocolate with premium nuts.",
    description:
      "Rich dark chocolate combined with almond, cashew and pistachio for a satisfying balance of crunch, cocoa and texture.",
    ingredients: ["70% Dark Chocolate", "Almond", "Cashew", "Pistachio"],
    variants: [g("250 g", 225), g("500 g", 445), g("1 kg", 870)],
    status: "active",
    newLaunch: true,
  },

  // Almonds
  {
    slug: "roasted-salted-almonds",
    name: "Roasted & Salted Almonds",
    category: "almonds",
    tagline: "Everyday almonds, evenly roasted and lightly salted.",
    description: "Premium almonds roasted in small batches and finished with a light salting.",
    ingredients: ["Almonds", "Salt"],
    variants: [g("50 g", 88), g("100 g", 162), g("150 g", 241), g("200 g", 315)],
    status: "active",
    bestSeller: true,
  },
  {
    slug: "smoky-bbq-almonds",
    name: "Smoky BBQ Almonds",
    category: "almonds",
    tagline: "Smoky, savoury and moreish.",
    description: "Premium almonds tossed in a smoky barbecue seasoning.",
    ingredients: ["Almonds", "Smoky BBQ Seasoning"],
    variants: [g("50 g", 91), g("100 g", 169), g("150 g", 251), g("200 g", 329)],
    status: "active",
  },
  {
    slug: "morning-activated-almonds",
    name: "Morning Almonds – Activated",
    category: "almonds",
    tagline: "Soaked overnight, rinsed well and gently dried.",
    description:
      "A simple wholesome habit for a better you. Activated almonds prepared the traditional way, ready to eat straight from the pack.",
    ingredients: ["Activated Almonds"],
    variants: [g("50 g", 95), g("100 g", 175), g("150 g", 261), g("200 g", 341)],
    status: "active",
    newLaunch: true,
  },
  {
    slug: "spicy-almonds",
    name: "Spicy Almonds",
    category: "almonds",
    tagline: "Bold Indian spice on premium almonds.",
    description: "Premium almonds coated with a lively Indian spice blend for a bold, satisfying crunch.",
    ingredients: ["Almonds", "Spice Mix"],
    variants: [g("50 g", 91), g("100 g", 169), g("150 g", 251), g("200 g", 329)],
    status: "active",
    newLaunch: true,
  },
  {
    slug: "salt-pepper-almonds",
    name: "Salt & Pepper Almonds",
    category: "almonds",
    tagline: "Simple, peppery and warming.",
    description: "Roasted almonds finished with sea salt and cracked pepper for clean, classic flavour.",
    ingredients: ["Almonds", "Salt", "Pepper"],
    variants: [g("50 g", 91), g("100 g", 169), g("150 g", 251), g("200 g", 329)],
    status: "active",
  },
  {
    slug: "mexican-salsa-almonds",
    name: "Mexican Salsa Almonds",
    category: "almonds",
    tagline: "Tangy salsa seasoning on crunchy almonds.",
    description: "Crunchy almonds coated in a tangy, savoury Mexican salsa seasoning.",
    ingredients: ["Almonds", "Mexican Salsa Seasoning"],
    variants: [g("50 g", 91), g("100 g", 169), g("150 g", 251), g("200 g", 329)],
    status: "active",
  },

  // Cashews
  {
    slug: "cashews-320-roasted-salted",
    name: "Cashews 320 — Roasted & Salted",
    category: "cashews",
    subcategory: "320 Count",
    tagline: "Buttery 320 count cashews, lightly salted.",
    description: "Premium 320 count cashews roasted in small batches.",
    ingredients: ["Cashews", "Salt"],
    variants: [g("50 g", 76), g("100 g", 138), g("150 g", 204), g("200 g", 265)],
    status: "active",
    bestSeller: true,
  },
  {
    slug: "cashews-320-lime-pepper",
    name: "Cashews 320 — Lime & Pepper",
    category: "cashews",
    subcategory: "320 Count",
    tagline: "Zesty lime with a peppery finish.",
    description: "Premium 320 count cashews tossed in lime and cracked pepper.",
    ingredients: ["Cashews", "Lime", "Pepper"],
    variants: [g("50 g", 79), g("100 g", 145), g("150 g", 215), g("200 g", 279)],
    status: "active",
  },
  {
    slug: "cashews-240-roasted-salted",
    name: "Cashews 240 — Roasted & Salted",
    category: "cashews",
    subcategory: "240 Count",
    tagline: "Larger 240 count cashews for a premium bite.",
    description: "Hand-selected 240 count cashews roasted and lightly salted.",
    ingredients: ["Cashews", "Salt"],
    variants: [g("50 g", 78), g("100 g", 143), g("150 g", 211), g("200 g", 275)],
    status: "active",
  },
  {
    slug: "cashews-240-lime-pepper",
    name: "Cashews 240 — Lime & Pepper",
    category: "cashews",
    subcategory: "240 Count",
    tagline: "Big cashews, bright citrus, bold pepper.",
    description: "Hand-selected 240 count cashews with lime and pepper seasoning.",
    ingredients: ["Cashews", "Lime", "Pepper"],
    variants: [g("50 g", 82), g("100 g", 150), g("150 g", 223), g("200 g", 290)],
    status: "active",
  },

  // Trail mix
  {
    slug: "trail-mix-roasted-salted",
    name: "Trail Mix — Roasted & Salted",
    category: "trail-mix",
    tagline: "Nuts, seeds and berries for the everyday carry bag.",
    description:
      "Almonds, cashews, peanuts, black raisins, cranberry, pumpkin and sunflower seeds, roasted and lightly salted.",
    ingredients: [
      "Almonds",
      "Cashews",
      "Peanuts",
      "Black Raisins",
      "Cranberry",
      "Pumpkin Seeds",
      "Sunflower Seeds",
    ],
    variants: [g("50 g", 55), g("100 g", 95), g("150 g", 140), g("200 g", 180)],
    status: "active",
  },
  {
    slug: "trail-mix-protein-booster",
    name: "Trail Mix — Protein Booster",
    category: "trail-mix",
    tagline: "A seed-forward mix for active days.",
    description:
      "A protein-leaning blend of nuts, seeds and dried fruit for post-workout and mid-day snacking.",
    ingredients: [
      "Almonds",
      "Cashews",
      "Peanuts",
      "Pumpkin Seeds",
      "Sunflower Seeds",
      "Cranberry",
    ],
    variants: [g("50 g", 58), g("100 g", 101), g("150 g", 149), g("200 g", 191)],
    status: "active",
  },

  // Super snack
  {
    slug: "super-snack-achari-masti",
    name: "Super Snack — Achari Masti",
    category: "super-snack",
    tagline: "Tangy achari spice on nuts and seeds.",
    description:
      "Almonds, cashews, green raisins, pumpkin and sunflower seeds in a bright achari seasoning.",
    ingredients: [
      "Almonds",
      "Cashews",
      "Green Raisins",
      "Pumpkin Seeds",
      "Sunflower Seeds",
      "Achari Spice Mix",
    ],
    variants: [g("50 g", 64), g("100 g", 115), g("150 g", 169), g("200 g", 219)],
    status: "active",
  },

  // Nut mix
  {
    slug: "nut-mix-smoky-bbq",
    name: "Nut Mix — Smoky BBQ",
    category: "nut-mix",
    tagline: "Almonds and cashews with a smoky finish.",
    description: "A simple two-nut mix seasoned with smoky barbecue spices.",
    ingredients: ["Almonds", "Cashews", "Smoky BBQ Seasoning"],
    variants: [g("50 g", 85), g("100 g", 155), g("150 g", 229), g("200 g", 229)],
    status: "active",
  },

  // Health mix
  {
    slug: "omega-boost",
    name: "Omega Boost",
    category: "health-mix",
    tagline: "Five seeds, one wholesome spoonful.",
    description:
      "Pumpkin, sunflower, flax, chia and sesame seeds blended for everyday nourishment.",
    ingredients: ["Pumpkin Seeds", "Sunflower Seeds", "Flax Seeds", "Chia Seeds", "Sesame Seeds"],
    variants: [g("50 g", 44), g("100 g", 75), g("150 g", 109), g("200 g", 139)],
    status: "active",
  },
  {
    slug: "antioxidant-mix",
    name: "Antioxidant Mix",
    category: "health-mix",
    tagline: "Berries and seeds in one colourful mix.",
    description: "Blueberries, cranberries and goji berries with a seed mix.",
    ingredients: ["Blueberries", "Cranberries", "Goji Berries", "Seed Mix"],
    variants: [g("50 g", 57), g("100 g", 99), g("150 g", 146), g("200 g", 189)],
    status: "active",
  },
  {
    slug: "trail-mix-daily-dose",
    name: "Trail Mix — Daily Dose",
    category: "health-mix",
    tagline: "A balanced handful for every day.",
    description: "Almonds, cashews, pumpkin seeds, black raisins and cranberry.",
    ingredients: ["Almonds", "Cashews", "Pumpkin Seeds", "Black Raisins", "Cranberry"],
    variants: [g("50 g", 69), g("100 g", 126), g("150 g", 187), g("200 g", 241)],
    status: "active",
  },
  {
    slug: "trail-mix-fruit-nut",
    name: "Trail Mix — Fruit & Nut",
    category: "health-mix",
    tagline: "Sweet fruit meets crunchy nuts.",
    description: "Almonds, cashew and a bright fruit mix.",
    ingredients: ["Almonds", "Cashew", "Fruit Mix"],
    variants: [g("50 g", 70), g("100 g", 126), g("150 g", 187), g("200 g", 243)],
    status: "active",
  },
  {
    slug: "trail-mix-power-nut",
    name: "Trail Mix — Power Nut",
    category: "health-mix",
    tagline: "Nut-heavy mix with pistachios.",
    description: "Almonds, cashew, pistachios and black raisins.",
    ingredients: ["Almonds", "Cashew", "Pistachios", "Black Raisins"],
    variants: [g("50 g", 79), g("100 g", 144), g("150 g", 213), g("200 g", 247)],
    status: "active",
  },
  {
    slug: "panchmewa-mix",
    name: "Panchmewa Mix",
    category: "health-mix",
    tagline: "The classic five dry fruits, raw and pure.",
    description: "Raw almonds, cashews, black raisins, green raisins and dry dates.",
    ingredients: ["Raw Almonds", "Cashews", "Black Raisins", "Green Raisins", "Dry Dates"],
    variants: [g("50 g", 58), g("100 g", 101), g("150 g", 149), g("200 g", 192)],
    status: "active",
  },

  // Berry & fruit mix
  {
    slug: "masala-berry-mix",
    name: "Masala Berry Mix",
    category: "berry-fruit-mix",
    tagline: "Seven berries with a gentle masala lift.",
    description:
      "Blueberries, cranberries, raspberry, strawberry, golden berries, cherries and blackcurrants with iodised salt and a spice mix.",
    ingredients: [
      "Blueberries",
      "Cranberries",
      "Raspberry",
      "Strawberry",
      "Golden Berries",
      "Cherries",
      "Blackcurrants",
      "Iodised Salt",
      "Spices & Condiments Mix",
    ],
    variants: [g("50 g", 71), g("100 g", 128), g("150 g", 189), g("200 g", 245)],
    status: "active",
    bestSeller: true,
  },
  {
    slug: "masala-fruit-mix",
    name: "Masala Fruit Mix",
    category: "berry-fruit-mix",
    tagline: "Tropical fruit slices, chatpata style.",
    description: "Kiwi, papaya, pineapple, mango, pomelo, cranberries, blackcurrants and cherries.",
    ingredients: [
      "Kiwi",
      "Papaya",
      "Pineapple",
      "Mango",
      "Pomelo",
      "Cranberries",
      "Blackcurrants",
      "Cherries",
    ],
    variants: [g("50 g", 59), g("100 g", 103), g("150 g", 151), g("200 g", 195)],
    status: "active",
  },
  {
    slug: "masala-cranberry",
    name: "Masala Cranberry",
    category: "berry-fruit-mix",
    tagline: "Tart cranberry slices with a masala edge.",
    description: "Cranberry slices, seasoned for snacking.",
    ingredients: ["Cranberry Slices"],
    variants: [g("50 g", 56), g("100 g", 99), g("150 g", 145), g("200 g", 187)],
    status: "active",
  },
  {
    slug: "mango-raisins",
    name: "Mango Raisins",
    category: "berry-fruit-mix",
    tagline: "Long raisins with a mango character.",
    description: "Soft long raisins, naturally sweet.",
    ingredients: ["Long Raisins"],
    variants: [g("50 g", 51), g("100 g", 78), g("150 g", 129), g("200 g", 146)],
    status: "active",
  },

  // Edamame
  {
    slug: "edamame-roasted-salted",
    name: "Edamame — Roasted & Salted",
    category: "edamame",
    tagline: "Crunchy roasted soybeans, lightly salted.",
    description: "Roasted edamame with a clean, simple salting.",
    ingredients: ["Edamame", "Salt"],
    variants: [g("50 g", 46), g("75 g", 64), g("180 g", 135)],
    status: "active",
  },
  {
    slug: "edamame-honey-cinnamon",
    name: "Edamame — Honey Cinnamon",
    category: "edamame",
    tagline: "Sweet cinnamon warmth on crunchy edamame.",
    description: "Roasted edamame finished with honey and cinnamon.",
    ingredients: ["Edamame", "Honey", "Cinnamon"],
    variants: [g("50 g", 49), g("75 g", 65), g("180 g", 144)],
    status: "active",
  },
  {
    slug: "edamame-korean-kimchi",
    name: "Edamame — Korean Kimchi",
    category: "edamame",
    tagline: "Fiery kimchi seasoning.",
    description: "Roasted edamame with a lively Korean kimchi seasoning and a crisp finish.",
    ingredients: ["Edamame", "Kimchi Seasoning"],
    variants: [g("50 g", 49), g("75 g", 65), g("180 g", 144)],
    status: "active",
    newLaunch: true,
  },

  // Makhana
  {
    slug: "mastana-makhana-peri-peri",
    name: "Mastana Makhana — Peri Peri",
    category: "mastana-makhana",
    tagline: "Light roasted foxnuts with peri peri heat.",
    subcategory: "Peri Peri",
    description: "Airy roasted makhana finished with a lively peri peri seasoning for a bold, satisfying crunch.",
    ingredients: ["Makhana", "Peri Peri Seasoning"],
    variants: [g("70 g jar", 189)],
    status: "active",
    newLaunch: true,
  },
  {
    slug: "mastana-makhana-mint",
    name: "Mastana Makhana — Mint",
    category: "mastana-makhana",
    tagline: "Cool mint on airy roasted foxnuts.",
    subcategory: "Mint",
    description: "Light roasted makhana seasoned with refreshing mint for a clean, herby finish.",
    ingredients: ["Makhana", "Mint Seasoning"],
    variants: [g("70 g jar", 189)],
    status: "active",
    newLaunch: true,
  },
  {
    slug: "mastana-makhana-himalayan-salt",
    name: "Mastana Makhana — Himalayan Salt",
    category: "mastana-makhana",
    tagline: "Simple, clean Himalayan salt.",
    subcategory: "Himalayan Salt",
    description: "Simply roasted makhana with Himalayan salt, made for an easy everyday snack.",
    ingredients: ["Makhana", "Himalayan Salt"],
    variants: [g("70 g jar", 189)],
    status: "active",
    newLaunch: true,
  },
  {
    slug: "mastana-makhana-cheese",
    name: "Mastana Makhana — Cheese",
    category: "mastana-makhana",
    tagline: "Savoury cheese seasoning.",
    subcategory: "Cheese",
    description: "Crunchy roasted makhana with a savoury cheese seasoning and a rich, comforting finish.",
    ingredients: ["Makhana", "Cheese Seasoning"],
    variants: [g("70 g jar", 189)],
    status: "active",
    newLaunch: true,
  },

  // Specialty
  {
    slug: "jabardast-dry-fruit-mix",
    name: "Jabardast Dry Fruit Mix",
    category: "specialty-collection",
    tagline: "A wholesome mix of dry fruits, seeds and bold spices.",
    description:
      "A wholesome mix of premium dry fruits, seeds and bold spices for flavourful everyday snacking.",
    ingredients: [
      "Almond",
      "Cashew",
      "Pumpkin Seeds",
      "Sunflower Seeds",
      "Cow Ghee",
      "Green Raisins",
      "Black Raisins",
      "Spices",
    ],
    variants: [],
    status: "coming-soon",
  },
  {
    slug: "almond-dragees",
    name: "Almond Dragees",
    category: "specialty-collection",
    tagline: "A specialty treat, arriving soon.",
    description: "Details for this specialty product are being finalised.",
    ingredients: [],
    variants: [],
    status: "coming-soon",
  },
  {
    slug: "almond-stuffed-dates",
    name: "Almond Stuffed Dates",
    category: "specialty-collection",
    tagline: "A specialty treat, arriving soon.",
    description: "Details for this specialty product are being finalised.",
    ingredients: [],
    variants: [],
    status: "coming-soon",
  },
  {
    slug: "assorted-bites",
    name: "Assorted Bites",
    category: "gift-assorted",
    tagline: "A selection of our bites in one box.",
    description: "Gifting details for this assortment are being finalised.",
    ingredients: [],
    variants: [],
    status: "coming-soon",
  },
  ...pendingFlavours,
];

export const formatINR = (paise: number) =>
  "₹" + Math.round(paise).toLocaleString("en-IN", { maximumFractionDigits: 0 });

export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);
export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
export const productsIn = (slug: string) => products.filter((p) => p.category === slug);

export const subcategorySlug = (value: string) =>
  value.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export const getSubcategoryLabel = (category: string, slug: string) =>
  categorySubcategories[category]?.find((label) => subcategorySlug(label) === slug);

export const productsInSubcategory = (category: string, subcategory: string) => {
  const needle = subcategorySlug(subcategory);
  return products.filter((product) => {
    if (product.category !== category) return false;
    return subcategorySlug(product.subcategory ?? "") === needle || subcategorySlug(product.name).includes(needle);
  });
};

export const getProductForSubcategory = (category: string, subcategory: string) =>
  productsInSubcategory(category, subcategory).find((p) => p.status !== "coming-soon") ??
  productsInSubcategory(category, subcategory)[0];

export const fromPrice = (p: Product) => {
  const prices = p.variants.map((v) => v.price).filter((v): v is number => v !== null);
  return prices.length ? Math.min(...prices) : null;
};

export const BRAND = {
  phone: "+91 84878 79935",
  phoneHref: "+918487879935",
  whatsapp:
    "https://wa.me/918487879935?text=" +
    encodeURIComponent("Hello The Nutri Bite, I would like to know more about your products."),
  instagram: "https://www.instagram.com/the_nutribite",
  factory: "Himmatnagar – Ambaji Highway, 383235, Gujarat, India",
  office:
    "SATVAM Parklane, Behind Aashka Hospital, Sargasan, Gandhinagar 382421, Gujarat, India",
};

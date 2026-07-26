/**
 * Ancient sites in and around Anuradhapura — the UNESCO-listed sacred city the resort sits
 * beside (about 2 km away). Facts here are the well-documented historical record; keep them
 * accurate. Images are in public/images/attractions/ — see CREDITS.md there (these are
 * CC-BY / CC-BY-SA / FAL and REQUIRE attribution, unlike the Unsplash images elsewhere).
 */
export type Attraction = {
  slug: string;
  name: string;
  /** One-line teaser for the card. */
  tagline: string;
  /** Rough distance/era chip shown on the card. */
  meta: string;
  /**
   * Optional Google Maps search query. Defaults to `${name}, Anuradhapura, Sri Lanka`, which
   * disambiguates the in-city sites; set this for places outside Anuradhapura (e.g. Wilpattu).
   */
  mapQuery?: string;
  /** Primary image — used for the card thumbnail and as the first slide in the dialog. */
  image: string;
  /** Extra images shown after `image` in the dialog carousel. Credit each in credits.ts. */
  gallery?: string[];
  alt: string;
  /** Full description for the details dialog. Two–three short paragraphs. */
  details: string[];
  /** Quick facts shown as a list in the dialog. */
  facts: { label: string; value: string }[];
};

export const ATTRACTIONS: Attraction[] = [
  {
    slug: "jaya-sri-maha-bodhi",
    name: "Jaya Sri Maha Bodhi",
    tagline: "The oldest living human-planted tree on earth.",
    meta: "3rd century BCE, 2 km away",
    image: "/images/attractions/jaya-sri-maha-bodhi.webp",
    gallery: [
      "/images/attractions/jaya-sri-maha-bodhi-2.webp",
      "/images/attractions/jaya-sri-maha-bodhi-3.webp",
      "/images/attractions/jaya-sri-maha-bodhi-4.webp",
      "/images/attractions/jaya-sri-maha-bodhi-5.webp",
      "/images/attractions/jaya-sri-maha-bodhi-6.webp",
      "/images/attractions/jaya-sri-maha-bodhi-7.webp",
    ],
    alt: "The sacred Jaya Sri Maha Bodhi fig tree with Buddhist prayer flags in Anuradhapura",
    details: [
      "A sacred fig (Ficus religiosa) grown from a cutting of the Bodhi tree in Bodh Gaya under which the Buddha attained enlightenment. It was brought to Sri Lanka by the Buddhist nun Sanghamitta and planted here in 288 BCE.",
      "With a continuous, documented history of tending stretching back more than 2,300 years, it is the oldest living human-planted tree in the world with a known planting date. It remains one of Buddhism's most revered relics and draws pilgrims from across the country.",
    ],
    facts: [
      { label: "Planted", value: "288 BCE" },
      { label: "Age", value: "2,300 years" },
      { label: "Significance", value: "Grown from the original Bodhi tree" },
    ],
  },
  {
    slug: "ruwanwelisaya",
    name: "Ruwanwelisaya",
    tagline: "A gleaming white stupa and a masterwork of the ancient kingdom.",
    meta: "2nd century BCE, 2 km away",
    image: "/images/attractions/ruwanwelisaya.webp",
    gallery: [
      "/images/attractions/ruwanwelisaya-2.webp",
      "/images/attractions/ruwanwelisaya-3.webp",
      "/images/attractions/ruwanwelisaya-4.webp",
    ],
    alt: "The white dome of the Ruwanwelisaya stupa in Anuradhapura",
    details: [
      "Built by King Dutugemunu around 140 BCE after he unified the island, Ruwanwelisaya, also called the Great Stupa or Mahathupa, is one of the most venerated Buddhist monuments in Sri Lanka.",
      "The brilliant white dome rises about 103 metres and is ringed by a wall of stone elephants. Restored over the centuries, it is a highlight of any visit to the sacred city, especially when floodlit at dusk.",
    ],
    facts: [
      { label: "Built by", value: "King Dutugemunu, c. 140 BCE" },
      { label: "Height", value: "103 m" },
      { label: "Known as", value: "The Great Stupa (Mahathupa)" },
    ],
  },
  {
    slug: "lovamahapaya",
    name: "Lovamahapaya",
    tagline: "A forest of 1,600 stone pillars, all that remains of a nine-storey palace.",
    meta: "2nd century BCE, 2 km away",
    image: "/images/attractions/lovamahapaya.webp",
    gallery: [
      "/images/attractions/lovamahapaya-2.webp",
      "/images/attractions/lovamahapaya-3.webp",
    ],
    alt: "The field of stone pillars of the Lovamahapaya (Brazen Palace) in Anuradhapura",
    details: [
      "Also known as the Brazen Palace or Lohaprasada, Lovamahapaya was built by King Dutugemunu around 160 BCE as a monastic residence and chapter house for the monks of the Maha Vihara. It took its name from the bronze tiles that once roofed it.",
      "The building was said to rise nine storeys and house a thousand rooms. Only its base survives today, a striking grid of about 1,600 stone pillars that once supported the upper floors, standing between the Sri Maha Bodhi and Ruwanwelisaya.",
    ],
    facts: [
      { label: "Built by", value: "King Dutugemunu, c. 160 BCE" },
      { label: "Pillars", value: "About 1,600" },
      { label: "Known as", value: "The Brazen Palace (Lohaprasada)" },
    ],
  },
  {
    slug: "jetavanaramaya",
    name: "Jetavanaramaya",
    tagline: "Once among the tallest structures of the ancient world.",
    meta: "3rd century CE, 3 km away",
    image: "/images/attractions/jetavanaramaya.webp",
    gallery: [
      "/images/attractions/jetavanaramaya-2.webp",
      "/images/attractions/jetavanaramaya-3.webp",
      "/images/attractions/jetavanaramaya-4.webp",
      "/images/attractions/jetavanaramaya-5.webp",
      "/images/attractions/jetavanaramaya-6.webp",
      "/images/attractions/jetavanaramaya-7.webp",
      "/images/attractions/jetavanaramaya-8.webp",
      "/images/attractions/jetavanaramaya-9.webp",
    ],
    alt: "The red-brick dome of the Jetavanaramaya stupa in Anuradhapura",
    details: [
      "Constructed by King Mahasena around 273–301 CE, this colossal brick stupa once stood roughly 122 metres tall, at the time, the third-tallest structure in the world after two of the Egyptian pyramids, and the largest stupa ever built.",
      "An estimated 93 million bricks went into its construction. Its exposed red-brick dome, no longer plastered white, gives it a striking, earthy presence quite different from the island's other great stupas.",
    ],
    facts: [
      { label: "Built by", value: "King Mahasena, c. 273–301 CE" },
      { label: "Original height", value: "122 m" },
      { label: "Bricks used", value: "93 million" },
    ],
  },
  {
    slug: "abhayagiri",
    name: "Abhayagiri Dagoba",
    tagline: "The heart of a great monastic city.",
    meta: "1st century BCE, 4 km away",
    image: "/images/attractions/abhayagiri.webp",
    gallery: [
      "/images/attractions/abhayagiri-2.webp",
      "/images/attractions/abhayagiri-3.webp",
      "/images/attractions/abhayagiri-4.webp",
    ],
    alt: "The large brick dome of the Abhayagiri stupa in Anuradhapura",
    details: [
      "Abhayagiri was one of the most important monasteries in the ancient Buddhist world, founded around 88 BCE by King Valagamba. At its height it was a major seat of learning that drew monks and scholars from as far as China.",
      "The Chinese monk Faxian stayed here in the 5th century CE and recorded a thriving community of several thousand monks. The vast restored brick stupa anchors a sprawling complex of ruins, ponds and monastic remains.",
    ],
    facts: [
      { label: "Founded", value: "c. 88 BCE, King Valagamba" },
      { label: "Was", value: "A world centre of Buddhist learning" },
      { label: "Visited by", value: "Faxian, 5th century CE" },
    ],
  },
  {
    slug: "thuparamaya",
    name: "Thuparamaya",
    tagline: "The first stupa built in Sri Lanka.",
    meta: "3rd century BCE, 2 km away",
    image: "/images/attractions/thuparamaya-3.webp",
    gallery: [
      "/images/attractions/thuparamaya.webp",
      "/images/attractions/thuparamaya-2.webp",
    ],
    alt: "The Thuparamaya stupa ringed by ancient stone pillars in Anuradhapura",
    details: [
      "Thuparamaya is regarded as the earliest stupa built in Sri Lanka, raised by King Devanampiya Tissa in the 3rd century BCE soon after Buddhism arrived on the island. It is believed to enshrine the right collarbone relic of the Buddha.",
      "The stupa is encircled by rows of slender stone pillars, the remains of a vatadage, a wooden roof that once sheltered it. The graceful ring of columns makes it one of the most photographed sites in the sacred city.",
    ],
    facts: [
      { label: "Built by", value: "King Devanampiya Tissa, 3rd c. BCE" },
      { label: "Distinction", value: "Sri Lanka's first stupa" },
      { label: "Feature", value: "Ring of vatadage stone pillars" },
    ],
  },
  {
    slug: "samadhi-statue",
    name: "Samadhi Statue",
    tagline: "A serene Buddha carved in deep meditation.",
    meta: "4th century CE, 3 km away",
    image: "/images/attractions/samadhi-statue.webp",
    gallery: [
      "/images/attractions/samadhi-statue-2.webp",
      "/images/attractions/samadhi-statue-3.webp",
    ],
    alt: "The ancient stone Samadhi Buddha statue seated in meditation, Anuradhapura",
    details: [
      "Dating to around the 4th century CE, the Samadhi Statue depicts the Buddha seated in the dhyana mudra, the posture of deep meditation, with a calm, inward expression widely admired as one of the finest of its kind.",
      "Carved from dolomite marble, it was praised by Jawaharlal Nehru, who is said to have found solace in a photograph of it during his imprisonment. The statue sits quietly among trees in the Mahamewna gardens.",
    ],
    facts: [
      { label: "Era", value: "4th century CE" },
      { label: "Posture", value: "Dhyana mudra (meditation)" },
      { label: "Material", value: "Dolomite marble" },
    ],
  },
  {
    slug: "isurumuniya",
    name: "Isurumuniya",
    tagline: "A rock temple famed for its ancient carvings.",
    meta: "3rd century BCE, 3 km away",
    image: "/images/attractions/isurumuniya.webp",
    gallery: [
      "/images/attractions/isurumuniya-2.webp",
      "/images/attractions/isurumuniya-3.webp",
    ],
    alt: "The Isurumuniya rock temple beside its lotus pond in Anuradhapura",
    details: [
      "Isurumuniya is a rock temple built by King Devanampiya Tissa in the 3rd century BCE, set beside a lotus pond and carved into a natural boulder. It is celebrated for its exquisite stone reliefs.",
      "The most famous of these is the 'Isurumuniya Lovers', a graceful sculpture of a seated couple that has become one of the best-known images of ancient Sri Lankan art. A small museum on site displays further carvings.",
    ],
    facts: [
      { label: "Built by", value: "King Devanampiya Tissa, 3rd c. BCE" },
      { label: "Famous for", value: "The 'Isurumuniya Lovers' carving" },
      { label: "Setting", value: "Rock temple beside a lotus pond" },
    ],
  },
  {
    slug: "kuttam-pokuna",
    name: "Kuttam Pokuna",
    tagline: "The elegant Twin Ponds of the ancient monks.",
    meta: "8th century CE, 4 km away",
    image: "/images/attractions/kuttam-pokuna.webp",
    gallery: [
      "/images/attractions/kuttam-pokuna-2.webp",
      "/images/attractions/kuttam-pokuna-3.webp",
    ],
    alt: "The carved stone steps of the Kuttam Pokuna twin bathing ponds in Anuradhapura",
    details: [
      "Kuttam Pokuna, the 'Twin Ponds', is a pair of beautifully cut stone bathing pools that served the monks of the Abhayagiri monastery. Though called twins, the two ponds differ in size, at roughly 28 and 40 metres long.",
      "They showcase the advanced hydraulic engineering of the ancient kingdom: water entered through a settling tank to filter silt, and carved makara (mythical creature) spouts and a five-hooded cobra adorn the stonework.",
    ],
    facts: [
      { label: "Era", value: "8th century CE" },
      { label: "Purpose", value: "Monastic bathing pools" },
      { label: "Notable", value: "Advanced water-filtration design" },
    ],
  },
  {
    slug: "mihintale",
    name: "Mihintale",
    tagline: "The cradle of Buddhism in Sri Lanka.",
    meta: "3rd century BCE, 15 km away",
    image: "/images/attractions/mihintale.webp",
    gallery: [
      "/images/attractions/mihintale-2.webp",
      "/images/attractions/mihintale-3.webp",
    ],
    alt: "The rocky peak of Mihintale, birthplace of Buddhism in Sri Lanka",
    details: [
      "Mihintale is the mountain where, in 247 BCE, the missionary monk Mahinda met King Devanampiya Tissa and introduced Buddhism to Sri Lanka, the moment that shaped the island's culture for the next two millennia.",
      "A grand staircase of 1,840 granite steps climbs the hillside past stupas, meditation caves and the ruins of an ancient monastery to panoramic views over the plains. It is a major pilgrimage site, especially during the Poson full-moon festival.",
    ],
    facts: [
      { label: "Year", value: "247 BCE" },
      { label: "Significance", value: "Where Buddhism reached Sri Lanka" },
      { label: "Climb", value: "1,840 granite steps" },
    ],
  },

  // ── Ancient reservoirs (wewa) ────────────────────────────────────────────────
  {
    slug: "tissa-wewa",
    name: "Tissa Wewa",
    tagline: "A royal reservoir over 2,200 years old.",
    meta: "3rd century BCE, 2 km away",
    image: "/images/attractions/tissa-wewa.webp",
    gallery: [
      "/images/attractions/tissa-wewa-2.webp",
      "/images/attractions/tissa-wewa-3.webp",
    ],
    alt: "The calm waters of Tissa Wewa reservoir at Anuradhapura",
    details: [
      "Tissa Wewa is one of the oldest of Anuradhapura's great irrigation tanks, built by King Devanampiya Tissa in the 3rd century BCE to supply the royal city and its gardens. It is a masterpiece of early hydraulic engineering.",
      "Fringed by the Tissawewa and royal pleasure gardens, its calm expanse is a favourite spot to watch the sunset, with the domes of the sacred city rising beyond the far shore.",
    ],
    facts: [
      { label: "Built by", value: "King Devanampiya Tissa, 3rd c. BCE" },
      { label: "Age", value: "2,300 years" },
      { label: "Purpose", value: "Supplied the royal city" },
    ],
  },
  {
    slug: "nuwara-wewa",
    name: "Nuwara Wewa",
    tagline: "The largest of Anuradhapura's ancient tanks.",
    meta: "2nd century BCE, 3 km away",
    image: "/images/attractions/nuwara-wewa.webp",
    gallery: [
      "/images/attractions/nuwara-wewa-2.webp",
      "/images/attractions/nuwara-wewa-3.webp",
    ],
    alt: "The wide open water of Nuwara Wewa, the largest tank at Anuradhapura",
    details: [
      "Nuwara Wewa is the largest of the three great reservoirs of ancient Anuradhapura, covering around 1,200 hectares. Built to store the monsoon rains, it fed the city and its paddy fields through a network of canals.",
      "Its vast, sea-like horizon makes it a superb place for birdwatching and sunrise walks, and it still irrigates farmland across the district today, a 2,000-year-old system that has never stopped working.",
    ],
    facts: [
      { label: "Era", value: "2nd century BCE" },
      { label: "Size", value: "1,200 hectares" },
      { label: "Distinction", value: "Largest of the three great tanks" },
    ],
  },
  {
    slug: "kala-wewa",
    name: "Kala Wewa",
    tagline: "A 5th-century engineering marvel fed by a 87 km canal.",
    meta: "5th century CE, 40 km away",
    mapQuery: "Kala Wewa Reservoir, Sri Lanka",
    image: "/images/attractions/kala-wewa.webp",
    gallery: [
      "/images/attractions/kala-wewa-2.webp",
      "/images/attractions/kala-wewa-3.webp",
    ],
    alt: "Sunset over the open water of Kala Wewa reservoir",
    details: [
      "Kala Wewa was built by King Dhatusena around 460 CE by damming the Kala Oya. The reservoir fed the ancient capital through the Jaya Ganga (Yoda Ela), a canal running roughly 87 km with a gradient of just centimetres per kilometre, a feat of precision that still astonishes engineers.",
      "The bund stretches for kilometres, and the nearby colossal Avukana Buddha statue, carved from a single rock face, makes the reservoir a rewarding day trip from the resort.",
    ],
    facts: [
      { label: "Built by", value: "King Dhatusena, c. 460 CE" },
      { label: "Feeds", value: "The 87 km Jaya Ganga canal" },
      { label: "Nearby", value: "The Avukana Buddha statue" },
    ],
  },
  {
    slug: "nachchaduwa-wewa",
    name: "Nachchaduwa Wewa",
    tagline: "A vast tank and a haven for birdlife.",
    meta: "Ancient, 10 km away",
    image: "/images/attractions/nachchaduwa-wewa.webp",
    gallery: [
      "/images/attractions/nachchaduwa-wewa-2.webp",
    ],
    alt: "The stone spillway and open water of Nachchaduwa Wewa reservoir",
    details: [
      "Nachchaduwa Wewa is a large ancient reservoir south-east of Anuradhapura, restored and still central to the region's irrigation. Its long bund and stone spillway are a fine example of the island's enduring tank cascade system.",
      "Quieter than the city tanks, it is rich in birdlife and framed by scrub jungle, a peaceful stop for those who want the landscape and wildlife of the dry zone rather than the crowds.",
    ],
    facts: [
      { label: "Type", value: "Ancient irrigation reservoir" },
      { label: "Known for", value: "Birdlife and scenery" },
      { label: "Setting", value: "Dry-zone scrub jungle" },
    ],
  },
  {
    slug: "wilpattu-national-park",
    name: "Wilpattu National Park",
    tagline: "Sri Lanka's largest national park and prime leopard country.",
    meta: "Est. 1938, 45 km away",
    mapQuery: "Wilpattu National Park, Sri Lanka",
    image: "/images/attractions/wilpattu.webp",
    gallery: [
      "/images/attractions/wilpattu-2.webp",
      "/images/attractions/wilpattu-3.webp",
      "/images/attractions/wilpattu-4.webp",
      "/images/attractions/wilpattu-5.webp",
      "/images/attractions/wilpattu-6.webp",
      "/images/attractions/wilpattu-7.webp",
      "/images/attractions/wilpattu-8.webp",
      "/images/attractions/wilpattu-9.webp",
      "/images/attractions/wilpattu-10.webp",
      "/images/attractions/wilpattu-11.webp",
      "/images/attractions/wilpattu-12.webp",
      "/images/attractions/wilpattu-13.webp",
      "/images/attractions/wilpattu-14.webp",
    ],
    alt: "A Sri Lankan leopard amid the greenery of Wilpattu National Park",
    details: [
      "Wilpattu is the largest and one of the oldest national parks in Sri Lanka, covering roughly 1,085 km² of dry-zone forest, scrub and grassland north-west of Anuradhapura. Its name means 'Land of Lakes', after the villus, natural sand-rimmed rainwater basins scattered across the park.",
      "It is among the best places in the country to see the elusive Sri Lankan leopard, alongside sloth bears, elephants, spotted deer, water buffalo and a wealth of birdlife. Designated a Ramsar wetland in 2013, it offers a quieter, wilder safari than the island's busier southern parks, an easy day trip from the resort.",
    ],
    facts: [
      { label: "Established", value: "1938" },
      { label: "Area", value: "1,085 km², the island's largest" },
      { label: "Famous for", value: "Sri Lankan leopard & villus (lakes)" },
    ],
  },
];

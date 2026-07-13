# Lovable Master Prompt — Dhanora Dynasty Resort

Paste the block below as your **first message** in Lovable. It builds the full design
system + all six pages in one shot. Then refine page-by-page (see `lovable-guide.md`).

> Tip: keep Lovable to **frontend only** — no backend/Supabase/auth. Claude Code ports
> this to Next.js and builds the real backend on the VPS.

---

```
Build the FRONTEND of a premium, modern luxury heritage resort website in React + Tailwind CSS
+ shadcn/ui. Frontend ONLY — no backend, no Supabase, no authentication. Use placeholder/dummy
data and high-quality stock placeholder images (resort, rooms, food, nature, Sri Lankan heritage).
Prioritize a polished, award-worthy, modern UI. Must be fully responsive (mobile-first),
accessible (WCAG AA, semantic HTML, alt text, keyboard-navigable), and fast.

────────────────────────────────────────
BRAND
────────────────────────────────────────
Name: Dhanora Dynasty Resort.
What: A luxury heritage resort in Anuradhapura, Sri Lanka — the ancient Rajarata kingdom.
Positioning: royal "dynasty" elegance + Sri Lankan cultural heritage + modern luxury.
Feeling: calm, premium, serene, trustworthy, regal.
Tagline: "Experience the timeless tranquility of Rajarata ancient kingdom."

────────────────────────────────────────
DESIGN SYSTEM
────────────────────────────────────────
Color palette (define as Tailwind theme tokens):
- Primary (deep oxblood):   #441C1A
- Primary-dark:             #2E1210
- Accent (royal gold):      #C9A227   (use for CTAs, underlines, icons, hairline dividers)
- Accent-soft (champagne):  #E8D8A6
- Background (ivory):       #F7F2E7
- Surface (warm white):     #FFFFFF
- Text (charcoal):          #1A1A1A
- Muted text:               #5C5C56
Use oxblood + gold as the signature pairing. Gold is an accent only — never flood it.

Typography:
- Headings: an elegant serif — "Playfair Display" (or Cormorant Garamond). Tight tracking,
  generous line-height, large display sizes on hero.
- Body/UI: a clean sans-serif — "Inter" (or Poppins).
- Establish a clear type scale (display, h1–h4, body, small). Use uppercase letter-spaced
  labels (e.g., section eyebrows) in gold.

Visual language / components:
- Generous whitespace, large editorial imagery, 12-col responsive grid.
- Cards: rounded-2xl, subtle border, soft shadow, gentle hover lift + image zoom.
- Buttons: primary = gold fill on oxblood text or oxblood fill; secondary = outline; ghost.
  Rounded-full or rounded-xl, clear focus rings.
- Gold hairline dividers; faint mandala/lotus motif as decorative accents (low opacity).
- Section "eyebrow" label (small gold uppercase) + serif heading + supporting paragraph pattern.
- Smooth on-scroll reveal animations (fade/slide up, staggered), subtle parallax on hero,
  smooth scrolling. Keep motion tasteful and performant; respect prefers-reduced-motion.
- Consistent section vertical rhythm; alternating ivory/white section backgrounds.

────────────────────────────────────────
GLOBAL LAYOUT
────────────────────────────────────────
Navbar (sticky, transparent over hero → solid oxblood/ivory on scroll):
- Left: logo "Dhanora Dynasty" (serif wordmark + small crown/mandala mark).
- Center/right links: Home, About Us, Rooms, Menu, Gallery, Contact.
- Right CTA button "Inquire Now" → https://wa.me/94769725255 (opens new tab).
- Mobile: hamburger → full-screen elegant slide-in menu.

Footer (deep oxblood background, gold accents):
- Brand column: "Dhanora Dynasty" + "Experience luxury and royalty like never before in
  our exquisite resort." + social icons: Facebook (https://www.facebook.com/dhanoradynastyresortanuradhapura),
  Instagram (https://www.instagram.com/dhanora_dynasty_resort),
  TikTok (https://www.tiktok.com/@dhanora_dynasty_resort),
  YouTube (https://www.youtube.com/@DhanoraDynastyResort).
- Quick Links column: Home, About Us, Menu, Gallery, Contact.
- Contact Info column: "No 775/3, Bulankulama Disa Mawatha, Stage-11, Anuradhapura,
  Sri Lanka." | Phone: +94 76 972 5255 / +94 25 222 7274 | Email: dhanoradynastyresort@gmail.com.
- Bottom bar: "© 2025 Dhanora Dynasty Resort. All Rights Reserved."
- Floating WhatsApp button (bottom-right, all pages) → the wa.me link.

Routing (React Router): /  /about  /rooms  /menu  /gallery  /contact

────────────────────────────────────────
PAGE 1 — HOME ( / )
────────────────────────────────────────
1. HERO (full viewport): cinematic background image of the resort with dark oxblood
   gradient overlay. Eyebrow "WELCOME TO ANURADHAPURA". Big serif headline "DHANORA DYNASTY".
   Subtitle "Experience the timeless tranquility of Rajarata ancient kingdom." Two buttons:
   "Inquire Now" (gold, → WhatsApp) and "Explore Rooms" (outline, → /rooms). Subtle scroll-down cue.
2. INTRO: eyebrow "A ROYAL RETREAT", heading "A Sanctuary in the Sacred City", and this copy:
   "Nestled in the heart of the ancient city of Anuradhapura, Dhanora Dynasty Resort invites
   you to experience a perfect harmony of luxury, tranquility, and cultural charm. Surrounded
   by the timeless beauty of Sri Lanka's historic kingdom, the resort enjoys an ideal location
   near the serene Kubichchankulama Lake — just 2 km from the sacred city and its iconic
   landmarks such as the revered Jaya Sri Maha Bodhi and the majestic Ruwanwelisaya."
   Pair with an elegant image collage. Add small stat chips: "2 km to Sacred City",
   "6 Unique Rooms", "Lakeside Location".
3. OUR AMENITIES: eyebrow "OUR AMENITIES", heading "Crafted for Royal Comfort". 6 icon cards:
   - Royal Suites — "Experience royal comfort in our elegantly designed suites with panoramic views and premium amenities."
   - Ayurvedic Wellness — "Indulge in rejuvenating treatments inspired by ancient wellness traditions in our world-class spa."
   - Fine Dining — "Savor exquisite cuisines prepared by master chefs in our signature restaurants."
   - Infinity Pool — "Relax in our stunning infinity pool with breathtaking views of the surrounding landscape."
   - Fitness Center — "Maintain your wellness routine in our state-of-the-art fitness facility."
   - Concierge — "Our dedicated staff ensures every need is met with royal attention to detail."
   Include a small highlight badge "24/7 Royal Service".
4. WELCOME / WHY US (image + text, two columns): eyebrow "WELCOME TO DHANORA DYNASTY",
   heading "A Royal Escape Crafted With Elegance, Comfort, and Timeless Charm", copy:
   "At Dhanora Dynasty, every detail is designed to deliver a refined hospitality experience.
   From luxurious suites and breathtaking surroundings to personalized service and fine dining,
   our hotel blends grandeur with warmth to create truly memorable stays." Gold checklist:
   Luxury Rooms · Signature Dining Experience · Scenic Relaxation Spaces · Warm Personalized Service.
5. EXPERIENCES / LUXURY FEATURES: eyebrow "OUR EXPERIENCES", 3 large feature cards with imagery:
   - Elite Fitness Center — "Stay energized with modern equipment and a refined workout environment designed for comfort and performance."
   - Infinity Pool — "Relax in a stunning infinity pool with scenic surroundings and a calm, luxurious atmosphere."
   - Smart Kitchen & Dining — "Experience refined cuisine prepared with innovation, quality ingredients, and exceptional service."
6. ROOMS PREVIEW: heading "Rooms Fit for Royalty", a horizontal scroll/carousel of 3–4 room
   cards (image, name, short line) with a "View All Rooms" button → /rooms.
7. MENU PREVIEW: eyebrow "FROM OUR KITCHEN", heading "Savor the Taste of Tradition", category
   tabs (All, Appetizer, Soup, Main Course, Dessert, Drinks) showing a few sample dishes,
   plus "View Full Menu" button → /menu.
8. NEARBY ATTRACTIONS: heading "Discover the Ancient Kingdom", cards for nearby sites
   (Jaya Sri Maha Bodhi, Ruwanwelisaya, Kubichchankulama Lake, Wilpattu National Park safaris).
9. CLOSING CTA (full-width oxblood band with image): heading "Begin Your Royal Journey",
   copy "Discover the perfect blend of luxury, comfort, and hospitality at Dhanora Dynasty
   Resort. Let us create unforgettable memories for you.", button "Make an Inquiry" → /contact.

────────────────────────────────────────
PAGE 2 — ABOUT US ( /about )
────────────────────────────────────────
- Page hero/banner: "About Us" + "Welcome to Dhanora Dynasty".
- Vision & Mission as two elegant cards side by side:
  Vision: "To be the crown jewel of hospitality where blending heritage and modern luxury
  to create a haven of serenity and unforgettable experiences."
  Mission: "To provide every guest with a service-driven journey of comfort and care by
  offering luxurious accommodation, tranquil atmosphere, cultural heritage, authentic flavors
  and maintaining hygiene standards that feel like home."
- Owner's Message section (portrait left, text right): name "Kelum Senanayaka", title
  "Founder & Managing Director", message:
  "Welcome to Dhanora Dynasty Resort, where timeless tranquility meets warm Sri Lankan
  hospitality. Nestled in the heart of the historic city of Anuradhapura, our resort was
  created with a vision to offer guests a peaceful escape while embracing the rich cultural
  heritage of Rajarata. Every corner of Dhanora Dynasty Resort reflects our commitment to
  comfort, elegance, and authentic experiences. We take great pride in providing a relaxing
  environment complemented by modern amenities, delicious cuisine, and a dedicated team ready
  to serve you with genuine care and friendliness. Thank you for choosing Dhanora Dynasty
  Resort. We look forward to welcoming you and creating unforgettable moments during your stay."
  Signature line: "Warm Regards, Dhanora Dynasty Team".
- Optional: a values/heritage strip + small image gallery.

────────────────────────────────────────
PAGE 3 — ROOMS ( /rooms )
────────────────────────────────────────
- Hero/banner: eyebrow "OUR ROOMS", heading "Comfort, Elegance & Heritage", subheading
  "A Room for Every Occasion", intro: "Each of our six uniquely designed rooms blends
  heritage elegance with modern comfort — crafted to offer you a truly memorable stay at
  Dhanora Dynasty."
- Grid of 6 room cards. Each card: image, room number badge, category tag, name, short
  description, two feature pills (beds + view), and a "View Details" button that opens a
  modal/expander with the full description:
  • Room 101 — tag "Peaceful Retreat" — "Twin Bed Room" — "Elegantly designed for comfort
    and relaxation, featuring two cozy single beds with serene backyard garden views." —
    Beds: 2 Single Beds — View: Garden View.
  • Room 102 — tag "VIP" — "VIP Family Room" — "Ultimate family comfort with a king-size bed,
    children's room, private terrace dining, and garden views." — Beds: King + Single Bed —
    View: Front Garden & Terrace.
  • Room 103 — tag "Luxury" — "Luxury Single Room" — "An elegantly appointed single room with
    private balcony pool views, shared lounge, and terrace dining access." — Beds: 1 Single Bed —
    View: Pool & Garden View.
  • Room 104 — tag "Deluxe" — "Deluxe Double Room" — "Spacious deluxe room with queen and
    single beds, sofa set, and shared terrace dining with garden views." — Beds: Queen + Single
    Bed — View: Front Garden.
  • Room 105 — tag "Suite" — "Entertaining Suite Room" — "A stunning suite with king bed,
    private terrace surrounded by a charming flower garden — elegance meets tranquility." —
    Beds: 1 King Bed — View: Private Flower Garden.
  • Room 106 — tag "Deluxe" — "Deluxe Family Room" — "A spacious family room with private
    balcony offering rare views of ancient pagodas and a tranquil lake." — Beds: King + Single
    Bed — View: Pagoda & Lake View.
- Closing CTA band: heading "Ready to Experience Royalty?", copy "Contact us to check
  availability and reserve your room today.", button "Make a Reservation" → /contact.

────────────────────────────────────────
PAGE 4 — MENU ( /menu )
────────────────────────────────────────
- Hero/banner: heading "Menu", subheading "Savor the Taste of Tradition".
- Sticky filter tabs: All · Appetizer · Soup · Main Course · Dessert · Drinks (filter the cards).
- Dish cards (image optional, name + description), grouped by category:
  Appetizers:
   - Spring Rolls — "Crispy golden rolls filled with fresh vegetables and aromatic herbs, served with sweet chili sauce."
   - Bruschetta — "Toasted bread topped with fresh tomatoes, garlic, basil, and extra virgin olive oil."
   - Stuffed Mushrooms — "Button mushrooms filled with herbed cheese and breadcrumbs, baked to perfection."
  Soups:
   - French Onion Soup — "Classic caramelized onion soup topped with melted cheese and toasted croutons."
   - Cream of Mushroom — "Rich and velvety mushroom soup with hints of thyme and cream."
   - Tomato Basil Soup — "Fresh tomatoes simmered with basil, garlic, and a touch of cream."
  Main Course:
   - Grilled Salmon — "Fresh Atlantic salmon grilled to perfection, served with lemon butter sauce and seasonal vegetables."
   - Beef Tenderloin — "Premium cut beef cooked to your preference, served with truffle mashed potatoes."
   - Chicken Cordon Bleu — "Tender chicken breast stuffed with ham and Swiss cheese, breaded and baked golden."
  Desserts:
   - Chocolate Lava Cake — "Warm chocolate cake with a molten center, served with vanilla ice cream."
   - Tiramisu — "Classic Italian dessert with coffee-soaked ladyfingers and mascarpone cream."
   - Crème Brûlée — "Silky vanilla custard with a caramelized sugar crust."
  Drinks:
   - Fresh Juices — "Orange, Apple, Pineapple, or Mixed Berry."
   - Specialty Coffee — "Cappuccino, Latte, Espresso, or Mocha."
   - Iced Tea — "Refreshing iced tea with lemon and mint."

────────────────────────────────────────
PAGE 5 — GALLERY ( /gallery )
────────────────────────────────────────
- Hero/banner: heading "Gallery", subheading "Moments at Dhanora Dynasty".
- Optional category filter (All, Rooms, Dining, Grounds, Wellness).
- Responsive masonry image grid with hover zoom + caption overlay.
- Click image → full-screen lightbox with prev/next, keyboard support, and counter.
- Use ~12 placeholder images. Lazy-load images.

────────────────────────────────────────
PAGE 6 — CONTACT ( /contact )
────────────────────────────────────────
- Hero/banner: heading "Contact", subheading "Contact Us for More Details".
- Two-column layout:
  Left — inquiry form (styled, with validation states; non-functional placeholder submit):
   fields Name, E-mail, Contact Number, Message; submit button "Send Inquire".
  Right — contact details card: address "No 775/3, Bulankulama Disa Mawatha, Stage-11,
   Anuradhapura, Sri Lanka.", phones "+94 76 972 5255 / +94 25 222 7274",
   email "dhanoradynastyresort@gmail.com", a "Chat on WhatsApp" button → wa.me link,
   and social icons.
- Full-width embedded map placeholder (Anuradhapura, near Kubichchankulama Lake).

────────────────────────────────────────
DELIVERY
────────────────────────────────────────
Start by setting up the Tailwind theme tokens, fonts, shared UI components, the sticky
navbar, the footer, the floating WhatsApp button, and all six page scaffolds with the
content above. Make it cohesive, elegant, and modern. I'll then refine each page.
```

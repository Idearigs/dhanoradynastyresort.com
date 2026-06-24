# Lovable Playbook — Building the Dhanora Dynasty Frontend

Lovable's job in this project: **generate a beautiful, responsive React + Tailwind UI fast and for free.** It is NOT building our backend, auth, database, or admin panel — Claude Code does that, and Claude Code will port this UI into Next.js for SEO.

So when prompting Lovable: **frontend only, dummy data, no Supabase, no backend.** That keeps the export clean to port.

---

## 1. Setup (do once)

1. Sign up at **lovable.dev** (free tier = limited messages/credits per day — so be efficient, see §4).
2. Create a new project.
3. **Connect it to GitHub** (Lovable → GitHub integration). This creates a synced repo so Claude Code can read the generated code and port it. This is the handoff bridge — do it early.

## 2. The workflow

1. **First message = the whole design system + all page scaffolds** (the master prompt below). One big well-structured prompt gets you 80% in one shot and saves credits.
2. **Then refine the highest-value pages** one at a time: Home → Rooms → Gallery → Menu → About → Contact.
3. **Export/sync to GitHub** whenever a page looks good.
4. Hand to Claude Code to port into Next.js (the public site) — see PROJECT-PLAN.md.

## 3. Master prompt — paste this as your FIRST message

```
Build the FRONTEND ONLY of a luxury heritage resort website in React + Tailwind CSS.
No backend, no Supabase, no auth — use placeholder/dummy data and stock placeholder
images. Make it fully responsive (mobile-first), accessible, and visually premium.

BRAND
Name: Dhanora Dynasty Resort. A luxury heritage resort in Anuradhapura, Sri Lanka,
in the ancient Rajarata kingdom. Mood: royal "dynasty" elegance + Sri Lankan heritage
+ modern luxury. Calm, premium, trustworthy. Tagline: "Experience the timeless
tranquility of Rajarata ancient kingdom."

DESIGN SYSTEM
- Colors: deep emerald green (primary), royal gold (accent), warm ivory/cream
  (background), charcoal (text). Subtle gold hairline dividers; faint mandala motif accents.
- Type: elegant serif for headings (Playfair Display or Cormorant Garamond),
  clean sans-serif for body (Inter or Poppins).
- Style: generous whitespace, large hero imagery, rounded-2xl cards, soft shadows,
  smooth on-scroll fade/slide animations, sticky navbar that goes transparent→solid on scroll.

GLOBAL
- Navbar links: Home, About Us, Rooms, Menu, Gallery, Contact. Header CTA button
  "Inquire Now" linking to WhatsApp https://wa.me/94769725255.
- Footer: brand blurb "Experience luxury and royalty like never before in our exquisite
  resort." + Quick Links + Contact info (address: No 775/3, Bulankulama Disa Mawatha,
  Stage-11, Anuradhapura, Sri Lanka; phones +94 76 972 5255 / +94 25 222 7274;
  email dhanoradynastyresort@gmail.com) + social icons (Facebook, Instagram, TikTok, YouTube).
- Routing with React Router: /, /about, /rooms, /menu, /gallery, /contact.

PAGES (build all six as scaffolds now; I'll refine each next):
- HOME: full-screen hero ("DHANORA DYNASTY" + tagline + Inquire Now); intro paragraph;
  "Our Amenities" grid (Royal Suites, Ayurvedic Wellness, Fine Dining, Infinity Pool,
  Fitness Center, Concierge) with a "24/7 Royal Service" badge; "Welcome" section with a
  4-item feature checklist; "Our Experiences / Luxury Features" 3-card section; a menu
  preview with category tabs; a nearby-attractions section; closing CTA "Begin Your Royal Journey".
- ABOUT: header; Vision & Mission cards; Owner's Message (Kelum Senanayaka, Founder &
  Managing Director) with portrait.
- ROOMS: header "Our Rooms / Comfort, Elegance & Heritage"; grid of 6 room cards
  (101 Twin/Garden, 102 VIP Family, 103 Luxury Single, 104 Deluxe Double, 105 Suite,
  106 Deluxe Family) each with image, badge, beds, view, "View Details"; closing CTA "Make a Reservation".
- MENU: header "Menu / Savor the Taste of Tradition"; filter tabs (All, Appetizer, Soup,
  Main Course, Dessert, Drinks); cards of dishes with name + description.
- GALLERY: masonry/grid image gallery with lightbox; pagination.
- CONTACT: "Contact Us for More Details"; inquiry form (Name, E-mail, Contact Number,
  Message, "Send Inquire" button); contact details block; map placeholder; social links.

Start by setting up the design system, layout, navbar, footer, and all six page scaffolds.
```

> Full per-page content (exact copy, room details, menu items) lives in the `content/`
> folder of this repo — paste the relevant page's content when you refine that page.

## 4. Per-page refinement prompts (one page per message)

- **Home:** "Refine the Home page. Use this exact copy: [paste content/01-home/home.md]. Make the hero cinematic, amenities as elegant icon cards, and add subtle scroll animations."
- **Rooms:** "Refine the Rooms page with these 6 rooms and their details: [paste content/03-rooms/rooms.md]. Each card opens a detail modal with the description, beds, and view."
- **Menu:** "Refine the Menu page. Categories and dishes: [paste content/04-menu/menu.md]. Make the filter tabs filter the cards."
- **Gallery / About / Contact:** same pattern with their content files.

## 5. Rules to conserve Lovable credits

- Batch instructions — one rich prompt beats five small ones.
- Spend credits on **visual polish**, not logic. Forms can be non-functional placeholders; Claude Code wires them.
- Don't ask Lovable for the admin panel, login, or database — that's Claude Code on the VPS backend.
- When a page looks good, **sync to GitHub and stop touching it**.

## 6. Handoff to Claude Code

Once the Lovable repo is on GitHub, Claude Code will:
1. Read the generated components.
2. Recreate them inside our **Next.js (App Router)** app for SSR/SSG SEO.
3. Replace dummy data with live data from our VPS API (menu + gallery).
4. Add SEO (metadata, sitemap, JSON-LD), and connect the contact form.

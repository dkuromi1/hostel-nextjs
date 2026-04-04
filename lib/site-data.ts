export const siteConfig = {
  name: "Scodrinon Hostel",
  shortName: "Scodrinon",
  tagline: "The hostel you won't want to leave",
  description:
    "A chill, social, and safe hostel on Kole Idromeno street in Shkoder with privacy pods, rooftop sunsets, breakfast, and direct WhatsApp booking.",
  location: "Kole Idromeno Street, Shkoder, 4001, Albania",
  phoneDisplay: "+355 67 677 7117",
  phoneRaw: "355676777117",
  whatsappUrl:
    "https://wa.me/355676777117?text=Hi%20Scodrinon%20Hostel%2C%20I%E2%80%99d%20like%20to%20book%20a%20bed.",
  bookingUrl: "https://www.booking.com/hotel/al/scodrinon-hostel.html",
  hostelworldUrl:
    "https://www.hostelworld.com/hostels/p/325721/scodrinon-hostel/",
  instagramUrl: "https://www.instagram.com/scodrinon_hostel/",
  breakfastHours: "9:00 to 10:30am (excl. off season)",
  baseKeywords: [
    "Scodrinon Hostel",
    "hostel in Shkoder",
    "hostel in Shkoder Albania",
    "privacy pod hostel Albania",
    "Shkoder backpacker hostel",
    "Theth Valbona hostel base",
  ],
} as const;

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/rooms", label: "Rooms" },
  { href: "/experiences", label: "Experiences" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
] as const;

export const heroHighlights = [
  "Privacy pods with curtains, reading lights, sockets, and lockers",
  "Rooftop sunsets with mountain and city views",
  "Historic home on lively Kole Idromeno street",
  "A calm, social vibe that feels safe for solo travelers",
] as const;

export const quickFacts = [
  "18-bed mixed dorm with spacious privacy pods",
  "4-bed dorms with male and female options",
  "Free breakfast (excl. off season), WiFi, luggage storage, and 24h access",
  "Bike rentals, tours, laundry, and rooftop social events",
] as const;

export const roomTypes = [
  {
    name: "18-Bed Pod Dorm",
    label: "Best for solo travelers who want privacy without losing the hostel vibe",
    description:
      "The signature room at Scodrinon pairs the energy of a social hostel with the comfort of a private sleep setup.",
    image: "/images/rooms_1.jpg",
    alt: "Privacy pod dorm room at Scodrinon Hostel in Shkoder",
    bullets: [
      "Curtained pod layout for real personal space",
      "Reading light and power socket at every bed",
      "Air-con, secure locker, and fast WiFi included",
      "Easy to meet people without feeling exposed all night",
    ],
  },
  {
    name: "4-Bed Dorms",
    label: "Best for lighter sleepers, small groups, and guests wanting a calmer setup",
    description:
      "The four-bed rooms keep the same clean, modern essentials while giving you a quieter rhythm after a long day out in Shkoder or the Alps.",
    image: "/images/rooms_2.jpg",
    alt: "Four-bed dorm room at Scodrinon Hostel",
    bullets: [
      "Male and female options available",
      "Air-con, lockers, reading lights, and sockets",
      "Good fit for early hikes and slower mornings",
      "A solid balance between privacy and price",
    ],
  },
] as const;

export const sharedAmenities = [
  "Air-con in all rooms",
  "Secure lockers",
  "Reading lights",
  "Power sockets",
  "High-speed WiFi",
  "Clean modern bathrooms",
  "Free breakfast (excl. off season)",
  "24h access",
] as const;

export const freeServices = [
  "Breakfast every morning from 9:00 to 10:30am",
  "Early take-away breakfast when you need to leave sooner",
  "High-speed WiFi in rooms and common areas",
  "Luggage storage before or after your stay",
  "Rooftop social events and a helpful WhatsApp group",
] as const;

export const paidServices = [
  "Bike rentals for city rides and lakeside days",
  "Guided bike and walking tours",
  "Laundry for longer trips",
] as const;

export const extendReasons = [
  {
    title: "Sleep well, still meet people",
    description:
      "Privacy pods give you a reset button after a long day in the mountains, so the social side of hostel life stays a choice, not a chore.",
  },
  {
    title: "Rooftop nights, zero pressure",
    description:
      "Sunset views, easy conversation, and movie nights make it simple to connect without the space ever feeling chaotic. It’s social, but at your own pace.",
  },
  {
    title: "Everything starts right outside",
    description:
      "You’re already on Shkoder's main pedestrian street, surrounded by local eats, museums, and nightlife. Whether you're heading to the Alps or the coast, transport is just a short walk away.",
  },
  {
    title: "Staff who keep things straightforward",
    description:
      "Honest local tips, breakfast that guests talk about, and help with your hiking route. We handle the logistics so you can focus on the trip.",
  },
] as const;

export const experiencePillars = [
  {
    title: "Rooftop Magic",
    description:
      "The rooftop is the social heart of the hostel: mountain light at sunset, city views after dark, and a pace that feels relaxed from the first drink to the last chat.",
    image: "/images/rooftop_social.jpg",
    alt: "Guests relaxing on the Scodrinon Hostel rooftop at sunset",
  },
  {
    title: "Adventure Basecamp",
    description:
      "Use Shkoder as your launch point for Theth and Valbona, Lake Shkoder kayaking and swims, river excursions, and onward travel toward Montenegro, Tirane, or Sarande.",
    image: "/images/rooftop_view_day.jpg",
    alt: "Daytime rooftop view from Scodrinon Hostel over Shkoder",
  },
  {
    title: "Culture at Your Door",
    description:
      "Step outside into Kole Idromeno street for coffee, dinner, museums, nightlife, Rozafa Castle plans, and the everyday rhythm that makes Shkoder feel memorable.",
    image: "/images/street.jpg",
    alt: "Street scene around Kole Idromeno near Scodrinon Hostel",
  },
] as const;

export const eventCards = [
  {
    title: "Biking",
    description:
      "Ride through Shkoder's easy streets and open edges with local guidance and plenty of pause points.",
    image: "/images/event_bike_tour.png",
    alt: "Bike tour event from Scodrinon Hostel",
  },
  // {
  //   title: "Walking Tours",
  //   description:
  //     "A relaxed way to understand the city's architecture, stories, and hidden corners beyond the obvious stops.",
  //   image: "/images/event_walking_tour.png",
  //   alt: "Walking tour event from Scodrinon Hostel",
  // },
  {
    title: "Local Food Nights",
    description:
      "Whether it’s rooftop raki or a local food crawl, we keep things social. It’s a warm, local atmosphere that’s easy to join—especially if you arrived alone.",
    image: "/images/event_traditional_food.png",
    alt: "Traditional food event at Scodrinon Hostel",
  },
  {
    title: "River Days at the Drin",
    description:
      "We head out to the river regularly for swimming and sun. These trips are a hostel favorite—a chance to see a different side of Shkoder and spend the afternoon with a great crew.",
    image: "/images/event_happy_hour.png",
    alt: "Guests enjoying an evening event at Scodrinon Hostel",
  },
] as const;

export const galleryItems = [
  {
    type: "image",
    src: "/images/rooftop_panorama.jpg",
    alt: "Panoramic rooftop view at Scodrinon Hostel",
    className: "md:col-span-8",
    aspect: "aspect-[16/8]",
  },
  {
    type: "video",
    src: "/videos/videoplayback.mp4",
    alt: "Short rooftop video from Scodrinon Hostel",
    className: "md:col-span-4",
    aspect: "aspect-[4/5]",
  },
  {
    type: "image",
    src: "/images/rooms_1.jpg",
    alt: "Privacy pod dorm at Scodrinon Hostel",
    className: "md:col-span-5",
    aspect: "aspect-[5/4]",
  },
  {
    type: "image",
    src: "/images/rooftop_social2.png",
    alt: "Travelers socializing on the hostel rooftop",
    className: "md:col-span-4",
    aspect: "aspect-[4/5]",
  },
  {
    type: "image",
    src: "/images/breakfast.jpg",
    alt: "Breakfast served at Scodrinon Hostel",
    className: "md:col-span-3",
    aspect: "aspect-[4/5]",
  },
  {
    type: "image",
    src: "/images/ambiance_1.jpg",
    alt: "Common area ambiance at Scodrinon Hostel",
    className: "md:col-span-4",
    aspect: "aspect-[4/5]",
  },
  {
    type: "image",
    src: "/images/rooftop_view_day2.jpg",
    alt: "Daytime rooftop outlook in Shkoder",
    className: "md:col-span-4",
    aspect: "aspect-[4/5]",
  },
  {
    type: "video",
    src: "/videos/videoplayback2.mp4",
    alt: "Traveler atmosphere video from Scodrinon Hostel",
    className: "md:col-span-4",
    aspect: "aspect-[4/5]",
  },
  {
    type: "image",
    src: "/images/rooftop_relax.png",
    alt: "Guests relaxing on the rooftop terrace at Scodrinon Hostel",
    className: "md:col-span-6",
    aspect: "aspect-[6/5]",
  },
  {
    type: "image",
    src: "/images/bar_3.jpg",
    alt: "Evening drinks and conversation at the hostel",
    className: "md:col-span-3",
    aspect: "aspect-[4/5]",
  },
  {
    type: "image",
    src: "/images/patio.jpg",
    alt: "Patio seating at Scodrinon Hostel",
    className: "md:col-span-3",
    aspect: "aspect-[4/5]",
  },
] as const;

export const faqItems = [
  {
    question: "How should I book direct?",
    answer:
      "Send your dates, bed preference, and approximate arrival time on WhatsApp. Direct booking is the main call to action on the site because it is the fastest way to get a clear answer from the team.",
  },
  {
    question: "Is Scodrinon good for solo travelers?",
    answer:
      "Yes. The hostel is social and welcoming, but it avoids the pressure-cooker party feel. That balance works especially well for solo travelers who want connection and rest in the same stay.",
  },
  {
    question: "Are the pods actually private?",
    answer:
      "The pod dorm is designed to give you real personal space: curtains, a reading light, two power sockets, and a locker. It feels much closer to a private sleep setup than a standard open dorm.",
  },
  {
    question: "Can the hostel help with Theth, Valbona, or local day trips?",
    answer:
      "Yes. Scodrinon works well as a base for Albanian Alps hikes, Lake Shkoder plans, river excursions, and onward travel. The staff can help you sort out the practical side.",
  },
  {
    question: "What is included in the stay?",
    answer:
      "Breakfast, WiFi, luggage storage, rooftop social events, and 24h access are included. Bike rentals, tours, and laundry are available as paid extras.",
  },
  {
    question: "What if I arrive early or leave late?",
    answer:
      "Luggage storage makes the awkward travel-day timing easier. Message on WhatsApp in advance if you want to coordinate around your arrival or departure.",
  },
] as const;

export const contactChecklist = [
  "Your dates",
  "How many guests are coming",
  "Whether you want the pod dorm or a 4-bed room",
  "Your arrival time into Shkoder",
  "Any hiking, bike, or river plans you want help with",
] as const;

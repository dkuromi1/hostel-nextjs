export const siteConfig = {
  name: "Scodrinon Hostel",
  shortName: "Scodrinon",
  tagline: "The hostel you won't want to leave",
  description:
    "A chill, social, and safe hostel on Kole Idromeno street in Shkoder with privacy pods, rooftop sunsets, breakfast, and direct WhatsApp booking.",
  location: "Kole Idromeno Street, Shkodër, 4001, Albania",
  phoneDisplay: "+355 68 531 0744",
  phoneRaw: "355685310744",
  whatsappUrl:
    "https://wa.me/355685310744?text=Hi%20Scodrinon%20Hostel%2C%20I%E2%80%99d%20like%20to%20book%20a%20bed.",
  bookingUrl: "https://www.booking.com/hotel/al/scodrinon-hostel.html",
  hostelworldUrl:
    "https://www.hostelworld.com/hostels/p/325721/scodrinon-hostel/",
  instagramUrl: "https://www.instagram.com/scodrinon_hostel/",
  breakfastHours: "9:00 to 10:30am (excl. off season)",
  baseKeywords: [
    "Scodrinon Hostel",
    "hostel in Shkoder",
    "hostel in Shkodra",
    "hostel in Shkoder Albania",
    "privacy pod hostel Albania",
    "Shkoder backpacker hostel",
    "Theth Valbona hostel base",
  ],
  checkInHours: "2pm - 10pm",
  // NOTE: to change the base price, edit the room price of the 18 bed under `roomTypes` below
} as const;

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/rooms", label: "Rooms" },
  { href: "/gallery", label: "Gallery" },
  { href: "/experiences", label: "Experiences" },
  { href: "/contact", label: "Contact" },
] as const;

export const heroHighlights = [
  "Privacy pods with curtains, reading lights, sockets, and lockers",
  "Rooftop sunsets with mountain and city views",
  "Historic home on lively Kole Idromeno street",
  "A calm, social vibe that feels safe for solo travelers",
] as const;

export const quickFacts = [
  "Spacious privacy pods in our mixed dorm create a personal bedroom feel within a social space",
  "Boutique 4-bed male or female dorms, offering a bright, high-end sanctuary for peaceful stays",
  "Free: breakfast (excl. off season), WiFi, luggage storage, 24h access, and rooftop social events",
  "Adventure-ready services including laundry, bike rentals, and transportation or tours arrangements",
] as const;

export const roomTypes = [
  {
    name: "18-Bed Pod Dorm",
    price: "€8",  //Edit Base Price here
    label: "Best for solo travelers who want privacy without losing the hostel vibe",
    description:
      "The signature room at Scodrinon pairs the energy of a social hostel with the comfort of a private sleep setup.",
    image: "/images/rooms_18bed.jpg",
    alt:
      "18-bed privacy pod dorm with curtained beds and personal space at Scodrinon Hostel, Shkoder",
    bullets: [
      "Curtained pod layout for real personal space",
      "Reading light and 2 power sockets at every bed",
      "Easy to meet people without feeling exposed all night",
    ],
  },
  {
    name: "4-Bed Dorms",
    price: "€10",
    label: "Best for lighter sleepers, small groups, and guests wanting a calmer setup",
    description:
      "The four-bed rooms keep the same clean, modern essentials while giving you a quieter rhythm after a long day out in Shkoder or the Alps.",
    image: "/images/rooms_1.jpg",
    alt: "Four-bed dorm room at Scodrinon Hostel, Shkoder",
    bullets: [
      "Male and female options available",
      "Good fit for early hikes and slower mornings",
      "A solid balance between privacy and price",
    ],
  },
] as const;

// Edit 18 bed carousel images here
export const podDormImages = [
  { src: "/images/rooms_18bed.jpg", alt: "Privacy Pod Dorm Room at Scodrinon Hostel" },
  { src: "/images/room_18bed4.jpg", alt: "Inside the privacy pod" },
  { src: "/images/secure_dorm_lockers.webp", alt: "Secure lockers in the dorm" },
];

// Edit 4 bed carousel images here
export const fourBedDormImages = [
  { src: "/images/rooms_1.jpg", alt: "Four Bed Dorm Room at Scodrinon Hostel" },
  { src: "/images/rooms_2.jpg", alt: "Alternative angle of the 4-bed dorm" },
  { src: "/images/room_4bed_m.jpg", alt: "Men's 4-bed dorm at Scodrinon Hostel" },
];

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
  "Breakfast every morning from 9:00 to 10:30am (excl. off season)",
  "Early take-away breakfast when you need to leave sooner",
  "High-speed WiFi in rooms and common areas",
  "Luggage storage before or during your stay",
  "Rooftop social events and a helpful WhatsApp group",
  "Clean modern bathrooms and showers",
] as const;

export const paidServices = [
  "Bike rentals for city rides and lakeside days",
  "Guided tours",
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

export const galleryItems = [
  {
    id: "breakfast-served",
    type: "image",
    src: "/images/breakfast.jpg",
    alt: "Breakfast served at Scodrinon Hostel",
    className: "md:col-span-4",
    aspect: "aspect-[4/5]",
  },
  {
    id: "common-area",
    type: "image",
    src: "/images/ambiance_1.jpg",
    alt: "Common area ambiance at Scodrinon Hostel",
    className: "md:col-span-4",
    aspect: "aspect-[4/5]",
  },
  {
    id: "patio-seating",
    type: "image",
    src: "/images/patio.jpg",
    alt: "Patio seating at Scodrinon Hostel",
    className: "md:col-span-4",
    aspect: "aspect-[4/5]",
  },
  {
    id: "four-bed-room",
    type: "image",
    src: "/images/rooms_2.jpg",
    alt: "4 Bed Room at Scodrinon Hostel",
    className: "md:col-span-4",
    aspect: "aspect-[4/5]",
  },
  {
    id: "pods-layout",
    type: "image",
    src: "/images/room_18bed3.jpg",
    alt: "Privacy pods and dorm layout at Scodrinon Hostel 18-bed room",
    className: "md:col-span-3",
    aspect: "aspect-[4/6]",
  },
  {
    id: "outdoor-games",
    type: "image",
    src: "/images/rooftop_social_3.webp",
    alt: "Guests enjoying games on the outdoor patio at Scodrinon Hostel",
    className: "md:col-span-5",
    aspect: "aspect-[5/4]",
  },
  {
    id: "lounge-seating",
    type: "image",
    src: "/images/indoor_common_2.jpg",
    alt: "Hostel lounge and seating at Scodrinon in Shkoder",
    className: "md:col-span-4",
    aspect: "aspect-[4/5]",
  },
  {
    id: "rooftop-terrace-relax",
    type: "image",
    src: "/images/rooftop_social_4.jpg",
    alt: "Relaxing on the rooftop terrace at Scodrinon Hostel",
    className: "md:col-span-5",
    aspect: "aspect-[5/4]",
  },
  {
    id: "hiking-alps",
    type: "image",
    src: "/images/promo_3.jpg",
    alt: "Spectaular views while hiking in the Albainain Alps",
    className: "md:col-span-3",
    aspect: "aspect-[3/5]",
  },
  {
    id: "covered-patio",
    type: "image",
    src: "/images/rooftop_social_5.jpg",
    alt: "Chill afternoons on the covered patio at Scodrinon Hostel",
    className: "md:col-span-5",
    aspect: "aspect-[5/4]",
  },
  {
    id: "food-outing",
    type: "image",
    src: "/images/rooftop_social_6.jpg",
    alt: "Local food outing from Scodrinon Hostel",
    className: "md:col-span-4",
    aspect: "aspect-[5/6]",
  },
  {
    id: "hiking-basecamp",
    type: "image",
    src: "/images/hiking_3.jpg",
    alt: "Hikers using Scodrinon Hostel as a basecamp",
    className: "md:col-span-3",
    aspect: "aspect-[4/5]",
  },
  {
    id: "pod-dorm-detail",
    type: "image",
    src: "/images/room_18bed_5.jpg",
    alt: "Privacy pod dorm at Scodrinon Hostel in Shkodra",
    className: "md:col-span-4",
    aspect: "aspect-[1/1]",
  },
  {
    id: "river-trip-fun",
    type: "image",
    src: "/images/drin_swimming_trip3.jpg",
    alt: "Having fun on the river trip",
    className: "md:col-span-3",
    aspect: "aspect-[4/5]",
  },
  {
    id: "mountain-trail",
    type: "image",
    src: "/images/hiking_2.jpg",
    alt: "Mountain trail and outdoor adventure near Shkoder, Albania",
    className: "md:col-span-3",
    aspect: "aspect-[4/5]",
  },
  {
    id: "rooftop-terrace-social",
    type: "image",
    src: "/images/rooftop_relax.png",
    alt: "Guests relaxing on the rooftop terrace at Scodrinon Hostel",
    className: "md:col-span-5",
    aspect: "aspect-[6/5]",
  },
  {
    id: "drin-river-excursion",
    type: "image",
    src: "/images/drin_swimming_trip2.jpeg",
    alt: "Regular Drin river excursions at Scodrinon Hostel",
    className: "md:col-span-4",
    aspect: "aspect-[5/4]",
  },
  {
    id: "outdoor-common-space",
    type: "image",
    src: "/images/outdoor_common_1.jpg",
    alt: "Outdoor common space at Scodrinon Hostel",
    className: "md:col-span-4",
    aspect: "aspect-[4/5]",
  },
  {
    id: "courtyard-seating",
    type: "image",
    src: "/images/outdoor_common_2.jpg",
    alt: "Courtyard and outdoor seating at Scodrinon Hostel",
    className: "md:col-span-4",
    aspect: "aspect-[4/5]",
  },
  {
    id: "breakfast-spread-shkoder",
    type: "image",
    src: "/images/breakfast_1.jpg",
    alt: "Breakfast spread at Scodrinon Hostel, Shkoder",
    className: "md:col-span-4",
    aspect: "aspect-[7/4]",
  },
  {
    id: "socializing-rooftop",
    type: "image",
    src: "/images/rooftop_social.webp",
    alt: "Guests socializing on the rooftop terrace at Scodrinon Hostel",
    className: "md:col-span-5",
    aspect: "aspect-[6/5]",
  },
  {
    id: "hiking-shkoder-base",
    type: "image",
    src: "/images/hiking_1.jpg",
    alt: "Albanian Alps hiking from Shkoder base stay at Scodrinon Hostel",
    className: "md:col-span-4",
    aspect: "aspect-[4/5]",
  },
  {
    id: "coworking-internet",
    type: "image",
    src: "/images/coworking.jpg",
    alt: "Coworking and workations using the high-speed internet at Scodrinon Hostel",
    className: "md:col-span-3",
    aspect: "aspect-[4/5]",
  },
  {
    id: "secure-lockers",
    type: "image",
    src: "/images/secure_dorm_lockers.webp",
    alt: "Secure lockers for dorm guests at Scodrinon Hostel",
    className: "md:col-span-4",
    aspect: "aspect-[5/4]",
  },
  {
    id: "indoor-common-area",
    type: "image",
    src: "/images/indoor_common_1.jpg",
    alt: "Bright indoor common area at Scodrinon Hostel",
    className: "md:col-span-3",
    aspect: "aspect-[4/5]",
  },
  {
    id: "shower-area",
    type: "image",
    src: "/images/showers_2.jpg",
    alt: "Shower area at Scodrinon Hostel, Shkoder",
    className: "md:col-span-3",
    aspect: "aspect-[4/5]",
  },
  {
    id: "pedestrian-street-life",
    type: "image",
    src: "/images/shkoder_pedestrian_street.jpg",
    alt: "Kole Idromeno pedestrian street life near Scodrinon Hostel",
    className: "md:col-span-5",
    aspect: "aspect-[5/4]",
  },
  {
    id: "panoramic-rooftop",
    type: "image",
    src: "/images/rooftop_panorama.jpg",
    alt: "Panoramic rooftop view at Scodrinon Hostel",
    className: "md:col-span-6",
    aspect: "aspect-[16/8]",
  },
  {
    id: "evening-events",
    type: "image",
    src: "/images/events_pool.jpg",
    alt: "Evening events and outings",
    className: "md:col-span-4",
    aspect: "aspect-[4/5]",
  },
  {
    id: "travelers-socializing",
    type: "image",
    src: "/images/rooftop_social2.png",
    alt: "Travelers socializing on the hostel rooftop",
    className: "md:col-span-4",
    aspect: "aspect-[4/5]",
  },
  {
    id: "daytime-rooftop-outlook",
    type: "image",
    src: "/images/rooftop_view_day2.jpg",
    alt: "Daytime rooftop outlook in Shkoder",
    className: "md:col-span-4",
    aspect: "aspect-[4/5]",
  },
  {
    id: "evening-drinks",
    type: "image",
    src: "/images/bar_3.jpg",
    alt: "Evening drinks and conversation at the hostel",
    className: "md:col-span-3",
    aspect: "aspect-[4/5]",
  },
  {
    id: "rooftop-clouds",
    type: "image",
    src: "/images/rooftop_view_3.jpg",
    alt: "daytime view fro the best hostel rooftop in Shkoder",
    className: "md:col-span-4",
    aspect: "aspect-[5/4]",
  },
  {
    id: "bathroom-modern",
    type: "image",
    src: "/images/bathroom_2.jpg",
    alt: "Modern bathroom facilities at Scodrinon Hostel",
    className: "md:col-span-3",
    aspect: "aspect-[4/5]",
  },
  {
    id: "guest-showers",
    type: "image",
    src: "/images/showers_1.jpg",
    alt: "Guest showers at Scodrinon Hostel",
    className: "md:col-span-3",
    aspect: "aspect-[4/5]",
  },
  {
    id: "shared-bathroom",
    type: "image",
    src: "/images/bathroom_1.jpg",
    alt: "Clean shared bathroom at Scodrinon Hostel",
    className: "md:col-span-3",
    aspect: "aspect-[4/5]",
  },
  {
    id: "rooftop-video-1",
    type: "video",
    src: "/videos/videoplayback.mp4",
    alt: "Short rooftop video from Scodrinon Hostel",
    className: "md:col-span-4",
    aspect: "aspect-[4/5]",
  },
  {
    id: "traveler-video-2",
    type: "video",
    src: "/videos/videoplayback2.mp4",
    alt: "Traveler atmosphere video from Scodrinon Hostel",
    className: "md:col-span-4",
    aspect: "aspect-[4/5]",
  },
] as const;

export const faqItems = [
  {
    question: "What if I arrive early or leave late?",
    answer:
      "Luggage storage makes the awkward travel-day timing easier. Message on WhatsApp in advance if you are arriving after 10pm or want to coordinate around your arrival or departure.",
  },
  {
    question: "Can the hostel help with Theth, Valbona, or local day trips?",
    answer:
      "Yes. Scodrinon works well as a base for Albanian Alps hikes, Lake Shkoder plans, Komani Lake. and Shala River excursions, and onward travel. The staff can help you sort out the practical side.",
  },
  {
    question: "Why is Scodrinon good for solo travelers?",
    answer:
      "The hostel is social and welcoming, but it avoids the pressure-cooker party feel. That balance works especially well for solo travelers who want connection and rest in the same stay.",
  },
  {
    question: "Are the pods actually private?",
    answer:
      "The pod dorm is designed to give you real personal space: curtains, a reading light, two power sockets, and a locker. It feels much closer to a private sleep setup than a standard open dorm.",
  },
  {
    question: "What is included in the stay?",
    answer:
      "Breakfast, WiFi, luggage storage, rooftop social events, and 24h access are included. Bike rentals, tours, and laundry and towels are available as paid extras.",
  },
] as const;

export const contactChecklist = [
  "Your dates",
  "How many guests are coming",
  "Whether you want the mixed pod dorm or a 4-bed room",
  "Your arrival time into Shkoder",
  "Any hiking, bike, or transport plans you want help with",
] as const;

export const testimonials = [
  {
    quote: "loved this hostel so much!most amazing view from the terrace, breakfast was always fresh and staff were so welcoming and always wiling to help! Loved the hostel and shkoder so much that i kept extending my stay!",
    author: "Male, 18-24, Italy",
    source: "Hostelworld",
    rating: 5,
  },
  {
    quote: "Great hostel! Great staff (Rob and the beautiful volunteers). Great free coffee every morning. Amazing social atmosphere. It literally felt like a home far from home.",
    author: "Female, 31-40, Israel",
    source: "Hostelworld",
    rating: 5,
  },
  {
    quote: "Top tier hostel! Modern spacious beds with well air conditioned rooms. Perfect location right in town. Relaxed and chill place to stay. Was super easy to organise day trips around the city through staff. Clean facilities and beautiful roof top terrace!",
    author: "Mollie, New Zealand",
    source: "Booking.com",
    rating: 5,
  },
  {
    quote: "Prime location, super comfy beds that feel like a small bedroom. Friendly, helpful staff, clean facilities, and a beautiful rooftop space to enjoy.",
    author: "Female, 18-24, Canada",
    source: "Hostelworld",
    rating: 5,
  },
  {
    quote: "Beds were so incredibly comfortable. The people, volunteers and owner were just amazing, so helpful and nice. The views from the rooftop were just incredible, and the location is to die for",
    author: "Piper, Australia",
    source: "Booking.com",
    rating: 5,
  },
] as const;
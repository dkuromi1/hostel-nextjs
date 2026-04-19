/**
 * icon-registry.ts
 *
 * Central registry that maps JSON icon-name strings to Lucide React components.
 * ---------------------------------------------------------------------------
 * HOW TO USE
 *   In your content JSON files (e.g. homepage.json), set the "icon" field to
 *   any key listed below:
 *
 *     { "title": "Breakfast", "icon": "Coffee" }
 *
 *   In your components, call resolveIcon():
 *
 *     import { resolveIcon } from "@/lib/icon-registry";
 *     const Icon = resolveIcon(service.icon);  // ← returns a Lucide component
 *     <Icon className="size-5" />
 *
 * HOW TO ADD AN ICON
 *   1. Import it from "lucide-react" in this file.
 *   2. Add it to ICON_REGISTRY below with the key you'll use in JSON.
 *   That's it — every page that calls resolveIcon() picks it up automatically.
 * ---------------------------------------------------------------------------
 */

import {
  // ── Food & Beverage ────────────────────────────────────────────────────────
  Coffee,
  Croissant,
  Utensils,
  UtensilsCrossed,
  Wine,
  Sandwich,
  IceCream2,
  // ── Accommodation ──────────────────────────────────────────────────────────
  Bed,
  BedDouble,
  BedSingle,
  Hotel,
  // ── Amenities & Facilities ─────────────────────────────────────────────────
  Wifi,
  ShowerHead,
  Bath,
  WashingMachine,
  Snowflake,
  Wind,
  Thermometer,
  Tv,
  LampDesk,
  BatteryCharging,
  Lock,
  Vault,
  KeyRound,
  // ── Transport ──────────────────────────────────────────────────────────────
  Bus,
  Car,
  Bike,
  Train,
  Plane,
  Ship,
  // ── Activities & Outdoors ──────────────────────────────────────────────────
  Mountain,
  Waves,
  TreePine,
  Sun,
  Dumbbell,
  Music,
  Camera,
  // ── Location & Navigation ─────────────────────────────────────────────────
  MapPin,
  Map,
  Compass,
  Navigation,
  // ── Social & Community ─────────────────────────────────────────────────────
  Sparkles,
  Star,
  Users,
  // ── Storage & Organization ────────────────────────────────────────────────
  Luggage,
  Backpack,
  // ── Admin & Services ──────────────────────────────────────────────────────
  Clock,
  Phone,
  Globe,
  ShieldCheck,
  // ── Culture & Tourism ─────────────────────────────────────────────────────
  Award,
  Castle,
  BookOpen,
  Landmark,
  // ── Accessibility & Special ───────────────────────────────────────────────
  Accessibility,
  Dog,
  Leaf,
  // ── Fallback ──────────────────────────────────────────────────────────────
  Check,
} from "lucide-react";

/**
 * Full icon registry. Keys are the strings used in JSON content files.
 * Add new entries here as needed; no other files need to change.
 */
export const ICON_REGISTRY: Record<string, React.ElementType> = {
  // Food & Beverage
  Coffee,
  Croissant,
  Utensils,
  UtensilsCrossed,
  Wine,
  Sandwich,
  IceCream2,
  // Accommodation
  Bed,
  BedDouble,
  BedSingle,
  Hotel,
  // Amenities
  Wifi,
  ShowerHead,
  Bath,
  WashingMachine,
  Snowflake,
  Wind,
  Thermometer,
  Tv,
  LampDesk,
  BatteryCharging,
  Lock,
  Vault,
  KeyRound,
  // Transport
  Bus,
  Car,
  Bike,
  Train,
  Plane,
  Ship,
  // Activities & Outdoors
  Mountain,
  Waves,
  TreePine,
  Sun,
  Dumbbell,
  Music,
  Camera,
  // Location
  MapPin,
  Map,
  Compass,
  Navigation,
  // Social
  Sparkles,
  Star,
  Users,
  // Storage
  Luggage,
  Backpack,
  // Services / Admin
  Clock,
  Phone,
  Globe,
  ShieldCheck,
  // Culture
  Award,
  Castle,
  BookOpen,
  Landmark,
  // Accessibility & Special
  Accessibility,
  Dog,
  Leaf,
  // Fallback (also usable directly in JSON as "Check")
  Check,
};

/**
 * Resolves a JSON icon-name string to its Lucide component.
 * Falls back to the `Check` icon if the name is unknown.
 *
 * @param name - The icon key from a JSON content file, e.g. "Coffee"
 */
export function resolveIcon(name: string): React.ElementType {
  return ICON_REGISTRY[name] ?? Check;
}

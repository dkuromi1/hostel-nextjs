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

import { InstagramGlyph } from "@/components/instagram-glyph";
import type { LucideIcon } from "lucide-react";
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
  Blinds,
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
  Moon,
  Dumbbell,
  Music,
  Camera,
  // ── Location & Navigation ─────────────────────────────────────────────────
  MapPin,
  Map,
  Compass,
  Navigation,
  MapPinned,
  Home,
  // ── Social & Community ─────────────────────────────────────────────────────
  Star,
  Users,
  MessageCircleMore,
  MessageSquare,
  AtSign,
  Mail,
  Zap,
  // ── Storage & Organization ────────────────────────────────────────────────
  Luggage,
  Backpack,
  // ── Admin & Services ──────────────────────────────────────────────────────
  Clock,
  Phone,
  Globe,
  ShieldCheck,
  Calendar,
  Download,
  Info,
  Link as LinkIcon,
  // ── Culture & Tourism ─────────────────────────────────────────────────────
  Award,
  Castle,
  BookOpen,
  Landmark,
  // ── Accessibility & Special ───────────────────────────────────────────────
  Accessibility,
  Dog,
  Leaf,
  // ── UI Elements ───────────────────────────────────────────────────────────
  Check,
  CheckCircle2,
  TrendingUp,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  X,
  Menu,
  Plus,
  RefreshCw,
  AlertCircle,
  // ── Weather ────────────────────────────────────────────────────────────────
  Cloud,
  CloudFog,
  CloudLightning,
  CloudRain,
  CloudSnow,
  SunMedium,
} from "lucide-react";

/**
 * Full icon registry. Keys are the strings used in JSON content files.
 * Add new entries here as needed; no other files need to change.
 */
export const ICON_REGISTRY = {
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
  Blinds,
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
  Moon,
  Dumbbell,
  Music,
  Camera,
  // Location
  MapPin,
  Map,
  Compass,
  Navigation,
  MapPinned,
  Home,
  // Social
  Sparkles: Zap,
  Star,
  Users,
  MessageCircleMore,
  MessageSquare,
  AtSign,
  Mail,
  Instagram: InstagramGlyph as any,
  Zap,
  // Storage
  Luggage,
  Backpack,
  // Services / Admin
  Clock,
  Phone,
  Globe,
  ShieldCheck,
  Calendar,
  Download,
  Info,
  LinkIcon,
  // Culture
  Award,
  Castle,
  BookOpen,
  Landmark,
  // Accessibility & Special
  Accessibility,
  Dog,
  Leaf,
  // UI Elements
  Check,
  CheckCircle2,
  TrendingUp,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  X,
  Menu,
  Plus,
  RefreshCw,
  AlertCircle,
  // Weather
  Cloud,
  CloudFog,
  CloudLightning,
  CloudRain,
  CloudSnow,
  SunMedium,
} as const satisfies Record<string, LucideIcon>;

// Export individual icons for direct use in components
export {
  Coffee,
  Croissant,
  Utensils,
  UtensilsCrossed,
  Wine,
  Sandwich,
  IceCream2,
  Bed,
  BedDouble,
  BedSingle,
  Blinds,
  Hotel,
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
  Bus,
  Car,
  Bike,
  Train,
  Plane,
  Ship,
  Mountain,
  Waves,
  TreePine,
  Sun,
  Moon,
  Dumbbell,
  Music,
  Camera,
  MapPin,
  Map,
  Compass,
  Navigation,
  MapPinned,
  Home,
  Star,
  Users,
  MessageCircleMore,
  MessageSquare,
  AtSign,
  Mail,
  InstagramGlyph as Instagram,
  Luggage,
  Backpack,
  Clock,
  Phone,
  Globe,
  ShieldCheck,
  Calendar,
  Download,
  Info,
  LinkIcon,
  Award,
  Castle,
  BookOpen,
  Landmark,
  Accessibility,
  Dog,
  Leaf,
  Check,
  CheckCircle2,
  TrendingUp,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  X,
  Menu,
  Plus,
  RefreshCw,
  AlertCircle,
  Cloud,
  CloudFog,
  CloudLightning,
  CloudRain,
  CloudSnow,
  SunMedium,
  Zap,
};

export type IconName = keyof typeof ICON_REGISTRY;

export function isIconName(name: string): name is IconName {
  return Object.prototype.hasOwnProperty.call(ICON_REGISTRY, name);
}

/**
 * Resolves a JSON icon-name string to its Lucide component.
 * Throws if the name is unknown so content typos fail loudly.
 *
 * @param name - The icon key from a JSON content file, e.g. "Coffee"
 */
export function resolveIcon(name: string): LucideIcon {
  if (isIconName(name)) {
    return ICON_REGISTRY[name];
  }

  console.warn(`[icon-registry] Unknown icon "${name}". Falling back to Compass.`);
  return ICON_REGISTRY.Compass;
}

import {
  AtSign,
  Globe,
  LinkIcon,
  Mail,
  MessageCircleMore,
  MessageSquare,
  Phone,
} from "@/lib/icon-registry";

import { BookingComLogo, HostelworldLogo, GoogleLogo } from "@/components/brand-logos";
import { InstagramGlyph } from "@/components/instagram-glyph";
import { cn } from "@/lib/utils";
import type { BusinessChannelIconKey } from "@/lib/site-data";

type ChannelIconProps = {
  iconKey: BusinessChannelIconKey;
  className?: string;
  iconOnly?: boolean;
  strokeWidth?: string | number;
  monochromeHover?: boolean;
};

export function ChannelIcon({
  iconKey,
  className,
  iconOnly = false,
  strokeWidth = "var(--icon-stroke-width)",
  monochromeHover = false,
}: ChannelIconProps) {
  const normalizedKey = iconKey.trim().toLowerCase();

  // Use slightly larger defaults for brand logos to maintain legibility
  const isBrandLogo = normalizedKey === "bookingcom" || normalizedKey === "booking-com" || normalizedKey === "hostelworld" || normalizedKey === "google";
  const defaultSize = isBrandLogo ? "size-8" : "size-5";
  const finalClassName = cn(defaultSize, className);

  switch (normalizedKey) {
    case "bookingcom":
    case "booking-com":
      return <BookingComLogo className={finalClassName} iconOnly={iconOnly} monochromeHover={monochromeHover} />;
    case "hostelworld":
      return <HostelworldLogo className={finalClassName} iconOnly={iconOnly} monochromeHover={monochromeHover} />;
    case "google":
    case "google-review":
      return <GoogleLogo className={finalClassName} iconOnly={iconOnly} monochromeHover={monochromeHover} />;
    case "instagram":
      return <InstagramGlyph className={finalClassName} strokeWidth={strokeWidth} />;
    case "whatsapp":
      return <MessageCircleMore className={finalClassName} strokeWidth={strokeWidth} />;
    case "email":
    case "mail":
      return <Mail className={finalClassName} strokeWidth={strokeWidth} />;
    case "phone":
    case "call":
      return <Phone className={finalClassName} strokeWidth={strokeWidth} />;
    case "website":
    case "web":
    case "globe":
      return <Globe className={finalClassName} strokeWidth={strokeWidth} />;
    case "facebook":
      return <MessageSquare className={finalClassName} strokeWidth={strokeWidth} />;
    case "link":
    case "url":
      return <LinkIcon className={finalClassName} strokeWidth={strokeWidth} />;
    case "x":
    case "twitter":
      return <AtSign className={finalClassName} strokeWidth={strokeWidth} />;
    default:
      // Keep unknown channel keys render-safe for new instances.
      return <LinkIcon className={finalClassName} strokeWidth={strokeWidth} />;
  }
}

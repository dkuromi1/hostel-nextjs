import { MessageCircleMore } from "lucide-react";

import { BookingComLogo, HostelworldLogo } from "@/components/brand-logos";
import { InstagramGlyph } from "@/components/instagram-glyph";
import { cn } from "@/lib/utils";
import type { BusinessChannelIconKey } from "@/lib/site-data";

type ChannelIconProps = {
  iconKey: BusinessChannelIconKey;
  className?: string;
  iconOnly?: boolean;
  strokeWidth?: number;
};

export function ChannelIcon({
  iconKey,
  className,
  iconOnly = false,
  strokeWidth = 1.8,
}: ChannelIconProps) {
  // Use slightly larger defaults for brand logos to maintain legibility
  const defaultSize = (iconKey === "bookingCom" || iconKey === "hostelworld") ? "size-8" : "size-5";
  const finalClassName = cn(defaultSize, className);

  switch (iconKey) {
    case "bookingCom":
      return <BookingComLogo className={finalClassName} iconOnly={iconOnly} />;
    case "hostelworld":
      return <HostelworldLogo className={finalClassName} iconOnly={iconOnly} />;
    case "instagram":
      return <InstagramGlyph className={finalClassName} strokeWidth={strokeWidth} />;
    case "whatsapp":
      return <MessageCircleMore className={finalClassName} strokeWidth={strokeWidth} />;
    default:
      return null;
  }
}

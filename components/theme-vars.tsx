import { siteConfig } from "@/lib/site-data";

/**
 * Theme Registry
 * Defines the baseline design tokens for each theme preset.
 */
const themeRegistry: Record<string, any> = {
  cool: {
    colors: {
      primary: "#059669",
      accent: "#8ac7eb",
      background: "#f8fafc",
      surfaceDark: "#1e293b",
      darkBackground: "#020617",
      tertiary: "#314158",
      tertiaryDark: "#1e293b",
    },
    typography: {
      headingFont: "serif",
      character: "elegant",
      pageSpacing: "-0.0275em",
      sectionSpacing: "-0.06em",
    },
    surfaces: {
      borderRadius: "2xl",
      glassBlur: 12,
      glassOpacity: 0.84,
      borderWidth: "1px",
    },
    layout: {
      width: "wide",
      spacing: "wide",
      gutter: "wide",
      cardPaddingMobile: "1.75rem",
      cardPaddingPremiumMobile: "2.5rem",
      cardPaddingDesktop: "2.25rem",
      cardPaddingPremiumDesktop: "3.5rem",
    }
  },
  forest: {
    colors: {
      primary: "#344e41",
      accent: "#cb997e",
      background: "#f1f5f2",
      surfaceDark: "#0d2119",
      darkBackground: "#020805",
    },
    typography: {
      headingFont: "fraunces",
      character: "bold",
    },
    surfaces: {
      borderRadius: "xl",
      glassBlur: 8,
      glassOpacity: 0.9,
      borderWidth: "1px",
    },
    layout: {
      width: "wide",
      spacing: "wide",
      gutter: "wide",
      cardPaddingMobile: "2rem",
      cardPaddingPremiumMobile: "2.75rem",
      cardPaddingDesktop: "2.5rem",
      cardPaddingPremiumDesktop: "3.75rem",
    }
  },
  warm: {
    colors: {
      primary: "#b07d62",
      accent: "#d4b896",
      background: "#faf8f5",
      surfaceDark: "#2c1f14",
      darkBackground: "#1a1208",
    },
    typography: {
      headingFont: "cormorant",
      character: "elegant",
    },
    surfaces: {
      borderRadius: "3xl",
      glassBlur: 10,
      glassOpacity: 0.85,
      borderWidth: "1px",
    },
    layout: {
      width: "standard",
      spacing: "standard",
      gutter: "standard",
      cardPaddingMobile: "1.85rem",
      cardPaddingPremiumMobile: "2.6rem",
      cardPaddingDesktop: "2.35rem",
      cardPaddingPremiumDesktop: "3.6rem",
    }
  },
  "nordic-earth": {
    colors: {
      primary: "#5f7470",
      accent: "#cb997e",
      background: "#fbf9f4",
      surfaceDark: "#22223b",
      darkBackground: "#171721",
    },
    typography: {
      headingFont: "syne",
      character: "sharp",
    },
    surfaces: {
      borderRadius: "none",
      glassBlur: 20,
      glassOpacity: 0.7,
      borderWidth: "0.5px",
    },
    layout: {
      width: "wide",
      spacing: "compact",
      gutter: "none",
      cardPaddingMobile: "2rem",
      cardPaddingPremiumMobile: "2.75rem",
      cardPaddingDesktop: "2.5rem",
      cardPaddingPremiumDesktop: "3.75rem",
    }
  }
};

/**
 * ThemeVars
 * 
 * Dynamically injects CSS variables into the document head based on the 
 * active instance's design settings.
 */
export function ThemeVars() {
  const design = siteConfig.branding.design;

  if (!design) return null;

  const { theme = "cool", colors, surfaces, atmosphere, typography, layout } = design;
  
  // 1. Get the preset for the active theme
  const preset = themeRegistry[theme] || themeRegistry.cool;

  // 2. Merge overrides from JSON on top of the preset
  // We only use the JSON value if it exists and is different from the DEFAULT "Cool" theme
  // (This handles the case where "Cool" values were left over in the JSON during a theme switch)
  const getMerged = (category: string, key: string, userValue: any) => {
    const presetValue = preset[category]?.[key];
    const coolValue = themeRegistry.cool[category]?.[key];

    // If the user hasn't set anything, use preset
    if (userValue === undefined || userValue === null) return presetValue;

    // If the theme is "cool", the user value IS the intent
    if (theme === "cool") return userValue;

    // If the user value matches the "Cool" default, but the NEW theme wants something else,
    // we assume the user value was a "leftover" and use the new preset instead.
    if (userValue === coolValue && presetValue !== coolValue) {
      return presetValue;
    }

    return userValue;
  };

  const finalColors = {
    primary: getMerged("colors", "primary", colors?.primary),
    accent: getMerged("colors", "accent", colors?.accent),
    background: getMerged("colors", "background", colors?.background),
    surfaceDark: getMerged("colors", "surfaceDark", colors?.surfaceDark),
    darkBackground: getMerged("colors", "darkBackground", colors?.darkBackground),
    tertiary: getMerged("colors", "tertiary", (colors as any)?.tertiary),
    tertiaryDark: getMerged("colors", "tertiaryDark", (colors as any)?.tertiaryDark),
  };

  const finalTypography = {
    headingFont: getMerged("typography", "headingFont", typography?.headingFont),
    character: getMerged("typography", "character", typography?.character),
    pageSpacing: getMerged("typography", "pageSpacing", (typography as any)?.pageSpacing),
    sectionSpacing: getMerged("typography", "sectionSpacing", (typography as any)?.sectionSpacing),
  };

  const finalSurfaces = {
    borderRadius: getMerged("surfaces", "borderRadius", surfaces?.borderRadius),
    glassBlur: getMerged("surfaces", "glassBlur", surfaces?.glassBlur),
    glassOpacity: getMerged("surfaces", "glassOpacity", surfaces?.glassOpacity),
    borderWidth: getMerged("surfaces", "borderWidth", (surfaces as any)?.borderWidth),
  };

  const finalLayout = {
    width: getMerged("layout", "width", layout?.width),
    spacing: getMerged("layout", "spacing", layout?.spacing),
    gutter: getMerged("layout", "gutter", layout?.gutter),
    cardPaddingMobile: getMerged("layout", "cardPaddingMobile", layout?.cardPaddingMobile),
    cardPaddingPremiumMobile: getMerged("layout", "cardPaddingPremiumMobile", layout?.cardPaddingPremiumMobile),
    cardPaddingDesktop: getMerged("layout", "cardPaddingDesktop", layout?.cardPaddingDesktop),
    cardPaddingPremiumDesktop: getMerged("layout", "cardPaddingPremiumDesktop", layout?.cardPaddingPremiumDesktop),
  };

  // Radius Mappings
  const getRadiusValues = (mode: string) => {
    switch (mode) {
      case "none": return { base: "0px", sm: "0px", md: "0px", lg: "0px", xl: "0px", "2xl": "0px", "3xl": "0px", full: "0px" };
      case "sm": return { base: "0.25rem", sm: "0.125rem", md: "0.25rem", lg: "0.375rem", xl: "0.5rem", "2xl": "0.625rem", "3xl": "0.75rem", full: "0.375rem" };
      case "md": return { base: "0.5rem", sm: "0.25rem", md: "0.375rem", lg: "0.5rem", xl: "0.625rem", "2xl": "0.75rem", "3xl": "1rem", full: "0.625rem" };
      case "xl": return { base: "0.875rem", sm: "0.25rem", md: "0.375rem", lg: "12px", xl: "16px", "2xl": "20px", "3xl": "20px", full: "9999px" };
      case "2xl": return { base: "1.1rem", sm: "0.375rem", md: "0.5rem", lg: "16px", xl: "20px", "2xl": "24px", "3xl": "24px", full: "9999px" };
      case "3xl": default: return { base: "1.35rem", sm: "0.5rem", md: "0.75rem", lg: "24px", xl: "28px", "2xl": "30px", "3xl": "30px", full: "9999px" };
    }
  };

  const fontMap = {
    nunito: "var(--font-nunito)",
    inter: "var(--font-inter)",
    serif: "var(--font-serif)",
    fraunces: "var(--font-fraunces)",
    syne: "var(--font-syne)",
    cormorant: "var(--font-cormorant)",
  };

  const themeSansFont: Record<string, string> = {
    cool:           "var(--font-inter), \"Avenir Next\", system-ui, sans-serif",
    warm:           "var(--font-inter), \"Avenir Next\", system-ui, sans-serif",
    forest:         "var(--font-inter), \"Avenir Next\", system-ui, sans-serif",
    "nordic-earth": "var(--font-inter), \"Helvetica Neue\", system-ui, sans-serif",
  };
  const finalSansFont = themeSansFont[theme] ?? "var(--font-inter), system-ui, sans-serif";

  const characterStylesMap: Record<string, any> = {
    playful: { spacing: "-0.05em", weight: "700" },
    clean: { spacing: "-0.01em", weight: "600" },
    elegant: { spacing: "0.02em", weight: "500" },
    sharp: { spacing: "0.04em", weight: "500" },
    bold: { spacing: "-0.02em", weight: "400" },
  };

  const rv = getRadiusValues(finalSurfaces.borderRadius);
  const finalHeadingFont = fontMap[finalTypography.headingFont as keyof typeof fontMap] || "var(--font-nunito)";
  const finalCharStyle = characterStylesMap[finalTypography.character] || characterStylesMap.playful;

  const layoutWidth = finalLayout.width === "compact" ? "1200px" : finalLayout.width === "wide" ? "1600px" : "1400px";
  const spacingMap = { compact: "clamp(1.5rem, 4vw, 2.5rem)", standard: "clamp(2rem, 5vw, 4rem)", wide: "clamp(3rem, 6vw, 6rem)" };
  const layoutSpacing = spacingMap[finalLayout.spacing as keyof typeof spacingMap] || "clamp(2rem, 5vw, 4rem)";
  const gutterMap = { none: "0px", compact: "0.75rem", standard: theme === "warm" ? "1.25rem" : "1rem", wide: "1.5rem" };
  const layoutGutter = gutterMap[finalLayout.gutter as keyof typeof gutterMap] || "1rem";
  
  const strokeMap = { thin: "1.5px", normal: "2px", bold: "2.5px" };
  const iconStroke = strokeMap[design.iconStroke as keyof typeof strokeMap] || "1.5px";

  const cssString = `
    :root {
      --primary: ${finalColors.primary};
      --brand-primary: ${finalColors.primary};
      --accent: ${finalColors.accent};
      --background: ${finalColors.background};
      --surface-dark: ${finalColors.surfaceDark};
      --brand-tertiary: ${finalColors.tertiary || finalColors.primary};
      --brand-tertiary-dark: ${finalColors.tertiaryDark || finalColors.surfaceDark};
      
      --icon-stroke-width: ${iconStroke};
      
      --radius: ${rv.base};
      --radius-sm: ${rv.sm};
      --radius-md: ${rv.md};
      --radius-lg: ${rv.lg};
      --radius-xl: ${rv.xl};
      --radius-2xl: ${rv["2xl"]};
      --radius-3xl: ${rv["3xl"]};
      --radius-full: ${rv.full};

      --glass-blur: ${finalSurfaces.glassBlur}px;
      --glass-bg-opacity: ${finalSurfaces.glassOpacity};
      --border-width: ${finalSurfaces.borderWidth};
      --atmosphere-glow-opacity: ${atmosphere.glowIntensity};
      --atmosphere-noise-opacity: ${theme === "forest" ? "0.35" : "0.25"};

      --font-sans: ${finalSansFont};
      --font-heading: ${finalHeadingFont}, sans-serif;
      --heading-weight: ${finalCharStyle.weight};
      --heading-spacing: ${finalCharStyle.spacing};
      --heading-page-spacing: ${finalTypography.pageSpacing || finalCharStyle.spacing};
      --heading-section-spacing: ${finalTypography.sectionSpacing || finalCharStyle.spacing};

      --layout-max-width: ${layoutWidth};
      --layout-section-spacing: ${layoutSpacing};
      --layout-grid-gutter: ${layoutGutter};

      --layout-card-padding: ${finalLayout.cardPaddingMobile};
      --layout-card-padding-premium: ${finalLayout.cardPaddingPremiumMobile};

      --brand-accent: ${finalColors.accent};
    }

    @media (min-width: 640px) {
      :root {
        --layout-card-padding: ${finalLayout.cardPaddingDesktop};
        --layout-card-padding-premium: ${finalLayout.cardPaddingPremiumDesktop};
      }
    }

    @media (max-width: 1024px) {
      :root {
        ${finalLayout.gutter === "wide" ? `--layout-grid-gutter: ${gutterMap.standard};` : ""}
      }
    }

    @media (max-width: 640px) {
      :root {
        --layout-grid-gutter: ${gutterMap.compact};
      }
    }

    .dark {
      --background: ${finalColors.darkBackground};
      --surface-dark: ${finalColors.surfaceDark};
      --brand-tertiary: ${finalColors.tertiary || finalColors.primary};
      --brand-tertiary-dark: ${finalColors.tertiaryDark || finalColors.surfaceDark};
    }

    ${theme === "forest" ? `
      :root {
        --foreground: #2d3436;
        --text-heading: #1b4332;
        --glass-bg: rgba(255, 255, 255, 0.7);
        --glass-border: rgba(27, 67, 50, 0.1);
        --atmosphere-glow-primary: rgba(45, 106, 79, 0.08);
        --atmosphere-glow-accent: rgba(203, 153, 126, 0.06);
      }
      .dark {
        --foreground: #f8fafc;
        --text-heading: #f8fafc;
        --glass-bg: rgba(2, 8, 5, 0.85);
        --glass-border: rgba(255, 255, 255, 0.07);
        --atmosphere-glow-primary: rgba(45, 106, 79, 0.14);
        --atmosphere-glow-accent: rgba(203, 153, 126, 0.10);
        --primary: #52b788;
        --brand-primary: #52b788;
        --brand-primary-dark: #74c69d;
        --surface-dark: ${finalColors.surfaceDark};
        --surface-dark-secondary: #050d0a;
        --brand-tertiary-dark: ${finalColors.surfaceDark};
      }
    ` : ""}

    /* Warm Specific Adjustments */
    ${theme === "warm" ? `
      :root {
        --foreground: #3d2b1f;
        --text-heading: #2c1f14;
        --glass-bg: rgba(250, 248, 245, 0.78);
        --glass-border: rgba(44, 31, 20, 0.08);
        --atmosphere-glow-primary: rgba(176, 125, 98, 0.07);
        --atmosphere-glow-accent: rgba(212, 184, 150, 0.05);
        --brand-tertiary: #4a3728;
        --brand-tertiary-dark: #2c1f14;
        --surface-dark: #2c1f14;
        --surface-dark-secondary: #1a1208;
      }
      .dark {
        --foreground: #f2ede8;
        --text-heading: #f2ede8;
        --glass-bg: rgba(26, 18, 8, 0.88);
        --glass-border: rgba(255, 255, 255, 0.06);
        --atmosphere-glow-primary: rgba(176, 125, 98, 0.12);
        --atmosphere-glow-accent: rgba(212, 184, 150, 0.08);
        --primary: #c9997a;
        --brand-primary: #c9997a;
        --brand-primary-dark: #d4b896;
        --surface-dark: #2c1f14;
        --surface-dark-secondary: #1a1208;
        --brand-tertiary: #2c1f14;
        --brand-tertiary-dark: #1a1208;
      }
    ` : ""}

    /* Nordic Earth Specific Refinements */
    ${theme === "nordic-earth" ? `
      :root {
        --foreground: #4a4e69;
        --text-heading: #22223b;
        --glass-bg: rgba(251, 249, 244, 0.7);
        --glass-border: rgba(34, 34, 59, 0.1);
        --atmosphere-glow-primary: rgba(95, 116, 112, 0.08);
        --atmosphere-glow-accent: rgba(203, 153, 126, 0.06);
      }
      .dark {
        --foreground: #f2e9e4;
        --text-heading: #f2e9e4;
        --glass-bg: rgba(23, 23, 33, 0.85);
        --glass-border: rgba(255, 255, 255, 0.07);
        --atmosphere-glow-primary: rgba(95, 116, 112, 0.14);
        --atmosphere-glow-accent: rgba(203, 153, 126, 0.10);
        --primary: #81b29a;
        --brand-primary: #81b29a;
        --brand-primary-dark: #a3b18a;
        --surface-dark: #22223b;
        --surface-dark-secondary: #12121f;
        --brand-tertiary: #22223b;
        --brand-tertiary-dark: #171721;
      }
    ` : ""}
  `;

  return <style id="dynamic-theme-vars" dangerouslySetInnerHTML={{ __html: cssString }} />;
}

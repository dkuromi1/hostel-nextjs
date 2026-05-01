import { siteConfig } from "@/lib/site-data";

/**
 * ThemeVars
 * 
 * Dynamically injects CSS variables into the document head based on the 
 * active instance's design settings.
 */
export function ThemeVars() {
  const design = siteConfig.branding.design;

  if (!design) return null;

  const { theme, colors, surfaces, atmosphere, typography } = design;

  // Exact pixel mappings for radii
  const getRadiusValues = (mode: string) => {
    switch (mode) {
      case "none":
        return {
          base: "0px",
          sm: "0px",
          md: "0px",
          lg: "0px",
          xl: "0px",
          "2xl": "0px",
          "3xl": "0px",
          full: "0px",
        };
      case "sm":
        return {
          base: "0.25rem",
          sm: "0.125rem",
          md: "0.25rem",
          lg: "0.375rem",
          xl: "0.5rem",
          "2xl": "0.625rem",
          "3xl": "0.75rem",
          full: "0.375rem",
        };
      case "md":
        return {
          base: "0.5rem",
          sm: "0.25rem",
          md: "0.375rem",
          lg: "0.5rem",
          xl: "0.625rem",
          "2xl": "0.75rem",
          "3xl": "1rem",
          full: "0.625rem",
        };
      case "xl":
        return {
          base: "0.875rem",
          sm: "0.25rem",
          md: "0.375rem",
          lg: "12px",
          xl: "16px",
          "2xl": "20px",
          "3xl": "20px",
          full: "9999px",
        };
      case "2xl":
        return {
          base: "1.1rem",
          sm: "0.375rem",
          md: "0.5rem",
          lg: "16px",
          xl: "20px",
          "2xl": "24px",
          "3xl": "24px",
          full: "9999px",
        };
      case "3xl":
      default:
        return {
          base: "1.35rem",
          sm: "0.5rem",
          md: "0.75rem",
          lg: "24px",
          xl: "28px",
          "2xl": "30px",
          "3xl": "30px",
          full: "9999px",
        };
    }
  };


  // Typography Mappings
  const fontMap = {
    nunito: "var(--font-nunito)",
    inter: "var(--font-inter)",
    serif: "var(--font-serif)",
    bevan: "var(--font-bevan)",
    syne: "var(--font-syne)",
    cormorant: "var(--font-cormorant)",
  };

  // Body font per theme (separate from heading font)
  const themeSansFont: Record<string, string> = {
    cool:           "var(--font-inter), \"Avenir Next\", system-ui, sans-serif",
    warm:           "var(--font-inter), \"Avenir Next\", system-ui, sans-serif",
    forest:         "var(--font-inter), \"Avenir Next\", system-ui, sans-serif",
    "nordic-earth": "var(--font-inter), \"Helvetica Neue\", system-ui, sans-serif",
  };
  const finalSansFont = themeSansFont[theme] ?? "var(--font-inter), system-ui, sans-serif";

  const headingFont = fontMap[typography?.headingFont] || "var(--font-nunito)";
  
  // Character mapping (affects letter spacing and weight)
  const characterStylesMap = {
    playful: {
      spacing: "-0.05em",
      weight: "700",
    },
    clean: {
      spacing: "-0.01em",
      weight: "600",
    },
    elegant: {
      spacing: "0.02em",
      weight: "500",
    },
    sharp: {
      spacing: "0.04em",
      weight: "500",
    },
    bold: {
      spacing: "-0.02em",
      weight: "400",
    },
  };

  // Handle Preset Overrides (Forest Preset)
  let finalColors = { ...colors };
  let finalTypography = { ...typography };

  if (theme === "forest") {
    finalColors = {
      primary: "#344e41", // Shadow Forest (Tone)
      accent: "#cb997e", // Cedar Terra Cotta
      background: "#f1f5f2", // Forest Mist
      surfaceDark: "#0d2119", // Midnight Pine
      darkBackground: "#020805", // Black Forest
    };
    finalTypography = {
      headingFont: "bevan",
      character: "bold",
    };
    surfaces.borderRadius = "xl";
    surfaces.glassBlur = 8;
    surfaces.glassOpacity = 0.9;
  } else if (theme === "warm") {
    finalColors = {
      primary: "#b07d62",      // Muted Clay — warm but restrained
      accent: "#d4b896",       // Warm Linen — sandy, not yellow
      background: "#faf8f5",   // Warm Off-White — Aesop-style cream
      surfaceDark: "#2c1f14",  // Dark Espresso Brown — no red undertone
      darkBackground: "#1a1208", // Near-Black with warm undertone
    };
    finalTypography = {
      headingFont: "cormorant",
      character: "elegant",
    };
    surfaces.borderRadius = "3xl";
    surfaces.glassBlur = 10;
    surfaces.glassOpacity = 0.85;
  } else if (theme === "nordic-earth") {
    finalColors = {
      primary: "#5f7470", // Eucalyptus
      accent: "#cb997e", // Cedar Clay
      background: "#fbf9f4", // Alabaster (Lighter)
      surfaceDark: "#22223b", // Deep Space Indigo
      darkBackground: "#171721", // Nordic Night
    };
    finalTypography = {
      headingFont: "syne",
      character: "sharp",
    };
    // Force sharp architectural surfaces for Nordic
    surfaces.borderRadius = "sm";
    surfaces.glassBlur = 20;
    surfaces.glassOpacity = 0.7;
  } else if (theme === "cool") {
    finalColors = {
      primary: "#059669",
      accent: "#8ac7eb", // Final balanced midpoint (Vibrant Tone)
      background: "#f8fafc",
      surfaceDark: "#1e293b",
      darkBackground: "#020617",
    };
    finalTypography = {
      headingFont: "serif",
      character: "elegant",
    };
    surfaces.borderRadius = "2xl";
    surfaces.glassBlur = 12;
    surfaces.glassOpacity = 0.84;
  }

  const rv = getRadiusValues(surfaces.borderRadius);
  const finalHeadingFont = fontMap[finalTypography?.headingFont as keyof typeof fontMap] || "var(--font-nunito)";
  const finalCharStyle = characterStylesMap[finalTypography?.character as keyof typeof characterStylesMap] || characterStylesMap.playful;

  const cssString = `
    :root {
      --primary: ${finalColors.primary};
      --brand-primary: ${finalColors.primary};
      --accent: ${finalColors.accent};
      --background: ${finalColors.background};
      --surface-dark: ${finalColors.surfaceDark};
      --brand-tertiary: ${theme === "cool" ? "#314158" : finalColors.primary};
      --brand-tertiary-dark: ${theme === "cool" ? "#1e293b" : finalColors.surfaceDark};
      
      --radius: ${rv.base};
      --radius-sm: ${rv.sm};
      --radius-md: ${rv.md};
      --radius-lg: ${rv.lg};
      --radius-xl: ${rv.xl};
      --radius-2xl: ${rv["2xl"]};
      --radius-3xl: ${rv["3xl"]};
      --radius-full: ${rv.full};

      --glass-blur: ${surfaces.glassBlur}px;
      --glass-bg-opacity: ${surfaces.glassOpacity};
      --atmosphere-glow-opacity: ${atmosphere.glowIntensity};
      --atmosphere-noise-opacity: ${theme === "forest" ? "0.35" : "0.25"};

      --font-sans: ${finalSansFont};
      --font-heading: ${finalHeadingFont}, sans-serif;
      --heading-weight: ${finalCharStyle.weight};
      --heading-spacing: ${finalCharStyle.spacing};
      --heading-page-spacing: ${theme === "cool" ? "-0.0275em" : finalCharStyle.spacing};
      --heading-section-spacing: ${theme === "cool" ? "-0.06em" : finalCharStyle.spacing};

      /* Dark mode contrast overrides */
      --brand-accent: ${theme === "forest" ? finalColors.accent : "var(--accent)"};
    }

    .dark {
      --background: ${finalColors.darkBackground};
      --surface-dark: ${finalColors.surfaceDark};
      --brand-tertiary: ${theme === "cool" ? "#1e293b" : finalColors.primary};
      --brand-tertiary-dark: ${theme === "cool" ? "#0f172a" : finalColors.surfaceDark};
    }

    /* Forest Specific Adjustments */
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
        --foreground: #3d2b1f;               /* Warm charcoal — not black */
        --text-heading: #2c1f14;             /* Dark espresso, not red */
        --glass-bg: rgba(250, 248, 245, 0.78);
        --glass-border: rgba(44, 31, 20, 0.08);
        --atmosphere-glow-primary: rgba(176, 125, 98, 0.07);
        --atmosphere-glow-accent: rgba(212, 184, 150, 0.05);
        --brand-tertiary: #4a3728;           /* Muted dark warm brown */
        --brand-tertiary-dark: #2c1f14;
        --surface-dark: #2c1f14;
        --surface-dark-secondary: #1a1208;

        /* Muted WhatsApp for artisanal theme */
        --brand-whatsapp: #6a7c6a;
        --brand-whatsapp-dark: #5c6d5b;
      }
      
      .dark {
        --foreground: #f2ede8;
        --text-heading: #f2ede8;
        --glass-bg: rgba(26, 18, 8, 0.88);
        --glass-border: rgba(255, 255, 255, 0.06);
        --atmosphere-glow-primary: rgba(176, 125, 98, 0.12);
        --atmosphere-glow-accent: rgba(212, 184, 150, 0.08);
        --primary: #c9997a;                  /* Lighter muted clay for dark mode */
        --brand-primary: #c9997a;
        --brand-primary-dark: #d4b896;
        --surface-dark: #2c1f14;
        --surface-dark-secondary: #1a1208;
        --brand-tertiary: #2c1f14;
        --brand-tertiary-dark: #1a1208;
        
        /* Muted WhatsApp for artisanal theme */
        --brand-whatsapp: #5c6d5b;
        --brand-whatsapp-dark: #4a5949;
      }
    ` : ""}

    /* Cool Specific Adjustments */
    ${theme === "cool" ? `
      :root {
        --primary: #047857; /* Slightly darker Emerald for better contrast in light mode */
        --brand-primary: #047857;
        --brand-primary-dark: #065f46;
      }
      
      .dark {
        --primary: #10b981; /* Slightly lighter/more vibrant Emerald for dark mode */
        --brand-primary: #10b981;
        --brand-primary-dark: #34d399;
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
        --primary: #81b29a; /* Lighter Sage for dark mode contrast */
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

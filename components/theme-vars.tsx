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
  let finalLayout = { ...design.layout };

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

  // Handle Preset Overrides
  const finalColors = { ...colors };
  const finalTypography = { ...typography };
  const finalSurfaces = { ...surfaces };

  if (theme === "forest") {
    finalColors.primary = colors?.primary || "#344e41";
    finalColors.accent = colors?.accent || "#cb997e";
    finalColors.background = colors?.background || "#f1f5f2";
    finalColors.surfaceDark = colors?.surfaceDark || "#0d2119";
    finalColors.darkBackground = colors?.darkBackground || "#020805";
    
    finalTypography.headingFont = typography?.headingFont || "bevan";
    finalTypography.character = typography?.character || "bold";
    
    finalSurfaces.borderRadius = design.surfaces?.borderRadius || "xl";
    finalSurfaces.glassBlur = design.surfaces?.glassBlur || 8;
    finalSurfaces.glassOpacity = design.surfaces?.glassOpacity || 0.9;
    
    // Bold/Editorial layout
    finalLayout.width = design.layout?.width || "wide";
    finalLayout.spacing = design.layout?.spacing || "wide";
    finalLayout.gutter = design.layout?.gutter || "wide";
  } else if (theme === "warm") {
    finalColors.primary = colors?.primary || "#b07d62";
    finalColors.accent = colors?.accent || "#d4b896";
    finalColors.background = colors?.background || "#faf8f5";
    finalColors.surfaceDark = colors?.surfaceDark || "#2c1f14";
    finalColors.darkBackground = colors?.darkBackground || "#1a1208";
    
    finalTypography.headingFont = typography?.headingFont || "cormorant";
    finalTypography.character = typography?.character || "elegant";
    
    finalSurfaces.borderRadius = design.surfaces?.borderRadius || "3xl";
    finalSurfaces.glassBlur = design.surfaces?.glassBlur || 10;
    finalSurfaces.glassOpacity = design.surfaces?.glassOpacity || 0.85;
    
    // Relaxed layout
    finalLayout.width = design.layout?.width || "standard";
    finalLayout.spacing = design.layout?.spacing || "standard";
    finalLayout.gutter = design.layout?.gutter || "standard";
  } else if (theme === "nordic-earth") {
    finalColors.primary = colors?.primary || "#5f7470";
    finalColors.accent = colors?.accent || "#cb997e";
    finalColors.background = colors?.background || "#fbf9f4";
    finalColors.surfaceDark = colors?.surfaceDark || "#22223b";
    finalColors.darkBackground = colors?.darkBackground || "#171721";
    
    finalTypography.headingFont = typography?.headingFont || "syne";
    finalTypography.character = typography?.character || "sharp";
    
    // Force sharp architectural surfaces for Nordic
    finalSurfaces.borderRadius = design.surfaces?.borderRadius || "none";
    finalSurfaces.glassBlur = design.surfaces?.glassBlur || 20;
    finalSurfaces.glassOpacity = design.surfaces?.glassOpacity || 0.7;
    
    // Architectural layout
    finalLayout.width = design.layout?.width || "wide";
    finalLayout.spacing = design.layout?.spacing || "compact";
    finalLayout.gutter = design.layout?.gutter || "none";
  } else if (theme === "cool") {
    finalColors.primary = colors?.primary || "#059669";
    finalColors.accent = colors?.accent || "#8ac7eb";
    finalColors.background = colors?.background || "#f8fafc";
    finalColors.surfaceDark = colors?.surfaceDark || "#1e293b";
    finalColors.darkBackground = colors?.darkBackground || "#020617";
    
    finalTypography.headingFont = typography?.headingFont || "serif";
    finalTypography.character = typography?.character || "elegant";
    
    finalSurfaces.borderRadius = design.surfaces?.borderRadius || "2xl";
    finalSurfaces.glassBlur = design.surfaces?.glassBlur || 12;
    finalSurfaces.glassOpacity = design.surfaces?.glassOpacity || 0.84;
    
    // Clean standard layout
    finalLayout.width = design.layout?.width || "standard";
    finalLayout.spacing = design.layout?.spacing || "standard";
    finalLayout.gutter = design.layout?.gutter || "standard";
  }

  const rv = getRadiusValues(finalSurfaces.borderRadius);
  const finalHeadingFont = fontMap[finalTypography?.headingFont as keyof typeof fontMap] || "var(--font-nunito)";
  const finalCharStyle = characterStylesMap[finalTypography?.character as keyof typeof characterStylesMap] || characterStylesMap.playful;

  // Layout Mappings
  const layoutWidth = finalLayout.width === "compact" ? "1200px" : finalLayout.width === "wide" ? "1600px" : "1400px";
  
  const spacingMap = {
    compact: "clamp(1.5rem, 4vw, 2.5rem)",
    standard: "clamp(2rem, 5vw, 4rem)", /* matches original relaxed feel */
    wide: "clamp(3rem, 6vw, 6rem)",    /* matches original editorial feel */
  };
  const layoutSpacing = spacingMap[finalLayout.spacing as keyof typeof spacingMap] || "clamp(2rem, 5vw, 4rem)";

  const gutterMap = {
    none: "0px",
    compact: "0.75rem",  /* tighter than original */
    standard: theme === "warm" ? "1.25rem" : "1rem", /* matches original services/gallery feel */
    wide: "1.5rem",      /* matches original rooms-section feel */
  };
  const layoutGutter = gutterMap[finalLayout.gutter as keyof typeof gutterMap] || "1rem";
  
  // Icon Stroke Mappings
  const strokeMap = {
    thin: "1.5px",
    normal: "2px",
    bold: "2.5px",
  };
  const iconStroke = strokeMap[design.iconStroke as keyof typeof strokeMap] || "1.5px";

  const cssString = `
    :root {
      --primary: ${finalColors.primary};
      --brand-primary: ${finalColors.primary};
      --accent: ${finalColors.accent};
      --background: ${finalColors.background};
      --surface-dark: ${finalColors.surfaceDark};
      --brand-tertiary: ${theme === "cool" ? "#314158" : finalColors.primary};
      --brand-tertiary-dark: ${theme === "cool" ? "#1e293b" : finalColors.surfaceDark};
      
      --icon-stroke-width: ${iconStroke};
      
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

      --layout-max-width: ${layoutWidth};
      --layout-section-spacing: ${layoutSpacing};
      --layout-grid-gutter: ${layoutGutter};

      /* Dark mode contrast overrides */
      --brand-accent: ${theme === "forest" ? finalColors.accent : "var(--accent)"};
    }

    /* Responsive Layout Overrides */
    @media (max-width: 1024px) {
      :root {
        /* Step down gutter on tablet if set to wide */
        ${finalLayout.gutter === "wide" ? `--layout-grid-gutter: ${gutterMap.standard};` : ""}
      }
    }

    @media (max-width: 640px) {
      :root {
        /* Force compact gutter on mobile */
        --layout-grid-gutter: ${gutterMap.compact};
      }
    }

    @media (max-width: 420px) {
      :root {
        /* Subcompact gutter for narrow devices */
        --layout-grid-gutter: 0.5rem;
      }
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

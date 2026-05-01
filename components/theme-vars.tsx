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
          "3xl": "32px",
        };
    }
  };

  const rv = getRadiusValues(surfaces.borderRadius);

  // Typography Mappings
  const fontMap = {
    nunito: "var(--font-nunito)",
    inter: "var(--font-inter)",
    serif: "var(--font-serif)",
  };

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
  };

  // Handle Preset Overrides (Forest Preset)
  let finalColors = { ...colors };
  let finalTypography = { ...typography };

  if (theme === "forest") {
    finalColors = {
      primary: "#2d6a4f", // Sage-leaning Forest
      accent: "#cb997e", // Terracotta
      background: "#fdfaf4", // Warm Ivory
      surfaceDark: "#1b4332", // Deep Night Forest
      darkBackground: "#081c15", // Darkest Forest
    };
    finalTypography = {
      headingFont: "serif",
      character: "elegant",
    };
  }

  const finalHeadingFont = fontMap[finalTypography?.headingFont as keyof typeof fontMap] || "var(--font-nunito)";
  const finalCharStyle = characterStylesMap[finalTypography?.character as keyof typeof characterStylesMap] || characterStylesMap.playful;

  const cssString = `
    :root {
      --primary: ${finalColors.primary};
      --brand-primary: ${finalColors.primary};
      --accent: ${finalColors.accent};
      --background: ${finalColors.background};
      --surface-dark: ${finalColors.surfaceDark};
      
      --radius: ${rv.base};
      --radius-sm: ${rv.sm};
      --radius-md: ${rv.md};
      --radius-lg: ${rv.lg};
      --radius-xl: ${rv.xl};
      --radius-2xl: ${rv["2xl"]};
      --radius-3xl: ${rv["3xl"]};

      --glass-blur: ${surfaces.glassBlur}px;
      --glass-bg-opacity: ${surfaces.glassOpacity};
      --atmosphere-glow-opacity: ${atmosphere.glowIntensity};
      --atmosphere-noise-opacity: ${theme === "forest" ? "0.35" : "0.25"};

      --font-heading: ${finalHeadingFont}, sans-serif;
      --heading-weight: ${finalCharStyle.weight};
      --heading-spacing: ${finalCharStyle.spacing};

      /* Dark mode contrast overrides */
      --brand-accent: ${theme === "forest" ? finalColors.accent : "var(--accent)"};
    }

    .dark {
      --background: ${finalColors.darkBackground};
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
        --glass-bg: rgba(8, 28, 21, 0.85);
        --glass-border: rgba(255, 255, 255, 0.07);
        --atmosphere-glow-primary: rgba(45, 106, 79, 0.14);
        --atmosphere-glow-accent: rgba(203, 153, 126, 0.10);
      }
    ` : ""}
  `;

  return <style id="dynamic-theme-vars" dangerouslySetInnerHTML={{ __html: cssString }} />;
}

#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const readline = require("readline");

const {
  INSTANCES_DIR,
  ROOT,
  isValidInstanceId,
  parseArgs,
  slugify,
  toPascalCase,
  validateInstance,
  validateInstanceDirectory,
} = require("./instance-utils");

const args = parseArgs();

function question(rl, prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, (answer) => resolve(answer.trim()));
  });
}

async function promptForMissing(config) {
  if (config.yes) {
    return config;
  }

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  try {
    if (!config.name) {
      config.name = await question(rl, "Property name: ");
    }

    if (!config.id) {
      const suggested = slugify(config.name);
      const answer = await question(rl, `Instance id (${suggested}): `);
      config.id = answer || suggested;
    }

    if (!config.shortName) {
      const answer = await question(rl, `Short name (${config.name}): `);
      config.shortName = answer || config.name;
    }

    if (!config.city) {
      config.city = await question(rl, "City/area: ");
    }

    if (!config.country) {
      config.country = await question(rl, "Country: ");
    }

    if (!config.theme) {
      const answer = await question(rl, "Theme [cool|warm|forest|nordic-earth] (cool): ");
      config.theme = answer || "cool";
    }

    if (!config.latitude) {
      config.latitude = await question(rl, "Latitude (optional): ");
    }

    if (!config.longitude) {
      config.longitude = await question(rl, "Longitude (optional): ");
    }
  } finally {
    rl.close();
  }

  return config;
}

function copyRecursive(src, dest) {
  const stat = fs.statSync(src);

  if (stat.isDirectory()) {
    fs.mkdirSync(dest, { recursive: true });
    for (const entry of fs.readdirSync(src)) {
      if (entry === ".DS_Store") continue;
      copyRecursive(path.join(src, entry), path.join(dest, entry));
    }
    return;
  }

  fs.copyFileSync(src, dest);
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeJson(filePath, value) {
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`);
}

function resolveSourceDir(config) {
  if (config.from) {
    return path.join(INSTANCES_DIR, config.from);
  }

  const templateName = config.template || "hostel";
  const templateDir = path.join(INSTANCES_DIR, "_templates", templateName);
  if (fs.existsSync(templateDir)) {
    return templateDir;
  }

  return path.join(INSTANCES_DIR, "scodrinon");
}

function generateInstanceModule(id, targetDir = path.join(INSTANCES_DIR, id)) {
  const baseName = toPascalCase(id);
  const variableName = `${/^[0-9]/.test(baseName) ? "Instance" : ""}${baseName}Instance`;
  const pathsRoot = `instances/${id}`;
  const hasTrailGeoJson = fs.existsSync(path.join(targetDir, "content", "theth_valbona_tracks.json"));
  const hasHikingGuide = fs.existsSync(path.join(targetDir, "content", "hiking-guide.json"));
  const imports = [
    'import faq from "./content/faq.json";',
    'import gallery from "./content/gallery.json";',
    'import homepage from "./content/homepage.json";',
    'import navigation from "./content/navigation.json";',
    'import pois from "./content/pois.json";',
    'import rooms from "./content/rooms.json";',
    'import settings from "./content/settings.json";',
    'import siteCopy from "./content/site-copy.json";',
    'import testimonials from "./content/testimonials.json";',
    'import thingsToDo from "./content/things-to-do.json";',
    hasTrailGeoJson ? 'import thethValbonaTracks from "./content/theth_valbona_tracks.json";' : null,
    hasHikingGuide ? 'import hikingGuide from "./content/hiking-guide.json";' : null,
    'import mapConfig from "./content/map-config.json";',
  ].filter(Boolean);

  const optionalFallbacks = [
    hasTrailGeoJson ? null : 'const thethValbonaTracks = { type: "FeatureCollection", features: [] };',
    hasHikingGuide ? null : "const hikingGuide = {};",
  ].filter(Boolean);

  const contentPathEntries = [
    `settings: "${pathsRoot}/content/settings.json",`,
    `navigation: "${pathsRoot}/content/navigation.json",`,
    `rooms: "${pathsRoot}/content/rooms.json",`,
    `homepage: "${pathsRoot}/content/homepage.json",`,
    `faq: "${pathsRoot}/content/faq.json",`,
    `testimonials: "${pathsRoot}/content/testimonials.json",`,
    `gallery: "${pathsRoot}/content/gallery.json",`,
    `thingsToDo: "${pathsRoot}/content/things-to-do.json",`,
    `pois: "${pathsRoot}/content/pois.json",`,
    hasTrailGeoJson ? `trails: "${pathsRoot}/content/theth_valbona_tracks.json",` : null,
    `siteCopy: "${pathsRoot}/content/site-copy.json",`,
    `mapConfig: "${pathsRoot}/content/map-config.json",`,
  ].filter(Boolean);

  const contentEntries = [
    "settings,",
    "navigation,",
    "rooms,",
    "homepage,",
    "faq,",
    "testimonials,",
    "gallery,",
    "thingsToDo,",
    "siteCopy,",
    "pois,",
    "thethValbonaTracks,",
    "hikingGuide,",
    "mapConfig,",
  ];

  const loaderEntries = [
    "loadPois: async () => pois,",
    "loadTrailGeoJson: async () => thethValbonaTracks,",
  ];

  return `${imports.join("\n")}
${optionalFallbacks.join("\n")}

export const ${variableName} = {
  id: "${id}",
  name: settings.business.shortName,
  paths: {
    contentRoot: "${pathsRoot}/content",
    publicRoot: "${pathsRoot}/public",
    imagesRoot: "${pathsRoot}/public/images",
    videosRoot: "${pathsRoot}/public/videos",
    brandingRoot: "${pathsRoot}/public/branding",
  },
  contentPaths: {
    ${contentPathEntries.join("\n    ")}
  },
  brandingAssets: {
    publicLogoWebp: "/logo.webp",
    publicLogoPng: "/logo.png",
    publicIcon: "/icon.png",
    publicIcon192: "/icon-192.png",
    publicAppleIcon: "/apple-icon.png",
    appIcon: "app/icon.png",
    appIcon192: "app/icon-192.png",
    appAppleIcon: "app/apple-icon.png",
    appFavicon: "app/favicon.ico",
  },
  featureFlags: settings.features,
  integrations: {
    analytics: {
      provider: "umami",
      scriptSrc: "https://cloud.umami.is/script.js",
      websiteIdEnvVar: "NEXT_PUBLIC_UMAMI_WEBSITE_ID",
    },
    mapbox: {
      tokenEnvVar: "NEXT_PUBLIC_MAPBOX_TOKEN",
    },
    cms: {
      mediaFolder: "public/images",
      publicFolder: "/images",
    },
  },
  content: {
    ${contentEntries.join("\n    ")}
  },
  loaders: {
    ${loaderEntries.join("\n    ")}
  },
  mapConfig: mapConfig as any,
} as const;
`;
}

function patchContent(id, config, targetDir = path.join(INSTANCES_DIR, id)) {
  const contentDir = path.join(targetDir, "content");
  const settingsPath = path.join(contentDir, "settings.json");
  const mapConfigPath = path.join(contentDir, "map-config.json");

  const settings = readJson(settingsPath);
  settings.business.name = config.name;
  settings.business.shortName = config.shortName || config.name;
  settings.business.tagline = settings.business.tagline || "";
  settings.business.description = config.description || settings.business.description;
  settings.address.summary =
    [config.city, config.country].filter(Boolean).join(", ") || settings.address.summary;
  settings.address.addressLocality = config.city || settings.address.addressLocality;
  settings.address.addressCountry = config.country || settings.address.addressCountry;

  if (settings.branding?.design) {
    settings.branding.design.theme = config.theme || settings.branding.design.theme;
    if (settings.branding.design.mascot && config.mascot === false) {
      settings.branding.design.mascot.enabled = false;
      settings.branding.design.mascot.type = "none";
    }
  }

  settings.features = settings.features || {};
  if (config.weather === false) {
    settings.features.showRegionalWeather = false;
  }
  if (config.map === false) {
    settings.features.showLocalExperienceMap = false;
    settings.features.showLocalPois = false;
  }
  if (config.regionalTrails === false) {
    settings.features.showRegionalTrails = false;
  }

  const latitude = Number(config.latitude);
  const longitude = Number(config.longitude);
  const hasCoords = Number.isFinite(latitude) && Number.isFinite(longitude);
  if (!hasCoords) {
    settings.features.showRegionalWeather = false;
    settings.features.showLocalExperienceMap = false;
    settings.features.showLocalPois = false;
  }
  if (hasCoords) {
    settings.weather = {
      latitude,
      longitude,
      label: config.weatherLabel || settings.address.summary,
      sublabel: settings.weather?.sublabel || "Currently",
    };
  }

  writeJson(settingsPath, settings);

  if (fs.existsSync(mapConfigPath) && hasCoords) {
    const mapConfig = readJson(mapConfigPath);
    mapConfig.property = mapConfig.property || {};
    mapConfig.property.coords = [longitude, latitude];
    mapConfig.property.label = mapConfig.property.label || "property";
    mapConfig.hostel = mapConfig.hostel || {};
    mapConfig.hostel.coords = [longitude, latitude];
    mapConfig.hostel.label = mapConfig.hostel.label || "property";
    mapConfig.overlays = mapConfig.overlays || {};
    if (mapConfig.overlays.walkRadiusKm === undefined) {
      mapConfig.overlays.walkRadiusKm = config.map === false ? 0 : 0.45;
    }
    mapConfig.keywords = mapConfig.keywords || {};
    mapConfig.keywords.property = [id, config.shortName, config.name].filter(Boolean);
    writeJson(mapConfigPath, mapConfig);
  }
}

function updateRegistry(id) {
  const registryPath = path.join(INSTANCES_DIR, "index.ts");
  const baseName = toPascalCase(id);
  const variableName = `${/^[0-9]/.test(baseName) ? "Instance" : ""}${baseName}Instance`;
  const importLine = `import { ${variableName} } from "./${id}";`;
  const key = id.includes("-") ? `"${id}"` : id;
  const entryLine = `  ${key}: ${variableName},`;

  let registry = fs.readFileSync(registryPath, "utf8");
  if (!registry.includes(importLine)) {
    const importMatches = registry.match(/^import .+;$/gm);
    const lastImport = importMatches ? importMatches[importMatches.length - 1] : null;
    registry = lastImport
      ? registry.replace(lastImport, `${lastImport}\n${importLine}`)
      : `${importLine}\n${registry}`;
  }

  if (!registry.includes(entryLine)) {
    registry = registry.replace(/const INSTANCE_REGISTRY = \{\n/, `const INSTANCE_REGISTRY = {\n${entryLine}\n`);
  }

  fs.writeFileSync(registryPath, registry);
}

async function main() {
  const config = await promptForMissing({
    id: args.id || args.instance,
    name: args.name,
    shortName: args["short-name"],
    city: args.city,
    country: args.country,
    theme: args.theme,
    latitude: args.latitude,
    longitude: args.longitude,
    weatherLabel: args["weather-label"],
    from: args.from,
    template: args.template,
    yes: Boolean(args.yes),
    dryRun: Boolean(args["dry-run"]),
    map: args.map !== "false" && args["no-map"] !== true,
    mascot: args.mascot !== "false" && args["no-mascot"] !== true,
    weather: args.weather !== "false" && args["no-weather"] !== true,
    regionalTrails: args["regional-trails"] === true || args["regional-trails"] === "true",
    description: args.description,
  });

  const id = slugify(config.id);
  if (!isValidInstanceId(id)) {
    console.error(`[create-instance] Invalid instance id "${config.id}". Use lowercase letters, numbers, and hyphens.`);
    process.exit(1);
  }

  if (!config.name) {
    console.error("[create-instance] Property name is required. Pass --name or run interactively.");
    process.exit(1);
  }

  const sourceDir = resolveSourceDir(config);
  const targetDir = config.dryRun
    ? path.join(ROOT, ".tmp", "instance-dry-runs", `${id}-${Date.now()}`)
    : path.join(INSTANCES_DIR, id);

  if (!fs.existsSync(sourceDir)) {
    console.error(`[create-instance] Source template/instance does not exist: ${path.relative(ROOT, sourceDir)}`);
    process.exit(1);
  }

  if (fs.existsSync(targetDir)) {
    console.error(`[create-instance] Instance already exists: ${path.relative(ROOT, targetDir)}`);
    process.exit(1);
  }

  copyRecursive(sourceDir, targetDir);
  fs.writeFileSync(path.join(targetDir, "index.ts"), generateInstanceModule(id, targetDir));
  patchContent(id, config, targetDir);

  if (!config.dryRun && args.register !== "false" && args["no-register"] !== true) {
    updateRegistry(id);
  }

  const result = config.dryRun
    ? validateInstanceDirectory(id, targetDir, { requireRegistry: false })
    : validateInstance(id);
  if (result.errors.length > 0) {
    console.error(`[create-instance] Created ${id}, but validation failed:`);
    result.errors.forEach((error) => console.error(`  error: ${error}`));
    process.exit(1);
  }

  console.log(`[create-instance] ${config.dryRun ? "Dry-run created" : "Created"} instance "${id}" from ${path.relative(ROOT, sourceDir)}`);
  result.warnings.forEach((warning) => console.warn(`  warning: ${warning}`));
  if (config.dryRun) {
    console.log(`[create-instance] Dry-run output: ${path.relative(ROOT, targetDir)}`);
  } else {
    console.log(`[create-instance] Try it with: INSTANCE_ID=${id} npm run dev`);
  }
}

main().catch((error) => {
  console.error("[create-instance] Failed:", error);
  process.exit(1);
});

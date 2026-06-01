const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const INSTANCES_DIR = path.join(ROOT, "instances");

const REQUIRED_CONTENT_FILES = [
  "settings.json",
  "navigation.json",
  "rooms.json",
  "homepage.json",
  "faq.json",
  "testimonials.json",
  "gallery.json",
  "things-to-do.json",
  "pois.json",
  "site-copy.json",
  "map-config.json",
];

const OPTIONAL_CONTENT_FILES = [
  "hiking-guide.json",
  "theth_valbona_tracks.json",
  "regional-trails.json",
];

function parseArgs(argv = process.argv.slice(2)) {
  const args = {};

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];

    if (arg.startsWith("--") && arg.includes("=")) {
      const [key, ...valueParts] = arg.slice(2).split("=");
      args[key] = valueParts.join("=");
      continue;
    }

    if (arg.startsWith("--")) {
      const key = arg.slice(2);
      const next = argv[i + 1];
      if (next && !next.startsWith("--")) {
        args[key] = next;
        i += 1;
      } else {
        args[key] = true;
      }
    }
  }

  return args;
}

function slugify(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function toPascalCase(value) {
  const slug = slugify(value);
  return slug
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}

function isValidInstanceId(value) {
  return /^[a-z0-9][a-z0-9-]*[a-z0-9]$|^[a-z0-9]$/.test(value || "");
}

function getRequestedInstanceId(args = parseArgs()) {
  return (
    args.instance ||
    args.id ||
    process.env.INSTANCE_ID ||
    process.env.NEXT_PUBLIC_INSTANCE_ID ||
    process.env.NEXT_PUBLIC_SITE_INSTANCE ||
    process.env.SITE_INSTANCE ||
    "scodrinon"
  );
}

function listInstanceIds() {
  if (!fs.existsSync(INSTANCES_DIR)) {
    return [];
  }

  return fs
    .readdirSync(INSTANCES_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .filter((name) => !name.startsWith("_"))
    .filter((name) => fs.existsSync(path.join(INSTANCES_DIR, name, "index.ts")))
    .sort();
}

function readJson(filePath, errors) {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch (error) {
    errors.push(`${path.relative(ROOT, filePath)} is not valid JSON: ${error.message}`);
    return null;
  }
}

function hasValue(value) {
  return value !== undefined && value !== null && value !== "";
}

function requirePath(object, dottedPath, errors, context) {
  const value = dottedPath.split(".").reduce((acc, key) => (acc ? acc[key] : undefined), object);
  if (!hasValue(value)) {
    errors.push(`${context} is missing required value "${dottedPath}"`);
  }
  return value;
}

function collectAssetRefs(value, refs = new Set()) {
  if (Array.isArray(value)) {
    value.forEach((item) => collectAssetRefs(item, refs));
    return refs;
  }

  if (value && typeof value === "object") {
    Object.values(value).forEach((item) => collectAssetRefs(item, refs));
    return refs;
  }

  if (typeof value === "string" && /^\/(images|videos|branding|logo|icon|apple-icon|favicon)/.test(value)) {
    refs.add(value);
  }

  return refs;
}

function publicPathForAsset(instanceId, assetRef) {
  const normalized = assetRef.replace(/^\//, "");

  if (normalized === "logo.webp" || normalized === "logo.png" || normalized === "favicon.ico" || normalized === "icon.png" || normalized === "icon-192.png" || normalized === "apple-icon.png") {
    return path.join(INSTANCES_DIR, instanceId, "public", "branding", normalized);
  }

  return path.join(INSTANCES_DIR, instanceId, "public", normalized);
}

function validateInstance(instanceId, options = {}) {
  const checkAssets = options.checkAssets !== false;
  const errors = [];
  const warnings = [];
  const id = slugify(instanceId);

  if (!isValidInstanceId(id)) {
    errors.push(`Invalid instance id "${instanceId}". Use lowercase letters, numbers, and hyphens.`);
    return { id, errors, warnings };
  }

  const instanceDir = path.join(INSTANCES_DIR, id);
  const contentDir = path.join(instanceDir, "content");
  const publicDir = path.join(instanceDir, "public");
  const indexFile = path.join(instanceDir, "index.ts");

  if (!fs.existsSync(instanceDir)) {
    errors.push(`Instance "${id}" does not exist at ${path.relative(ROOT, instanceDir)}`);
    return { id, errors, warnings };
  }

  if (!fs.existsSync(indexFile)) {
    errors.push(`${path.relative(ROOT, indexFile)} is missing`);
  }

  if (!fs.existsSync(contentDir)) {
    errors.push(`${path.relative(ROOT, contentDir)} is missing`);
    return { id, errors, warnings };
  }

  if (!fs.existsSync(publicDir)) {
    warnings.push(`${path.relative(ROOT, publicDir)} is missing; prebuild will fail unless assets are added`);
  }

  for (const fileName of REQUIRED_CONTENT_FILES) {
    const filePath = path.join(contentDir, fileName);
    if (!fs.existsSync(filePath)) {
      errors.push(`${path.relative(ROOT, filePath)} is missing`);
    }
  }

  const content = {};
  for (const fileName of [...REQUIRED_CONTENT_FILES, ...OPTIONAL_CONTENT_FILES]) {
    const filePath = path.join(contentDir, fileName);
    if (fs.existsSync(filePath)) {
      content[fileName] = readJson(filePath, errors);
    }
  }

  const settings = content["settings.json"];
  if (settings) {
    const context = `${id}/content/settings.json`;
    requirePath(settings, "business.name", errors, context);
    requirePath(settings, "business.shortName", errors, context);
    requirePath(settings, "business.description", errors, context);
    requirePath(settings, "address.summary", errors, context);
    requirePath(settings, "contact.channels", errors, context);
    requirePath(settings, "booking.channels", errors, context);
    requirePath(settings, "seo.baseKeywords", errors, context);
    requirePath(settings, "seo.titleSuffix", errors, context);
    requirePath(settings, "branding.design.theme", errors, context);
    requirePath(settings, "features", errors, context);

    for (const group of ["contact", "booking"]) {
      const channels = settings[group]?.channels || [];
      channels.forEach((channel, index) => {
        if (!channel.enabled) return;
        for (const key of ["id", "label", "url", "icon", "stylePriority"]) {
          if (!hasValue(channel[key])) {
            errors.push(`${context} enabled ${group}.channels[${index}] is missing "${key}"`);
          }
        }
      });
    }

    const bookingChannels = settings.booking?.channels || [];
    const bookingChannelIds = new Set(bookingChannels.filter((channel) => channel.enabled).map((channel) => channel.id));
    const ratings = settings.booking?.ratings || [];
    if (Array.isArray(ratings)) {
      ratings.forEach((rating, index) => {
        if (rating.enabled === false) return;
        for (const key of ["id", "sourceLabel", "title", "url", "rating", "icon"]) {
          if (!hasValue(rating[key])) {
            errors.push(`${context} enabled booking.ratings[${index}] is missing "${key}"`);
          }
        }
        if (rating.id && !bookingChannelIds.has(rating.id)) {
          warnings.push(`${context} booking.ratings[${index}] id "${rating.id}" does not match an enabled booking channel`);
        }
      });
    } else {
      errors.push(`${context} booking.ratings must be an array when provided`);
    }

    if (settings.features?.showRegionalWeather && !settings.weather) {
      errors.push(`${context} enables showRegionalWeather but has no weather config`);
    }

    if (settings.weather) {
      for (const key of ["latitude", "longitude", "label", "sublabel"]) {
        if (!hasValue(settings.weather[key])) {
          errors.push(`${context} weather is missing "${key}"`);
        }
      }
    }

    if (settings.features?.showRegionalTrails && !content["theth_valbona_tracks.json"] && !content["regional-trails.json"]) {
      warnings.push(`${context} enables showRegionalTrails but no trail GeoJSON file was found`);
    }
  }

  const mapConfig = content["map-config.json"];
  if (mapConfig) {
    const context = `${id}/content/map-config.json`;
    const propertyMarker = mapConfig.property || mapConfig.hostel;
    if (!Array.isArray(propertyMarker?.coords) || propertyMarker.coords.length !== 2) {
      errors.push(`${context} must define property.coords as [longitude, latitude]`);
    }
    if (!mapConfig.styles?.standard) {
      warnings.push(`${context} has no styles.standard; Mapbox will not have a configured default style`);
    }
  }

  const registryPath = path.join(INSTANCES_DIR, "index.ts");
  if (fs.existsSync(registryPath)) {
    const registry = fs.readFileSync(registryPath, "utf8");
    if (!registry.includes(`${id}:`) && !registry.includes(`"${id}":`)) {
      errors.push(`instances/index.ts does not register "${id}"`);
    }
  }

  if (checkAssets && publicDir && fs.existsSync(publicDir)) {
    const refs = new Set();
    Object.values(content).forEach((json) => collectAssetRefs(json, refs));
    for (const ref of refs) {
      const assetPath = publicPathForAsset(id, ref);
      if (!fs.existsSync(assetPath)) {
        warnings.push(`Referenced asset ${ref} was not found at ${path.relative(ROOT, assetPath)}`);
      }
    }
  }

  return { id, errors, warnings };
}

module.exports = {
  ROOT,
  INSTANCES_DIR,
  REQUIRED_CONTENT_FILES,
  OPTIONAL_CONTENT_FILES,
  collectAssetRefs,
  getRequestedInstanceId,
  isValidInstanceId,
  listInstanceIds,
  parseArgs,
  publicPathForAsset,
  slugify,
  toPascalCase,
  validateInstance,
};

# Instance Workflow

This project supports multiple property instances under `instances/`.  
Each instance owns its content JSON, public assets, and a small TypeScript
module that wires those files into the app.

---

## Quick start

```bash
# 1. Scaffold a new instance (interactive)
npm run create-instance

# 2. Start the dev server for that instance
INSTANCE_ID=my-hostel npm run dev
```

---

## `npm run create-instance`

### Interactive mode

Running the command without flags prompts for each required value:

```
Property name: My Hostel
Instance id (my-hostel): 
Short name (My Hostel): 
City/area: Shkoder
Country: Albania
Theme [cool|warm|forest|nordic-earth] (cool): 
Latitude (optional): 42.069258
Longitude (optional): 19.516985
```

### Non-interactive mode (all flags)

```bash
npm run create-instance -- \
  --id=my-hostel \
  --name="My Hostel" \
  --short-name="My Hostel" \
  --city=Shkoder \
  --country=Albania \
  --latitude=42.069258 \
  --longitude=19.516985 \
  --theme=cool \
  --yes
```

`--yes` skips all prompts. Any omitted flag falls back to the template default
(`--short-name` defaults to `--name`; `--city`/`--country` keep the
template placeholder).

### All flags

| Flag | Default | Description |
|---|---|---|
| `--id` | slugified `--name` | Instance identifier. Lowercase letters, numbers, hyphens only. |
| `--name` | *(required)* | Full property name, e.g. `"Coastal Hostel"`. |
| `--short-name` | same as `--name` | Shorter display name used in headings. |
| `--city` | template placeholder | City or area, e.g. `Shkoder`. |
| `--country` | template placeholder | Country, e.g. `Albania`. |
| `--latitude` | *(none)* | Decimal latitude. Omit to disable weather and map features. |
| `--longitude` | *(none)* | Decimal longitude. |
| `--theme` | `cool` | Colour theme: `cool`, `warm`, `forest`, or `nordic-earth`. |
| `--description` | template default | Property description used in SEO metadata. |
| `--weather-label` | `"<city>, <country>"` | Label shown in the weather widget. |
| `--template` | `hostel` | Template name under `instances/_templates/`. |
| `--from` | *(none)* | Clone from an existing instance id instead of a template. |
| `--no-map` | map enabled | Disable the local experience map and POIs. |
| `--no-weather` | weather enabled | Disable the regional weather widget. |
| `--regional-trails` | trails disabled | Enable regional trail GeoJSON features. |
| `--no-mascot` | mascot disabled | Explicitly disable mascot branding. |
| `--no-register` | auto-registers | Skip writing to `instances/index.ts`. |
| `--dry-run` | real write | Write output to `.tmp/instance-dry-runs/<id>-<ts>/` instead of `instances/`. |
| `--yes` / `-y` | interactive | Skip all interactive prompts. |

### Dry-run

Use `--dry-run` to preview what the scaffold will produce without touching
`instances/` or the registry:

```bash
npm run create-instance -- \
  --id=preview \
  --name="Preview Hostel" \
  --city=Rome \
  --country=Italy \
  --latitude=41.9028 \
  --longitude=12.4964 \
  --yes \
  --dry-run
```

Output is written to `.tmp/instance-dry-runs/<id>-<timestamp>/`.  
The directory is git-ignored. Validation still runs against the dry-run
output, so errors surface before any real files are created.

---

## What the scaffold produces

For an instance `my-hostel` the scaffold:

1. **Copies** `instances/_templates/hostel/` → `instances/my-hostel/`
2. **Generates** `instances/my-hostel/index.ts` with the correct import
   paths, variable name, and `contentPaths` for the instance.
3. **Patches** `content/settings.json` with the supplied name, city, country,
   coordinates, and theme.
4. **Patches** `content/map-config.json` with the supplied coordinates.
5. **Registers** the instance in `instances/index.ts` (unless `--no-register`).
6. **Validates** the result and exits non-zero if any required field is missing.

### Generated `index.ts`

The generated module exports a typed `<Name>Instance` constant.
Optional files (`theth_valbona_tracks.json`, `hiking-guide.json`) are only
imported when they exist in the instance directory; otherwise lightweight
inline fallbacks are emitted so the app always compiles:

```ts
// when no trail GeoJSON is present:
const thethValbonaTracks = { type: "FeatureCollection", features: [] };
const hikingGuide = {};
```

---

## Templates

Templates live in `instances/_templates/<name>/`. The scaffold uses
`instances/_templates/hostel` by default.

### Hostel template

Provides a complete, generic starting point with:
- All required content JSON files with placeholder copy
- Feature flags set to sensible defaults (`showRegionalTrails: false`)
- Rating cards pre-defined but disabled (set `enabled: true` after filling in
  real URLs and scores)
- A `placeholder.svg` image asset for all image slots

### Using a different template

```bash
npm run create-instance -- --template=boutique-hotel --name="La Maison" --yes
```

### Cloning an existing instance

```bash
npm run create-instance -- --from=my-hostel --id=my-hostel-2 --name="My Hostel 2" --yes
```

---

## Running locally

```bash
INSTANCE_ID=my-hostel npm run dev
```

Instance selection checks these environment variables in order:

```
NEXT_PUBLIC_INSTANCE_ID
INSTANCE_ID
NEXT_PUBLIC_SITE_INSTANCE
SITE_INSTANCE
```

If none are set, the app uses `scodrinon`.

---

## Building

```bash
INSTANCE_ID=my-hostel npm run build
```

`npm run build` automatically runs `prebuild`, which:
1. Validates the active instance.
2. Copies `instances/<id>/public/` into the root `public/` directory.

---

## Feature flags (`settings.features`)

Set these booleans in `instances/<id>/content/settings.json` to control
which sections of the site are rendered.

| Flag | Default in template | Effect |
|---|---|---|
| `showRegionalWeather` | `true` | Weather widget on the homepage. Requires `settings.weather` coords. |
| `showLocalExperienceMap` | `true` | Mapbox map on the Experiences page. Requires coordinates. |
| `showLocalPois` | `true` | Points-of-interest pins on the map. |
| `showRegionalTrails` | `false` | Regional hiking trail section and `/theth-valbona-hiking-guide` route. Requires a trail GeoJSON file. |
| `showMascot` | `false` | Character mascot in the header. |
| `volunteersNeeded` | `false` | Volunteer recruitment banner. |

If no coordinates are supplied to `create-instance`, `showRegionalWeather`,
`showLocalExperienceMap`, and `showLocalPois` are automatically set to
`false`.

---

## Booking ratings (`settings.booking.ratings`)

Define rating cards in `content/settings.json` to show platform scores on
the homepage:

```json
{
  "booking": {
    "ratings": [
      {
        "id": "booking-com",
        "sourceLabel": "Booking.com",
        "title": "2025 Traveller Review Award",
        "description": "Awarded for consistent guest satisfaction.",
        "url": "https://www.booking.com/hotel/...",
        "rating": "9.3",
        "scoreSuffix": "out of 10",
        "icon": "bookingCom",
        "enabled": true
      },
      {
        "id": "hostelworld",
        "sourceLabel": "Hostelworld",
        "title": "'Superb' Guest Rating",
        "url": "https://www.hostelworld.com/...",
        "rating": "9.5",
        "reviews": "116",
        "reviewsSuffix": "Reviews",
        "badgeText": "Top Rated",
        "icon": "hostelworld",
        "enabled": true
      }
    ]
  }
}
```

The homepage renders up to two `enabled` cards.  
`id` must match an entry in `booking.channels` (a warning is raised if not).  
If `booking.ratings` is absent entirely, the normaliser falls back to the
legacy `bookingRating` / `hostelworldRating` string fields for backward
compatibility.

---

## Validation

### Validate the current instance

```bash
npm run validate-instance
```

### Validate a specific instance

```bash
npm run validate-instance -- --instance=my-hostel
```

### Validate all registered instances

```bash
npm run validate-instances
```

### Validate scaffold templates

```bash
npm run validate-templates
```

Validation checks:

- All required content files are present and valid JSON
- Required settings fields are non-empty (`business.name`, `address.summary`,
  `seo.titleSuffix`, `branding.design.theme`, etc.)
- Enabled `contact.channels` and `booking.channels` have all required keys
- Enabled `booking.ratings` entries have all required keys and their `id`
  matches a booking channel
- `showRegionalWeather` is only enabled when `settings.weather` coords exist
- `showRegionalTrails` warns if no trail GeoJSON file is present
- `map-config.json` has `property.coords` (or legacy `hostel.coords`) set
- The instance is registered in `instances/index.ts`
- Referenced image/video paths exist under `instances/<id>/public/`

---

## Content file reference

| File | Purpose |
|---|---|
| `settings.json` | Business info, address, feature flags, booking channels, branding, SEO |
| `navigation.json` | Header and footer nav links |
| `rooms.json` | Room/dorm listings |
| `homepage.json` | Homepage hero, section copy |
| `site-copy.json` | Shared copy blocks: experiences hero, CTA strips, media grids |
| `faq.json` | FAQ section questions and answers |
| `testimonials.json` | Guest review cards |
| `gallery.json` | Photo gallery images |
| `things-to-do.json` | Activity/experience cards |
| `pois.json` | Map points of interest |
| `map-config.json` | Mapbox styles, property marker coords, walk-radius overlay |
| `theth_valbona_tracks.json` | *(optional)* Trail GeoJSON for regional hiking section |
| `hiking-guide.json` | *(optional)* Hiking guide route metadata |

---

## Directory layout

```
instances/
├── index.ts                        # Registry: maps id → instance module
├── _templates/
│   └── hostel/                     # Generic hostel template
│       ├── content/                # All required JSON files
│       └── public/
│           └── images/
│               └── placeholder.svg
└── my-hostel/                      # A real instance
    ├── index.ts                    # Generated by create-instance
    ├── content/
    │   └── *.json
    └── public/
        ├── branding/               # logo.webp, logo.png, icon*.png, favicon.ico
        └── images/
```

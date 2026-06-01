# Instance Workflow

This project supports multiple property instances under `instances/`.
An instance owns its content JSON, public assets, and a small TypeScript module
that makes those files available to the app.

## Create an Instance

Interactive:

```bash
npm run create-instance
```

With flags:

```bash
npm run create-instance -- \
  --id=my-hostel \
  --name="My Hostel" \
  --short-name="My Hostel" \
  --city=Shkoder \
  --country=Albania \
  --latitude=42.069258 \
  --longitude=19.516985
```

Then run it locally:

```bash
INSTANCE_ID=my-hostel npm run dev
```

The scaffold currently looks for `instances/_templates/<template>`. If no
template exists, it seeds from `instances/scodrinon` and rewrites the basic
property settings, coordinates, instance module, and registry entry.

## Validate

Validate the selected instance:

```bash
npm run validate-instance
```

Validate a specific instance:

```bash
npm run validate-instance -- --instance=my-hostel
```

Validate all registered instances:

```bash
npm run validate-instances
```

Validate scaffold templates:

```bash
npm run validate-templates
```

Validation checks required content files, required settings, enabled channels,
weather/map feature consistency, registry wiring, and referenced public assets.

## Booking Ratings

New instances can define rating cards in `content/settings.json`:

```json
{
  "booking": {
    "ratings": [
      {
        "id": "booking-com",
        "sourceLabel": "Booking.com",
        "title": "Traveller Review Award",
        "description": "Awarded for consistent guest satisfaction.",
        "url": "https://example.com",
        "rating": "9.3",
        "scoreSuffix": "out of 10",
        "icon": "bookingCom",
        "enabled": true
      }
    ]
  }
}
```

The homepage renders up to two enabled rating cards. If `booking.ratings` is
not present, the data normalizer falls back to the legacy Booking.com and
Hostelworld fields for existing instances.

## Build Selection

Instance selection checks these environment variables, in order:

```txt
NEXT_PUBLIC_INSTANCE_ID
INSTANCE_ID
NEXT_PUBLIC_SITE_INSTANCE
SITE_INSTANCE
```

If none are set, the app uses `scodrinon`.

`npm run build` automatically runs `prebuild`, which validates the active
instance and copies `instances/<id>/public` into root `public`.

## Future Templates

Recommended template folders:

```txt
instances/_templates/hostel
instances/_templates/boutique-hotel
instances/_templates/apartment-rental
```

Each template should include the same required content files as a normal
instance, but with generic copy, generic imagery placeholders, and feature flags
set conservatively.

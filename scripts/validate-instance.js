#!/usr/bin/env node

const {
  INSTANCES_DIR,
  getRequestedInstanceId,
  listInstanceIds,
  parseArgs,
  validateInstance,
  validateTemplate,
} = require("./instance-utils");
const fs = require("fs");
const path = require("path");

const args = parseArgs();

function listTemplateIds() {
  const templatesDir = path.join(INSTANCES_DIR, "_templates");
  if (!fs.existsSync(templatesDir)) return [];
  return fs
    .readdirSync(templatesDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .filter((name) => fs.existsSync(path.join(templatesDir, name, "content")))
    .sort();
}

const mode = args.templates || args.template ? "template" : "instance";
const ids = args.all
  ? (mode === "template" ? listTemplateIds() : listInstanceIds())
  : [args.template || getRequestedInstanceId(args)];

if (ids.length === 0) {
  console.error("[validate-instance] No instances found.");
  process.exit(1);
}

let hasErrors = false;

for (const id of ids) {
  const result = mode === "template"
    ? validateTemplate(id, { checkAssets: args["check-assets"] !== false })
    : validateInstance(id, { checkAssets: args["check-assets"] !== false });

  if (result.errors.length > 0) {
    hasErrors = true;
    console.error(`\n[validate-${mode}] ${result.id}: failed`);
    result.errors.forEach((error) => console.error(`  error: ${error}`));
  } else {
    console.log(`[validate-${mode}] ${result.id}: ok`);
  }

  result.warnings.forEach((warning) => console.warn(`  warning: ${warning}`));
}

if (hasErrors) {
  process.exit(1);
}

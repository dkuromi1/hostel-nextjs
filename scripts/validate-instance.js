#!/usr/bin/env node

const {
  getRequestedInstanceId,
  listInstanceIds,
  parseArgs,
  validateInstance,
} = require("./instance-utils");

const args = parseArgs();
const ids = args.all ? listInstanceIds() : [getRequestedInstanceId(args)];

if (ids.length === 0) {
  console.error("[validate-instance] No instances found.");
  process.exit(1);
}

let hasErrors = false;

for (const id of ids) {
  const result = validateInstance(id, { checkAssets: args["check-assets"] !== false });

  if (result.errors.length > 0) {
    hasErrors = true;
    console.error(`\n[validate-instance] ${result.id}: failed`);
    result.errors.forEach((error) => console.error(`  error: ${error}`));
  } else {
    console.log(`[validate-instance] ${result.id}: ok`);
  }

  result.warnings.forEach((warning) => console.warn(`  warning: ${warning}`));
}

if (hasErrors) {
  process.exit(1);
}

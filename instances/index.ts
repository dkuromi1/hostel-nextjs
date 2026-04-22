import { scodrinonInstance } from "./scodrinon";

const INSTANCE_REGISTRY = {
  scodrinon: scodrinonInstance,
} as const;

export type InstanceId = keyof typeof INSTANCE_REGISTRY;
export type ActiveInstance = (typeof INSTANCE_REGISTRY)[InstanceId];

export const availableInstanceIds = Object.keys(INSTANCE_REGISTRY) as InstanceId[];

function normalizeInstanceId(value: string | undefined): InstanceId | null {
  if (!value) {
    return null;
  }

  const normalized = value.trim().toLowerCase();
  return normalized in INSTANCE_REGISTRY ? (normalized as InstanceId) : null;
}

function resolveInstanceId(): InstanceId {
  const envCandidates = [
    process.env.NEXT_PUBLIC_INSTANCE_ID,
    process.env.INSTANCE_ID,
    process.env.NEXT_PUBLIC_SITE_INSTANCE,
    process.env.SITE_INSTANCE,
  ];

  for (const candidate of envCandidates) {
    const resolved = normalizeInstanceId(candidate);
    if (resolved) {
      return resolved;
    }
  }

  return "scodrinon";
}

const resolvedInstanceId = resolveInstanceId();

export const activeInstance = INSTANCE_REGISTRY[resolvedInstanceId];
export const activeInstanceId = resolvedInstanceId;

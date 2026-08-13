import {
  BuddyAvatarProfileSchema,
  WardrobeItemSchema,
  type BuddyAvatarProfile,
  type BuddyVisualState,
  type WardrobeItem
} from "@kocax/buddy-contracts";

export type DemoTask = {
  id: string;
  title: string;
  meta: string;
  done: boolean;
};

export type DemoMemory = {
  id: string;
  category: string;
  value: string;
  reason: string;
  source: string;
  savedAt: string;
  expiresAt: string;
  lastUsedAt: string;
  scope: "Persoonlijk" | "Sessie";
  status: "Actief" | "Vergrendeld";
};

export type DemoConnection = {
  id: string;
  name: string;
  status: "Actief" | "Uit" | "Gepland";
  description: string;
};

export const defaultAvatar: BuddyAvatarProfile = BuddyAvatarProfileSchema.parse({
  schemaVersion: 1,
  buddyId: "bdy_01KXBUDDY001",
  characterId: "buddy-v1",
  displayName: "Buddy",
  rigVersion: "buddy-rig-1",
  catalogVersion: "catalog-1",
  equipped: {
    hair: "hair-short-black-01",
    headwear: null,
    top: "top-core-black-01",
    outerwear: "outerwear-shell-gold-01",
    trousers: "trousers-core-black-01",
    shoes: "shoes-core-black-01",
    accessory: null
  },
  palette: { accent: "kx-gold", secondary: "kx-blue" },
  preferences: { reducedMotion: false, idleMotion: true },
  updatedAt: "2026-08-13T18:00:00.000Z"
});

const item = (
  itemId: string,
  nl: string,
  slot: "top" | "outerwear" | "headwear" | "accessory",
  shaDigit: string,
  hidesSlots: Array<"hair"> = []
): WardrobeItem =>
  WardrobeItemSchema.parse({
    itemId,
    localizedName: { nl, en: nl },
    slot,
    rigVersion: "buddy-rig-1",
    assetPackVersion: "pack-1",
    layerOrder: 50,
    integritySha256: shaDigit.repeat(64),
    rightsReference: "PROTOTYPE-NO-PRODUCTION-RIGHTS-EVIDENCE",
    releaseStatus: "approved",
    hidesSlots,
    minimumRigVersion: "buddy-rig-1"
  });

export const wardrobe: WardrobeItem[] = [
  item("top-core-black-01", "Core zwart", "top", "1"),
  item("outerwear-shell-gold-01", "Gouden shell", "outerwear", "2"),
  item("outerwear-focus-blue-01", "Focus blauw", "outerwear", "3"),
  item("headwear-cap-blue-01", "Blauwe pet", "headwear", "4", ["hair"]),
  item("accessory-ring-silver-01", "Zilveren ring", "accessory", "5")
];

export const initialTasks: DemoTask[] = [
  { id: "task-1", title: "Planning voor morgen controleren", meta: "Vandaag · 20:00", done: false },
  { id: "task-2", title: "Document samenvatten", meta: "Wacht op bestand", done: false },
  { id: "task-3", title: "Weekdoelen vastleggen", meta: "Afgerond om 17:42", done: true }
];

export const initialMemories: DemoMemory[] = [
  {
    id: "memory-1",
    category: "Voorkeur",
    value: "Antwoorden standaard kort en direct",
    reason: "Je koos ‘Onthouden’ na een KocaX-gesprek.",
    source: "KocaX Messenger · 13 augustus",
    savedAt: "13 augustus 2026 · 18:04",
    expiresAt: "Geen vervaldatum",
    lastUsedAt: "Nog niet gebruikt",
    scope: "Persoonlijk",
    status: "Actief"
  },
  {
    id: "memory-2",
    category: "Profiel",
    value: "Nederlands als standaardtaal",
    reason: "Handmatig toegevoegd in Memory Vault.",
    source: "Buddy Workplace · 13 augustus",
    savedAt: "13 augustus 2026 · 18:12",
    expiresAt: "13 februari 2027",
    lastUsedAt: "13 augustus 2026 · 18:20",
    scope: "Persoonlijk",
    status: "Vergrendeld"
  }
];

export const connections: DemoConnection[] = [
  { id: "kocax", name: "KocaX Messenger", status: "Uit", description: "Lokale UI-fixture; geen Messenger-transport" },
  { id: "calendar", name: "Agenda", status: "Uit", description: "Nog niet gekoppeld in deze preview" },
  { id: "whatsapp", name: "WhatsApp", status: "Gepland", description: "Latere optionele bridge; geen approvals" },
  { id: "telegram", name: "Telegram", status: "Gepland", description: "Latere optionele bridge; geen approvals" },
  { id: "discord", name: "Discord", status: "Gepland", description: "Latere optionele bridge; geen approvals" }
];

export const visualStates: Array<{ state: BuddyVisualState; label: string }> = [
  { state: "idle", label: "Rust" },
  { state: "listening", label: "Luistert" },
  { state: "thinking", label: "Denkt" },
  { state: "working", label: "Werkt" },
  { state: "completed", label: "Klaar" },
  { state: "needs_attention", label: "Actie nodig" },
  { state: "privacy_locked", label: "Privacy-slot" },
  { state: "offline", label: "Offline" }
];

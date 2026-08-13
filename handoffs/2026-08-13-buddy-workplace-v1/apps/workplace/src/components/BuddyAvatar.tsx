import type { BuddyAvatarProfile, BuddyVisualState } from "@kocax/buddy-contracts";

type Props = {
  profile: BuddyAvatarProfile;
  state: BuddyVisualState;
  compact?: boolean;
};

const stateLabels: Record<BuddyVisualState, string> = {
  idle: "rust",
  listening: "luistert",
  thinking: "denkt",
  working: "werkt",
  speaking: "spreekt",
  completed: "klaar",
  needs_attention: "wacht op toestemming",
  offline: "offline",
  privacy_locked: "privacy vergrendeld"
};

export function BuddyAvatar({ profile, state, compact = false }: Props) {
  const blueOutfit = profile.equipped.outerwear === "outerwear-focus-blue-01";
  const hasHat = Boolean(profile.equipped.headwear);
  const hasAccessory = Boolean(profile.equipped.accessory);

  return (
    <figure
      className={`buddy-avatar ${compact ? "buddy-avatar--compact" : ""} ${profile.preferences.reducedMotion ? "reduced-motion" : ""}`}
      data-state={state}
      aria-label={`${profile.displayName} — ${stateLabels[state]}`}
    >
      <div className="buddy-glow" aria-hidden="true" />
      <div className="buddy-character" aria-hidden="true">
        {hasHat ? <div className="buddy-hat" /> : null}
        <div className="buddy-hood">
          <div className="buddy-face">
            <div className="buddy-visor" />
          </div>
        </div>
        <div className={`buddy-torso ${blueOutfit ? "buddy-torso--blue" : ""}`}>
          <div className="buddy-shoulder buddy-shoulder--left" />
          <div className="buddy-shoulder buddy-shoulder--right" />
          <div className="buddy-core"><span /></div>
          {hasAccessory ? <div className="buddy-accessory" /> : null}
        </div>
        {!compact ? (
          <>
            <div className="buddy-leg buddy-leg--left" />
            <div className="buddy-leg buddy-leg--right" />
          </>
        ) : null}
      </div>
      <figcaption>
        <span className="status-dot" />
        {stateLabels[state]}
      </figcaption>
    </figure>
  );
}

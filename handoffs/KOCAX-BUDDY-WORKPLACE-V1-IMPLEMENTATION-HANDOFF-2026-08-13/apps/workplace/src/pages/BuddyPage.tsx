import type { BuddyAvatarProfile, BuddyVisualState, WardrobeItem } from "@kocax/buddy-contracts";
import { BuddyAvatar } from "../components/BuddyAvatar";
import { visualStates } from "../data/demo";

type Props = {
  profile: BuddyAvatarProfile;
  state: BuddyVisualState;
  wardrobe: WardrobeItem[];
  onStateChange: (state: BuddyVisualState) => void;
  onEquip: (item: WardrobeItem) => void;
  onReducedMotion: (enabled: boolean) => void;
};

export function BuddyPage({ profile, state, wardrobe, onStateChange, onEquip, onReducedMotion }: Props) {
  return (
    <div className="content-page">
      <div className="page-title">
        <div><span className="eyebrow">PRIVATE CHARACTER STUDIO</span><h1>Buddy</h1><p>Uiterlijk en gedrag staan los van geheugen en rechten.</p></div>
        <span className="pill pill--safe">Renderer-onafhankelijk profiel</span>
      </div>
      <div className="buddy-studio">
        <section className="avatar-stage" data-testid="buddy-identity" data-buddy-id={profile.buddyId}>
          <BuddyAvatar profile={profile} state={state} />
          <div><strong>{profile.displayName}</strong><span>buddy-v1 · catalog-1</span></div>
        </section>
        <section className="studio-controls">
          <div className="panel">
            <span className="eyebrow">VISUELE STATUS</span>
            <div className="chip-grid">
              {visualStates.map((item) => (
                <button key={item.state} className={state === item.state ? "active" : ""} onClick={() => onStateChange(item.state)}>{item.label}</button>
              ))}
            </div>
          </div>
          <div className="panel">
            <div className="section-heading"><div><span className="eyebrow">PROTOTYPE WARDROBE</span><h2>Goedgekeurde fixtures</h2></div></div>
            <div className="wardrobe-grid">
              {wardrobe.map((item) => (
                <button key={item.itemId} onClick={() => onEquip(item)}>
                  <span className={`swatch swatch--${item.slot}`} />
                  <strong>{item.localizedName.nl}</strong>
                  <small>{item.slot}</small>
                </button>
              ))}
            </div>
            <p className="microcopy">Deze blokken zijn code-fixtures, geen productie-assets of rechtenbewijs.</p>
          </div>
          <label className="toggle-row panel">
            <span><strong>Beweging verminderen</strong><small>Volgt uiteindelijk de apparaatinstelling; statische fallback blijft bruikbaar.</small></span>
            <input type="checkbox" checked={profile.preferences.reducedMotion} onChange={(event) => onReducedMotion(event.target.checked)} />
          </label>
        </section>
      </div>
    </div>
  );
}

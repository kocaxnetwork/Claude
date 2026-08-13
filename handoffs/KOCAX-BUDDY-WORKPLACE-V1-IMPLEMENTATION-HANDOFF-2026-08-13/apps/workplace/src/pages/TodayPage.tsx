import type { BuddyAvatarProfile, BuddyVisualState } from "@kocax/buddy-contracts";
import type { DemoTask } from "../data/demo";
import { ApprovalCard } from "../components/ApprovalCard";
import { BuddyAvatar } from "../components/BuddyAvatar";

type Props = {
  profile: BuddyAvatarProfile;
  state: BuddyVisualState;
  tasks: DemoTask[];
  approvalStatus: "pending" | "approved" | "rejected";
  paused: boolean;
  onApprove: () => void;
  onReject: () => void;
};

export function TodayPage({ profile, state, tasks, approvalStatus, paused, onApprove, onReject }: Props) {
  const openTasks = tasks.filter((task) => !task.done);
  const pendingApprovals = approvalStatus === "pending" ? 1 : 0;
  const taskCopy = openTasks.length === 1 ? "één persoonlijke taak staat open" : `${openTasks.length} persoonlijke taken staan open`;
  const approvalCopy = pendingApprovals === 1
    ? "één previewvoorstel wacht op jouw beslissing"
    : "geen previewvoorstel wacht op jouw beslissing";
  return (
    <div className="page-grid page-grid--today">
      <section className="hero-card">
        <div className="hero-card__copy">
          <span className="eyebrow">DEMO-FIXTURE · DONDERDAG · 13 AUGUSTUS</span>
          <h1>Goedenavond.</h1>
          <p>{taskCopy} en {approvalCopy}.</p>
          <div className="metric-row">
            <div><strong>{openTasks.length}</strong><span>open taken</span></div>
            <div><strong>{pendingApprovals}</strong><span>goedkeuring</span></div>
            <div><strong>0</strong><span>externe acties</span></div>
          </div>
        </div>
        <BuddyAvatar profile={profile} state={state} />
      </section>

      <section className="panel">
        <div className="section-heading">
          <div><span className="eyebrow">NU BELANGRIJK</span><h2>Vandaag</h2></div>
          <span className="pill">Lokale fixture</span>
        </div>
        <div className="timeline">
          <article><time>20:00</time><div><strong>Planning controleren</strong><p>Persoonlijke taak · geen koppeling nodig</p></div></article>
          <article><time>21:30</time><div><strong>Rustige afsluiting</strong><p>Suggestie · notificaties staan uit</p></div></article>
          <article className="timeline__muted"><time>Morgen</time><div><strong>Tandartsvoorstel</strong><p>{approvalStatus === "pending" ? "Wacht op jouw previewbeslissing" : approvalStatus === "approved" ? "Alleen lokaal goedgekeurd; niet uitgevoerd" : "Afgewezen; niets uitgevoerd"}</p></div></article>
        </div>
      </section>

      <section className="panel quick-panel">
        <div className="section-heading"><div><span className="eyebrow">KOCAX-ONLY · PREVIEW</span><h2>Snelle acties</h2></div></div>
        <div className="quick-grid">
          <button disabled aria-describedby="quick-actions-note">Plan mijn dag<span>Intern plan</span></button>
          <button disabled aria-describedby="quick-actions-note">Maak een checklist<span>Geen externe actie</span></button>
          <button disabled aria-describedby="quick-actions-note">Vat tekst samen<span>Kies zelf een bron</span></button>
          <button disabled aria-describedby="quick-actions-note">Nieuwe herinnering<span>Notificatie uit</span></button>
        </div>
        <p className="microcopy" id="quick-actions-note">Niet interactief: deze lokale preview heeft geen Buddy-runtime of Messenger-transport.</p>
      </section>

      <ApprovalCard status={approvalStatus} paused={paused} onApprove={onApprove} onReject={onReject} />
    </div>
  );
}

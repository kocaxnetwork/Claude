type Props = {
  status: "pending" | "approved" | "rejected";
  paused: boolean;
  onApprove: () => void;
  onReject: () => void;
};

export function ApprovalCard({ status, paused, onApprove, onReject }: Props) {
  if (status !== "pending") {
    return (
      <article className={`approval-card approval-card--${status}`} aria-live="polite">
        <div>
          <span className="eyebrow">PREVIEW RESULTAAT</span>
          <h3>{status === "approved" ? "Goedkeuring geregistreerd" : "Voorstel afgewezen"}</h3>
          <p>
            {status === "approved"
              ? "Er is geen externe wijziging uitgevoerd; execution staat uit in dit referentiepakket."
              : "Er is niets gewijzigd en er is geen externe actie uitgevoerd."}
          </p>
        </div>
      </article>
    );
  }

  return (
    <article className="approval-card">
      <div className="approval-card__head">
        <span className="eyebrow">R2 · EXACTE GOEDKEURING</span>
        <span className="pill pill--warning">Demo-expiry · 18 min.</span>
      </div>
      <h3>Agenda-afspraak voorbereiden</h3>
      <dl className="approval-details">
        <div><dt>Wijziging</dt><dd>Tandarts · morgen · 10:00–10:30</dd></div>
        <div><dt>Bestemming</dt><dd>Persoonlijke agenda</dd></div>
        <div><dt>Gegevens</dt><dd>Titel, begin- en eindtijd</dd></div>
        <div><dt>Herstelbaar</dt><dd>Ja, na bevestigde uitvoering</dd></div>
      </dl>
      <div className="button-row">
        <button className="button button--primary" onClick={onApprove} disabled={paused}>Exact goedkeuren</button>
        <button className="button button--ghost" onClick={onReject} disabled={paused}>Afwijzen</button>
      </div>
      <p className="microcopy">{paused ? "Preview gepauzeerd: beslissingen zijn tijdelijk geblokkeerd." : "Preview: goedkeuren registreert alleen een niet-uitgevoerde receipt."}</p>
    </article>
  );
}

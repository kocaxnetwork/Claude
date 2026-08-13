import type { DemoConnection, DemoMemory } from "../data/demo";

type Props = {
  memories: DemoMemory[];
  connections: DemoConnection[];
  paused: boolean;
  onForgetMemory: (id: string) => void;
  onPause: (paused: boolean) => void;
};

export function ControlPage({ memories, connections, paused, onForgetMemory, onPause }: Props) {
  return (
    <div className="content-page">
      <div className="page-title">
        <div><span className="eyebrow">TRUST CENTER</span><h1>Control</h1><p>Geheugen, rechten, verbindingen, receipts en datarechten op één plek.</p></div>
        <button className={`button ${paused ? "button--primary" : "button--danger"}`} onClick={() => onPause(!paused)}>
          {paused ? "Lokale Buddy-preview hervatten" : "Lokale Buddy-preview pauzeren"}
        </button>
      </div>

      <div className="control-grid">
        <section className="panel control-grid__wide">
          <div className="section-heading"><div><span className="eyebrow">MEMORY VAULT</span><h2>Wat Buddy onthoudt</h2></div><span className="pill">{memories.length} items</span></div>
          {memories.length ? (
            <div className="memory-list">
              {memories.map((memory) => (
                <article key={memory.id}>
                  <div><span className="pill pill--safe">{memory.status}</span><span className="pill">{memory.scope}</span></div>
                  <h3>{memory.value}</h3>
                  <p>{memory.reason}</p>
                  <dl className="memory-details">
                    <div><dt>Categorie</dt><dd>{memory.category}</dd></div>
                    <div><dt>Bron</dt><dd>{memory.source}</dd></div>
                    <div><dt>Opgeslagen</dt><dd>{memory.savedAt}</dd></div>
                    <div><dt>Vervalt</dt><dd>{memory.expiresAt}</dd></div>
                    <div><dt>Laatst gebruikt</dt><dd>{memory.lastUsedAt}</dd></div>
                  </dl>
                  <div className="button-row">
                    <button className="button button--ghost" disabled aria-label={`Bewerk geheugenitem: ${memory.value}`}>Bewerk niet beschikbaar</button>
                    <button className="text-button" onClick={() => onForgetMemory(memory.id)} aria-label={`Vergeet geheugenitem: ${memory.value}`}>Vergeet</button>
                  </div>
                </article>
              ))}
            </div>
          ) : <div className="empty-note"><strong>Memory Vault is leeg</strong><p>Nieuwe langetermijnitems vragen eerst toestemming.</p></div>}
        </section>

        <section className="panel">
          <span className="eyebrow">RECHTEN</span><h2>Guided</h2>
          <ul className="policy-list">
            <li><span>Interne taken</span><strong>Toegestaan</strong></li>
            <li><span>Langetermijngeheugen</span><strong>Na keuze</strong></li>
            <li><span>Externe berichten</span><strong>Geblokkeerd</strong></li>
            <li><span>Betalen / verwijderen</span><strong>Niet in v1</strong></li>
          </ul>
        </section>

        <section className="panel">
          <div className="section-heading"><div><span className="eyebrow">CONNECTIONS</span><h2>Kanalen</h2></div></div>
          <div className="connection-list">
            {connections.map((connection) => (
              <article key={connection.id}>
                <span className={`connection-light connection-light--${connection.status.toLowerCase()}`} />
                <div><strong>{connection.name}</strong><small>{connection.description}</small></div>
                <span className="pill">{connection.status}</span>
              </article>
            ))}
          </div>
        </section>

        <section className="panel">
          <span className="eyebrow">ACTIVITY RECEIPTS</span><h2>Feiten, geen intenties</h2>
          <div className="receipt">
            <span className="receipt__icon">✓</span>
            <div><strong>Geen externe uitvoering</strong><p>Het agendavoorstel staat in referentiemodus.</p><small>13 aug. · payload aaaa…</small></div>
          </div>
        </section>

        <section className="panel">
          <span className="eyebrow">BUDDY PASSPORT</span><h2>Export zonder geheimen</h2>
          <p>Profiel, gekozen geheugen en configuratie. OAuth-tokens, wachtwoorden en encryptiesleutels worden uitgesloten.</p>
          <button className="button button--ghost" disabled>Voorbeeldexport niet beschikbaar</button>
          <p className="microcopy">De API-contractfixture wordt apart getest; deze UI-preview is niet gekoppeld.</p>
        </section>

        <section className="panel danger-zone control-grid__wide">
          <div><span className="eyebrow">DATARECHTEN</span><h2>Exporteren en verwijderen</h2><p>Productie vereist een geteste flow voor actieve stores, indexes en gedocumenteerde backupretentie.</p></div>
          <div className="button-row"><button className="button button--ghost" disabled>Data-export niet beschikbaar</button><button className="button button--danger" disabled>Verwijderflow niet beschikbaar</button></div>
        </section>
      </div>
    </div>
  );
}

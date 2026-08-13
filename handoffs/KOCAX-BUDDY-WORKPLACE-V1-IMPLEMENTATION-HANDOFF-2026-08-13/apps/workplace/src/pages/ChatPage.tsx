import { useState } from "react";
import type { BuddyAvatarProfile } from "@kocax/buddy-contracts";
import { BuddyAvatar } from "../components/BuddyAvatar";

const previewSecurityDisclosure =
  "Lokale referentiepreview: berichten blijven alleen in het browsergeheugen en worden niet naar KocaX verzonden. In een echte Buddy AI-chat verwerkt Buddy geautoriseerde inhoud; die AI-chat is daarom niet end-to-end versleuteld tegenover KocaX.";

export function ChatPage({ profile }: { profile: BuddyAvatarProfile }) {
  const [messages, setMessages] = useState([
    { id: 1, from: "buddy", text: "Goedenavond. Zal ik je open taken kort ordenen?" },
    { id: 2, from: "user", text: "Ja, graag. Houd het kort." },
    { id: 3, from: "buddy", text: "Eerst je planning voor morgen, daarna het document. Ik voer niets extern uit zonder jouw goedkeuring." }
  ]);
  const [draft, setDraft] = useState("");

  const send = () => {
    const text = draft.trim();
    if (!text) return;
    setMessages((current) => [...current, { id: Date.now(), from: "user", text }]);
    setDraft("");
  };

  return (
    <section className="chat-layout">
      <aside className="conversation-list">
        <div className="section-heading"><div><span className="eyebrow">KOCAX MESSENGER · PREVIEW</span><h1>Chat</h1></div></div>
        <div className="conversation active" aria-current="true">
          <BuddyAvatar profile={profile} state="listening" compact />
          <span><strong>Buddy</strong><small>Lokale Buddy-fixture</small></span>
          <span className="pin">PIN</span>
        </div>
        <div className="empty-note"><strong>Menselijke chats</strong><p>Niet opgenomen in deze productpreview.</p></div>
      </aside>
      <div className="chat-panel">
        <header className="chat-panel__header">
          <BuddyAvatar profile={profile} state="listening" compact />
          <div><strong>{profile.displayName}</strong><span>AI-assistent · lokale UI-fixture</span></div>
        </header>
        <div className="security-disclosure" role="note">
          <strong>Buddy AI-beveiligingslabel</strong>
          <span>{previewSecurityDisclosure}</span>
        </div>
        <div className="message-stream" aria-live="polite">
          {messages.map((message) => (
            <div key={message.id} className={`message message--${message.from}`}>{message.text}</div>
          ))}
        </div>
        <form
          className="composer"
          onSubmit={(event) => {
            event.preventDefault();
            send();
          }}
        >
          <label className="sr-only" htmlFor="buddy-message">Bericht aan Buddy</label>
          <input id="buddy-message" value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="Schrijf een bericht…" />
          <button className="button button--primary" type="submit">Stuur lokaal</button>
        </form>
        <p className="microcopy">Lokale preview: berichten verlaten deze browser niet.</p>
      </div>
    </section>
  );
}

import type { ReactNode } from "react";

export type TabId = "today" | "chat" | "tasks" | "buddy" | "control";

const tabs: Array<{ id: TabId; label: string; marker: string }> = [
  { id: "today", label: "Today", marker: "01" },
  { id: "chat", label: "Chat", marker: "02" },
  { id: "tasks", label: "Tasks", marker: "03" },
  { id: "buddy", label: "Buddy", marker: "04" },
  { id: "control", label: "Control", marker: "05" }
];

type Props = {
  activeTab: TabId;
  setActiveTab: (tab: TabId) => void;
  paused: boolean;
  children: ReactNode;
};

export function Shell({ activeTab, setActiveTab, paused, children }: Props) {
  return (
    <div className="app-shell">
      <aside className="side-rail">
        <div className="brand-lockup">
          <span className="brand-mark">KX</span>
          <span><strong>Buddy</strong><small>Workplace</small></span>
        </div>
        <nav aria-label="Buddy Workplace hoofdnavigatie">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={activeTab === tab.id ? "active" : ""}
              onClick={() => setActiveTab(tab.id)}
              aria-current={activeTab === tab.id ? "page" : undefined}
            >
              <span>{tab.marker}</span>{tab.label}
            </button>
          ))}
        </nav>
        <div className="side-rail__footer">
          <span className={`connection-light ${paused ? "connection-light--paused" : ""}`} />
          <div><strong>{paused ? "Gepauzeerd" : "Lokale preview actief"}</strong><small>Messenger niet gekoppeld</small></div>
        </div>
      </aside>
      <div className="app-stage">
        <header className="top-bar">
          <div>
            <span className="eyebrow">LOCAL REFERENCE PREVIEW</span>
            <strong>Guided · Personal</strong>
          </div>
          <div className="top-bar__badges">
            <span className="pill">18+ concept</span>
            <span className="pill pill--safe">Execution disabled</span>
          </div>
        </header>
        <main id="main-content">{children}</main>
      </div>
      <nav className="bottom-nav" aria-label="Mobiele Buddy Workplace navigatie">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={activeTab === tab.id ? "active" : ""}
            onClick={() => setActiveTab(tab.id)}
            aria-current={activeTab === tab.id ? "page" : undefined}
          >
            <span>{tab.marker}</span>{tab.label}
          </button>
        ))}
      </nav>
    </div>
  );
}

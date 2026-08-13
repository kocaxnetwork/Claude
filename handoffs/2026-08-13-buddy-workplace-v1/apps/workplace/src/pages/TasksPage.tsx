import type { DemoTask } from "../data/demo";

type Props = {
  tasks: DemoTask[];
  toggleTask: (id: string) => void;
};

export function TasksPage({ tasks, toggleTask }: Props) {
  return (
    <div className="content-page">
      <div className="page-title">
        <div><span className="eyebrow">PERSOONLIJK WERK</span><h1>Tasks</h1><p>Taken, herinneringen en routines—zonder bedrijfsfuncties.</p></div>
        <button className="button button--primary" disabled aria-describedby="task-creation-note">Taak toevoegen niet beschikbaar</button>
      </div>
      <div className="task-layout">
        <section className="panel">
          <div className="section-heading"><div><span className="eyebrow">VANDAAG</span><h2>Open en afgerond</h2></div><span className="pill">{tasks.filter((task) => !task.done).length} open</span></div>
          <div className="task-list">
            {tasks.map((task) => (
              <label className={`task-row ${task.done ? "task-row--done" : ""}`} key={task.id}>
                <input type="checkbox" checked={task.done} onChange={() => toggleTask(task.id)} />
                <span><strong>{task.title}</strong><small>{task.meta}</small></span>
                <span className="task-kind">INTERN</span>
              </label>
            ))}
          </div>
        </section>
        <aside className="panel routine-card">
          <span className="eyebrow">ROUTINES</span>
          <h2>Nog uit</h2>
          <p>Buddy activeert geen meldingen of routines zonder dat jij een schema kiest.</p>
          <button className="button button--ghost" disabled aria-describedby="task-creation-note">Veilige opzet niet beschikbaar</button>
        </aside>
      </div>
      <p className="microcopy" id="task-creation-note">Bestaande demo-taken zijn lokaal afvinkbaar; toevoegen, routines en notificaties zijn niet aangesloten.</p>
    </div>
  );
}

import { useState } from "react";
import { equipItem, type BuddyAvatarProfile, type BuddyVisualState, type WardrobeItem } from "@kocax/buddy-contracts";
import { Shell, type TabId } from "./components/Shell";
import { BuddyPage } from "./pages/BuddyPage";
import { ChatPage } from "./pages/ChatPage";
import { ControlPage } from "./pages/ControlPage";
import { TasksPage } from "./pages/TasksPage";
import { TodayPage } from "./pages/TodayPage";
import { connections, defaultAvatar, initialMemories, initialTasks, wardrobe } from "./data/demo";

export function App() {
  const [activeTab, setActiveTab] = useState<TabId>("today");
  const [profile, setProfile] = useState<BuddyAvatarProfile>(defaultAvatar);
  const [visualState, setVisualState] = useState<BuddyVisualState>("needs_attention");
  const [tasks, setTasks] = useState(initialTasks);
  const [memories, setMemories] = useState(initialMemories);
  const [approvalStatus, setApprovalStatus] = useState<"pending" | "approved" | "rejected">("pending");
  const [paused, setPaused] = useState(false);

  const equip = (item: WardrobeItem) => setProfile((current) => equipItem(current, item, wardrobe));
  const setReducedMotion = (enabled: boolean) =>
    setProfile((current) => ({
      ...current,
      preferences: { ...current.preferences, reducedMotion: enabled, idleMotion: enabled ? false : current.preferences.idleMotion },
      updatedAt: new Date().toISOString()
    }));

  const page = {
    today: (
      <TodayPage
        profile={profile}
        state={paused ? "offline" : visualState}
        tasks={tasks}
        approvalStatus={approvalStatus}
        paused={paused}
        onApprove={() => { setApprovalStatus("approved"); setVisualState("completed"); }}
        onReject={() => { setApprovalStatus("rejected"); setVisualState("idle"); }}
      />
    ),
    chat: <ChatPage profile={profile} />,
    tasks: <TasksPage tasks={tasks} toggleTask={(id) => setTasks((current) => current.map((task) => task.id === id ? { ...task, done: !task.done } : task))} />,
    buddy: (
      <BuddyPage
        profile={profile}
        state={paused ? "offline" : visualState}
        wardrobe={wardrobe}
        onStateChange={setVisualState}
        onEquip={equip}
        onReducedMotion={setReducedMotion}
      />
    ),
    control: (
      <ControlPage
        memories={memories}
        connections={connections}
        paused={paused}
        onForgetMemory={(id) => setMemories((current) => current.filter((memory) => memory.id !== id))}
        onPause={(next) => { setPaused(next); setVisualState(next ? "offline" : "idle"); setActiveTab(next ? "today" : "control"); }}
      />
    )
  } satisfies Record<TabId, React.ReactNode>;

  return <Shell activeTab={activeTab} setActiveTab={setActiveTab} paused={paused}>{page[activeTab]}</Shell>;
}

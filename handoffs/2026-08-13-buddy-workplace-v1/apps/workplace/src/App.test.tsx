import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { App } from "./App";
import { defaultAvatar } from "./data/demo";

afterEach(cleanup);

const openTab = (label: RegExp) => {
  const navigation = screen.getByRole("navigation", { name: /hoofdnavigatie/i });
  fireEvent.click(within(navigation).getByRole("button", { name: label }));
};

describe("Buddy Workplace preview", () => {
  it("renders the canonical five-tab information architecture", () => {
    render(<App />);
    const navigation = screen.getByRole("navigation", { name: /hoofdnavigatie/i });
    for (const label of ["Today", "Chat", "Tasks", "Buddy", "Control"]) {
      expect(navigation).toHaveTextContent(label);
    }
  });

  it("shows truthful Buddy AI security wording", () => {
    render(<App />);
    openTab(/02chat/i);
    expect(screen.getByRole("note")).toHaveTextContent(/niet end-to-end versleuteld tegenover KocaX/i);
    expect(screen.getByRole("note")).toHaveTextContent(/browsergeheugen/i);
    expect(screen.getByRole("note")).not.toHaveTextContent(/protected in transit|at rest/i);
    expect(screen.getByText(/KOCAX MESSENGER · PREVIEW/i)).toBeInTheDocument();
  });

  it("keeps approval in non-executing reference mode", () => {
    render(<App />);
    fireEvent.click(screen.getByRole("button", { name: /exact goedkeuren/i }));
    expect(screen.getByText(/geen externe wijziging uitgevoerd/i)).toBeInTheDocument();
  });

  it("provides an immediate global pause control", () => {
    render(<App />);
    expect(screen.getByText("Lokale preview actief")).toBeInTheDocument();
    openTab(/05control/i);
    fireEvent.click(screen.getByRole("button", { name: /lokale buddy-preview pauzeren/i }));
    expect(screen.getByRole("button", { name: /exact goedkeuren/i })).toBeDisabled();
    expect(screen.getByText(/beslissingen zijn tijdelijk geblokkeerd/i)).toBeInTheDocument();
    openTab(/05control/i);
    expect(screen.getByRole("button", { name: /hervatten/i })).toBeInTheDocument();
    expect(screen.getByText("Gepauzeerd")).toBeInTheDocument();
  });

  it("does not present a live Messenger or native transport", () => {
    render(<App />);
    expect(screen.queryByText("KocaX actief")).not.toBeInTheDocument();
    expect(screen.getByText("Messenger niet gekoppeld")).toBeInTheDocument();
    expect(screen.getByText("Lokale fixture")).toBeInTheDocument();
    openTab(/05control/i);
    expect(screen.getByText("Lokale UI-fixture; geen Messenger-transport")).toBeInTheDocument();
  });

  it("derives Today counts and copy from local task state", () => {
    render(<App />);
    openTab(/03tasks/i);
    const task = screen.getByRole("checkbox", { name: /Planning voor morgen controleren/i });
    expect(task).not.toBeChecked();
    fireEvent.click(task);
    expect(task).toBeChecked();
    expect(screen.getByRole("button", { name: /Taak toevoegen niet beschikbaar/i })).toBeDisabled();

    openTab(/01today/i);
    expect(screen.getByText(/één persoonlijke taak staat open/i)).toBeInTheDocument();
    expect(screen.getByText("open taken").parentElement).toHaveTextContent("1");
  });

  it("updates pending approval truthfully after a local decision", () => {
    render(<App />);
    fireEvent.click(screen.getByRole("button", { name: /exact goedkeuren/i }));
    expect(screen.getByText(/geen previewvoorstel wacht/i)).toBeInTheDocument();
    expect(screen.getByText("goedkeuring").parentElement).toHaveTextContent("0");
    expect(screen.getByText(/Alleen lokaal goedgekeurd; niet uitgevoerd/i)).toBeInTheDocument();
  });

  it("labels fixed approval timing as demo data", () => {
    render(<App />);
    expect(screen.getByText(/Demo-expiry · 18 min/i)).toBeInTheDocument();
  });

  it("forgets a local memory and shows lifecycle metadata", () => {
    render(<App />);
    openTab(/05control/i);
    expect(screen.getAllByText("Categorie")).toHaveLength(2);
    expect(screen.getAllByText("Vervalt")).toHaveLength(2);
    fireEvent.click(screen.getByRole("button", { name: /Vergeet geheugenitem: Antwoorden standaard kort en direct/i }));
    expect(screen.queryByText("Antwoorden standaard kort en direct")).not.toBeInTheDocument();
    expect(screen.getByText("1 items")).toBeInTheDocument();
  });

  it("keeps canonical Buddy identity stable when wardrobe changes", () => {
    render(<App />);
    openTab(/04buddy/i);
    const identity = screen.getByTestId("buddy-identity");
    expect(identity).toHaveAttribute("data-buddy-id", defaultAvatar.buddyId);
    fireEvent.click(screen.getByRole("button", { name: /Blauwe pet/i }));
    expect(screen.getByTestId("buddy-identity")).toHaveAttribute("data-buddy-id", defaultAvatar.buddyId);
    expect(screen.getByText("buddy-v1 · catalog-1")).toBeInTheDocument();
  });

  it("shows safe defaults and explicitly disables unavailable controls", () => {
    render(<App />);
    expect(screen.getByText("Guided · Personal")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Plan mijn dag/i })).toBeDisabled();
    expect(screen.getByText(/geen Buddy-runtime of Messenger-transport/i)).toBeInTheDocument();

    openTab(/05control/i);
    expect(screen.getByRole("heading", { name: "Guided" })).toBeInTheDocument();
    expect(screen.getByText("Geblokkeerd")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Voorbeeldexport niet beschikbaar/i })).toBeDisabled();
    expect(screen.getByRole("button", { name: /Data-export niet beschikbaar/i })).toBeDisabled();
    expect(screen.getByRole("button", { name: /Verwijderflow niet beschikbaar/i })).toBeDisabled();
  });
});

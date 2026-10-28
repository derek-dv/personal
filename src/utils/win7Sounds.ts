"use client";

export type Win7SoundName =
  | "startup"
  | "logon"
  | "logoff"
  | "shutdown"
  | "nav"
  | "minimize"
  | "restore"
  | "ding"
  | "error"
  | "balloon";

const SOUND_PATHS: Record<Win7SoundName, string> = {
  startup: "/sounds/startup.wav",
  logon: "/sounds/logon.wav",
  logoff: "/sounds/logoff.wav",
  shutdown: "/sounds/shutdown.wav",
  nav: "/sounds/nav.wav",
  minimize: "/sounds/minimize.wav",
  restore: "/sounds/restore.wav",
  ding: "/sounds/ding.wav",
  error: "/sounds/error.wav",
  balloon: "/sounds/balloon.wav",
};

let isMutedGlobal = false;

export function getWin7Muted(): boolean {
  return isMutedGlobal;
}

export function setWin7Muted(muted: boolean): void {
  isMutedGlobal = muted;
}

export function playWin7Sound(name: Win7SoundName, volume = 0.65): void {
  if (typeof window === "undefined" || isMutedGlobal) return;
  try {
    const audio = new Audio(SOUND_PATHS[name]);
    audio.volume = volume;
    audio.play().catch(() => {
      // Browser autoplay policy may block audio before first user interaction
    });
  } catch {
    // Ignore audio initialization errors
  }
}

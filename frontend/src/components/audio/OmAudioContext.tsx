"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

const STORAGE_KEY = "vishnu-mandir-audio-muted";

type OmAudioContextValue = {
  muted: boolean;
  toggleMuted: () => void;
};

const OmAudioContext = createContext<OmAudioContextValue | null>(null);

function getStoredMuted(): boolean {
  if (typeof window === "undefined") return true;
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    return v !== null ? v === "true" : true;
  } catch {
    return true;
  }
}

function setStoredMuted(muted: boolean): void {
  try {
    localStorage.setItem(STORAGE_KEY, String(muted));
  } catch {
    /* ignore */
  }
}

/**
 * Provider for site-wide Om ambient audio. Persists mute state in localStorage.
 * Renders a hidden audio element; play/pause syncs with muted state.
 */
export function OmAudioProvider({ children }: { children: ReactNode }) {
  const [muted, setMutedState] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    setMutedState(getStoredMuted());
  }, []);

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    if (muted) {
      el.pause();
    } else {
      el.play().catch(() => {});
    }
  }, [muted]);

  const toggleMuted = useCallback(() => {
    setMutedState((prev) => {
      const next = !prev;
      setStoredMuted(next);
      return next;
    });
  }, []);

  return (
    <OmAudioContext.Provider value={{ muted, toggleMuted }}>
      <audio
        ref={audioRef}
        src="/audio/om.mp3"
        loop
        playsInline
        preload="metadata"
        className="hidden"
        aria-hidden="true"
      />
      {children}
    </OmAudioContext.Provider>
  );
}

export function useOmAudio(): OmAudioContextValue {
  const ctx = useContext(OmAudioContext);
  if (!ctx) throw new Error("useOmAudio must be used within OmAudioProvider");
  return ctx;
}

"use client";

import { Volume2, VolumeX } from "lucide-react";
import { useOmAudio } from "./OmAudioContext";

/**
 * Button to toggle site-wide Om ambient audio on/off.
 */
export function AudioToggle() {
  const { muted, toggleMuted } = useOmAudio();

  return (
    <button
      type="button"
      onClick={toggleMuted}
      className="p-2 rounded-lg text-text-primary hover:text-primary hover:bg-primary/10 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      aria-label={muted ? "Play ambient Om sound" : "Mute ambient Om sound"}
    >
      {muted ? (
        <VolumeX className="w-5 h-5" aria-hidden />
      ) : (
        <Volume2 className="w-5 h-5" aria-hidden />
      )}
    </button>
  );
}

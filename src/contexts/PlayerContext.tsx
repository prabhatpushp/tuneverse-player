import React, { createContext, useContext, useState, useEffect } from "react";
import { useAudio } from "react-use";

interface Track {
  id: string;
  name: string;
  artist_name: string;
  album_name: string;
  image: string;
  audio: string;
  duration: number;
}

interface PlayerContextType {
  currentTrack: Track | null;
  isPlaying: boolean;
  play: (track: Track) => void;
  pause: () => void;
  toggle: () => void;
  next: () => void;
  previous: () => void;
  seek: (time: number) => void;
  progress: number;
  savedTracks: Track[];
  addToLibrary: (track: Track) => void;
  removeFromLibrary: (trackId: string) => void;
  isInLibrary: (trackId: string) => boolean;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const PlayerProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [savedTracks, setSavedTracks] = useState<Track[]>([]);
  const [audio, state, controls, ref] = useAudio({
    src: currentTrack?.audio || "",
    autoPlay: true,
  });

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      if (ref.current) {
        setProgress((ref.current.currentTime / ref.current.duration) * 100);
      }
    };

    const audioElement = ref.current;
    if (audioElement) {
      audioElement.addEventListener("timeupdate", updateProgress);
      return () => audioElement.removeEventListener("timeupdate", updateProgress);
    }
  }, [ref]);

  const play = (track: Track) => {
    console.log("Playing track:", track.name);
    setCurrentTrack(track);
    controls.play();
  };

  const toggle = () => {
    if (state.playing) {
      controls.pause();
    } else {
      controls.play();
    }
  };

  const seek = (time: number) => {
    if (ref.current) {
      const seekTime = (time / 100) * ref.current.duration;
      ref.current.currentTime = seekTime;
      setProgress(time);
    }
  };

  // Library functions
  const addToLibrary = (track: Track) => {
    setSavedTracks((prev) => {
      if (!prev.find((t) => t.id === track.id)) {
        return [...prev, track];
      }
      return prev;
    });
  };

  const removeFromLibrary = (trackId: string) => {
    setSavedTracks((prev) => prev.filter((track) => track.id !== trackId));
  };

  const isInLibrary = (trackId: string) => {
    return savedTracks.some((track) => track.id === trackId);
  };

  const value = {
    currentTrack,
    isPlaying: state.playing,
    play,
    pause: controls.pause,
    toggle,
    next: () => {}, // To be implemented
    previous: () => {}, // To be implemented
    seek,
    progress,
    savedTracks,
    addToLibrary,
    removeFromLibrary,
    isInLibrary,
  };

  return (
    <PlayerContext.Provider value={value}>
      {audio}
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (context === undefined) {
    throw new Error("usePlayer must be used within a PlayerProvider");
  }
  return context;
};
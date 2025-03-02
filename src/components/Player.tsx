import { usePlayer } from "@/contexts/PlayerContext";
import { Play, Pause, SkipBack, SkipForward } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

export const Player = () => {
  const { currentTrack, isPlaying, toggle, next, previous, seek, progress } = usePlayer();

  if (!currentTrack) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t h-20 px-4 animate-slide-in-right">
      <div className="flex items-center justify-between h-full max-w-7xl mx-auto">
        <div className="flex items-center space-x-4">
          <img
            src={currentTrack.image}
            alt={currentTrack.name}
            className="w-12 h-12 rounded animate-scale-in"
          />
          <div>
            <h4 className="font-medium">{currentTrack.name}</h4>
            <p className="text-sm text-muted-foreground">
              {currentTrack.artist_name}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={previous}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <SkipBack size={20} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggle}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={next}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <SkipForward size={20} />
          </Button>
        </div>
        <div className="w-1/3">
          <Slider
            value={[progress]}
            max={100}
            step={1}
            className="w-full"
            onValueChange={(value) => seek(value[0])}
          />
        </div>
      </div>
    </div>
  );
};
import { useState } from "react";
import { useSearchTracks } from "@/services/musicApi";
import { usePlayer } from "@/contexts/PlayerContext";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Check } from "lucide-react";

const Search = () => {
  const [query, setQuery] = useState("");
  const { data: tracks } = useSearchTracks(query);
  const { play, addToLibrary, isInLibrary } = usePlayer();

  return (
    <div className="p-6 ml-64 animate-fade-in">
      <div className="max-w-xl mb-6">
        <Input
          type="search"
          placeholder="Search for songs..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full"
        />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {tracks?.map((track) => (
          <Card
            key={track.id}
            className="p-4 cursor-pointer hover:bg-secondary transition-all duration-300 group animate-scale-in"
            onClick={() => play(track)}
          >
            <img
              src={track.image}
              alt={track.name}
              className="w-full aspect-square object-cover rounded-md mb-4 group-hover:scale-105 transition-transform duration-300"
            />
            <h3 className="font-medium truncate">{track.name}</h3>
            <p className="text-sm text-muted-foreground truncate">
              {track.artist_name}
            </p>
            <Button
              variant="ghost"
              size="sm"
              className="mt-2 w-full"
              onClick={(e) => {
                e.stopPropagation();
                addToLibrary(track);
              }}
              disabled={isInLibrary(track.id)}
            >
              {isInLibrary(track.id) ? (
                <Check className="w-4 h-4 mr-2" />
              ) : (
                <Plus className="w-4 h-4 mr-2" />
              )}
              {isInLibrary(track.id) ? "In Library" : "Add to Library"}
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Search;
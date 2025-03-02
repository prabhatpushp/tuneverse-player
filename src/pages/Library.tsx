import { usePlayer } from "@/contexts/PlayerContext";
import { Card } from "@/components/ui/card";

const Library = () => {
  const { savedTracks, removeFromLibrary, play } = usePlayer();

  if (!savedTracks?.length) {
    return (
      <div className="p-6 ml-64 animate-fade-in">
        <h1 className="text-3xl font-bold mb-6">Your Library</h1>
        <p className="text-muted-foreground">No tracks in your library yet.</p>
      </div>
    );
  }

  return (
    <div className="p-6 ml-64 animate-fade-in">
      <h1 className="text-3xl font-bold mb-6">Your Library</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {savedTracks.map((track) => (
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
            <button
              onClick={(e) => {
                e.stopPropagation();
                removeFromLibrary(track.id);
              }}
              className="mt-2 text-sm text-red-500 hover:text-red-600 transition-colors"
            >
              Remove from Library
            </button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Library;
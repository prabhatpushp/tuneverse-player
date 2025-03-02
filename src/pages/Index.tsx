import { useFeaturedTracks } from "@/services/musicApi";
import { usePlayer } from "@/contexts/PlayerContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Check } from "lucide-react";
import { useInView } from "@/hooks/useInView";
import { useRef, useEffect } from "react";

const Index = () => {
  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useFeaturedTracks();
  const { play, addToLibrary, isInLibrary } = usePlayer();

  const loadMoreRef = useRef(null);
  const isInView = useInView(loadMoreRef);

  useEffect(() => {
    if (isInView && hasNextPage && !isFetchingNextPage) {
      console.log("Loading more tracks...");
      fetchNextPage();
    }
  }, [isInView, fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (isLoading) {
    return <div className="p-6 ml-64 animate-fade-in">Loading...</div>;
  }

  const allTracks = data?.pages.flatMap((page) => page.tracks) || [];

  return (
    <div className="p-6 ml-64 animate-fade-in">
      <h1 className="text-3xl font-bold mb-6">Featured Tracks</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {allTracks.map((track) => (
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
      <div
        ref={loadMoreRef}
        className="w-full py-8 flex justify-center"
      >
        {isFetchingNextPage && (
          <div className="animate-pulse text-muted-foreground">
            Loading more tracks...
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
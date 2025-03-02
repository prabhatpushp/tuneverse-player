import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PlayerProvider } from "@/contexts/PlayerContext";
import { Sidebar } from "@/components/Sidebar";
import { Player } from "@/components/Player";
import Index from "./pages/Index";
import Search from "./pages/Search";
import Library from "./pages/Library";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <PlayerProvider>
      <BrowserRouter>
        <div className="min-h-screen pb-20">
          <Sidebar />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/search" element={<Search />} />
            <Route path="/library" element={<Library />} />
          </Routes>
          <Player />
        </div>
      </BrowserRouter>
    </PlayerProvider>
  </QueryClientProvider>
);

export default App;
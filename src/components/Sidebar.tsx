import { Home, Search, Library } from "lucide-react";
import { Link } from "react-router-dom";

export const Sidebar = () => {
  return (
    <div className="w-64 h-full bg-card fixed left-0 top-0 p-6">
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Spotify Clone</h1>
        <nav className="space-y-4">
          <Link
            to="/"
            className="flex items-center space-x-4 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Home size={24} />
            <span>Home</span>
          </Link>
          <Link
            to="/search"
            className="flex items-center space-x-4 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Search size={24} />
            <span>Search</span>
          </Link>
          <Link
            to="/library"
            className="flex items-center space-x-4 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Library size={24} />
            <span>Your Library</span>
          </Link>
        </nav>
      </div>
    </div>
  );
};
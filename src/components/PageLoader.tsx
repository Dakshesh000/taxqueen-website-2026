import { Loader2 } from "lucide-react";

/**
 * Minimal page loader for code-split routes
 * Displays while lazy-loaded pages are being fetched
 */
const PageLoader = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
        <p className="text-muted-foreground text-sm">Loading...</p>
      </div>
    </div>
  );
};

export default PageLoader;

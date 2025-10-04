import { useState, useEffect } from "react";
import EarthGlobe from "@/components/EarthGlobe";
import ControlPanel from "@/components/ControlPanel";
import { Globe, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Index = () => {
  const [activeLayer, setActiveLayer] = useState<string>('none');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  // Auto-advance time when playing
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentTime((prev) => {
        if (prev >= 365) {
          setIsPlaying(false);
          return 365;
        }
        return prev + 1;
      });
    }, 50); // Speed of animation

    return () => clearInterval(interval);
  }, [isPlaying]);

  const handlePlayPause = () => {
    if (currentTime >= 365) {
      setCurrentTime(0);
    }
    setIsPlaying(!isPlaying);
  };

  const handleExport = () => {
    toast.info("Export feature", {
      description: "Animation export will be available with backend integration",
    });
  };

  const handleLayerChange = (layerId: string) => {
    setActiveLayer(layerId);
    if (layerId !== 'none') {
      toast.success("Layer activated", {
        description: `Now visualizing ${layerId.toUpperCase()} data`,
      });
    }
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-gradient-space relative">
      {/* Animated background glow */}
      <div className="absolute inset-0 bg-gradient-glow opacity-30 animate-pulse-glow pointer-events-none" />
      
      {/* Stars effect overlay */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" 
           style={{
             backgroundImage: `radial-gradient(2px 2px at 20% 30%, white, transparent),
                              radial-gradient(2px 2px at 60% 70%, white, transparent),
                              radial-gradient(1px 1px at 50% 50%, white, transparent),
                              radial-gradient(1px 1px at 80% 10%, white, transparent),
                              radial-gradient(2px 2px at 90% 60%, white, transparent),
                              radial-gradient(1px 1px at 33% 80%, white, transparent)`,
             backgroundSize: '200px 200px',
           }} 
      />

      <div className="relative z-10 h-full flex">
        {/* Control Panel */}
        <div className="w-96 h-full shadow-panel animate-fade-in">
          <ControlPanel
            activeLayer={activeLayer}
            onLayerChange={handleLayerChange}
            isPlaying={isPlaying}
            currentTime={currentTime}
            onPlayPause={handlePlayPause}
            onTimeChange={setCurrentTime}
          />
        </div>

        {/* Main Globe View */}
        <div className="flex-1 h-full flex flex-col">
          {/* Top Bar */}
          <div className="p-4 flex items-center justify-between bg-card/80 backdrop-blur-md border-b border-border">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/20">
                <Globe className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-foreground">3D Visualization</span>
              </div>
              {activeLayer !== 'none' && (
                <div className="px-3 py-1.5 rounded-lg bg-data-layer/10 border border-data-layer/20 animate-fade-in">
                  <span className="text-sm font-medium text-data-layer uppercase">
                    {activeLayer}
                  </span>
                </div>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleExport}
                className="gap-2"
              >
                <Download className="w-4 h-4" />
                Export
              </Button>
            </div>
          </div>

          {/* Globe Container */}
          <div className="flex-1 p-4">
            <div className="w-full h-full rounded-xl overflow-hidden shadow-panel bg-space-dark/50 backdrop-blur-sm border border-border">
              <EarthGlobe
                activeLayer={activeLayer}
                isPlaying={isPlaying}
                currentTime={currentTime}
              />
            </div>
          </div>

          {/* Instructions */}
          <div className="p-4 bg-card/80 backdrop-blur-md border-t border-border">
            <div className="flex items-center justify-center gap-6 text-xs text-muted-foreground">
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
                Drag to rotate
              </span>
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
                Scroll to zoom
              </span>
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
                Select layers to visualize data
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;

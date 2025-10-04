import { Satellite, Info } from "lucide-react";
import LayerSelector from "./LayerSelector";
import TimelineControl from "./TimelineControl";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useState } from "react";

interface ControlPanelProps {
  activeLayer: string;
  onLayerChange: (layerId: string) => void;
  isPlaying: boolean;
  currentTime: number;
  onPlayPause: () => void;
  onTimeChange: (time: number) => void;
}

const ControlPanel = ({
  activeLayer,
  onLayerChange,
  isPlaying,
  currentTime,
  onPlayPause,
  onTimeChange,
}: ControlPanelProps) => {
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  return (
    <div className="h-full flex flex-col gap-6 p-6 bg-card/95 backdrop-blur-md border-r border-border overflow-y-auto">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
            <Satellite className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">Terra Vision</h1>
            <p className="text-xs text-muted-foreground">NASA Earth Science Data</p>
          </div>
        </div>
      </div>

      {/* Info Section */}
      <Collapsible open={isInfoOpen} onOpenChange={setIsInfoOpen}>
        <CollapsibleTrigger asChild>
          <Button variant="outline" className="w-full justify-between">
            <span className="flex items-center gap-2">
              <Info className="w-4 h-4" />
              About Terra
            </span>
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-3 space-y-2">
          <div className="p-4 rounded-lg bg-secondary/50 border border-border text-xs text-muted-foreground space-y-2">
            <p>
              <span className="font-semibold text-foreground">NASA Terra</span> is an Earth observation 
              satellite launched in 1999, carrying five instruments that monitor Earth's climate, 
              atmosphere, and surface.
            </p>
            <p>
              This platform visualizes data from all five Terra instruments, enabling exploration 
              of environmental patterns and changes over time.
            </p>
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Layer Selection */}
      <div className="flex-1 min-h-0">
        <LayerSelector
          activeLayer={activeLayer}
          onLayerChange={onLayerChange}
        />
      </div>

      {/* Timeline Controls */}
      <div className="border-t border-border pt-6">
        <TimelineControl
          isPlaying={isPlaying}
          currentTime={currentTime}
          onPlayPause={onPlayPause}
          onTimeChange={onTimeChange}
        />
      </div>

      {/* Footer Info */}
      <div className="pt-4 border-t border-border">
        <p className="text-xs text-muted-foreground text-center">
          Visualization prototype • Data integration ready
        </p>
      </div>
    </div>
  );
};

export default ControlPanel;

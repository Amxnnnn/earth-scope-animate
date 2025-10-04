import { useState, useEffect } from "react";
import { Play, Pause, SkipBack, SkipForward } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

interface TimelineControlProps {
  isPlaying: boolean;
  currentTime: number;
  onPlayPause: () => void;
  onTimeChange: (time: number) => void;
  maxTime?: number;
}

const TimelineControl = ({
  isPlaying,
  currentTime,
  onPlayPause,
  onTimeChange,
  maxTime = 365,
}: TimelineControlProps) => {
  const [displayDate, setDisplayDate] = useState(new Date());

  useEffect(() => {
    // Convert time (0-365) to date in 2024
    const startDate = new Date('2024-01-01');
    const date = new Date(startDate);
    date.setDate(date.getDate() + currentTime);
    setDisplayDate(date);
  }, [currentTime]);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const handleSkipBack = () => {
    onTimeChange(Math.max(0, currentTime - 30));
  };

  const handleSkipForward = () => {
    onTimeChange(Math.min(maxTime, currentTime + 30));
  };

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-foreground mb-1">Timeline</h3>
          <p className="text-xs text-muted-foreground">
            Animate data over time
          </p>
        </div>
        <div className="text-right">
          <div className="text-lg font-bold text-primary">{formatDate(displayDate)}</div>
          <div className="text-xs text-muted-foreground">
            Day {Math.floor(currentTime)} of {maxTime}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <Slider
          value={[currentTime]}
          onValueChange={(value) => onTimeChange(value[0])}
          max={maxTime}
          step={1}
          className="w-full"
        />

        <div className="flex items-center justify-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={handleSkipBack}
            className="h-10 w-10"
          >
            <SkipBack className="h-4 w-4" />
          </Button>

          <Button
            variant="default"
            size="icon"
            onClick={onPlayPause}
            className="h-12 w-12 shadow-glow"
          >
            {isPlaying ? (
              <Pause className="h-5 w-5" />
            ) : (
              <Play className="h-5 w-5 ml-0.5" />
            )}
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={handleSkipForward}
            className="h-10 w-10"
          >
            <SkipForward className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="pt-2 border-t border-border">
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">Jan 1, 2024</span>
          <span className="text-muted-foreground">Dec 31, 2024</span>
        </div>
      </div>
    </div>
  );
};

export default TimelineControl;

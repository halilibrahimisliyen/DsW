import React, { useState } from "react";
import {
  Volume2,
  VolumeX,
  SkipBack,
  SkipForward,
  Play,
  Pause,
} from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SpotifyControlsProps {
  currentTrack?: {
    title: string;
    artist: string;
    albumArt: string;
  };
  isPlaying?: boolean;
  volume?: number;
  onPlayPause?: () => void;
  onNext?: () => void;
  onPrevious?: () => void;
  onVolumeChange?: (volume: number) => void;
}

const SpotifyControls = ({
  currentTrack = {
    title: "Focus Flow",
    artist: "Ambient Beats",
    albumArt: "https://api.dicebear.com/7.x/avataaars/svg?seed=music",
  },
  isPlaying = false,
  volume = 50,
  onPlayPause = () => {},
  onNext = () => {},
  onPrevious = () => {},
  onVolumeChange = () => {},
}: SpotifyControlsProps) => {
  const [isMuted, setIsMuted] = useState(false);
  const [previousVolume, setPreviousVolume] = useState(volume);

  const handleVolumeToggle = () => {
    if (isMuted) {
      onVolumeChange(previousVolume);
      setIsMuted(false);
    } else {
      setPreviousVolume(volume);
      onVolumeChange(0);
      setIsMuted(true);
    }
  };

  return (
    <TooltipProvider>
      <Card className="fixed bottom-4 right-4 w-[300px] p-4 bg-background border shadow-lg">
        <div className="flex items-center gap-4">
          <img
            src={currentTrack.albumArt}
            alt={`${currentTrack.title} album art`}
            className="w-12 h-12 rounded-md object-cover"
          />

          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{currentTrack.title}</p>
            <p className="text-xs text-muted-foreground truncate">
              {currentTrack.artist}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 mt-3">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={onPrevious}
                className="h-8 w-8"
              >
                <SkipBack className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Previous</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={onPlayPause}
                className="h-8 w-8"
              >
                {isPlaying ? (
                  <Pause className="h-4 w-4" />
                ) : (
                  <Play className="h-4 w-4" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>{isPlaying ? "Pause" : "Play"}</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={onNext}
                className="h-8 w-8"
              >
                <SkipForward className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Next</TooltipContent>
          </Tooltip>
        </div>

        <div className="flex items-center gap-2 mt-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleVolumeToggle}
            className="h-8 w-8"
          >
            {isMuted || volume === 0 ? (
              <VolumeX className="h-4 w-4" />
            ) : (
              <Volume2 className="h-4 w-4" />
            )}
          </Button>
          <Slider
            value={[isMuted ? 0 : volume]}
            max={100}
            step={1}
            className="flex-1"
            onValueChange={(value) => onVolumeChange(value[0])}
          />
        </div>
      </Card>
    </TooltipProvider>
  );
};

export default SpotifyControls;

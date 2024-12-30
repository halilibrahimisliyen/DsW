import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, SkipBack, SkipForward, Volume2 } from "lucide-react";

interface MusicPlayerProps {
  currentTrack?: {
    title: string;
    artist: string;
    albumArt?: string;
  };
  isPlaying?: boolean;
  onPlayPause?: () => void;
  onNext?: () => void;
  onPrevious?: () => void;
  onVolumeChange?: (volume: number) => void;
}

const MusicPlayer = ({
  currentTrack = {
    title: "Lofi Study Beat",
    artist: "Ambient Artist",
    albumArt:
      "https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?w=100&h=100&fit=crop",
  },
  isPlaying = false,
  onPlayPause = () => {},
  onNext = () => {},
  onPrevious = () => {},
  onVolumeChange = () => {},
}: MusicPlayerProps) => {
  const [volume, setVolume] = useState(75);

  const handleVolumeChange = (newVolume: number[]) => {
    setVolume(newVolume[0]);
    onVolumeChange(newVolume[0]);
  };

  return (
    <Card className="fixed bottom-4 right-4 w-[300px] bg-white dark:bg-gray-800">
      <CardContent className="p-4">
        <div className="flex items-center space-x-4">
          <img
            src={currentTrack.albumArt}
            alt={`${currentTrack.title} album art`}
            className="w-12 h-12 rounded-md object-cover"
          />

          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{currentTrack.title}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
              {currentTrack.artist}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between mt-4">
          <Button variant="ghost" size="icon" onClick={onPrevious}>
            <SkipBack className="h-4 w-4" />
          </Button>

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

          <Button variant="ghost" size="icon" onClick={onNext}>
            <SkipForward className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center space-x-2 mt-4">
          <Volume2 className="h-4 w-4 text-gray-500" />
          <Slider
            defaultValue={[volume]}
            max={100}
            step={1}
            className="w-full"
            onValueChange={handleVolumeChange}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default MusicPlayer;

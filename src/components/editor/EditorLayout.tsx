import React, { useState } from "react";
import WritingArea from "./WritingArea";
import CollaborationPanel from "./CollaborationPanel";
import FormatPanel from "./FormatPanel";
import SpotifyControls from "./SpotifyControls";

interface EditorLayoutProps {
  content?: string;
  onContentChange?: (content: string) => void;
  onFormatChange?: (format: string) => void;
  onThemeChange?: (theme: string) => void;
  collaborators?: Array<{
    id: string;
    name: string;
    avatar: string;
    status: "active" | "idle" | "offline";
  }>;
  isSpotifyEnabled?: boolean;
}

const EditorLayout = ({
  content = "",
  onContentChange = () => {},
  onFormatChange = () => {},
  onThemeChange = () => {},
  collaborators = [],
  isSpotifyEnabled = true,
}: EditorLayoutProps) => {
  const [theme, setTheme] = useState("light");

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    onThemeChange(newTheme);
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Left Format Panel */}
      <FormatPanel
        onFormatChange={onFormatChange}
        onThemeChange={handleThemeChange}
        onExport={(format) => console.log(`Exporting as ${format}`)}
      />

      {/* Main Writing Area */}
      <div className="flex-1 relative">
        <WritingArea
          content={content}
          onContentChange={onContentChange}
          theme={theme as "light" | "dark"}
        />

        {/* Spotify Controls - Floating */}
        {isSpotifyEnabled && (
          <div className="absolute bottom-4 right-4 z-50">
            <SpotifyControls
              currentTrack={{
                title: "Focus Flow",
                artist: "Ambient Beats",
                albumArt:
                  "https://api.dicebear.com/7.x/avataaars/svg?seed=music",
              }}
              isPlaying={false}
              volume={50}
              onPlayPause={() => console.log("Play/Pause")}
              onNext={() => console.log("Next track")}
              onPrevious={() => console.log("Previous track")}
              onVolumeChange={(volume) => console.log(`Volume: ${volume}`)}
            />
          </div>
        )}
      </div>

      {/* Right Collaboration Panel */}
      <CollaborationPanel
        collaborators={collaborators}
        changes={[
          {
            id: "1",
            user: {
              id: "1",
              name: "John Doe",
              avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
              status: "active",
            },
            timestamp: "2 min ago",
            description: "Added new paragraph",
            type: "addition",
          },
        ]}
        versions={[
          {
            id: "1",
            name: "main",
            timestamp: "5 min ago",
            author: {
              id: "1",
              name: "John Doe",
              avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
              status: "active",
            },
            changes: 3,
          },
        ]}
      />
    </div>
  );
};

export default EditorLayout;

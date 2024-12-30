import React from "react";
import EditorLayout from "@/components/editor/EditorLayout";

interface EditorPageProps {
  initialContent?: string;
}

const EditorPage = ({ initialContent = "" }: EditorPageProps) => {
  return (
    <div className="min-h-screen bg-background">
      <EditorLayout
        content={initialContent}
        onContentChange={(content) => console.log("Content changed:", content)}
        onFormatChange={(format) => console.log("Format changed:", format)}
        onThemeChange={(theme) => console.log("Theme changed:", theme)}
        collaborators={[
          {
            id: "1",
            name: "John Doe",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
            status: "active",
          },
          {
            id: "2",
            name: "Jane Smith",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jane",
            status: "idle",
          },
          {
            id: "3",
            name: "Bob Wilson",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=bob",
            status: "offline",
          },
        ]}
        isSpotifyEnabled={true}
      />
    </div>
  );
};

export default EditorPage;

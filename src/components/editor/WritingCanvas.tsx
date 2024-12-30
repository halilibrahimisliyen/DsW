import React, { useState } from "react";
import FormattingToolbar from "./FormattingToolbar";
import EdgeAnimation from "./EdgeAnimation";
import { Textarea } from "@/components/ui/textarea";

interface WritingCanvasProps {
  content?: string;
  onContentChange?: (content: string) => void;
  onFormatChange?: (format: string) => void;
  onThemeChange?: (theme: string) => void;
}

const WritingCanvas = ({
  content = "Start writing your masterpiece...",
  onContentChange = () => {},
  onFormatChange = () => {},
  onThemeChange = () => {},
}: WritingCanvasProps) => {
  const [isTyping, setIsTyping] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout>();

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    onContentChange(newContent);

    // Handle typing animation
    setIsTyping(true);
    if (typingTimeout) clearTimeout(typingTimeout);
    const timeout = setTimeout(() => setIsTyping(false), 1000);
    setTypingTimeout(timeout);
  };

  return (
    <div className="relative w-full h-[858px] bg-background">
      <FormattingToolbar
        onFormatChange={onFormatChange}
        onThemeChange={onThemeChange}
      />

      <div className="max-w-3xl mx-auto pt-24 px-4 h-full">
        <Textarea
          value={content}
          onChange={handleTextChange}
          className="w-full h-[calc(100%-2rem)] p-4 text-lg leading-relaxed resize-none border-none focus:ring-0 bg-transparent"
          placeholder="Start writing your masterpiece..."
          style={{
            outline: "none",
            boxShadow: "none",
          }}
        />
      </div>

      <EdgeAnimation
        isTyping={isTyping}
        intensity={0.7}
        color="rgb(99, 102, 241)"
      />
    </div>
  );
};

export default WritingCanvas;

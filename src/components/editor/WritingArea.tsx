import React, { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import EdgeAnimation from "./EdgeAnimation";

interface WritingAreaProps {
  content?: string;
  onContentChange?: (content: string) => void;
  fontFamily?: string;
  fontSize?: number;
  lineHeight?: number;
  theme?: "light" | "dark";
}

const WritingArea = ({
  content = "Start writing your masterpiece...",
  onContentChange = () => {},
  fontFamily = "Inter",
  fontSize = 16,
  lineHeight = 1.6,
  theme = "light",
}: WritingAreaProps) => {
  const [text, setText] = useState(content);
  const [isTyping, setIsTyping] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const editorRef = useRef<HTMLDivElement>(null);
  const lastKeystrokeTime = useRef<number>(0);
  const typingSpeedRef = useRef<number>(0);

  useEffect(() => {
    setText(content);
  }, [content]);

  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    const newContent = e.currentTarget.innerText;
    setText(newContent);
    onContentChange(newContent);

    // Calculate typing speed and intensity
    const now = Date.now();
    const timeSinceLastKeystroke = now - lastKeystrokeTime.current;
    typingSpeedRef.current = 1000 / timeSinceLastKeystroke; // keystrokes per second
    lastKeystrokeTime.current = now;

    // Update cursor position for the animation
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      if (editorRef.current) {
        const editorRect = editorRef.current.getBoundingClientRect();
        setCursorPosition({
          x: rect.right - editorRect.left,
          y: rect.top - editorRect.top,
        });
      }
    }

    // Trigger typing animation
    setIsTyping(true);
    const timeout = setTimeout(() => setIsTyping(false), 1000);
    return () => clearTimeout(timeout);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Handle special key combinations
    if (e.key === "Tab") {
      e.preventDefault();
      document.execCommand("insertText", false, "    ");
    }

    // Auto-pair brackets and quotes
    const pairs: { [key: string]: string } = {
      "{": "}",
      "[": "]",
      "(": ")",
      '"': '"',
      "'": "'",
    };

    if (pairs[e.key]) {
      e.preventDefault();
      const selection = window.getSelection();
      const range = selection?.getRangeAt(0);
      const selectedText = range?.toString() || "";

      document.execCommand(
        "insertText",
        false,
        `${e.key}${selectedText}${pairs[e.key]}`,
      );

      // Move cursor between pairs if no text was selected
      if (!selectedText) {
        const newRange = document.createRange();
        newRange.setStart(range?.startContainer!, range?.startOffset! + 1);
        newRange.setEnd(range?.startContainer!, range?.startOffset! + 1);
        selection?.removeAllRanges();
        selection?.addRange(newRange);
      }
    }
  };

  return (
    <Card className="relative h-full w-full bg-background border-none shadow-none overflow-hidden">
      <div className="relative h-full w-full flex">
        <ScrollArea className="flex-1 p-8">
          <div className="max-w-3xl mx-auto relative" ref={editorRef}>
            <div
              contentEditable
              onInput={handleInput}
              onKeyDown={handleKeyDown}
              className={`w-full min-h-[70vh] focus:outline-none bg-transparent whitespace-pre-wrap
                ${theme === "dark" ? "text-white" : "text-gray-800"}`}
              style={{
                fontFamily,
                fontSize: `${fontSize}px`,
                lineHeight,
              }}
              dangerouslySetInnerHTML={{ __html: text }}
            />
          </div>
        </ScrollArea>

        <EdgeAnimation
          isTyping={isTyping}
          intensity={Math.min(typingSpeedRef.current / 5, 1)}
          color={theme === "dark" ? "rgb(99, 102, 241)" : "rgb(79, 70, 229)"}
        />
      </div>
    </Card>
  );
};

export default WritingArea;

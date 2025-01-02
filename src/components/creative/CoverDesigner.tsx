import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { motion } from "framer-motion";
import { ImagePlus, Type, Download, Palette } from "lucide-react";

interface CoverDesignerProps {
  onGenerate?: (design: any) => void;
  onDownload?: () => void;
}

const CoverDesigner = ({
  onGenerate = () => {},
  onDownload = () => {},
}: CoverDesignerProps) => {
  const [title, setTitle] = useState("");
  const [fontSize, setFontSize] = useState(48);
  const [color, setColor] = useState("#1a1a1a");

  return (
    <Card className="p-6 w-full max-w-2xl mx-auto bg-background">
      <div className="grid grid-cols-[2fr,1fr] gap-6">
        {/* Preview Area */}
        <motion.div
          className="aspect-[2/3] rounded-lg overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <div className="w-full h-full flex items-center justify-center p-8">
            <motion.h1
              className="text-white text-center font-bold break-words max-w-full"
              style={{ fontSize: `${fontSize}px` }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {title || "Your Book Title"}
            </motion.h1>
          </div>
        </motion.div>

        {/* Controls */}
        <div className="space-y-6">
          <div className="space-y-2">
            <Label>Book Title</Label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter title"
            />
          </div>

          <div className="space-y-2">
            <Label>Font Size</Label>
            <Slider
              min={24}
              max={72}
              step={1}
              value={[fontSize]}
              onValueChange={(value) => setFontSize(value[0])}
            />
          </div>

          <div className="space-y-4">
            <Button
              className="w-full"
              onClick={() => onGenerate({ title, fontSize })}
            >
              <ImagePlus className="w-4 h-4 mr-2" />
              Generate Design
            </Button>

            <Button variant="outline" className="w-full">
              <Type className="w-4 h-4 mr-2" />
              Change Font
            </Button>

            <Button variant="outline" className="w-full">
              <Palette className="w-4 h-4 mr-2" />
              Color Theme
            </Button>

            <Button variant="secondary" className="w-full" onClick={onDownload}>
              <Download className="w-4 h-4 mr-2" />
              Download Cover
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CoverDesigner;

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import { Wand2, Download, Undo } from "lucide-react";

interface FontGeneratorProps {
  onGenerate?: (canvas: HTMLCanvasElement) => void;
  onDownload?: (fontName: string) => void;
}

const FontGenerator = ({
  onGenerate = () => {},
  onDownload = () => {},
}: FontGeneratorProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [fontName, setFontName] = useState("MyCustomFont");
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  const handleDraw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const generateFont = async () => {
    setIsGenerating(true);
    // Simulate AI processing with progress
    for (let i = 0; i <= 100; i += 10) {
      setProgress(i);
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
    setIsGenerating(false);
    if (canvasRef.current) {
      onGenerate(canvasRef.current);
    }
  };

  return (
    <Card className="p-6 w-full max-w-2xl mx-auto bg-background">
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="fontName">Font Name</Label>
          <Input
            id="fontName"
            value={fontName}
            onChange={(e) => setFontName(e.target.value)}
            placeholder="Enter font name"
          />
        </div>

        <div className="space-y-2">
          <Label>Write Sample</Label>
          <motion.div
            className="relative border rounded-lg overflow-hidden"
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
          >
            <canvas
              ref={canvasRef}
              width={600}
              height={300}
              onMouseMove={(e) => e.buttons === 1 && handleDraw(e)}
              onMouseDown={handleDraw}
              className="w-full h-[300px] bg-white cursor-crosshair touch-none"
            />
          </motion.div>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" onClick={clearCanvas}>
            <Undo className="w-4 h-4 mr-2" />
            Clear
          </Button>
          <Button
            onClick={generateFont}
            disabled={isGenerating}
            className="flex-1"
          >
            <Wand2 className="w-4 h-4 mr-2" />
            {isGenerating ? "Generating..." : "Generate Font"}
          </Button>
          <Button
            variant="outline"
            onClick={() => onDownload(fontName)}
            disabled={isGenerating}
          >
            <Download className="w-4 h-4 mr-2" />
            Download
          </Button>
        </div>

        {isGenerating && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-2"
          >
            <Label>Processing...</Label>
            <Progress value={progress} className="w-full" />
          </motion.div>
        )}
      </div>
    </Card>
  );
};

export default FontGenerator;

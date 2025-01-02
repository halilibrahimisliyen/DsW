import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { motion, Reorder } from "framer-motion";
import { Grid2x2, Plus, Image, MessageCircle, Download } from "lucide-react";

interface Panel {
  id: string;
  width: number;
  height: number;
  background?: string;
}

interface ComicCreatorProps {
  onSave?: (panels: Panel[]) => void;
  onExport?: () => void;
}

const ComicCreator = ({
  onSave = () => {},
  onExport = () => {},
}: ComicCreatorProps) => {
  const [panels, setPanels] = useState<Panel[]>([
    { id: "1", width: 2, height: 2 },
    { id: "2", width: 1, height: 1 },
    { id: "3", width: 1, height: 1 },
  ]);

  const addPanel = () => {
    setPanels([...panels, { id: Date.now().toString(), width: 1, height: 1 }]);
  };

  return (
    <div className="grid grid-cols-[1fr,300px] gap-6 h-full">
      {/* Comic Canvas */}
      <Card className="p-6 bg-background overflow-hidden">
        <ScrollArea className="h-full">
          <div className="grid grid-cols-3 gap-4 p-4">
            {panels.map((panel) => (
              <motion.div
                key={panel.id}
                className="aspect-square bg-muted rounded-lg overflow-hidden"
                style={{
                  gridColumn: `span ${panel.width}`,
                  gridRow: `span ${panel.height}`,
                }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                  <Image className="w-8 h-8" />
                </div>
              </motion.div>
            ))}
          </div>
        </ScrollArea>
      </Card>

      {/* Tools Panel */}
      <Card className="p-4 bg-background">
        <div className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Layout</h3>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" onClick={addPanel}>
                <Plus className="w-4 h-4 mr-2" />
                Add Panel
              </Button>
              <Button variant="outline">
                <Grid2x2 className="w-4 h-4 mr-2" />
                Template
              </Button>
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <h3 className="text-sm font-medium">Tools</h3>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline">
                <Image className="w-4 h-4 mr-2" />
                Add Image
              </Button>
              <Button variant="outline">
                <MessageCircle className="w-4 h-4 mr-2" />
                Add Text
              </Button>
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <h3 className="text-sm font-medium">Export</h3>
            <Button className="w-full" onClick={onExport}>
              <Download className="w-4 h-4 mr-2" />
              Export Comic
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ComicCreator;

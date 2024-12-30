import React from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Type,
  Heading1,
  Heading2,
  Heading3,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Bold,
  Italic,
  Underline,
  Download,
  PaintBucket,
  FileDown,
} from "lucide-react";

interface FormatPanelProps {
  onFormatChange?: (format: string) => void;
  onThemeChange?: (theme: string) => void;
  onExport?: (format: string) => void;
}

const FormatPanel = ({
  onFormatChange = () => {},
  onThemeChange = () => {},
  onExport = () => {},
}: FormatPanelProps) => {
  return (
    <div className="h-full w-[280px] bg-background border-r p-4 flex flex-col">
      <Tabs defaultValue="format" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="format">Format</TabsTrigger>
          <TabsTrigger value="theme">Theme</TabsTrigger>
        </TabsList>

        <TabsContent value="format" className="space-y-4">
          <ScrollArea className="h-[900px] pr-4">
            <div className="space-y-6">
              {/* Text Style Section */}
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Text Style</h3>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => onFormatChange("heading1")}
                  >
                    <Heading1 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => onFormatChange("heading2")}
                  >
                    <Heading2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => onFormatChange("heading3")}
                  >
                    <Heading3 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <Separator />

              {/* Text Formatting */}
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Text Formatting</h3>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => onFormatChange("bold")}
                  >
                    <Bold className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => onFormatChange("italic")}
                  >
                    <Italic className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => onFormatChange("underline")}
                  >
                    <Underline className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <Separator />

              {/* Alignment */}
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Alignment</h3>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => onFormatChange("align-left")}
                  >
                    <AlignLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => onFormatChange("align-center")}
                  >
                    <AlignCenter className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => onFormatChange("align-right")}
                  >
                    <AlignRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <Separator />

              {/* Typography */}
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Typography</h3>
                <Select
                  onValueChange={(value) => onFormatChange(`font-${value}`)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select font" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="serif">Serif</SelectItem>
                    <SelectItem value="sans">Sans-serif</SelectItem>
                    <SelectItem value="mono">Monospace</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Export Options */}
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Export</h3>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" onClick={() => onExport("docx")}>
                    <FileDown className="h-4 w-4 mr-2" />
                    DocX
                  </Button>
                  <Button variant="outline" onClick={() => onExport("pdf")}>
                    <Download className="h-4 w-4 mr-2" />
                    PDF
                  </Button>
                </div>
              </div>
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="theme" className="space-y-4">
          <ScrollArea className="h-[900px] pr-4">
            <div className="space-y-6">
              {/* Color Theme */}
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Color Theme</h3>
                <Select onValueChange={onThemeChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select theme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="sepia">Sepia</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              {/* Background */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Background</h3>
                <div className="flex items-center space-x-2">
                  <Switch id="custom-bg" />
                  <Label htmlFor="custom-bg">Custom Background</Label>
                </div>
                <Button variant="outline" className="w-full">
                  <PaintBucket className="h-4 w-4 mr-2" />
                  Choose Color
                </Button>
              </div>

              <Separator />

              {/* Typography Theme */}
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Typography Theme</h3>
                <Select
                  onValueChange={(value) =>
                    onThemeChange(`typography-${value}`)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select style" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="modern">Modern</SelectItem>
                    <SelectItem value="classic">Classic</SelectItem>
                    <SelectItem value="minimal">Minimal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FormatPanel;

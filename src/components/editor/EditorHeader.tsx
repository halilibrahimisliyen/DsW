import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import {
  Save,
  Share,
  Download,
  Users,
  History,
  Settings,
  FileText,
  MoreVertical,
  Copy,
  Trash,
  Lock,
  Globe,
  UserPlus,
  FileDown,
  FileType,
  Mail,
  Link,
  Github,
} from "lucide-react";

interface EditorHeaderProps {
  title?: string;
  onSave?: () => void;
  onShare?: () => void;
  onExport?: (format: string) => void;
  onCollaborate?: () => void;
  onHistory?: () => void;
  onSettings?: () => void;
  onDelete?: () => void;
  isPublic?: boolean;
}

const EditorHeader = ({
  title = "Untitled Document",
  onSave = () => {},
  onShare = () => {},
  onExport = () => {},
  onCollaborate = () => {},
  onHistory = () => {},
  onSettings = () => {},
  onDelete = () => {},
  isPublic = false,
}: EditorHeaderProps) => {
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  const [shareLink, setShareLink] = useState("https://twods.app/doc/abc123");
  const [documentTitle, setDocumentTitle] = useState(title);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareLink);
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-background border-b flex items-center justify-between px-4 z-50">
      <div className="flex items-center space-x-4">
        <TooltipProvider>
          <DropdownMenu>
            <Tooltip>
              <TooltipTrigger asChild>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <FileText className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
              </TooltipTrigger>
              <TooltipContent>File Menu</TooltipContent>
            </Tooltip>
            <DropdownMenuContent align="start" className="w-56">
              <DropdownMenuItem onClick={onSave}>
                Save
                <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(documentTitle)}
              >
                Copy Title
                <DropdownMenuShortcut>⌘C</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <FileDown className="mr-2 h-4 w-4" />
                  Export As
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuItem onClick={() => onExport("pdf")}>
                    <FileType className="mr-2 h-4 w-4" />
                    PDF Document
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onExport("docx")}>
                    <FileType className="mr-2 h-4 w-4" />
                    Word Document
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onExport("md")}>
                    <FileType className="mr-2 h-4 w-4" />
                    Markdown
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onDelete} className="text-red-600">
                <Trash className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TooltipProvider>

        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={documentTitle}
            onChange={(e) => setDocumentTitle(e.target.value)}
            className="text-lg font-medium bg-transparent border-none focus:outline-none focus:ring-0"
            onBlur={onSave}
          />
          {isPublic ? (
            <Globe className="h-4 w-4 text-muted-foreground" />
          ) : (
            <Lock className="h-4 w-4 text-muted-foreground" />
          )}
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={onSave}
                className="hover:bg-accent"
              >
                <Save className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Save (⌘S)</TooltipContent>
          </Tooltip>

          <Dialog open={isShareDialogOpen} onOpenChange={setIsShareDialogOpen}>
            <Tooltip>
              <TooltipTrigger asChild>
                <DialogTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="hover:bg-accent"
                  >
                    <Share className="h-5 w-5" />
                  </Button>
                </DialogTrigger>
              </TooltipTrigger>
              <TooltipContent>Share</TooltipContent>
            </Tooltip>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>Share Document</DialogTitle>
                <DialogDescription>
                  Share this document with your team or make it public.
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 py-4">
                <div className="flex items-center space-x-4">
                  <div className="grid flex-1 gap-2">
                    <Label htmlFor="link">Share Link</Label>
                    <Input
                      id="link"
                      value={shareLink}
                      readOnly
                      className="w-full"
                    />
                  </div>
                  <Button
                    type="submit"
                    size="sm"
                    className="px-3"
                    onClick={handleCopyLink}
                  >
                    <span className="sr-only">Copy link</span>
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-4">
                  <h4 className="text-sm font-medium">Share with People</h4>
                  <div className="flex space-x-2">
                    <Input placeholder="Add people by email" />
                    <Button>
                      <UserPlus className="h-4 w-4 mr-2" />
                      Add
                    </Button>
                  </div>
                </div>
              </div>

              <DialogFooter className="sm:justify-start">
                <div className="flex space-x-2">
                  <Button
                    onClick={() =>
                      window.open(
                        `mailto:?subject=${documentTitle}&body=${shareLink}`,
                      )
                    }
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Email
                  </Button>
                  <Button onClick={handleCopyLink}>
                    <Link className="h-4 w-4 mr-2" />
                    Copy Link
                  </Button>
                  <Button onClick={() => window.open("https://github.com")}>
                    <Github className="h-4 w-4 mr-2" />
                    GitHub
                  </Button>
                </div>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={onCollaborate}
                className="hover:bg-accent"
              >
                <Users className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Collaborators</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={onHistory}
                className="hover:bg-accent"
              >
                <History className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Version History</TooltipContent>
          </Tooltip>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="hover:bg-accent">
                <MoreVertical className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={onSettings}>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onDelete} className="text-red-600">
                <Trash className="mr-2 h-4 w-4" />
                Delete Document
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TooltipProvider>
      </div>
    </header>
  );
};

export default EditorHeader;

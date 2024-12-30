import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  GitBranch,
  History,
  Users,
  Clock,
  Check,
  X,
  Plus,
  GitMerge,
  UserPlus,
} from "lucide-react";

interface CollaboratorType {
  id: string;
  name: string;
  avatar: string;
  status: "active" | "idle" | "offline";
}

interface ChangeType {
  id: string;
  user: CollaboratorType;
  timestamp: string;
  description: string;
  type: "addition" | "deletion" | "modification";
}

interface VersionType {
  id: string;
  name: string;
  timestamp: string;
  author: CollaboratorType;
  changes: number;
}

interface CollaborationPanelProps {
  collaborators?: CollaboratorType[];
  changes?: ChangeType[];
  versions?: VersionType[];
}

const CollaborationPanel = ({
  collaborators = [
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
  ],
  changes = [
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
  ],
  versions = [
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
  ],
}: CollaborationPanelProps) => {
  const [activeTab, setActiveTab] = useState("team");

  return (
    <div className="w-[280px] h-full bg-background border-l border-border p-4">
      <Tabs defaultValue="team" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="w-full">
          <TabsTrigger value="team" className="flex-1">
            <Users className="w-4 h-4 mr-2" />
            Team
          </TabsTrigger>
          <TabsTrigger value="changes" className="flex-1">
            <History className="w-4 h-4 mr-2" />
            Changes
          </TabsTrigger>
          <TabsTrigger value="versions" className="flex-1">
            <GitBranch className="w-4 h-4 mr-2" />
            Versions
          </TabsTrigger>
        </TabsList>

        <TabsContent value="team" className="mt-4">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-medium">Collaborators</h3>
              <Button variant="ghost" size="sm">
                <UserPlus className="w-4 h-4" />
              </Button>
            </div>
            <ScrollArea className="h-[calc(100vh-200px)]">
              {collaborators.map((collaborator) => (
                <div
                  key={collaborator.id}
                  className="flex items-center space-x-3 mb-3"
                >
                  <Avatar>
                    <AvatarImage src={collaborator.avatar} />
                    <AvatarFallback>{collaborator.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{collaborator.name}</p>
                    <p className="text-xs text-muted-foreground capitalize">
                      {collaborator.status}
                    </p>
                  </div>
                </div>
              ))}
            </ScrollArea>
          </div>
        </TabsContent>

        <TabsContent value="changes" className="mt-4">
          <ScrollArea className="h-[calc(100vh-200px)]">
            {changes.map((change) => (
              <div key={change.id} className="mb-4 p-3 border rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Avatar className="w-6 h-6">
                    <AvatarImage src={change.user.avatar} />
                    <AvatarFallback>{change.user.name[0]}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium">
                    {change.user.name}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {change.timestamp}
                  </span>
                </div>
                <p className="text-sm mb-2">{change.description}</p>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline">
                    <Check className="w-4 h-4 mr-1" />
                    Accept
                  </Button>
                  <Button size="sm" variant="outline">
                    <X className="w-4 h-4 mr-1" />
                    Reject
                  </Button>
                </div>
              </div>
            ))}
          </ScrollArea>
        </TabsContent>

        <TabsContent value="versions" className="mt-4">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-medium">Branches</h3>
              <Button variant="ghost" size="sm">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <ScrollArea className="h-[calc(100vh-200px)]">
              {versions.map((version) => (
                <div key={version.id} className="mb-4 p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <GitBranch className="w-4 h-4" />
                      <span className="text-sm font-medium">
                        {version.name}
                      </span>
                    </div>
                    <Badge variant="secondary">
                      <Clock className="w-3 h-3 mr-1" />
                      {version.timestamp}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-2 mb-2">
                    <Avatar className="w-6 h-6">
                      <AvatarImage src={version.author.avatar} />
                      <AvatarFallback>{version.author.name[0]}</AvatarFallback>
                    </Avatar>
                    <span className="text-xs text-muted-foreground">
                      {version.author.name}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">
                      {version.changes} changes
                    </span>
                    <Button size="sm" variant="outline">
                      <GitMerge className="w-4 h-4 mr-1" />
                      Merge
                    </Button>
                  </div>
                </div>
              ))}
            </ScrollArea>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CollaborationPanel;

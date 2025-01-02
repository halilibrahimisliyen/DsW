import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";
import { Users2, BookOpen, Globe2, ScrollText, Plus, Save } from "lucide-react";

interface Character {
  id: string;
  name: string;
  role: string;
  description: string;
  relationships: string;
}

interface PlotPoint {
  id: string;
  chapter: string;
  description: string;
  characters: string[];
}

interface WorldBuildingNote {
  id: string;
  title: string;
  category: string;
  content: string;
}

interface NovelToolsProps {
  onSave?: (data: any) => void;
}

const NovelTools = ({ onSave = () => {} }: NovelToolsProps) => {
  const [characters, setCharacters] = useState<Character[]>([
    {
      id: "1",
      name: "John Smith",
      role: "Protagonist",
      description: "A determined detective with a mysterious past",
      relationships: "Partner with Sarah, Rival of Thompson",
    },
  ]);

  const [plotPoints, setPlotPoints] = useState<PlotPoint[]>([
    {
      id: "1",
      chapter: "Chapter 1",
      description: "The discovery of the ancient artifact",
      characters: ["John Smith", "Sarah Chen"],
    },
  ]);

  const [worldNotes, setWorldNotes] = useState<WorldBuildingNote[]>([
    {
      id: "1",
      title: "The City",
      category: "Locations",
      content: "A sprawling metropolis with both high-tech and ancient secrets",
    },
  ]);

  const addCharacter = () => {
    const newCharacter: Character = {
      id: Date.now().toString(),
      name: "New Character",
      role: "Role",
      description: "Character description",
      relationships: "Character relationships",
    };
    setCharacters([...characters, newCharacter]);
  };

  const addPlotPoint = () => {
    const newPlotPoint: PlotPoint = {
      id: Date.now().toString(),
      chapter: `Chapter ${plotPoints.length + 1}`,
      description: "New plot point",
      characters: [],
    };
    setPlotPoints([...plotPoints, newPlotPoint]);
  };

  const addWorldNote = () => {
    const newNote: WorldBuildingNote = {
      id: Date.now().toString(),
      title: "New Note",
      category: "General",
      content: "Add details about your world",
    };
    setWorldNotes([...worldNotes, newNote]);
  };

  return (
    <div className="grid grid-cols-[1fr,300px] gap-6 h-full">
      <Card className="p-6 bg-background overflow-hidden">
        <Tabs defaultValue="characters" className="h-full">
          <TabsList>
            <TabsTrigger value="characters">
              <Users2 className="w-4 h-4 mr-2" />
              Characters
            </TabsTrigger>
            <TabsTrigger value="plot">
              <BookOpen className="w-4 h-4 mr-2" />
              Plot
            </TabsTrigger>
            <TabsTrigger value="world">
              <Globe2 className="w-4 h-4 mr-2" />
              World
            </TabsTrigger>
          </TabsList>

          <TabsContent value="characters" className="h-[calc(100%-40px)]">
            <ScrollArea className="h-full pr-4">
              <div className="space-y-4">
                {characters.map((character) => (
                  <motion.div
                    key={character.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-2 border p-4 rounded-lg"
                  >
                    <Input
                      value={character.name}
                      onChange={(e) => {
                        const updated = characters.map((c) =>
                          c.id === character.id
                            ? { ...c, name: e.target.value }
                            : c,
                        );
                        setCharacters(updated);
                      }}
                      placeholder="Character Name"
                    />
                    <Input
                      value={character.role}
                      onChange={(e) => {
                        const updated = characters.map((c) =>
                          c.id === character.id
                            ? { ...c, role: e.target.value }
                            : c,
                        );
                        setCharacters(updated);
                      }}
                      placeholder="Role"
                    />
                    <Textarea
                      value={character.description}
                      onChange={(e) => {
                        const updated = characters.map((c) =>
                          c.id === character.id
                            ? { ...c, description: e.target.value }
                            : c,
                        );
                        setCharacters(updated);
                      }}
                      placeholder="Description"
                    />
                    <Textarea
                      value={character.relationships}
                      onChange={(e) => {
                        const updated = characters.map((c) =>
                          c.id === character.id
                            ? { ...c, relationships: e.target.value }
                            : c,
                        );
                        setCharacters(updated);
                      }}
                      placeholder="Relationships"
                    />
                  </motion.div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="plot" className="h-[calc(100%-40px)]">
            <ScrollArea className="h-full pr-4">
              <div className="space-y-4">
                {plotPoints.map((point) => (
                  <motion.div
                    key={point.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-2 border p-4 rounded-lg"
                  >
                    <Input
                      value={point.chapter}
                      onChange={(e) => {
                        const updated = plotPoints.map((p) =>
                          p.id === point.id
                            ? { ...p, chapter: e.target.value }
                            : p,
                        );
                        setPlotPoints(updated);
                      }}
                      placeholder="Chapter"
                    />
                    <Textarea
                      value={point.description}
                      onChange={(e) => {
                        const updated = plotPoints.map((p) =>
                          p.id === point.id
                            ? { ...p, description: e.target.value }
                            : p,
                        );
                        setPlotPoints(updated);
                      }}
                      placeholder="Plot Point Description"
                    />
                  </motion.div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="world" className="h-[calc(100%-40px)]">
            <ScrollArea className="h-full pr-4">
              <div className="space-y-4">
                {worldNotes.map((note) => (
                  <motion.div
                    key={note.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-2 border p-4 rounded-lg"
                  >
                    <Input
                      value={note.title}
                      onChange={(e) => {
                        const updated = worldNotes.map((n) =>
                          n.id === note.id
                            ? { ...n, title: e.target.value }
                            : n,
                        );
                        setWorldNotes(updated);
                      }}
                      placeholder="Title"
                    />
                    <Input
                      value={note.category}
                      onChange={(e) => {
                        const updated = worldNotes.map((n) =>
                          n.id === note.id
                            ? { ...n, category: e.target.value }
                            : n,
                        );
                        setWorldNotes(updated);
                      }}
                      placeholder="Category"
                    />
                    <Textarea
                      value={note.content}
                      onChange={(e) => {
                        const updated = worldNotes.map((n) =>
                          n.id === note.id
                            ? { ...n, content: e.target.value }
                            : n,
                        );
                        setWorldNotes(updated);
                      }}
                      placeholder="Content"
                    />
                  </motion.div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </Card>

      {/* Tools Panel */}
      <Card className="p-4 bg-background">
        <div className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Add Content</h3>
            <div className="grid grid-cols-1 gap-2">
              <Button variant="outline" onClick={addCharacter}>
                <Users2 className="w-4 h-4 mr-2" />
                Add Character
              </Button>
              <Button variant="outline" onClick={addPlotPoint}>
                <ScrollText className="w-4 h-4 mr-2" />
                Add Plot Point
              </Button>
              <Button variant="outline" onClick={addWorldNote}>
                <Globe2 className="w-4 h-4 mr-2" />
                Add World Note
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Button
              className="w-full"
              onClick={() => onSave({ characters, plotPoints, worldNotes })}
            >
              <Save className="w-4 h-4 mr-2" />
              Save All
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default NovelTools;

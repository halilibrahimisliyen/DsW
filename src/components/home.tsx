import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  FileText,
  Users,
  Music,
  Palette,
  Github,
  Book,
  PenTool,
  Layout,
  Wand2,
} from "lucide-react";

function Home() {
  const navigate = useNavigate();

  const features = [
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Distraction-Free Writing",
      description: "Focus on your content with our minimal interface",
      path: "/editor",
    },
    {
      icon: <PenTool className="h-6 w-6" />,
      title: "AI Font Generator",
      description: "Transform your handwriting into a custom font",
      path: "/font",
    },
    {
      icon: <Layout className="h-6 w-6" />,
      title: "Cover Designer",
      description: "Create stunning book covers with AI assistance",
      path: "/cover",
    },
    {
      icon: <Wand2 className="h-6 w-6" />,
      title: "Comic Creator",
      description: "Design comics with our intuitive tools",
      path: "/comic",
    },
    {
      icon: <Book className="h-6 w-6" />,
      title: "Novel Tools",
      description: "Organize characters, plot, and world-building",
      path: "/novel-tools",
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Real-Time Collaboration",
      description: "Work together with your team seamlessly",
      path: "/editor",
    },
    {
      icon: <Music className="h-6 w-6" />,
      title: "Integrated Music Player",
      description: "Stay in flow with background music",
      path: "/editor",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-20 pb-16">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl text-foreground">
            TwoDs Writing Platform
          </h1>
          <p className="text-xl text-muted-foreground">
            A sophisticated writing environment that combines professional tools
            with creative features and AI assistance.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" onClick={() => navigate("/editor")}>
              Start Writing
            </Button>
            <Button size="lg" variant="outline">
              <Github className="mr-2 h-4 w-4" />
              View on GitHub
            </Button>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="p-6 flex flex-col items-center text-center hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => navigate(feature.path)}
            >
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t mt-20">
        <div className="container mx-auto px-4 py-8">
          <p className="text-center text-muted-foreground">
            © 2024 TwoDs Writing Platform. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Home;

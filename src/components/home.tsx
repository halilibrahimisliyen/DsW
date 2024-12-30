import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FileText, Users, Music, Palette, Github } from "lucide-react";

function Home() {
  const navigate = useNavigate();

  const features = [
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Distraction-Free Writing",
      description: "Focus on your content with our minimal interface",
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Real-Time Collaboration",
      description: "Work together with your team seamlessly",
    },
    {
      icon: <Music className="h-6 w-6" />,
      title: "Integrated Music Player",
      description: "Stay in flow with background music",
    },
    {
      icon: <Palette className="h-6 w-6" />,
      title: "Beautiful Themes",
      description: "Customize your writing environment",
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
            with collaborative features.
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="p-6 flex flex-col items-center text-center hover:shadow-lg transition-shadow"
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

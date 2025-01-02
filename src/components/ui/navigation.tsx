import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import { Pen, BookOpen, Wand2, Layout, PenTool, Book } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();

  const routes = [
    { path: "/", label: "Home", icon: <BookOpen className="w-4 h-4" /> },
    { path: "/editor", label: "Write", icon: <Pen className="w-4 h-4" /> },
    {
      path: "/novel-tools",
      label: "Novel Tools",
      icon: <Book className="w-4 h-4" />,
    },
    {
      path: "/font",
      label: "Font Creator",
      icon: <PenTool className="w-4 h-4" />,
    },
    {
      path: "/cover",
      label: "Cover Design",
      icon: <Layout className="w-4 h-4" />,
    },
    {
      path: "/comic",
      label: "Comic Creator",
      icon: <Wand2 className="w-4 h-4" />,
    },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-background border-b flex items-center px-4 z-50">
      <div className="hidden md:flex space-x-2">
        {routes.map((route) => (
          <Button
            key={route.path}
            variant={location.pathname === route.path ? "default" : "ghost"}
            onClick={() => navigate(route.path)}
          >
            {route.icon}
            <span className="ml-2">{route.label}</span>
          </Button>
        ))}
      </div>

      <div className="md:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <BookOpen className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            {routes.map((route) => (
              <DropdownMenuItem
                key={route.path}
                onClick={() => navigate(route.path)}
              >
                {route.icon}
                <span className="ml-2">{route.label}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}

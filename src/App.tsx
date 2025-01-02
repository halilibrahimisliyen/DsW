import { Routes, Route } from "react-router-dom";
import Home from "./components/home";
import EditorPage from "./pages/editor";
import { Navigation } from "./components/ui/navigation";
import FontGenerator from "./components/creative/FontGenerator";
import CoverDesigner from "./components/creative/CoverDesigner";
import ComicCreator from "./components/creative/ComicCreator";
import NovelTools from "./components/creative/NovelTools";

function App() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-16">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/editor" element={<EditorPage />} />
          <Route
            path="/font"
            element={
              <div className="container mx-auto py-8">
                <FontGenerator
                  onGenerate={(canvas) =>
                    console.log("Generated font from canvas")
                  }
                  onDownload={(fontName) =>
                    console.log("Downloading font:", fontName)
                  }
                />
              </div>
            }
          />
          <Route
            path="/cover"
            element={
              <div className="container mx-auto py-8">
                <CoverDesigner
                  onGenerate={(design) =>
                    console.log("Generated design:", design)
                  }
                  onDownload={() => console.log("Downloading cover")}
                />
              </div>
            }
          />
          <Route
            path="/comic"
            element={
              <div className="container mx-auto py-8">
                <ComicCreator
                  onSave={(panels) => console.log("Saving panels:", panels)}
                  onExport={() => console.log("Exporting comic")}
                />
              </div>
            }
          />
          <Route
            path="/novel-tools"
            element={
              <div className="container mx-auto py-8">
                <NovelTools
                  onSave={(data) => console.log("Saving novel data:", data)}
                />
              </div>
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;

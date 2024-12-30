import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import EditorPage from "./pages/editor";

function App() {
  return (
    <div className="min-h-screen bg-background">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/editor" element={<EditorPage />} />
      </Routes>
    </div>
  );
}

export default App;

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./LoginPage";
import MainPanel from "./MainPanel";
import LineaPanel from "./modules/admin/LineaPanel";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/panel" element={<MainPanel />} />
        <Route path="/linea/:id" element={<LineaPanel />} />
      </Routes>
    </Router>
  );
}

export default App;


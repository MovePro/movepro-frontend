import React, { useState } from "react";
import LoginPage from "./pages/LoginPage";
import MainPanel from "./pages/MainPanel";
import CarDealerHome from "./modules/cardealers/Home";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedModule, setSelectedModule] = useState(null);

  const handleLogin = (password) => {
    if (password === "movepro") {
      setIsAuthenticated(true);
    } else {
      alert("Clave incorrecta");
    }
  };

  const handleModuleSelect = (module) => {
    setSelectedModule(module);
  };

  const handleLogout = () => {
    setSelectedModule(null); // ← Esto es lo importante
  };

  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  if (selectedModule === "cardealers") {
    return <CarDealerHome onExit={handleLogout} />;
  }

  return <MainPanel onSelectModule={handleModuleSelect} />;
}

export default App;

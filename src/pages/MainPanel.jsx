import React from "react";
import HeaderLogo from "../components/HeaderLogo";

function MainPanel({ onSelectModule }) {
  return (
    <div className="min-h-screen bg-gray-100 relative flex flex-col items-center justify-center space-y-6">
      <HeaderLogo />
      <h1 className="text-2xl font-semibold text-gray-800">¿Qué deseas hacer?</h1>
      <div className="flex flex-col space-y-4">
        <button
          onClick={() => onSelectModule("cardealers")}
          className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Concesionarios de vehículos
        </button>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-3 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Salir
        </button>
      </div>
    </div>
  );
}

export default MainPanel;


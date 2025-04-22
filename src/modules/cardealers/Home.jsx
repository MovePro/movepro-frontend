import React, { useState } from "react";
import NewContractForm from "./NewContractForm";
import HeaderLogo from "../../components/HeaderLogo";

function MainPanel({ onExit }) {
  const [showNewContractForm, setShowNewContractForm] = useState(false);

  if (showNewContractForm) {
    return <NewContractForm onCancel={() => setShowNewContractForm(false)} />;
  }

  return (
    <div className="min-h-screen bg-gray-100 relative flex flex-col items-center justify-center space-y-6">
      <HeaderLogo />
      <h1 className="text-2xl font-semibold text-gray-800">Panel principal</h1>
      <div className="flex flex-col space-y-4">
        <button
          onClick={() => setShowNewContractForm(true)}
          className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Nuevo contrato
        </button>
        <button className="px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700">
          Todos los contratos
        </button>
        <button
          onClick={onExit}
          className="px-6 py-3 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Salir
        </button>
      </div>
    </div>
  );
}

export default MainPanel;


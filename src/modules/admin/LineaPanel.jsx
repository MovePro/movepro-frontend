import React from "react";
import { useParams } from "react-router-dom";

function LineaPanel() {
  const { id } = useParams();

  // Más adelante se puede cargar lógica real según ID
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Panel principal de la línea de negocio: {id}
      </h2>
      <div className="space-y-4">
        <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          Nuevo contrato
        </button>
        <button className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700">
          Todos los contratos
        </button>
        <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
          Salir
        </button>
      </div>
    </div>
  );
}

export default LineaPanel;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminPanel() {
  const [lineas, setLineas] = useState([]);
  const [nuevaLinea, setNuevaLinea] = useState("");
  const [loading, setLoading] = useState(false);

  const API_URL = process.env.REACT_APP_API_URL;

  // Cargar líneas existentes al iniciar
  useEffect(() => {
    obtenerLineas();
  }, []);

  const obtenerLineas = async () => {
    try {
      const res = await axios.get(`${API_URL}/business-lines`);
      setLineas(res.data);
    } catch (error) {
      console.error("Error al cargar líneas:", error);
    }
  };

  const crearLinea = async () => {
    if (!nuevaLinea.trim()) return;

    try {
      setLoading(true);
      await axios.post(`${API_URL}/business-lines`, {
        nombre: nuevaLinea.trim(),
      });
      setNuevaLinea("");
      obtenerLineas();
    } catch (error) {
      console.error("Error al crear línea:", error);
      alert("Hubo un problema creando la línea de negocio.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Panel de administración</h2>

      <div className="mb-8">
        <label className="block font-medium text-gray-700 mb-2">Nueva línea de negocio</label>
        <div className="flex space-x-4">
          <input
            type="text"
            value={nuevaLinea}
            onChange={(e) => setNuevaLinea(e.target.value)}
            className="flex-1 border border-gray-300 rounded px-3 py-2"
            placeholder="Ej. Tiendas de bicicletas"
          />
          <button
            onClick={crearLinea}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? "Creando..." : "Crear"}
          </button>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-4">Líneas de negocio existentes</h3>
        <ul className="space-y-2">
          {lineas.map((linea) => (
            <li
              key={linea._id}
              className="bg-gray-100 px-4 py-3 rounded flex justify-between items-center"
            >
              <span>{linea.nombre}</span>
              import { useNavigate } from "react-router-dom";

              // al inicio del componente
              const navigate = useNavigate();

              // y dentro del .map:
              <button
                className="text-sm text-blue-600 hover:underline"
                onClick={() => navigate(`/linea/${linea._id}`)}
              >
                Ir al panel principal
              </button>
              
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AdminPanel;

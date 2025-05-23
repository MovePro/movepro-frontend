import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo_movepro.png";

function AdminPanel() {
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL;

  const [actividades, setActividades] = useState([]);
  const [nuevaActividad, setNuevaActividad] = useState("");
  const [editandoId, setEditandoId] = useState(null);
  const [nuevoNombre, setNuevoNombre] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    obtenerActividades();
  }, []);

  const obtenerActividades = async () => {
    try {
      const res = await axios.get(`${API_URL}/activities`);
      setActividades(res.data);
    } catch (error) {
      console.error("Error al cargar actividades:", error);
    }
  };

  const crearActividad = async () => {
    if (!nuevaActividad.trim()) return;
    try {
      setLoading(true);
      await axios.post(`${API_URL}/activities`, { nombre: nuevaActividad.trim() });
      setNuevaActividad("");
      obtenerActividades();
    } catch (error) {
      console.error("Error al crear actividad:", error);
      alert("Hubo un problema creando la actividad.");
    } finally {
      setLoading(false);
    }
  };

  const guardarEdicion = async (id) => {
    try {
      await axios.put(`${API_URL}/activities/${id}`, { nombre: nuevoNombre.trim() });
      setEditandoId(null);
      setNuevoNombre("");
      obtenerActividades();
    } catch (error) {
      console.error("Error al editar nombre:", error);
      alert("No se pudo actualizar el nombre.");
    }
  };

  const eliminarActividad = async (id) => {
    const confirmar = window.confirm("¿Estás seguro de eliminar esta actividad? Esto también eliminará su carpeta en Drive.");
    if (!confirmar) return;
    try {
      await axios.delete(`${API_URL}/activities/${id}`);
      obtenerActividades();
    } catch (error) {
      console.error("Error al eliminar actividad:", error);
      alert("Error al eliminar actividad.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 relative p-6 max-w-4xl mx-auto">
      {/* Logo y salir */}
      <div className="flex justify-between items-center mb-8">
        <img src={logo} alt="MovePro" className="h-10" />
        <button
          onClick={() => navigate("/")}
          className="text-sm text-red-600 hover:underline"
        >
          Salir
        </button>
      </div>

      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Panel de administración</h2>

      {/* Crear nueva actividad */}
      <div className="mb-8">
        <label className="block font-medium text-gray-700 mb-2">Nueva actividad</label>
        <div className="flex space-x-4">
          <input
            type="text"
            value={nuevaActividad}
            onChange={(e) => setNuevaActividad(e.target.value)}
            className="flex-1 border border-gray-300 rounded px-3 py-2"
            placeholder="Ej. Tiendas de bicicletas"
          />
          <button
            onClick={crearActividad}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? "Creando..." : "Crear"}
          </button>
        </div>
      </div>

      {/* Lista de actividades */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Actividades existentes</h3>
        <ul className="space-y-2">
          {actividades.map((actividad) => (
            <li
              key={actividad._id}
              className="bg-white px-4 py-3 rounded shadow-sm flex justify-between items-center"
            >
              {editandoId === actividad._id ? (
                <div className="flex-1 flex space-x-2">
                  <input
                    type="text"
                    value={nuevoNombre}
                    onChange={(e) => setNuevoNombre(e.target.value)}
                    className="border px-2 py-1 rounded flex-1"
                  />
                  <button
                    onClick={() => guardarEdicion(actividad._id)}
                    className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                  >
                    Guardar
                  </button>
                  <button
                    onClick={() => setEditandoId(null)}
                    className="text-sm text-gray-500 hover:underline"
                  >
                    Cancelar
                  </button>
                </div>
              ) : (
                <>
                  <span className="flex-1">{actividad.nombre}</span>
                  <div className="flex space-x-4">
                    <button
                      onClick={() => navigate(`/linea/${actividad._id}`)}
                      className="text-sm text-blue-600 hover:underline"
                    >
                      Ir al panel principal
                    </button>
                    <button
                      onClick={() => {
                        setEditandoId(actividad._id);
                        setNuevoNombre(actividad.nombre);
                      }}
                      className="text-sm text-yellow-600 hover:underline"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => eliminarActividad(actividad._id)}
                      className="text-sm text-red-600 hover:underline"
                    >
                      Eliminar
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AdminPanel;

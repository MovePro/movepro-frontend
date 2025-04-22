import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function LineaPanel() {
  const { id } = useParams();
  const API_URL = process.env.REACT_APP_API_URL;
  const [actividad, setActividad] = useState(null);
  const [archivo1_1, setArchivo1_1] = useState(null);
  const [archivo1_2, setArchivo1_2] = useState(null);
  const [linea1_2, setLinea1_2] = useState("");
  const [subiendo, setSubiendo] = useState(false);

  useEffect(() => {
    cargarActividad();
  }, []);

  const cargarActividad = async () => {
    try {
      const res = await axios.get(`${API_URL}/activities/${id}`);
      setActividad(res.data);
    } catch (err) {
      console.error("Error cargando actividad:", err);
    }
  };

  const subir1_1 = async () => {
    if (!archivo1_1) return;
    const formData = new FormData();
    formData.append("formulario", archivo1_1);

    try {
      setSubiendo(true);
      await axios.post(`${API_URL}/activities/upload-1-1/${id}`, formData);
      setArchivo1_1(null);
      cargarActividad();
    } catch (err) {
      console.error("Error subiendo 1.1:", err);
      alert("Error al subir el formulario 1.1");
    } finally {
      setSubiendo(false);
    }
  };

  const subir1_2 = async () => {
    if (!archivo1_2 || !linea1_2.trim()) return;

    const formData = new FormData();
    formData.append("formulario", archivo1_2);
    formData.append("linea", linea1_2.trim());

    try {
      setSubiendo(true);
      await axios.post(`${API_URL}/activities/upload-1-2/${id}`, formData);
      setArchivo1_2(null);
      setLinea1_2("");
      cargarActividad();
    } catch (err) {
      console.error("Error subiendo 1.2:", err);
      alert("Error al subir el formulario 1.2");
    } finally {
      setSubiendo(false);
    }
  };

  if (!actividad) return <div className="p-6">Cargando actividad...</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        Panel de actividad: {actividad.nombre}
      </h2>

      {/* Formulario 1.1 */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-2">Formulario 1.1 general</h3>
        {actividad.formulario1_1 ? (
          <p className="mb-2">
            📄 <a href={actividad.formulario1_1.url} target="_blank" rel="noreferrer">
              {actividad.formulario1_1.nombre}
            </a> (subido el {new Date(actividad.formulario1_1.fechaSubida).toLocaleDateString()})
          </p>
        ) : (
          <p className="mb-2 text-gray-600">No se ha subido aún.</p>
        )}
        <input
          type="file"
          onChange={(e) => setArchivo1_1(e.target.files[0])}
          className="mb-2"
        />
        <button
          onClick={subir1_1}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          disabled={subiendo || !archivo1_1}
        >
          Subir / Reemplazar 1.1
        </button>
      </div>

      {/* Formulario 1.2 por línea */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-2">Formularios 1.2 por línea</h3>
        {actividad.formularios1_2 && actividad.formularios1_2.length > 0 ? (
          <ul className="mb-4">
            {actividad.formularios1_2.map((f) => (
              <li key={f.linea} className="mb-1">
                🧩 <strong>{f.linea}</strong>:{" "}
                <a href={f.url} target="_blank" rel="noreferrer">{f.nombre}</a>{" "}
                (subido el {new Date(f.fechaSubida).toLocaleDateString()})
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600 mb-2">Aún no hay formularios 1.2 cargados.</p>
        )}
        <input
          type="text"
          placeholder="Nombre de la línea (ej. VN)"
          value={linea1_2}
          onChange={(e) => setLinea1_2(e.target.value)}
          className="border px-3 py-2 rounded mb-2 w-full"
        />
        <input
          type="file"
          onChange={(e) => setArchivo1_2(e.target.files[0])}
          className="mb-2"
        />
        <button
          onClick={subir1_2}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
          disabled={subiendo || !archivo1_2 || !linea1_2.trim()}
        >
          Subir / Reemplazar 1.2
        </button>
      </div>

      {/* Acciones */}
      <div className="flex space-x-4">
        <button className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700">Nuevo contrato</button>
        <button className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700">Todos los contratos</button>
        <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Salir</button>
      </div>
    </div>
  );
}

export default LineaPanel;


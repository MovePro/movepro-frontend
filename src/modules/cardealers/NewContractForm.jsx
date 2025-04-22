import React, { useState } from "react";
import axios from "axios";
import HeaderLogo from "../../components/HeaderLogo";

function NewContractForm({ onCancel }) {
  const [concesionario, setConcesionario] = useState("");
  const [tipoConsultoria, setTipoConsultoria] = useState("");
  const [lineasNegocio, setLineasNegocio] = useState([]);
  const [sedesVN, setSedesVN] = useState([]);
  const [sedesPV, setSedesPV] = useState([]);
  const [sedesVO, setSedesVO] = useState([]);
  const [vnCount, setVnCount] = useState(0);
  const [pvCount, setPvCount] = useState(0);
  const [voCount, setVoCount] = useState(0);

  const handleCheckboxChange = (linea) => {
    if (lineasNegocio.includes(linea)) {
      setLineasNegocio(lineasNegocio.filter((l) => l !== linea));
    } else {
      setLineasNegocio([...lineasNegocio, linea]);
    }
  };

  const handleSedesChange = (setter, count) => {
    setter((prev) => {
      const newArray = Array.from({ length: count }, (_, i) => prev[i] || "");
      return newArray;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        concesionario,
        tipoConsultoria,
        lineasNegocio,
        sedesVN,
        sedesPV,
        sedesVO,
      };

      await axios.post(`${process.env.REACT_APP_API_URL}/contracts`, payload);
      alert("Contrato creado exitosamente.");
      onCancel(); // vuelve al panel anterior
    } catch (error) {
      console.error(error);
      alert("Error al crear el contrato.");
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded shadow-md">
      <HeaderLogo />
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Nuevo contrato</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block font-medium text-gray-700">
            Nombre del concesionario
          </label>
          <input
            type="text"
            value={concesionario}
            onChange={(e) => setConcesionario(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
            placeholder="Ej. Concesionario A"
            required
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700">
            Tipo de consultoría contratada
          </label>
          <div className="space-y-2 mt-1">
            {[
              "Diagnóstico inicial",
              "Diagnóstico + Plan de acción",
              "Diagnóstico + Plan de acción + Acompañamiento bimensual",
            ].map((tipo) => (
              <label key={tipo} className="flex items-center">
                <input
                  type="radio"
                  name="tipo"
                  className="mr-2"
                  value={tipo}
                  checked={tipoConsultoria === tipo}
                  onChange={(e) => setTipoConsultoria(e.target.value)}
                />
                {tipo}
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block font-medium text-gray-700">
            Líneas de negocio a analizar
          </label>
          <div className="space-y-2 mt-1">
            {["VN", "PV", "VO"].map((linea) => (
              <label key={linea} className="flex items-center">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={lineasNegocio.includes(linea)}
                  onChange={() => handleCheckboxChange(linea)}
                />
                {linea}
              </label>
            ))}
          </div>
        </div>

        {lineasNegocio.includes("VN") && (
          <div>
            <label className="block font-medium text-gray-700">
              ¿Cuántas sedes VN se van a analizar?
            </label>
            <input
              type="number"
              min="0"
              value={vnCount}
              onChange={(e) => {
                const count = parseInt(e.target.value) || 0;
                setVnCount(count);
                handleSedesChange(setSedesVN, count);
              }}
              className="mt-1 block w-24 border border-gray-300 rounded px-3 py-1"
            />
            {sedesVN.map((nombre, index) => (
              <input
                key={index}
                type="text"
                value={nombre}
                onChange={(e) => {
                  const updated = [...sedesVN];
                  updated[index] = e.target.value;
                  setSedesVN(updated);
                }}
                placeholder={`Nombre sede VN ${index + 1}`}
                className="mt-2 block w-full border border-gray-300 rounded px-3 py-2"
              />
            ))}
          </div>
        )}

        {lineasNegocio.includes("PV") && (
          <div>
            <label className="block font-medium text-gray-700">
              ¿Cuántas sedes PV se van a analizar?
            </label>
            <input
              type="number"
              min="0"
              value={pvCount}
              onChange={(e) => {
                const count = parseInt(e.target.value) || 0;
                setPvCount(count);
                handleSedesChange(setSedesPV, count);
              }}
              className="mt-1 block w-24 border border-gray-300 rounded px-3 py-1"
            />
            {sedesPV.map((nombre, index) => (
              <input
                key={index}
                type="text"
                value={nombre}
                onChange={(e) => {
                  const updated = [...sedesPV];
                  updated[index] = e.target.value;
                  setSedesPV(updated);
                }}
                placeholder={`Nombre sede PV ${index + 1}`}
                className="mt-2 block w-full border border-gray-300 rounded px-3 py-2"
              />
            ))}
          </div>
        )}

        {lineasNegocio.includes("VO") && (
          <div>
            <label className="block font-medium text-gray-700">
              ¿Cuántas sedes VO se van a analizar?
            </label>
            <input
              type="number"
              min="0"
              value={voCount}
              onChange={(e) => {
                const count = parseInt(e.target.value) || 0;
                setVoCount(count);
                handleSedesChange(setSedesVO, count);
              }}
              className="mt-1 block w-24 border border-gray-300 rounded px-3 py-1"
            />
            {sedesVO.map((nombre, index) => (
              <input
                key={index}
                type="text"
                value={nombre}
                onChange={(e) => {
                  const updated = [...sedesVO];
                  updated[index] = e.target.value;
                  setSedesVO(updated);
                }}
                placeholder={`Nombre sede VO ${index + 1}`}
                className="mt-2 block w-full border border-gray-300 rounded px-3 py-2"
              />
            ))}
          </div>
        )}

        <div className="pt-4 flex justify-between">
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-300 text-gray-800 px-6 py-2 rounded hover:bg-gray-400"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Crear contrato
          </button>
        </div>
      </form>
    </div>
  );
}

export default NewContractForm;

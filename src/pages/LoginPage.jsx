import React, { useState } from "react";
import HeaderLogo from "../components/HeaderLogo";

function LoginPage({ onLogin }) {
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(password);
  };

  return (
    <div className="min-h-screen bg-gray-100 relative flex items-center justify-center">
      <HeaderLogo />
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-semibold text-center mb-6">
          Acceso protegido
        </h2>
        <input
          type="password"
          placeholder="Ingresa la clave"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200"
        >
          Entrar
        </button>
      </form>
    </div>
  );
}

export default LoginPage;


import React from 'react'
import { useState } from 'react'

/**
* Genera un formulario de inicio de sesión con campos de correo electrónico y contraseña.
* Incluye una función para activar o desactivar la visibilidad de la contraseña.
 */

function Login() {

    const [passwordShown, setPasswordShown] = useState(false);

    /**
     * Visibilidad del campo de contraseña.
     * @function
     * @returns {void}
     */
    const togglePasswordVisibility = () => {
      setPasswordShown((prev) => !prev);
    };

  return (
    <section className="m-10 flex flex-col min-h-screen p-4">
 
  {/* Formulario centrado */}
  <div className="flex-grow flex justify-center">
    <form className="w-full max-w-sm space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800 text-center">
        Iniciar sesión
      </h2>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Correo electrónico
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="nombre@email.com"
          className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Contraseña
        </label>
        <div className="relative">
          <input
            id="password"
            name="password"
            type={passwordShown ? "text" : "password"}
            placeholder="********"
            className="mt-1 w-full border border-gray-300 rounded-md p-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute top-2.5 right-2 text-gray-600 text-sm"
          >
            {passwordShown ? "Ocultar" : "Mostrar"}
          </button>
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-gray-800 text-white py-2 rounded-md hover:bg-gray-700 transition"
      >
        Iniciar sesión
      </button>
    </form>
  </div>
</section>
  );
}

export default Login
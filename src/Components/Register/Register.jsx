import React, { useState } from 'react'

/**
 * Componente de formulario de registro.
 * Incluye campos para nombre, correo, contraseña y confirmación de contraseña.
 * Permite alternar la visibilidad de las contraseñas.
 */

function Register() {
  const [passwordShown, setPasswordShown] = useState(false);
  const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordShown((prev) => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordShown((prev) => !prev);
  };

  return (
    <section className="m-10 flex flex-col min-h-screen p-4">
      <div className="flex-grow flex justify-center">
        <form className="w-full max-w-sm space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800 text-center">
            Registrarse
          </h2>

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Nombre completo
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Tu nombre"
              autoComplete="name"
              className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Correo electrónico
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="nombre@email.com"
              autoComplete="email"
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
                type={passwordShown ? 'text' : 'password'}
                placeholder="********"
                autoComplete="password"
                className="mt-1 w-full border border-gray-300 rounded-md p-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute top-2.5 right-2 text-gray-600 text-sm"
              >
                {passwordShown ? 'Ocultar' : 'Mostrar'}
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirmar contraseña
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={confirmPasswordShown ? 'text' : 'password'}
                placeholder="********"
                autoComplete="confirmPassword"
                className="mt-1 w-full border border-gray-300 rounded-md p-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button
                type="button"
                onClick={toggleConfirmPasswordVisibility}
                className="absolute top-2.5 right-2 text-gray-600 text-sm"
              >
                {confirmPasswordShown ? 'Ocultar' : 'Mostrar'}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gray-800 text-white py-2 rounded-md hover:bg-gray-700 transition"
          >
            Registrarse
          </button>
        </form>
      </div>
    </section>
  );
}

export default Register;
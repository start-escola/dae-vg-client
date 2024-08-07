"use client";

import React from "react";
import { performForgetPassword } from "./action";
import { useFormState } from "react-dom";
import Link from "next/link";

function ForgotForm() {
  const [state, formAction] = useFormState(performForgetPassword, null);

  return (
    <div className="flex justify-center items-center flex-col">
      <div className="flex flex-col bg-blur bg-black backdrop-blur-lg bg-opacity-30 bg-cover bg-center p-16 mb-10">
        <form
          action={formAction}
          className="max-w-5xl p-4 bg-white bg-opacity-90 rounded-sm w-screen"
        >
          <span className="text-lg">
            Enviaremos os próximos passos para o seu email cadastrado
          </span>
          <div className="flex justify-center items-center mt-4">
            <input
              name="email"
              placeholder="Digite seu email de acesso aqui"
              className="w-full px-4 py-2 text-lg border rounded-lg mr-4 h-14"
            />
            <button
              type="submit"
              className="px-8 py-4 text-lg text-white rounded-sm hover:bg-green-600 bg-primary-500 w-40 h-14"
            >
              Recuperar
            </button>
          </div>
          {state === "success" && (
            <p className="text-primary-500 text-lg mt-2">
              Verique sua caixa de entrada para as instruções para a sua nova senha.
            </p>
          )}
        </form>
      </div>

      <Link
        href="/acesso"
        className="text-xl text-white-200 flex text-center underline"
      >
        Fazer Login
      </Link>
    </div>
  );
}

export default ForgotForm;

"use client";
import Input from "../input";
import Link from "next/link";
import { createSession } from "./action";
import { useFormState } from "react-dom";
import { maskCNPJ, maskCPF } from "../cadastro/cadastro-form";
import { redirect, useSearchParams } from "next/navigation";
import Text from "@/components/Text";
import { useState } from "react";
import Image from "next/image";
import clsx from "clsx";


const AcessoForm = () => {
  const [state, formAction] = useFormState(createSession, null);
  const [isJuridic, setIsJuridic] = useState(true);

  // Redirect Functions
  const params = useSearchParams();
  const callbackUrl = params.get("callbackUrl");
  if (state === "success") return redirect(callbackUrl ? callbackUrl : "/");

  const passwordError = state?.errors.password?.pop();

  return (
    <form
      className="flex flex-col items-center w-screen max-w-[580px] my-4 mx-2 px-2 py-16 bg-[#06092B4D] backdrop-blur-lg"
      action={formAction}
    >
      <input type="checkbox" name="isJuridic" checked={isJuridic} hidden readOnly />
      <div className="flex flex-col gap-3 max-w-[318px] text-center">
        <Text className="text-2xl font-medium">É um prazer rever você!</Text>
        <Text className="text-xl font-light">
          Aqui nossa missão é proporcionar o melhor para a população
        </Text>
      </div>
      <div className="flex flex-col items-center gap-2 w-full max-w-[350px] mt-4">
        <div className="grid grid-cols-2 w-full rounded overflow-hidden border border-white-50">
          <button className={clsx("flex items-center justify-between p-3", !isJuridic ? "bg-primary-500" : "opacity-60")} onClick={() => setIsJuridic(false)}>
            <Image width={24} height={24} src="/user.svg" alt={""} />
            Pessoa Física
          </button>
          <button className={clsx("flex items-center justify-between p-3", isJuridic ? "bg-primary-500": "opacity-60")} onClick={() => setIsJuridic(true)}>
              <Image width={24} height={24} src="/company.svg" alt={""} />
              Pessoa Jurídica
          </button>
        </div>
        <Input
          name="identifier"
          placeholder={isJuridic ? "CNPJ" : "CPF"}
          aria-label={isJuridic ? "CNPJ" : "CPF"}
          autoComplete="new-password"
          icon="/user.svg"
          label={isJuridic ? "CNPJ" : "CPF"}
          onChange={(e) => {
            isJuridic
              ?
              e.target.value = maskCNPJ(e.currentTarget.value)
              :
              e.target.value = maskCPF(e.currentTarget.value);
          }}
          error={state?.errors.identifier?.pop() || passwordError}
        />
        <Input
          name="password"
          placeholder="Senha"
          icon="/user.svg"
          label="Senha"
          type="password"
          error={passwordError}
        />
        <Link href="/forgot-password" className="self-end font-light">
          <Text className="text-base font-light">Esqueci a minha senha</Text>
        </Link>
        <button className="mt-8 w-full py-3 bg-[#911414] rounded">Login</button>
        <div className="flex items-center justify-center w-full">
          <hr className="bg-white-0 w-full" />
          <Text className="px-4 text-xl">ou</Text>
          <hr className="bg-white-0 w-full" />
        </div>
        <ul className="w-full">
          <li className="relative">
            <Link
              href={
                callbackUrl
                  ? `/cadastro?callbackUrl=${callbackUrl}`
                  : "/cadastro"
              }
            >
              <Text className="mt-3 w-full py-3 bg-[#868E96] rounded text-xl" as="button">
                Cadastrar-se
              </Text>
            </Link>
          </li>
        </ul>
      </div>
    </form>
  );
};

export default AcessoForm;

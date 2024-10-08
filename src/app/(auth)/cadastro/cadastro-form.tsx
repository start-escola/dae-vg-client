"use client";
import Image from "next/image";
import Input from "../input";
import Link from "next/link";
import { useFormState, useFormStatus } from "react-dom";
import { performSignup } from "./action";
import { redirect, useSearchParams } from "next/navigation";
import Text from "@/components/Text";
import clsx from "clsx";
import { useState } from "react";

export const maskCPF = (cpf: string) => {
  return cpf
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})/, "$1-$2")
    .replace(/(-\d{2})\d+?$/, "$1");
};

export const maskCNPJ = (cnpj: string) => {
  return cnpj
    .replace(/\D/g, "")
    .replace(/(\d{2})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1/$2")
    .replace(/(\d{4})(\d{1,2})/, "$1-$2")
    .replace(/(-\d{2})\d+?$/, "$1");
};

const maskName = (value: string) => {
  const preposicoes = ["de", "da", "do", "das", "dos", "e"];
  return value
    .split(" ")
    .map((word) => {
      if (preposicoes.includes(word.toLowerCase())) {
        return word.toLowerCase();
      } else {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      }
    })
    .join(" ");
};

const CadastroForm = () => {
  const [state, formAction] = useFormState(performSignup, null);
  const [isJuridic, setIsJuridic] = useState(false);

  // Redirect Functions
  const params = useSearchParams();
  const callbackUrl = params.get("callbackUrl");
  if (state === "success") return redirect(callbackUrl ? callbackUrl : "/");

  return (
    <form
      className="relative flex flex-col items-center w-screen max-w-[580px] my-4 mx-2 px-2 py-16 bg-[#06092B4D] backdrop-blur-lg"
      action={formAction}
    >
      <input
        type="checkbox"
        name="isJuridic"
        checked={isJuridic}
        hidden
        readOnly
      />
      <Link
        className="absolute left-4 top-4 bg-white-0 rounded-full p-3"
        href="/acesso"
      >
        <Image src="arrow-back.svg" width={24} height={24} alt="voltar" />
      </Link>
      <div className="flex flex-col gap-3 max-w-[318px] text-center">
        <Text className="text-2xl font-medium">É um prazer rever você!</Text>
        <Text className="text-xl font-light">
          Aqui nossa missão é proporcionar o melhor para a população
        </Text>
      </div>
      <div className="flex flex-col items-center gap-2 w-full max-w-[350px] mt-4">
        <div className="grid grid-cols-2 w-full rounded overflow-hidden border border-white-50">
          <button
            className={clsx(
              "flex items-center justify-between p-3",
              !isJuridic ? "bg-primary-500" : "opacity-60"
            )}
            onClick={() => setIsJuridic(false)}
          >
            <Image width={24} height={24} src="/user.svg" alt={""} />
            Pessoa Física
          </button>
          <button
            className={clsx(
              "flex items-center justify-between p-3",
              isJuridic ? "bg-primary-500" : "opacity-60"
            )}
            onClick={() => setIsJuridic(true)}
          >
            <Image width={24} height={24} src="/company.svg" alt={""} />
            Pessoa Jurídica
          </button>
        </div>
        <Input
          name="fullname"
          placeholder={isJuridic ? "Razão Social" : "Nome completo"}
          icon="/user.svg"
          label={isJuridic ? "Razão Social" : "Nome completo"}
          onChange={(e) => {
            if (!isJuridic) e.target.value = maskName(e.target.value);
          }}
          // @ts-ignore
          error={state?.errors?.fullname?.pop()}
        />
        <Input
          name="email"
          placeholder="E-mail"
          icon="/user.svg"
          label="E-mail"
          error={state?.errors?.email?.pop()}
        />
        <Input
          name={isJuridic ? "cnpj" : "cpf"}
          placeholder={isJuridic ? "CNPJ" : "CPF"}
          aria-label={isJuridic ? "CNPJ" : "CPF"}
          autoComplete="new-password"
          icon="/user.svg"
          label={isJuridic ? "CNPJ" : "CPF"}
          onChange={(e) => {
            isJuridic
              ? (e.target.value = maskCNPJ(e.currentTarget.value))
              : (e.target.value = maskCPF(e.currentTarget.value));
          }}
          error={
            // @ts-ignore
            isJuridic ? state?.errors?.cnpj?.pop() : state?.errors?.cpf?.pop()
          }
        />
        <Input
          name="password"
          placeholder="Senha"
          icon="/user.svg"
          label="Senha"
          type="password"
          // @ts-ignore

          error={state?.errors?.password?.pop()}
        />
        <Input
          name="confirmPassword"
          placeholder="Confirmar senha"
          icon="/user.svg"
          label="Confirmar senha"
          type="password"
          // @ts-ignore

          error={state?.errors?.confirmPassword?.pop()}
        />
        <Text className="mt-8 w-full py-3 bg-[#911414] rounded" as="button">
          Cadastrar-se
        </Text>
      </div>
    </form>
  );
};

export default CadastroForm;

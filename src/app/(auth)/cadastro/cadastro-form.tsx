'use client'
import Image from "next/image"
import Input from "../input"
import Link from "next/link"
import { useFormState, useFormStatus } from "react-dom";
import { performSignup } from "./action";

export const maskCPF = (cpf: string) => {
  return cpf
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})/, "$1-$2")
    .replace(/(-\d{2})\d+?$/, "$1");
};

const maskName = (value: string) => {
  const preposicoes = ['de', 'da', 'do', 'das', 'dos', 'e'];
  return value.split(' ').map(word => {
    if (preposicoes.includes(word.toLowerCase())) {
      return word.toLowerCase();
    } else {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }
  }).join(' ');
};

const CadastroForm = () => {
  const [state, formAction] = useFormState(performSignup, null)

  console.log(state)

  return (
    <form className="relative flex flex-col items-center w-screen max-w-[580px] my-4 mx-2 px-2 py-16 bg-[#06092B4D] backdrop-blur-lg" action={formAction}>
      <Link className="absolute left-4 top-4 bg-white-0 rounded-full p-3" href="/acesso">
        <Image src="arrow-back.svg" width={24} height={24} alt="voltar" />
      </Link>
      <div className="flex flex-col gap-3 max-w-[318px] text-center">
        <p className="text-2xl font-medium">É um prazer rever você!</p>
        <p className="text-xl font-light">Aqui nossa missão é proporcionar o melhor para a população</p>
      </div>
      <div className="flex flex-col items-center gap-2 w-full max-w-[350px] mt-4">
        <Input
          name="username"
          placeholder="Nome completo"
          icon="/user.svg"
          label="Nome completo"
          onChange={(e) => {
            e.target.value = maskName(e.target.value)
          }}
          error={state?.errors?.username?.pop()}
        />
        <Input
          name="email"
          placeholder="E-mail"
          icon="/user.svg"
          label="E-mail"
          error={state?.errors?.email?.pop()}
        />
        <Input
          name="cpf"
          placeholder="CPF"
          icon="/user.svg"
          label="CPF"
          onChange={(e) => {
            e.target.value = maskCPF(e.currentTarget.value);
          }}
          error={state?.errors?.cpf?.pop()}
        />
        <Input
          name="password"
          placeholder="Senha"
          icon="/user.svg"
          label="Senha"
          type="password"
          error={state?.errors?.password?.pop()}
        />
        <Input
          name="confirmPassword"
          placeholder="Confirmar senha"
          icon="/user.svg"
          label="Confirmar senha"
          type="password"
          error={state?.errors?.confirmPassword?.pop()}
        />
        <button className="mt-8 w-full py-3 bg-[#911414] rounded">Cadastra-se</button>
      </div>
    </form>
  )
}

export default CadastroForm
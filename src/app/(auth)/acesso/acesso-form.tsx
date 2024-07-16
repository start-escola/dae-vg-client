'use client'
import Image from "next/image"
import Input from "../input"
import Link from "next/link"
import { createSession } from "./action"
import { useFormState } from "react-dom"
import { maskCPF } from "../cadastro/cadastro-form"
import { redirect, useSearchParams } from "next/navigation"

const AcessoForm = () => {
  const [state, formAction] = useFormState(createSession, null)
  
  // Redirect Functions
  const params = useSearchParams()
  const callbackUrl = params.get('callbackUrl')
  if (state === "success") return redirect(callbackUrl ? callbackUrl : "/")

  return (
    <form className="flex flex-col items-center w-screen max-w-[580px] my-4 mx-2 px-2 py-16 bg-[#06092B4D] backdrop-blur-lg" action={formAction}>
      <div className="flex flex-col gap-3 max-w-[318px] text-center">
        <p className="text-2xl font-medium">É um prazer rever você!</p>
        <p className="text-xl font-light">Aqui nossa missão é proporcionar o melhor para a população</p>
      </div>
      <div className="flex flex-col items-center gap-2 w-full max-w-[350px] mt-4">
        <Input
          name="identifier"
          placeholder="CPF"
          icon="/user.svg"
          label="CPF"
          onChange={(e) => {
            e.target.value = maskCPF(e.currentTarget.value);
          }}
        />
        <Input name="password" placeholder="Senha" icon="/user.svg" label="Senha" type="password" />
        <a href="#" className="self-end font-light">Lembrar minha senha</a>
        <button className="mt-8 w-full py-3 bg-[#911414] rounded">Login</button>
        <div className="flex items-center justify-center w-full">
          <hr className="bg-white-0 w-full" />
          <p className="px-4">ou</p>
          <hr className="bg-white-0 w-full" />
        </div>
        <ul>
          <li className="relative w-4 h-4">
            <Link href="/cadastro">
              <Image src="/user.svg" fill alt={""} />
            </Link>
          </li>
        </ul>
      </div>
    </form>
  )
}

export default AcessoForm
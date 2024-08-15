"use client";
import Image from "next/image";
import Input from "../input";
import Link from "next/link";
import { useFormState, useFormStatus } from "react-dom";
import { performReset } from "./action";
import { redirect, useSearchParams } from "next/navigation";
import Text from "@/components/Text";

const ResetForm = () => {
  const [state, formAction] = useFormState(performReset, null);

  // Redirect Functions
  const params = useSearchParams();
  const code = params.get("code");
  if (state === "success") return redirect("/acesso");

  return (
    <form
      className="relative flex flex-col items-center w-screen max-w-[580px] my-4 mx-2 px-2 py-16 bg-[#06092B4D] backdrop-blur-lg"
      action={formAction}
    >
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
        <input type="hidden" name="code" value={code ? code : ""} />

        <Text className="mt-8 w-full py-3 bg-[#911414] rounde text-xl" as="button">
          Resetar senha
        </Text>
      </div>
    </form>
  );
};

export default ResetForm;

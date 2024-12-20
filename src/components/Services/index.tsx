"use client";
import { useSession } from "@/app/session-provider";
import Image from "next/image";
import Text from "../Text";

interface IServiceProps {
  values: {
    title: string;
    icon: string;
    href: string;
  }[];
}

const Services = ({ values }: IServiceProps) => {
  const session = useSession();

  return (
    <section className="mx-auto container p-4">
      <ul className="flex flex-wrap gap-4 relative -mt-10 z-10">
        {values.map((val, i) => (
          <li
            key={i}
            className="rounded overflow-hidden w-36 md:w-80 md:h-fit flex-grow border-2 border-[#0000009d] bg-white-50 dark:bg-black"
          >
            <Text
              as="a"
              href={
                session.status === "authenticated"
                  ? val.href
                  : `/acesso?callbackUrl=${val.href}`
              }
              target={session.status === "authenticated" ? "_blank" : "_self"}
              rel="noopener noreferrer"
              className="text-base flex flex-col items-center gap-2 justify-around sm:flex-row px-2 py-4 md:p-4"
            >
              <div className="relative">
                <Image src={val.icon} width={30} height={30} alt="" />
              </div>
              <div className="flex flex-col gap-2">
                <Text className="text-base font-semibold text-center text-black dark:text-white-0">
                  {val.title}
                </Text>
                <Text className="text-[#B5B5B5] text-base text-center">Solicitar agora</Text>
              </div>
            </Text>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Services;

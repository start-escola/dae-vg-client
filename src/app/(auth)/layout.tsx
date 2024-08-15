import Text from "@/components/Text";
import Image from "next/image";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="h-screen bg-acesso-background w-screen bg-cover overflow-x-hidden text-white-0">
      <div className="flex flex-col justify-center gap-10 items-center w-full min-h-screen bg-black bg-opacity-50">
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <Image width={150} height={150} src="/logopng.png" alt="" />
          <div>
            <Text className="text-2xl font-light">Prefeitura Municipal de</Text>
            <Text className="text-4xl font-bold" as="h1">VÁRZEA GRANDE</Text>
          </div>
        </div>
        <section>
          {children}
        </section>
      </div>
    </main>
  );
}
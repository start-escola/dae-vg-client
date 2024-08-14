import PageTitle from "@/components/PageTitle";
import Link from "next/link";

export const metadata = {
  title: "Agua e Esgoto - DAE",
  description: ""
}

export default function Page() {
  return (
    <>
      <section className="">
        <PageTitle
          title="Água"
          description="A água é fundamental para a vida. Ela é uma fonte de energia, alimento e higiene. Sem água, não há vida. 
          Conheça como a água é tratada e distribuída na cidade de Várzea Grande."
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/agua.jpg" alt="" className="object-contain mx-auto" />
      </section>
      <section>
        <PageTitle
          title="Esgoto"
          description="O esgoto de Várzea Grande é tratado em uma estação de tratamento de esgoto, onde é realizada a limpeza e descontaminação do esgoto. O esgoto tratado é depois reaproveitado para fins agrícolas ou é jogado no rio Paraná. É importante lembrar que a qualidade do esgoto importa para a saúde humana e ambiental, então é importante manter a qualidade do esgoto."
        />
        <div className="mt-8">
          <Link href={"#"} className="px-4 py-2 bg-primary-500 text-white-0 rounded">Relação das Etes MP</Link>
        </div>
      </section>
    </>
  )
}
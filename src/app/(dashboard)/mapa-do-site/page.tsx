import PageTitle from "@/components/PageTitle";
import Text from "@/components/Text";
import Link from "next/link";

export default async function Page() {

  return (
    <section className="text-primary-500 dark:text-white-0">
      <PageTitle title="Mapa do Site" />
      <ul className="mt-4 space-y-2">
        <li><Text as="a" href="/" className="font-semibold hover:underline">Home</Text></li>
        <li><Text as="a" href="https://falabr.cgu.gov.br/web/home" className="font-semibold hover:underline" target="_blank">OUVIDORIA</Text></li>
        <li>
          <Text className="font-semibold">DAE</Text>
          <ol className="pl-4">
            <li><Link href="/dae/quem-somos"><Text as="a" className="hover:underline">Quem Somos</Text></Link></li>
            <li><Link href="/dae/diretoria"><Text as="a" className="hover:underline">Diretoria</Text></Link></li>
            <li><Link href="/dae/agua-e-esgoto"><Text as="a" className="hover:underline">Água e Esgoto</Text></Link></li>
          </ol>
        </li>
        <li>
          <Text as="a" className="font-semibold">Transparência</Text>
          <ol className="pl-4">
            <li><Link href="/transparencia/concursos"><Text as="a" className="hover:underline">Concursos</Text></Link></li>
            <li><Link href="/transparencia/controle-interno"><Text as="a" className="hover:underline">Controle Interno</Text></Link></li>
            <li><Link href="/transparencia/licitacoes"><Text as="a" className="hover:underline">Licitações</Text></Link></li>
          </ol>
        </li>
        <li>
          <Text as="a" className="font-semibold">Comunicação</Text>
          <ol className="pl-4">
            <li><Link href="/comunicacao/noticias-e-eventos"><Text as="a" className="hover:underline">Notícias e Eventos</Text></Link></li>
          </ol>
        </li>
      </ul>
    </section>
  );
}


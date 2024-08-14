import PageTitle from "@/components/PageTitle";
import Link from "next/link";

export default async function Page() {

  return (
    <section className="text-primary-500">
      <PageTitle title="Mapa do Site" />
      <ul className="mt-4 space-y-2">
        <li><a href="/" className="font-semibold hover:underline">Home</a></li>
        <li><a href="https://falabr.cgu.gov.br/web/home" className="font-semibold hover:underline" target="_blank">OUVIDORIA</a></li>
        <li>
          <a className="font-semibold">DAE</a>
          <ol className="pl-4">
            <li><Link href="/dae/quem-somos" className="hover:underline">Quem Somos</Link></li>
            <li><Link href="/dae/diretoria" className="hover:underline">Diretoria</Link></li>
            <li><Link href="/dae/agua-e-esgoto" className="hover:underline">Água e Esgoto</Link></li>
          </ol>
        </li>
        <li>
          <a className="font-semibold">Transparência</a>
          <ol className="pl-4">
            <li><Link href="/transparencia/concursos" className="hover:underline">Concursos</Link></li>
            <li><Link href="/transparencia/controle-interno" className="hover:underline">Controle Interno</Link></li>
            <li><Link href="/transparencia/licitacoes" className="hover:underline">Licitações</Link></li>
          </ol>
        </li>
        <li>
          <a className="font-semibold">Comunicação</a>
          <ol className="pl-4">
            <li><Link href="/comunicacao/noticias-e-eventos" className="hover:underline">Notícias e Eventos</Link></li>
          </ol>
        </li>
      </ul>
    </section>
  );
}


'use client'
import clsx from "clsx"
import Link from "next/link"
import { useParams } from "next/navigation"

export default function Page(props: { params: { year: string } }) {
  const folder = {
    name: "",
    slug: ""
  }

  const licitacao = {
    type: "Pregão eletrônico",
    date: "10/2023",
    href: "",
    status: "completed",
    number: "00098482-1",
    publishedAt: "24/03/2022",
    realization: "01/06/2022",
    description: "",
    donwloads: [
      {
        type: "pdf",
        name: "ACORDAO_2015"
      }
    ],
  }

  return (
    <ul className="py-6 border-t-2 border-primary-500">
      {
        ['ADESÃO', 'CHAMADA PÚBLICA - Agricultura familiar', 'ABASTECIMENTO PÚBLICO', 'CONFERÊNCIA', 'DAE', 'DESPESAS DE LICITAÇÃO'].map((v, i) => (
          <li key={v} className={clsx("flex justify-between px-5 py-2 text-primary-500", i % 2 === 0 ? "bg-white-0" : "bg-[#F2F2F2]")}>
            <div className="flex gap-5">
              <div className="w-5 h-5 bg-primary-500" />
              <p>{v}</p>
            </div>
            <Link className="bg-primary-500 w-6 h-6 rounded-full" href={`${props.params.year}/${v}`} />
          </li>
        ))
      }
    </ul >
  )
}
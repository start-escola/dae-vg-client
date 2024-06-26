import Image from "next/image";
import Link from "next/link";

export default function Page() {
  return (
    <>
      <ul className="flex flex-wrap gap-7 py-16">
        {
          [2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014].map((i) => (
            <li key={i}>
              <Link href={`/transparencia/licitacoes/${i}`} className="flex flex-col items-center bg-white-0 shadow-md w-28 py-8 text-primary-500 rounded">
                <Image src="/calendar.svg" width={40} height={40} alt="" />
                <p>Ano</p>
                <p className="text-2xl font-bold">{i}</p>
              </Link>
            </li>
          ))
        }
      </ul>
    </>
  )
}
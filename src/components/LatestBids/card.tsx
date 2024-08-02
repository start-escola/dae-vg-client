'use client'
import Image from "next/image"
import { useState } from "react"

interface ILatestBidsCard {
  title: string
  opening: string
  closing: string
  status: {
    name: string,
    date: string
  }[]

}

const LatestBidsCard = ({ title, opening, closing, status }: ILatestBidsCard) => {
  const [showAllStatus, setShowAllStatus] = useState(false)

  // Cria uma cópia do array de status e remove o último elemento
  const statusCopy = [...status]
  const lastUpdate = statusCopy.pop()

  return (
    <li className="m-auto flex flex-col justify-between text-primary-500 px-6 pt-5 pb-4 border-b-4 shadow-xl w-fit">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col items-center text-center">
          <Image src="/hammer.svg" width={30} height={30} alt="martelo" />
          <p className="font-bold text-lg my-2">{title}</p>
        </div>
        <button
          className="text-primary-500 w-full font-bold text-center border-2 border-primary-500"
          onClick={() => setShowAllStatus((old) => !old)}
          aria-label="Toggle Status"
        >
          STATUS
        </button>
        <ul className="min-h-32">
          <li><strong>Abertura:</strong> {opening}</li>
          {
            showAllStatus && statusCopy.map(({ name, date }) => (
              <li key={name}><strong>{name}:</strong> {date.replaceAll('-', '/')}</li>
            ))
          }
          {
            lastUpdate && <li><strong>{lastUpdate.name}:</strong> {lastUpdate.date.replaceAll('-', '/')}</li>
          }
        </ul>
      </div>
      <button className="justify-self-end py-1 text-white-0 font-semibold text-base rounded bg-primary-500 opacity-20" aria-label="Bid Status">
        Aberto
      </button>
    </li>
  )
}

export default LatestBidsCard

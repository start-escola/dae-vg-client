"use client"
import { useEffect, useState } from 'react'
import { SearchParams } from './page'
import api from "@/utils/api"
import { useRouter } from 'next/navigation'

interface IFilter {
  defaultValues: SearchParams
}

const Filter = ({ defaultValues }: IFilter) => {
  const [publishedAt, setPublishedAt] = useState<string>(defaultValues.publishedAt || "")
  const [status, setStatus] = useState(defaultValues.status || "")

  const handleFilter = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const params: SearchParams = {
      ...(publishedAt && { publishedAt }),
      ...(status && { status }),
    };

    const queryString = new URLSearchParams(params).toString();
    window.location.replace(`?${queryString}`);
  }

  return (
    <form className="relative p-5 border-[#B5B5B5] border rounded my-9" onSubmit={handleFilter}>
      <p className="text-primary-500 text-xl font-bold absolute top-0 -translate-y-1/2 bg-white-0 px-2 dark:text-white-0 dark:bg-dark-bg">Filtrar por</p>
      <ul className="flex flex-wrap gap-12 text-black">
        <li className="flex flex-col gap-2 text-primary-500 dark:text-white-0">
          <label htmlFor="year" className="text-base mb-2 ">Ano</label>
          <input
            id="year"
            name="year"
            type="number"
            className="px-4 w-36 h-10 rounded bg-white-0 shadow"
            value={publishedAt}
            onChange={(e) => setPublishedAt(e.target.value)}
            aria-label="Pesquisar"
          />
        </li>
        <li className="flex flex-col gap-2">
          <label htmlFor="publishedAt" className="text-base mb-2">Situação</label>
          <select className="px-4 w-36 h-10 rounded bg-white-0 shadow" onChange={(e) => { setStatus(e.target.value) }}>
            <option value="">
              Escolha uma opção
            </option>
            <option>Aberto</option>
            <option>Concluído</option>
          </select>
        </li>
        <li className="flex flex-col gap-2 justify-end">
          <button type="submit" className="text-white-0 cursor-pointer w-36 h-10 rounded text-white shadow hover:bg-primary-600">
            Filtrar
          </button>
        </li>
      </ul>
    </form>
  )
}

export default Filter;

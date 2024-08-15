"use client"
import { useEffect, useState } from 'react'
import { SearchParams } from './page'
import api from "@/utils/api"
import { useRouter } from 'next/navigation'

interface IFilter {
  defaultValues: SearchParams
}

const Filter = ({ defaultValues }: IFilter) => {
  const router = useRouter()
  const [title, setTitle] = useState<string>(defaultValues.title || "")
  const [publishedAt, setPublishedAt] = useState(defaultValues.publishedAt || "")
  const [id, SetId] = useState(defaultValues.id || "")

  const handleFilter = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const params: SearchParams = {
      ...(title && { title }),
      ...(publishedAt && { publishedAt }),
      ...(id && { id }),
    };

    const queryString = new URLSearchParams(params).toString();
    window.location.replace(`?${queryString}`);
  }
  return (
    <form className="relative p-5 border-[#B5B5B5] border rounded my-9" onSubmit={handleFilter}>
      <p className="text-primary-500 text-xl font-bold absolute top-0 -translate-y-1/2 bg-white-0 px-2">Filtrar por</p>
      <ul className="flex flex-wrap gap-12 text-black">
        <li className="flex flex-col gap-2">
          <label htmlFor="title" className="text-base mb-2 text-primary-500">Nome do documento</label>
          <input
            id="title"
            name="title"
            className="px-4 w-36 h-10 rounded bg-white-0 shadow"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            aria-label="Pesquisar"
          />
        </li>
        <li className="flex flex-col gap-2">
          <label htmlFor="publishedAt" className="text-base mb-2 text-primary-500">Data de publicação</label>
          <input
            id="publishedAt"
            name="publishedAt"
            type="date" // Permite apenas números
            className="px-4 w-36 h-10 rounded bg-white-0 shadow text-black"
            value={publishedAt}
            onChange={(e) => {
              const value = e.target.value;
              setPublishedAt(value);

            }}
            aria-label="Ano"
          />
        </li>
        <li className="flex flex-col gap-2">
          <label htmlFor="id" className="text-base mb-2 text-primary-500">Código</label>
          <input
            id="id"
            name="id"
            className="px-4 w-36 h-10 rounded bg-white-0 shadow"
            value={id}
            onChange={(e) => SetId(e.target.value)}
            aria-label="Pesquisar"
          />
        </li>
        <li className="flex flex-col gap-2 justify-end">
          <button type="submit" className="text-white-0 cursor-pointer w-36 h-10 rounded bg-primary-500 text-white shadow hover:bg-primary-600">
            Filtrar
          </button>
        </li>
      </ul>
    </form>
  )
}

export default Filter;

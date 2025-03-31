"use client"
import { useState } from 'react'
import { SearchParams } from './page'

interface IFilter {
  defaultValues: SearchParams
}

const Filter = ({ defaultValues }: IFilter) => {
  const [name, setName] = useState<string>(defaultValues.name || "")

  const handleFilter = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const params: SearchParams = {
      ...(name && { name }),
    };

    const queryString = new URLSearchParams(params).toString();
    window.location.replace(`?${queryString}`);
  }
  return (
    <form className="relative p-5 border-[#B5B5B5] border rounded my-9" onSubmit={handleFilter}>
      <p className="text-primary-500 text-xl font-bold absolute top-0 -translate-y-1/2 bg-white-0 px-2">Filtrar por</p>
      <ul className="flex flex-wrap gap-12 text-black">
        <li className="flex flex-col gap-2">
          <label htmlFor="name" className="text-base mb-2 text-primary-500">Nome do documento</label>
          <input
            id="name"
            name="name"
            className="px-4 w-36 h-10 rounded bg-white-0 shadow"
            value={name}
            onChange={(e) => setName(e.target.value)}
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

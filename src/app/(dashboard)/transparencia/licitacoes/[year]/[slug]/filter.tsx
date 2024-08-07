"use client"
import { useState } from 'react'
import { SearchParams } from './page'
import { useRouter } from 'next/navigation'

interface IFilter {
  defaultValues: SearchParams
}

const Filter = ({ defaultValues }: IFilter) => {
  const router = useRouter()
  const [status, setStatus] = useState<string>(defaultValues.status || "");
  const [text, setText] = useState<string>(defaultValues.text || "");

  const handleFilter = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const params: SearchParams = {
      ...(status && { status }),
      ...(text && { text }),
    };

    const queryString = new URLSearchParams(params).toString();
    window.location.replace(`?${queryString}`)
  }

  return (
    <form className="relative p-5 border-[#B5B5B5] border rounded" onSubmit={handleFilter}>
      <p className="text-primary-500 text-xl font-bold absolute top-0 -translate-y-1/2 bg-white-0 px-2">Filtrar por</p>
      <ul className="flex flex-wrap gap-12 text-black">
        <li className="flex flex-col gap-2">
          <label htmlFor="status" className="text-base mb-2 text-primary-500">Status</label>
          <select
            id="status"
            name="status"
            className="px-4 w-36 h-10 rounded bg-white-0 shadow"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            aria-label="Status"
          >
            <option value="">Escolha uma opção</option>
            <option value="Aberta">Aberta</option>
            <option value="Julgamento">Julgamento</option>
            <option value="Finalizada">Finalizada</option>
            <option value="Cancelada">Cancelada</option>
          </select>
        </li>
        <li className="flex flex-col gap-2">
          <label htmlFor="text" className="text-base mb-2 text-primary-500">Pesquisar</label>
          <input
            id="text"
            name="text"
            className="px-4 w-36 h-10 rounded bg-white-0 shadow"
            value={text}
            onChange={(e) => setText(e.target.value)}
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

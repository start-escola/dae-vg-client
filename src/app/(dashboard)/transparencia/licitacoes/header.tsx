'use client'

import Link from "next/link"
import { useParams } from "next/navigation"

const Header = () => {
  const { year, folder } = useParams()

  // Helper function to generate breadcrumb links
  const generateBreadcrumbs = () => {
    if (!year) return []
    const breadcrumbs: { name: string, path: string }[] = []

    // Start with the year breadcrumb
    breadcrumbs.push({ name: year as string, path: `/transparencia/licitacoes/${year}` })

    // Ensure folder is an array
    const folderArray = folder ? (Array.isArray(folder) ? folder : [folder]) : []

    // Add each folder as a breadcrumb
    folderArray.forEach((subFolder, index) => {
      const path = `/transparencia/licitacoes/${year}/${folderArray.slice(0, index + 1).join('/')}`
      breadcrumbs.push({ name: subFolder, path })
    })

    return breadcrumbs
  }

  const breadcrumbs = generateBreadcrumbs()

  return (
    <section className="text-primary-500 border-b-2 border-primary-500 pb-5">
      <h1 className="font-semibold text-3xl mb-1">Licitações</h1>
      <p className="text-lg">Acompanhe histórico de solicitações</p>
      <ul className="flex gap-2">
        {breadcrumbs.map((breadcrumb, index) => (
          <li key={index}>
            <Link href={breadcrumb.path} className="text-lg">
              {index > 0 && "/ "}{breadcrumb.name.toUpperCase()}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Header

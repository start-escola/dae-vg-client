import { FolderResponse, InternalControlsResponse } from "@/interfaces/request";
import api from "@/utils/api";
import Link from "next/link";
import Image from "next/image";
import { normalizeFileUrl } from "@/utils/normalize";
import Filter from "../filter";

export const metadata = {
  title: "Controle Interno - DAE",
  description: "Acesso rápido a todos os nossos documentos"
}

export async function getPage(path: string[], name?: string) {
  "use server"

  const params: { [key: string]: string } = {
    path: path.join('/')
  }

  const { data: folder } = await api.get<FolderResponse>(
    "/internal-controls/custom",
    {
      params
    }
  );

  if (name) {
    const files = folder.data.files

    const filesFiltered = files.filter(file => file.name?.toLowerCase().includes(name.toLowerCase()))

    return {
      type: "file",
      files: filesFiltered
    }
  }

  return {
    type: "folder",
    folder: folder.data
  }
}

export type SearchParams = {
  name?: string
}

export default async function Page({ params, searchParams }: { searchParams: SearchParams, params: Promise<{ path: string[] }> }) {
  const { path } = await params
  const { type, files, folder } = await getPage(path, searchParams.name)

  return (
    <>
      <Filter defaultValues={{ name: searchParams.name }} />
      <ul>
        {
          type === "file" && (
            files?.map(({ id, name, url, ext }, index) => (
              <li
                key={id}
                className={(index % 2 === 0 ? 'bg-white-0' : 'bg-[#F2F2F2]') + " hover:bg-primary-100 h-16"}
              >
                <Link href={normalizeFileUrl(url)} className="flex justify-between items-center py-4 px-6 h-full" target="_blank">
                  <div className="flex gap-4 h-full">
                    <Image
                      src={`/extensions/${ext.replace(".", "")}.svg`}
                      alt="Extensão do arquivo"
                      width={26}
                      height={22}
                    />
                    <p>{name}</p>
                  </div>
                  <Image src="/download.svg" width={26} height={26} className="object-contain" alt="download" />
                </Link>
              </li>
            ))
          )
        }
        {
          type === "folder" && (
            folder?.subfolders.map(({ name, slug }, index) => (
              <li
                key={index}
                className={(index % 2 === 0 ? 'bg-white-0' : 'bg-[#F2F2F2]') + " hover:bg-primary-100 h-16"}
              >
                <Link href={`/transparencia/controle-interno/${path.join('/')}/${slug}`} className="flex justify-between items-center py-4 px-6 h-full">
                  <div className="flex gap-4 h-full">
                    <Image src="/folder.svg" alt="Icone de pasta" width={26} height={22} />
                    <p>{name}</p>
                  </div>
                  <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M-5.68248e-07 13C-4.55859e-07 15.5712 0.762436 18.0846 2.19089 20.2224C3.61935 22.3602 5.64968 24.0265 8.02511 25.0104C10.4006 25.9944 13.0144 26.2518 15.5362 25.7502C18.0579 25.2486 20.3743 24.0105 22.1924 22.1924C24.0105 20.3743 25.2486 18.0579 25.7502 15.5362C26.2518 13.0144 25.9944 10.4005 25.0104 8.02511C24.0265 5.64967 22.3602 3.61935 20.2224 2.19089C18.0846 0.762429 15.5712 -6.40268e-06 13 -6.29029e-06C9.5533 0.00363308 6.24881 1.37444 3.81163 3.81163C1.37445 6.24881 0.00363905 9.5533 -5.68248e-07 13ZM14.7075 8.29249L18.7075 12.2925C18.8005 12.3854 18.8742 12.4957 18.9246 12.6171C18.9749 12.7385 19.0008 12.8686 19.0008 13C19.0008 13.1314 18.9749 13.2615 18.9246 13.3829C18.8742 13.5043 18.8005 13.6146 18.7075 13.7075L14.7075 17.7075C14.5199 17.8951 14.2654 18.0005 14 18.0005C13.7346 18.0005 13.4801 17.8951 13.2925 17.7075C13.1049 17.5199 12.9994 17.2654 12.9994 17C12.9994 16.7346 13.1049 16.4801 13.2925 16.2925L15.5862 14L8 14C7.73478 14 7.48043 13.8946 7.29289 13.7071C7.10536 13.5196 7 13.2652 7 13C7 12.7348 7.10536 12.4804 7.29289 12.2929C7.48043 12.1054 7.73478 12 8 12L15.5862 12L13.2925 9.70749C13.1049 9.51985 12.9994 9.26536 12.9994 8.99999C12.9994 8.73463 13.1049 8.48013 13.2925 8.29249C13.4801 8.10485 13.7346 7.99944 14 7.99944C14.2654 7.99944 14.5199 8.10485 14.7075 8.29249Z" fill="#1763A6" />
                  </svg>
                </Link>
              </li>
            ))
          )
        }
        {
          type === "folder" && (
            folder?.files?.map(({ id, name, url, ext }, index) => (
              <li
                key={id}
                className={(index % 2 === 0 ? 'bg-white-0' : 'bg-[#F2F2F2]') + " hover:bg-primary-100 h-16"}
              >
                <Link href={normalizeFileUrl(url)} className="flex justify-between items-center py-4 px-6 h-full" target="_blank">
                  <div className="flex gap-4 h-full">
                    <Image
                      src={`/extensions/${ext.replace(".", "")}.svg`}
                      alt="Extensão do arquivo"
                      width={26}
                      height={22}
                    />
                    <p>{name}</p>
                  </div>
                  <Image src="/download.svg" width={26} height={26} className="object-contain" alt="download" />
                </Link>
              </li>
            ))
          )
        }
      </ul>
      {
        type === "file" && !files?.length && (
          <p className="text-lg">Nenhum resultado encontrado</p>
        )
      }
      {
        folder?.subfolders.length === 0 && folder?.files === null && type === "folder" && (
          <p className="text-lg">Nenhum documento encontrado</p>
        )
      }
    </>
  );
}

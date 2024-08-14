import Text from "@/components/GoBack";
import PageTitle from "@/components/PageTitle";
import { NewsResponse } from "@/interfaces/request";
import api from "@/utils/api"
import { normalizeFileUrl } from "@/utils/normalize";

async function getPage() {
  "use server"

  const { data: page } = await api.get<NewsResponse>("/news?populate=*")

  console.log(page.data[2]);

  return {
    data: page.data.map(({ id, attributes }) => ({
      id,
      ...attributes,
      images: attributes.images?.data?.map(({ id, attributes }) => ({
        id,
        ...attributes,
        url: normalizeFileUrl(attributes.url)
      })),
      main_image: {
        id: attributes.main_image?.data?.id,
        ...attributes.main_image?.data?.attributes,
        url: normalizeFileUrl(attributes.main_image?.data?.attributes?.url)
      }
    })),
    total: page.meta.pagination.total
  }
}

export const metadata = {
  title: "DAE - Notícias e Eventos",
}

export default async function Page() {
  const { data, total } = await getPage()

  return (
    <>
      <section className="w-full flex flex-col md:flex-row gap-4 md:gap-24 text-primary-500">
        <div className="w-full">
          <PageTitle
            title="Notícias e Eventos"
          />
          <ul className="flex flex-col gap-10">
            {data.map(({ id, title, short_description, main_image, createdAt }) => (
              <li key={id} className="flex gap-4">
                <div className="w-full max-w-[25%] relative">
                  <img src={main_image.url} className="absolute w-full h-full object-cover" />
                </div>
                <div className="flex flex-col gap-6">
                  <p className="text-primary-100 text-base">Publicada em {new Date(createdAt).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}</p>
                  <div>
                    <p className="md:text-2xl font-bold mb-4">{title}</p>
                    <p className="text-base">{short_description}</p>
                  </div>
                  <a href={`/comunicacao/noticias-e-eventos/noticias/${id}`} className="mt-2 px-4 py-2 text-white-0 bg-primary-500 rounded w-fit">Saber mais</a>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

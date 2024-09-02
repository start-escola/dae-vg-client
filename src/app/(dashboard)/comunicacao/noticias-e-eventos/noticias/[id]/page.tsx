import GoBack from "@/components/GoBack";
import NewsGrid from "@/components/NewsGrid";
import { News } from "@/interfaces/request";
import api from "@/utils/api";
import { normalizeFileUrl } from "@/utils/normalize";

async function getPage(id: string) {
  'use server'

  const { data: page } = await api.get<{ data: News }>(`/news/${id}?populate=*`)

  const { attributes } = page.data

  const secondaryImages = attributes.images?.data?.map(({ id, attributes }) => ({
    id,
    ...attributes,
    url: normalizeFileUrl(attributes.url)
  }))

  const images = [
    {
      id: attributes.main_image?.data.id,
      ...attributes.main_image?.data.attributes,
      url: normalizeFileUrl(attributes.main_image?.data.attributes.url)
    },
  ].concat(secondaryImages)

  return {
    id,
    ...attributes,
    images
  }
}

export const metadata = {
  title: "DAE - Notícias",
  description: "",
}

export default async function Page({ params }: { params: { id: string } }) {
  const { title, short_description, createdAt, description, images } = await getPage(params.id)
  metadata.title = `DAE - ${title}`
  metadata.description = short_description

  return (
    <section className="text-primary-500 dark:text-white-0">
      <div className="flex justify-between mb-8">
        <GoBack />
        <p className="text-primary-100 dark:text-white-0 text-base">
          Publicada em {new Date(createdAt).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
        </p>
      </div>
      <NewsGrid news={images} />
      <section className="flex flex-col gap-4 mt-10">
        <h2 className="text-2xl font-semibold">{title}</h2>
        <div dangerouslySetInnerHTML={{ __html: description }} />
      </section>
    </section>
  );
}
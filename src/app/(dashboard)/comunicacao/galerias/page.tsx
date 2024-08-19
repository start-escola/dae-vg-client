import PageTitle from "@/components/PageTitle";
import Text from "@/components/Text";
import { GalleryResponse } from "@/interfaces/request";
import api from "@/utils/api"
import { normalizeFileUrl } from "@/utils/normalize";
async function getPage() {
  "use server";

  const videoExtensions = ['mp4', 'mov', 'avi', 'mkv', 'flv', 'wmv', 'webm'];
  const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'svg', 'webp'];

  const { data: page } = await api.get<GalleryResponse>("/gallery?populate[conteudo][populate][midia]=*");

  const result = page.data.attributes.conteudo.map(({ id, midia, title }) => {
    const ext = midia.data.attributes.ext.toLowerCase().replace(".", "");

    let type = 'unknown';
    if (videoExtensions.includes(ext)) {
      type = 'video';
    } else if (imageExtensions.includes(ext)) {
      type = 'image';
    }

    return { id, title, url: normalizeFileUrl(midia.data.attributes.url), type };
  });

  return result;
}

export default async function Page() {
  const midia = await getPage()

  return (
    <section>
      <PageTitle
        title="Galerias"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 gap-8 w-full dark:bg-[#0D0D0D]">
        {midia.map((item, index) => (
          <a
            href={item.url}
            key={index}
            className="relative w-full h-full pb-[56.25%] flex justify-center items-center overflow-hidden rounded dark:bg-black"
            target="_blank"
          >
            {item.title && (
              <Text as="h2" className="absolute z-10 bg-primary-500 dark:text-white-0 p-4 text-base font-semibold left-0 top-0">{item.title}</Text>
            )}
            {item.type === "image" && (
              <img
                src={item.url}
                alt={item.title}
                className="absolute top-0 left-0 w-full h-full object-cover"
              />
            )}
            {item.type === "video" && (
              <video src={item.url} controls className="absolute top-0 left-0 h-full w-full bg-black" />
            )}
          </a>
        ))}
      </div>
    </section>
  );
};

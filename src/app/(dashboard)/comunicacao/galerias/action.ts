"use server";
import { GalleryResponse } from "@/interfaces/request";
import api from "@/utils/api";
import { normalizeFileUrl } from "@/utils/normalize";

export async function getPage(pageNum: string | number) {
  "use server";

  const videoExtensions = ["mp4", "mov", "avi", "mkv", "flv", "wmv", "webm"];
  const imageExtensions = ["jpg", "jpeg", "png", "gif", "bmp", "svg", "webp"];

  const { data: page } = await api.get<GalleryResponse>(
    "/gallery?populate[conteudo][populate][midia]=*?sort[0]=publishedAt:desc",
    {
      params: {
        "pagination[page]": pageNum,
        "pagination[pageSize]": "15",
      }
    }
  );

  console.log(page)

  const result = page.data.attributes.conteudo.map(({ id, midia, title }) => {
    const ext = midia.data.attributes.ext.toLowerCase().replace(".", "");

    let type = "unknown";
    if (videoExtensions.includes(ext)) {
      type = "video";
    } else if (imageExtensions.includes(ext)) {
      type = "image";
    }

    return {
      id,
      title,
      url: normalizeFileUrl(midia.data.attributes.url),
      type,
    };
  });

  return { data: result, pagination: page.meta.pagination };
}

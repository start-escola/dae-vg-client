"use server";
import api from "@/utils/api";
import { NewsResponse } from "@/interfaces/request";
import { normalizeFileUrl } from "@/utils/normalize";

export async function getPage(pageNumber: string | number) {
  "use server";

  const { data: page } = await api.get<NewsResponse>(
    "/news?populate=*&sort[0]=publishedAt:desc",
    {
      params: {
        "pagination[page]": pageNumber,
        "pagination[pageSize]": "10",
      },
    }
  );

  return {
    data: page.data.map(({ id, attributes }) => ({
      id,
      ...attributes,
      images: attributes.images?.data?.map(({ id, attributes }) => ({
        id,
        ...attributes,
        url: normalizeFileUrl(attributes.url),
      })),
      main_image: {
        id: attributes.main_image?.data?.id,
        ...attributes.main_image?.data?.attributes,
        url: normalizeFileUrl(attributes.main_image?.data?.attributes?.url),
      },
    })),
    pagination: page.meta.pagination,
  };
}

"use server";

import type {
  InternalControl,
  InternalControlsResponse,
} from "@/interfaces/request";
import { SearchParams } from "./page";
import api from "@/utils/api";
import { normalizeFileUrl } from "@/utils/normalize";

export async function getPage(pageNum: number, searchParams: SearchParams) {
  let limit = 15;
  const offset = limit * pageNum;
  let filterIndex = 0;

  const params: { [key: string]: string } = {
    "pagination[start]": offset.toString(),
    "pagination[limit]": limit.toString(),
    populate: "*",
  };

  if (searchParams.publishedAt) {
    params[`filters[publishedAt][$containsi][${filterIndex}]`] =
      searchParams.publishedAt;
    filterIndex++;
  }

  if (searchParams.status) {
    params[`filters[status][$eq][${filterIndex}]`] = searchParams.status;
    filterIndex++;
  }

  const { data: page } = await api.get<InternalControlsResponse>("/contests", {
    params,
  });

  return {
    data: page.data.map(({ id, attributes }) => ({
      id,
      ...attributes,
      files: attributes.files.data.map(({ id, attributes }) => ({
        id,
        ...attributes,
        url: normalizeFileUrl(attributes.url),
      })),
    })),
    total: 0,
  };
}


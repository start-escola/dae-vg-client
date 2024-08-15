"use server";
import { TenderResponse } from "@/interfaces/request";
import api from "@/utils/api";
import { normalizeFileUrl } from "@/utils/normalize";
import { SearchParams } from "./page";

export type ITender = {
  id: number;
  title: string;
  opening_date: string;
  description: string;
  closing_date: string;
  process_number: string;
  tender_type: string;
  realization: string;
  files: {
    id: number;
    name: string;
    file: string;
  }[];
  last_status: {
    id: number;
    name: string;
    date: string;
  };
};

export async function getPage(
  year: string,
  tender_type: string,
  page_num = 0,
  searchParams?: SearchParams
) {
  const limit = 10;

  const params: { [key: string]: string | number } = {
    "filters[$or][0][opening_date][$gte]": `${year}-01-01`,
    "filters[$or][1][opening_date][$lte]": `${year}-12-31`,
    "filters[$or][2][realization][$gte]": `${year}-01-01`,
    "filters[$or][3][realization][$lte]": `${year}-12-31`,
    "filters[$and][4][tender_type][slug][$eq]": `${tender_type}`,
    "pagination[start]": page_num * limit,
    "pagination[limit]": limit,
    populate: "*",
  };

  if (searchParams?.text) {
    params["filters[$or][3][title][$containsi]"] = searchParams.text;
    params["filters[$or][4][process_number][$containsi]"] = searchParams.text;
  }

  if (searchParams?.status) {
    params["filters[$and][5][last_status][name][$eq]"] = searchParams.status;
  }

  const { data: page } = await api.get<TenderResponse>(`/tenders`, {
    params,
  });

  let result = page.data;

  const { data: title } = await api.get(`/tender-types`, {
    params: {
      "filters[slug][$eq]": tender_type,
    },
  });

  const pageTitle = title.data[0].attributes.name;

  return {
    data: result.map(
      ({
        id,
        attributes: {
          title,
          opening_date,
          description,
          closing_date,
          process_number,
          realization,
          files,
          last_status,
          tender_type: {
            data: {
              attributes: { name },
            },
          },
        },
      }) =>
        ({
          id,
          title,
          opening_date,
          description,
          closing_date,
          process_number,
          realization,
          tender_type: name,
          last_status,
          files: files.data?.map(({ id, attributes: { name, url } }) => ({
            id,
            name,
            file: normalizeFileUrl(url),
          })),
        } as ITender)
    ),
    pageTitle,
    resultsFound: page.meta.pagination.total,
  };
}


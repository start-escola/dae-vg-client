"use server";
import api from "@/utils/api";
import { SearchParams } from "./page";

export async function getPage(year: string, searchParams: SearchParams) {
  const params: { [key: string]: string } = {
    "filters[$or][0][tenders][opening_date][$gte]": `${year}-01-01`,
    "filters[$or][1][tenders][opening_date][$lte]": `${year}-12-31`,
    "filters[$or][2][tenders][realization][$gte]": `${year}-01-01`,
    "filters[$or][3][tenders][realization][$lte]": `${year}-12-31`,
  };

  if (searchParams.text) {
    params["filters[$or][0][tenders][title][$containsi]"] = searchParams.text;
    params["filters[$or][1][tenders][process_number][$containsi]"] =
      searchParams.text;
  }

  if (searchParams.status) {
    params["filters[$and][0][tenders][last_status][name][$eq]"] =
      searchParams.status;
  }

  const { data: page } = await api.get<{
    data: {
      id: number;
      attributes: {
        name: string;
        slug: string;
        tenders: {
          data: {
            id: number;
            attributes: {
              title: string;
              opening_date: string;
              process_number: string;
              status: { id: number; name: string; date: string }[];
            };
          }[];
        };
      };
    }[];
  }>("/tender-types", { params });

  let filteredData = page.data;

  return filteredData.map(({ id, attributes: { name, slug } }) => ({
    id,
    slug,
    name,
  }));
}


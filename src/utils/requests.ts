import api from "@/utils/api";
import { districtMapper } from "./mappers";
import dayjs from "dayjs";

interface BaseAttributes {
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

interface DefaultProps {
  id: number;
  attributes: BaseAttributes;
}

interface Meta {
  pagination: {
    page: number;
    pageSize: number;
    number: 2;
    total: 110;
  };
}

export interface District extends DefaultProps {
  attributes: BaseAttributes & {
    name: string;
    logs: SectorLogs[];
    sectors: {
      data: Sector[];
    };
  };
}

export interface SectorLogs extends DefaultProps {
  attributes: BaseAttributes & {
    date: string;
    situation: "Previsão" | "Em andamento" | "Finalizado";
    description: string;
  };
}

interface Sector extends DefaultProps {
  attributes: BaseAttributes & {
    name: string;
    districts: { data: District[] };
  };
}

export interface SectorMapped extends Sector {
  last_status: SectorLogs;
}

interface WSR extends DefaultProps {
  attributes: BaseAttributes & {
    date: string;
    turno: "Manhã" | "Tarde" | "Noite" | "Não informado";
    sectors: SectorsGroup[];
  };
}

interface SectorsGroup {
  id: number;
  sectors: { data: Sector[] };
  turno: "Manhã" | "Tarde" | "Noite";
}

export const getTodaySectors = async (
  day: string,
) => {
  if(typeof day !== "string"){
    return null
  }

  const params = {
    "populate[sectors][populate][sectors][populate][districts]": "*",
    "filters[date][$eq]": day,
  };

  const { data: WSR } = await api.get<{ data: WSR[] }>(
    "/water-supply-relationships",
    {
      params,
    }
  );

  if (!WSR.data[0]) {
    return null;
  }

  const sectorsMapped = await Promise.all(
    WSR.data[0].attributes.sectors
      .flatMap(({ sectors, turno }) =>
        sectors.data.map(({ id, attributes }) => ({ id, attributes, turno }))
      )
      .map(async ({ id, attributes, turno }) => {
        const { data: supplyStatusLogs } = await api.get<{
          data: SectorLogs[];
        }>("/supply-status-logs", {
          params: {
            "filters[relacao_de_abastecimento]": WSR.data[0].id,
            "filters[$or][1][setor][id][$eq]": id, // Using the id of each sector
            "sort[0]": "createdAt:desc",
            "pagination[pageSize]": 1,
            "pagination[page]": 1,
          },
        });

        const districts = await districtMapper(
          attributes.districts.data,
          supplyStatusLogs.data.length > 0 ? supplyStatusLogs.data[0] : null,
          turno,
          WSR.data[0].id
        );

        return districts;
      })
  );

  return sectorsMapped.flatMap((a) => a.map((b) => b));
};

export const getFirstAndLastWSRDate = async () => {
  const { data: firstWSR } = await api.get<{ data: WSR[] }>(
    "/water-supply-relationships",
    {
      params: {
        sort: "date:asc",
        "pagination[pageSize]": 1,
      },
    }
  );

  const { data: lastWSR } = await api.get<{ data: WSR[] }>(
    "/water-supply-relationships",
    {
      params: {
        sort: "date:desc",
        "pagination[pageSize]": 1,
      },
    }
  );

  const firstWSRDate = firstWSR.data[0]?.attributes?.date;
  const lastWSRDate = lastWSR.data[0]?.attributes?.date;

  return { firstWSRDate, lastWSRDate };
};

export const getDistricts = async () => {
  let allDistricts: { id: number; label: string }[] = [];
  let page = 1;
  const pageSize = 100;

  while (true) {
    const { data: districts } = await api.get<{ data: District[]; meta: Meta }>(
      `/districts?populate=*&sort[0]=name:asc&pagination[page]=${page}&pagination[pageSize]=${pageSize}`
    );

    // Map current page results
    const districtMapped = districts.data.map(({ id, attributes }) => ({
      id,
      label: attributes.name,
    }));

    allDistricts = allDistricts.concat(districtMapped);

    // Check if we've fetched all pages
    if (
      districts.meta.pagination.page * districts.meta.pagination.pageSize >=
      districts.meta.pagination.total
    ) {
      break;
    }

    page++;
  }

  return allDistricts;
};

export const findNextSupply = async (id: number | string) => {
  const { data: district } = await api.get<{ data: District }>(
    `districts/${id}?populate=*`
  );

  const sectorsId = district.data.attributes.sectors.data.map(
    (sector) => sector.id
  );

  const { data: WSR } = await api.get<{ data: WSR[] }>(
    "/water-supply-relationships",
    {
      params: {
        "filters[sectors][sectors][id][$in]": sectorsId,
        "filters[date][$gte]": dayjs().format("YYYY-MM-DD"),
        "sort[0]": "date:asc",
      },
    }
  );

  return WSR.data[0]?.attributes.date;
};


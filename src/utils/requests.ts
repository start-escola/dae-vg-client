import api from "@/utils/api";
import { districtMapper } from "./mappers";

interface BaseAttributes {
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

interface DefaultProps {
  id: number;
  attributes: BaseAttributes;
}

export interface District extends DefaultProps {
  attributes: BaseAttributes & {
    name: string;
    logs: SectorLogs[];
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
  districtId: number | null
) => {
  const params = {
    "populate[sectors][populate][sectors][populate][districts]": "*",
    "filters[date][$eq]": day,
    "filters[sectors][sectors][districts][districts][id][$eq]": districtId,
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
  const { data: districts } = await api.get<{ data: District[] }>(
    "/districts?populate=*&sort[0]=name:asc"
  );

  const districtMapped = districts.data.map(({ id, attributes }) => ({
    id,
    label: attributes.name,
  }));

  return districtMapped;
};


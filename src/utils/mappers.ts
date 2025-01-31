import api from "./api";

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

export const districtMapper = async (
  district: District[],
  sectorLog: SectorLogs | null,
  turno: "Manhã" | "Tarde" | "Noite",
  wsrId: number
) =>
  await Promise.all(
    district.map(async ({ id, attributes }) => {
      const { data: supplyStatusLogs } = await api.get<{ data: SectorLogs[] }>(
        "/supply-status-logs",
        {
          params: {
            "filters[districts][id][$eq]": id, // Using the id of each district
            "filters[relacao_de_abastecimento][$eq]": wsrId,
            "sort[0]": "createdAt:desc",
            "pagination[pageSize]": 1,
            "pagination[page]": 1,
          },
        }
      );

      const last_status =
        supplyStatusLogs.data.length > 0 ? supplyStatusLogs.data[0] : sectorLog;

      if (!last_status) {
        return {
          id,
          name: attributes.name,
          turno,
          last_status: {
            situation: "Previsão",
            description: "",
            createdAt: ""
          },
        };
      }

      const createdAt = new Date(last_status.attributes.createdAt);
      const hours = createdAt.getHours() - 4; // -4 para GMT-4
      const minutes = createdAt.getMinutes();
      const period = hours >= 12 ? "PM" : "AM";
      const formattedCreatedAt = `${hours % 12 || 12}:${minutes
        .toString()
        .padStart(2, "0")} ${period} GMT-4`;

      return {
        id,
        name: attributes.name,
        turno,
        last_status: {
          situation: last_status.attributes.situation,
          description: last_status.attributes.description,
          createdAt: formattedCreatedAt,
        },
      };
    })
  );


export interface TenderFile {
  id: number;
  attributes: {
    name: string;
    alternativeText: string | null;
    caption: string | null;
    width: number | null;
    height: number | null;
    formats: null | Record<string, unknown>; // Se você precisar de um formato mais detalhado, pode ajustar aqui
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl: string | null;
    provider: string;
    provider_metadata: null | Record<string, unknown>; // Se você precisar de um formato mais detalhado, pode ajustar aqui
    createdAt: string;
    updatedAt: string;
  };
}

export interface TenderStatus {
  id: number;
  name: string;
  date: string;
}

export interface TenderType {
  id: number;
  attributes: {
    name: string;
    createdAt: string;
    updatedAt: string;
    slug: string;
  };
}

export interface TenderAttributes {
  title: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  opening_date: string;
  description: string;
  closing_date: string | null;
  process_number: string;
  tender_type: {
    data: {
      id: number;
      attributes: TenderType["attributes"];
    };
  };
  files: {
    data: TenderFile[];
  };
  status: TenderStatus[];
  last_status: TenderStatus;
}

export interface Tender {
  id: number;
  attributes: TenderAttributes;
}

export interface PaginationMeta {
  start: number;
  limit: number;
  total: number;
}

export interface TenderResponse {
  data: Tender[];
  meta: {
    pagination: PaginationMeta;
  };
}


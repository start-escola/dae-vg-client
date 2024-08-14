export interface File {
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
  realization: string;
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
    data: File[];
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

interface InternalControlAttributes {
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  files: {
    data: File[];
  };
}

export interface InternalControl {
  id: number;
  attributes: InternalControlAttributes;
}

export interface InternalControlsResponse {
  data: InternalControl[];
  meta: {
    pagination: PaginationMeta;
  };
}

interface NewsAttributes {
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  short_description: string;
  images: {
    data: File[]
  };
  main_image: {
    data: File
  };
}

export interface News {
  id: number;
  attributes: NewsAttributes;
}

export interface NewsResponse {
  data: News[];
  meta: {
    pagination: PaginationMeta;
  };
}
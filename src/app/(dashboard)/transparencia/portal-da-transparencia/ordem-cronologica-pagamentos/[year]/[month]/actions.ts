"use server"
import api from "@/utils/api";
import { Payment, PaymentResponse } from "@/interfaces/request";

export async function getPage(year: string, month: string) {
  const startDate = `${year}-${month.padStart(2, '0')}-01`;
  const endDate = `${year}-${month.padStart(2, '0')}-31`;

  let currentPage = 1;
  let totalPages = 1;
  const pageSize = 100;
  let allData: Payment[] = [];

  do {
    const { data: pageData } = await api.get<PaymentResponse>("/payments", {
      params: {
        "filters[data_pagamento][$gte]": startDate,
        "filters[data_pagamento][$lte]": endDate,
        "pagination[page]": String(currentPage),
        "pagination[pageSize]": String(pageSize),
      },
    });

    allData = [...allData, ...pageData.data];
    totalPages = pageData.meta.pagination.pageCount;
    currentPage++;
  } while (currentPage <= totalPages);

  return allData;
}
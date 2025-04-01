"use server"
import api from "@/utils/api";
import { Payment, PaymentResponse } from "@/interfaces/request";

export async function getPage(year: string, month: string) {
  const startDate = `${year}-${month.padStart(2, '0')}-01`;

  // Calcular o último dia do mês
  const lastDayOfMonth = new Date(Number(year), Number(month), 0);  // O dia 0 do mês seguinte retorna o último dia do mês atual
  const endDate = lastDayOfMonth.toISOString().split('T')[0];  // Formata para 'YYYY-MM-DD'

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

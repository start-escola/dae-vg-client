import PageTitle from "@/components/PageTitle";
import { Payment, PaymentResponse } from "@/interfaces/request";
import api from "@/utils/api";
import Link from "next/link";

const getAllPaymentYears = async () => {
  "use server";

  const years = new Set<number>();
  let currentPage = 1;
  let totalPages = 1;
  const pageSize = 100; // Defina o tamanho da página conforme necessário

  do {
    const params = {
      "pagination[page]": String(currentPage),
      "pagination[pageSize]": String(pageSize)
    };

    const response = await api.get<PaymentResponse>("/payments", { params });

    response.data.data.forEach(payment => {
      const year = new Date(payment.attributes.data_pagamento).getFullYear();
      years.add(year);
    });

    // Atualiza o número total de páginas com base na resposta da API
    totalPages = response.data.meta.pagination.pageCount;
    currentPage++;
  } while (currentPage <= totalPages);

  return Array.from(years).sort();
};


export default async function Page() {
  const data = await getAllPaymentYears();

  console.log(data)

  return (
    <main>
      <PageTitle
        title="Ordem Cronológica de Pagamentos"
        description=""
      />
      <section>
        <ul className="my-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
          {
            data.map((year) => (
              <li key={year}>
                <Link
                  className="flex-col gap-4 flex items-center justify-between shadow-lg px-6 py-4 aspect-square dark:bg-black"
                  href={`/transparencia/portal-da-transparencia/ordem-cronologica-pagamentos/${year}`}
                >
                  <p className="font-semibold text-primary-500 dark:text-white-0 text-center">{year}</p>
                  <button className="text-white bg-primary-500 dark:text-white dark:bg-white-0 px-4 py-2">Acessar</button>
                </Link>
              </li>
            ))
          }
        </ul>
      </section>
    </main>
  )
}
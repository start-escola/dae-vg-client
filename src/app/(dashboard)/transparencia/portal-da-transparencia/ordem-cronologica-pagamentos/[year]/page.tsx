import PageTitle from "@/components/PageTitle";
import { PaymentResponse } from "@/interfaces/request";
import api from "@/utils/api";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

async function getMonthsInYear(year: string) {
  "use server";

  const startDate = `${year}-01-01`;
  const endDate = `${year}-12-31`;

  const months = new Set<number>();
  let currentPage = 1;
  let totalPages = 1;
  const pageSize = 100;

  do {
    const { data: page } = await api.get<PaymentResponse>("/payments", {
      params: {
        "filters[data_pagamento][$gte]": startDate,
        "filters[data_pagamento][$lte]": endDate,
        "pagination[page]": String(currentPage),
        "pagination[pageSize]": String(pageSize)
      },
    });

    page.data.forEach(payment => {
      const month = new Date(payment.attributes.data_pagamento).getMonth() + 1;
      months.add(month);
    });

    totalPages = page.meta.pagination.pageCount;
    currentPage++;
  } while (currentPage <= totalPages);

  return Array.from(months).sort();
}

export default async function Page({ params }: { params: { year: string } }) {
  const months = await getMonthsInYear(params.year);

  const monthName = {
    1: 'Janeiro',
    2: 'Fevereiro',
    3: 'Março',
    4: 'Abril',
    5: 'Maio',
    6: 'Junho',
    7: 'Julho',
    8: 'Agosto',
    9: 'Setembro',
    10: 'Outubro',
    11: 'Novembro',
    12: 'Dezembro'
  }

  return (
    <>
      <PageTitle
        title="DAE - Portal da Transparência"
        description="Selecione o mês"
      />
      <ul className="flex flex-col gap-4 my-10">
        {months.map((month, i) => (
          <li className={clsx("cursor-pointer text-primary-500", i % 2 === 0 ? 'bg-white-0' : 'bg-[#F2F2F2]')} key={month}>
            <Link href={`/transparencia/portal-da-transparencia/ordem-cronologica-pagamentos/${params.year}/${month}`} className="flex justify-between items-center py-4 px-6">
              <div className="flex gap-4">
                <Image src="/folder.svg" alt="Icone de pasta" width={26} height={22} />
                <p>{monthName[month as keyof typeof monthName]}</p>
              </div>
              <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M-5.68248e-07 13C-4.55859e-07 15.5712 0.762436 18.0846 2.19089 20.2224C3.61935 22.3602 5.64968 24.0265 8.02511 25.0104C10.4006 25.9944 13.0144 26.2518 15.5362 25.7502C18.0579 25.2486 20.3743 24.0105 22.1924 22.1924C24.0105 20.3743 25.2486 18.0579 25.7502 15.5362C26.2518 13.0144 25.9944 10.4005 25.0104 8.02511C24.0265 5.64967 22.3602 3.61935 20.2224 2.19089C18.0846 0.762429 15.5712 -6.40268e-06 13 -6.29029e-06C9.5533 0.00363308 6.24881 1.37444 3.81163 3.81163C1.37445 6.24881 0.00363905 9.5533 -5.68248e-07 13ZM14.7075 8.29249L18.7075 12.2925C18.8005 12.3854 18.8742 12.4957 18.9246 12.6171C18.9749 12.7385 19.0008 12.8686 19.0008 13C19.0008 13.1314 18.9749 13.2615 18.9246 13.3829C18.8742 13.5043 18.8005 13.6146 18.7075 13.7075L14.7075 17.7075C14.5199 17.8951 14.2654 18.0005 14 18.0005C13.7346 18.0005 13.4801 17.8951 13.2925 17.7075C13.1049 17.5199 12.9994 17.2654 12.9994 17C12.9994 16.7346 13.1049 16.4801 13.2925 16.2925L15.5862 14L8 14C7.73478 14 7.48043 13.8946 7.29289 13.7071C7.10536 13.5196 7 13.2652 7 13C7 12.7348 7.10536 12.4804 7.29289 12.2929C7.48043 12.1054 7.73478 12 8 12L15.5862 12L13.2925 9.70749C13.1049 9.51985 12.9994 9.26536 12.9994 8.99999C12.9994 8.73463 13.1049 8.48013 13.2925 8.29249C13.4801 8.10485 13.7346 7.99944 14 7.99944C14.2654 7.99944 14.5199 8.10485 14.7075 8.29249Z" fill="#1763A6" />
              </svg>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
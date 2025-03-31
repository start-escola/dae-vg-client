import GoBack from "@/components/GoBack";
import PageTitle from "@/components/PageTitle";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import api from "@/utils/api";
import { Payment, PaymentResponse } from "@/interfaces/request";
import SearchFilter from "./filter";

async function getPage(year: string, month: string, query?: string) {
  "use server";

  const startDate = `${year}-${month.padStart(2, '0')}-01`;
  const endDate = `${year}-${month.padStart(2, '0')}-31`;

  let currentPage = 1;
  let totalPages = 1;
  const pageSize = 100;
  let allData: Payment[] = [];

  const params: { [key: string]: string } = {};

  if (query) {
    params["filters[empresa][$containsi]"] = query
  }

  do {
    const { data: pageData } = await api.get<PaymentResponse>("/payments", {
      params: {
        "filters[data_pagamento][$gte]": startDate,
        "filters[data_pagamento][$lte]": endDate,
        "pagination[page]": String(currentPage),
        "pagination[pageSize]": String(pageSize),
        ...params
      },
    });

    allData = [...allData, ...pageData.data];
    totalPages = pageData.meta.pagination.pageCount;
    currentPage++;
  } while (currentPage <= totalPages);

  return allData;
}

export default async function Page(
  {
    params,
    searchParams
  }: { params: { year: string; month: string }, searchParams: { [key: string]: string } }
) {
  const data = await getPage(params.year, params.month, searchParams.q);

  return (
    <section className="text-primary-500">
      <GoBack />
      <PageTitle title="Ordem Cronológica de Pagamentos" description="" />
      <SearchFilter />
      <TableContainer component={Paper} className="mt-4">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Nome da Empresa</strong></TableCell>
              <TableCell><strong>N<sup>⁰</sup> Nota Fiscal/Doc</strong></TableCell>
              <TableCell><strong>Data Emissão NF/Proc</strong></TableCell>
              <TableCell><strong>Valor a Pagar</strong></TableCell>
              <TableCell><strong>Data Liquidação</strong></TableCell>
              <TableCell><strong>Data Vencimento</strong></TableCell>
              <TableCell><strong>Data Pagamento</strong></TableCell>
              <TableCell><strong>Justificativa</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.attributes.empresa}</TableCell>
                <TableCell>{row.attributes.numero_nota_fiscal}</TableCell>
                <TableCell>{row.attributes.data_emissao_nf_proc}</TableCell>
                <TableCell>{Number(row.attributes.valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</TableCell>
                <TableCell>{row.attributes.data_liquidacao}</TableCell>
                <TableCell>{row.attributes.data_vencimento}</TableCell>
                <TableCell>{row.attributes.data_pagamento}</TableCell>
                <TableCell>{row.attributes.justificativa}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </section>
  );
}

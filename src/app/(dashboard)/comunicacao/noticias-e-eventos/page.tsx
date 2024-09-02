import PageTitle from "@/components/PageTitle";
import List from "./list";
import { getPage } from "./action";

export const metadata = {
  title: "DAE - Notícias e Eventos",
};

export default async function Page({ searchParams }: { searchParams: { [key: string]: string | undefined } }) {
  const { data, pagination } = await getPage(searchParams.page || "1");

  return (
    <section className="w-full flex flex-colgap-4 md:gap-24 text-primary-500 dark:text-white-0">
      <div className="w-full dark:bg-[#0D0D0D]">
        <PageTitle title="Notícias e Eventos" />
        <ul className="flex flex-col gap-10">
          <List defaultPage={Number(searchParams.page) || 1} defaultValues={data} total={pagination.total} />
        </ul>
      </div>
    </section>
  );
}

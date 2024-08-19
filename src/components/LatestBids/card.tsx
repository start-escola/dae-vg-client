"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Text from "../Text";

interface ILatestBidsCard {
  title: string;
  opening: string;
  closing: string;
  status: {
    name: string;
    date: string;
  }[];
  slug: string;
  last_status: {
    name: string;
    date: string;
  };
  realization?: string;
}

const LatestBidsCard = ({
  title,
  opening,
  closing,
  realization,
  status,
  slug,
  last_status,
}: ILatestBidsCard) => {
  const [showAllStatus, setShowAllStatus] = useState(false);

  // Cria uma cópia do array de status e remove o último elemento
  return (
    <div className="m-auto flex flex-col justify-between text-primary-500 px-6 pt-5 pb-4 border-b-4 shadow-xl dark:bg-black rounded dark:text-white-0">
      <div className="flex flex-col gap-4">
        <div>
          <Link
            href={`/transparencia/licitacoes/${opening?.split("/")[0]}/${slug}`}
            className="flex flex-col items-center text-center"
          >
            <Image src="/hammer.svg" width={30} height={30} alt="martelo" />
            <Text className="font-bold text-lg my-2 dark:text-white-0">{title}</Text>
          </Link>
        </div>
        <button
          className="text-primary-500 w-full font-bold text-center border-2 border-primary-500 dark:text-white-0 dark:border-white-0"
          onClick={() => setShowAllStatus((old) => !old)}
          aria-label="Toggle Status"
        >
          <Text className="font-bold text-center text-base">
            STATUS
          </Text>
        </button>
        <ul className="min-h-32">
          {showAllStatus &&
            status?.map(({ name, date }) => (
              <li key={name}>
                <strong>{name}:</strong> {date?.replaceAll("-", "/")}
              </li>
            ))}
          {last_status && (
            <li>
              <strong className="text-base">{last_status.name}:</strong>{" "}
              {last_status.date?.replaceAll("-", "/")}
            </li>
          )}
        </ul>
      </div>
      <Link
        href={`/transparencia/licitacoes/${opening?.split("/")[0] || realization?.split("/")[0]}/${slug}`}
        className={`w-full py-1 text-white-0 text-center font-semibold text-base rounded dark:bg-white-0 dark:text-black bg-primary-500 ${last_status?.name === "Finalizada" && "opacity-40"}`}
        aria-label="Bid Status"
      >
        {last_status?.name || "Não definido"}
      </Link>
    </div>
  );
};

export default LatestBidsCard;

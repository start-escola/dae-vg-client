"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

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
}

const LatestBidsCard = ({
  title,
  opening,
  closing,
  status,
  slug,
  last_status,
}: ILatestBidsCard) => {
  const [showAllStatus, setShowAllStatus] = useState(false);

  // Cria uma cópia do array de status e remove o último elemento
  return (
    <li className="m-auto flex flex-col justify-between text-primary-500 px-6 pt-5 pb-4 border-b-4 shadow-xl w-fit">
      <div className="flex flex-col gap-4">
        <div>
          <Link
            href={`/transparencia/licitacoes/${opening?.split("/")[0]}/${slug}`}
            className="flex flex-col items-center text-center"
          >
            <Image src="/hammer.svg" width={30} height={30} alt="martelo" />
            <p className="font-bold text-lg my-2">{title}</p>
          </Link>
        </div>
        <button
          className="text-primary-500 w-full font-bold text-center border-2 border-primary-500"
          onClick={() => setShowAllStatus((old) => !old)}
          aria-label="Toggle Status"
        >
          STATUS
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
              <strong>{last_status.name}:</strong>{" "}
              {last_status.date?.replaceAll("-", "/")}
            </li>
          )}
        </ul>
      </div>
      <Link
        href={`/transparencia/licitacoes/${opening?.split("/")[0]}/${slug}`}
        className={`w-full py-1 text-white-0 text-center font-semibold text-base rounded bg-primary-500 ${last_status?.name === "Finalizada" && "opacity-40"
          }`}
        aria-label="Bid Status"
      >
        {last_status?.name || "Não definido"}
      </Link>
    </li>
  );
};

export default LatestBidsCard;

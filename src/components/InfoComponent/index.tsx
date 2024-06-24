"use client";
import Image from "next/image";
import { useState } from "react";

const InfoComponent = () => {
  const files = [
    {
      name: "ACORDAO_2012",
      file: "asd",
    },
    {
      name: "ACORDAO_2012",
      file: "asd",
    },
    {
      name: "ACORDAO_2012",
      file: "asd",
    },
  ];

  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="flex flex-col p-8 bg-grey w-full rounded-sm border drop-shadow border-border_grey">
      <ul className="flex justify-start gap-14 mb-3">
        <li className="p-4 bg-white-50 text-primary-500 rounded text-xl border border-border_grey">
          Título do documento: <strong>Contas e gestão</strong>
        </li>
        <li className="flex justify-between items-center p-4 bg-white-50 text-primary-500 border rounded text-xl border-border_grey">
          <Image
            src="/Vector.svg"
            width={18}
            height={20}
            alt="date"
            className="mr-5"
          />
          Publicação: <strong className="ml-1">12/10/2023</strong>
        </li>
        <li className="p-4 bg-white-50 text-primary-500 rounded text-xl border border-border_grey">
          Código: <strong>0087134-20</strong>
        </li>
      </ul>
      <div className="flex flex-col">
        <div className="text-primary-500 text-base">
          <strong>Descrição:</strong>{" "}
          {isExpanded ? (
            <>
              is simply dummy text of the printing and typesetting industry.
              Lorem Ipsum has been the industrys standard dummy text ever since
              the 1500s, when an unknown printer took a galley of type and
              scrambled it to make a type specimen book. It has survived not
              only five centuries, but also the leap into electronic
              typesetting, remaining essentially unchanged. It was popularised
              in the 1960s with the release of Letraset sheets containing Lorem
              Ipsum passages, and more recently with desktop publishing software
              like Aldus PageMaker including versions of Lorem Ipsum.
            </>
          ) : (
            <>
              is simply dummy text of the printing and typesetting industry.
              Lorem Ipsum has been the industrys standard dummy text ever since
              the 1500s...
            </>
          )}
        </div>
        <button
          onClick={() => toggleExpand()}
          className="text-primary-500 ml-2 flex justify-end"
        >
          {isExpanded ? <strong>Ler menos</strong> : <strong>...ler mais</strong>}
        </button>
      </div>
      <div className="flex justify-start items-center mb-2">
        <Image src="/download.svg" width={18} height={18} alt="download" />
        <span className="text-base text-primary-500 ml-2">
          Arquivos para download
        </span>
      </div>
      <hr className="border-border_grey border mb-6" />
      <div className="flex gap-2">
        {files.map((file, i) => (
          <div
            key={i}
            className="flex flex-col justify-center items-center gap-2 border bg-white-0  border-white-200 p-2"
          >
            <Image src="/pdf.svg" width={23} height={24} alt="pdf" />
            <span className="text-border_grey text-base mt-1">{file.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfoComponent;

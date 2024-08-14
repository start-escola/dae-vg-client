"use client";
import Image from "next/image";
import { useState } from "react";

interface IContestComponent {
  title: string,
  process_number?: string,
  files: {
    name: string,
    url: string
  }[],
  description?: string,
  realization?: string,
  status?: string,
  publishedAt?: string,
}

const ContestComponent = ({ files, description, title, realization, status, publishedAt, process_number }: IContestComponent) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="flex flex-col bg-grey w-full rounded border drop-shadow border-border_grey text-primary-500">
      <div className="flex justify-between p-4 md:p-5 border-b border-[#B5B5B5]">
        <div className="text-xl">Processo seletivo: <strong>{title}</strong></div>
        <span>Status: <strong>{status || "Não definido"}</strong></span>
      </div>
      <div className="p-4 md:p-5">
        <ul className="flex justify-start gap-4 sm:gap-6 md:gap-8 lg:14 mb-3 flex-wrap">
          {
            process_number && (
              <li className="flex justify-between items-center p-4 bg-white-50 text-primary-500 border rounded text-base md:text-xl border-border_grey">
                <Image
                  src="/file.svg"
                  width={18}
                  height={20}
                  alt="date"
                  className="mr-5"
                />
                Realização: <strong className="ml-1">{process_number}</strong>
              </li>
            )
          }
          {
            realization && (
              <li className="flex justify-between items-center p-4 bg-white-50 text-primary-500 border rounded text-base md:text-xl border-border_grey">
                <Image
                  src="/Vector.svg"
                  width={18}
                  height={20}
                  alt="date"
                  className="mr-5"
                />
                Realização: <strong className="ml-1">{realization.replaceAll('-', '/')}</strong>
              </li>
            )
          }
          {
            publishedAt && (
              <li className="flex justify-between items-center p-4 bg-white-50 text-primary-500 border rounded text-base md:text-xl border-border_grey">
                <Image
                  src="/Vector.svg"
                  width={18}
                  height={20}
                  alt="date"
                  className="mr-5"
                />
                Publicação: <strong className="ml-1">{publishedAt?.split('T')[0].replaceAll('-', '/')}</strong>
              </li>
            )
          }
        </ul>
        <div className="flex flex-col">
          <div className="relative">
            <div
              className={`text-primary-500 text-base overflow-hidden ${isExpanded ? 'max-h-screen' : 'max-h-12'
                }`}
              dangerouslySetInnerHTML={{ __html: description || "" }}
            >

            </div>
            <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent pointer-events-none" />
          </div>
          <button
            onClick={() => toggleExpand()}
            className="text-primary-500 ml-2 flex justify-end mt-2"
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
        {
          files && (
            <ul className="flex gap-2 overflow-x-scroll">
              {files.map(({ url, name }) => (
                <li
                  key={name}
                >
                  <a title={name} className="flex flex-col justify-center items-center gap-2 border bg-white-0  border-white-200 p-2" href={url} download={name} target="_blank">
                    <Image src="/pdf.svg" width={23} height={24} alt="pdf" />
                    <span className="text-border_grey text-base mt-1">{name.length > 13 ? `${name.substring(0, 10)}...` : name}</span>                  </a>
                </li>
              ))}
            </ul>
          )
        }
      </div>
    </div>
  );
};

export default ContestComponent;

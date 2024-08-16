"use client";
import Image from "next/image";
import { useState } from "react";
import Text from "../Text";

interface IInfoComponentProps {
  title: string,
  process_number?: string,
  files: {
    name: string,
    file: string
  }[],
  description?: string,
  opening_date: string,
  tender_type?: string,
  realization?: string,
  last_status: {
    id: number,
    name: string,
    date: string
  }
}

const InfoComponent = ({ files, process_number, description, opening_date, title, tender_type, last_status, realization }: IInfoComponentProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="flex flex-col bg-grey w-full rounded border drop-shadow border-border_grey">
      <div className="flex justify-between p-4 md:p-5 border-b border-[#B5B5B5]">
        <Text as="div" className="text-xl">{tender_type}: <strong>{process_number}</strong></Text>
        <Text as="span text-base">Status: <strong>{last_status?.name || "Não definido"}</strong></Text>
      </div>
      <div className="p-4 md:p-5">
        <ul className="flex justify-start gap-4 sm:gap-6 md:gap-8 lg:14 mb-3 flex-wrap">
          {
            title && (
              <li className="p-4 bg-white-50 text-primary-500 rounded border border-[#B5B5B5]">
                <Text className="text-xl md:text-xl">Título do documento: <strong>{title}</strong></Text>
              </li>
            )
          }
          {
            opening_date && (
              <li className="flex justify-between items-center p-4 bg-white-50 text-primary-500 border rounded border-border_grey">
                <Image
                  src="/Vector.svg"
                  width={18}
                  height={20}
                  alt="date"
                  className="mr-5"
                />
                <Text className="text-xl md:text-xl">
                  Publicação: <strong className="ml-1">{opening_date.replaceAll('-', '/')}</strong>
                </Text>
              </li>
            )
          }
          {
            realization && (
              <li className="flex justify-between items-center p-4 bg-white-50 text-primary-500 border rounded border-border_grey">
                <Image
                  src="/Vector.svg"
                  width={18}
                  height={20}
                  alt="date"
                  className="mr-5"
                />
                <Text as="text-base md:text-xl">Realização: <strong className="ml-1">{realization.replaceAll('-', '/')}</strong></Text>
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
            <Text className="text-base">{isExpanded ? <strong>Ler menos</strong> : <strong>...ler mais</strong>}</Text>
          </button>
        </div>
        <div className="flex justify-start items-center mb-2">
          <Image src="/download.svg" width={18} height={18} alt="download" />
          <Text as="span" className="text-base text-primary-500 ml-2">
            Arquivos para download
          </Text>
        </div>
        <hr className="border-border_grey border mb-6" />
        {
          files && (
            <ul className="flex gap-2 overflow-x-scroll">
              {files.map(({ file, name }) => (
                <li
                  key={name}
                >
                  <a title={name} className="flex flex-col justify-center items-center gap-2 border bg-white-0  border-white-200 p-2" href={file} download={name} target="_blank">
                    <Image src="/pdf.svg" width={23} height={24} alt="pdf" />
                    <Text as="span" className="text-border_grey text-base mt-1">{name.length > 13 ? `${name.substring(0, 10)}...` : name}</Text>
                  </a>
                </li>
              ))}
            </ul>
          )
        }
      </div>
    </div>
  );
};

export default InfoComponent;

"use client";
import { useAcessibility } from "@/app/acessibility-provider";
import Image from "next/image";
import { useState } from "react";
import { changeModifier } from "./action";

const Control = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { modifier } = useAcessibility();

  const toggleOpen = () => setIsOpen((prevState) => !prevState);

  return (
    <div
      className="bg-white-0 w-10 h-10 fixed right-[10px] top-1/2 -translate-y-[75px] rounded flex items-center justify-center z-10 cursor-pointer"
      onClick={toggleOpen}
    >
      <Image src="/Gears.svg" alt="Control" width={30} height={30} />
      {isOpen && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute right-full -translate-x-[14px] w-32"
        >
          <div className="bg-primary-500 shadow-lg rounded p-4">
            <p className="text-center mb-4">Ajuste o texto</p>
            <div className="flex gap-4 items-center justify-center">
              <button
                className="bg-white-50 rounded p-2 w-7 h-7 text-black flex items-center justify-center"
                onClick={() => {
                  changeModifier(modifier + 1);
                }}
              >
                A+
              </button>
              <button
                className="bg-white-50 rounded p-2 w-7 h-7 text-black flex items-center justify-center"
                onClick={() => {
                  changeModifier(modifier - 1);
                }}
              >
                A-
              </button>
              <button
                className="bg-white-50 rounded p-1 w-7 h-7 text-black flex items-center justify-center"
                onClick={() => {
                  const html = document.querySelector("html");

                  html?.classList.toggle("dark");
                }}
              >
                <svg
                  width="800px"
                  height="800px"
                  viewBox="0 0 28 28"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                >
                  <title>ic_fluent_dark_theme_24_regular</title>
                  <desc>Created with Sketch.</desc>
                  <g
                    id="🔍-Product-Icons"
                    stroke="none"
                    stroke-width="1"
                    fill="none"
                    fill-rule="evenodd"
                  >
                    <g
                      id="ic_fluent_dark_theme_24_regular"
                      fill="#212121"
                      fill-rule="nonzero"
                    >
                      <path
                        d="M12,22 C17.5228475,22 22,17.5228475 22,12 C22,6.4771525 17.5228475,2 12,2 C6.4771525,2 2,6.4771525 2,12 C2,17.5228475 6.4771525,22 12,22 Z M12,20.5 L12,3.5 C16.6944204,3.5 20.5,7.30557963 20.5,12 C20.5,16.6944204 16.6944204,20.5 12,20.5 Z"
                        id="🎨-Color"
                      ></path>
                    </g>
                  </g>
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Control;

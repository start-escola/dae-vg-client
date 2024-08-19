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
    <>
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
                  className="bg-white-50 rounded p-2 w-7 h-7 text-black flex items-center justify-center"
                  onClick={() => {
                    const html = document.querySelector('html')

                    html?.classList.toggle('dark')
                  }}  
                >
                  C
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Control;

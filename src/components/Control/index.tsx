"use client";
import Image from "next/image";
import { useState } from "react";

const Control = () => {
  const [isOpen, setIsOpen] = useState(false);

  

  const toggleOpen = () => setIsOpen((prevState) => !prevState);

  return (
    <>
      <div
        className="bg-white-0 w-10 h-10 fixed right-[10px] top-1/2 -translate-y-[75px] rounded flex items-center justify-center"
        onClick={toggleOpen}
      >
        <Image src="/Gears.svg" alt="Control" width={30} height={30} />
      </div>

      {isOpen && (
        <div className="fixed top-1/2 right-0 -translate-y-1/2 mr-4 z-10 ">
          <div className="bg-primary-500 shadow-lg rounded p-4">
            <p className="text-center mb-4">Ajuste o texto</p>

            <div className="flex gap-4 items-center justify-center">
              <button
                className="bg-white-50 rounded p-2 w-7 h-7 text-black flex items-center justify-center"
                onClick={() => {
                  document.body.style.fontSize = "clamp(1rem, 1vw, 1.2rem)";
                }}
              >
                A+
              </button>

              <button className="bg-white-50 rounded p-2 w-7 h-7 text-black flex items-center justify-center">
                A-
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Control;

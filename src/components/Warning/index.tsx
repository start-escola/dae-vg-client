"use client";
import { useState } from "react";

const Warning = ({ values: { img } }: { values: { img: string | null } }) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!img) {
    return null;
  }

  return (
    <>
      {isVisible && (
        <div className="flex items-center justify-center top-0 fixed z-50 w-screen h-screen bg-black bg-opacity-50">
          <div className="relative aspect-square w-[90%] h-2/5 md:w-[90%] md:h-3/5 lg:w-4/5">
            <button
              onClick={handleClose}
              className="absolute top-2 right-5 text-white text-2xl font-bold"
            >
              X
            </button>
            <img
              className="w-full h-full rounded-md mx-auto"
              src={img}
              alt="Pop-up"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Warning;

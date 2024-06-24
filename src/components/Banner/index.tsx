'use client'
import clsx from "clsx";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";

interface IBannerProps {
  values: {
    img: string;
    description: string;
  }[];
}

const Banner = ({ values }: IBannerProps) => {
  const [selectedBanner, setSelectedBanner] = useState(0);
  const [pause, setPause] = useState(false);
  const bannerRef = useRef<HTMLDivElement>(null);

  const handleChangeBanner = (index: number) => {
    if (index === selectedBanner) return; // Evita troca redundante

    setSelectedBanner(index);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (!pause) {
      interval = setInterval(() => {
        handleChangeBanner((selectedBanner + 1) % values.length); // Avança para o próximo banner circularmente
      }, 5000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [pause, selectedBanner, values.length]);

  const handlePauseToggle = (isPaused: boolean) => {
    setPause(isPaused);
  };

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setPause(true);
    const startX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const handleDragMove = (moveEvent: MouseEvent | TouchEvent) => {
      const currentX = 'touches' in moveEvent ? moveEvent.touches[0].clientX : moveEvent.clientX;
      const difference = startX - currentX;
      if (difference > 50) {
        handleChangeBanner((selectedBanner + 1) % values.length);
        cleanup();
      } else if (difference < -50) {
        handleChangeBanner((selectedBanner - 1 + values.length) % values.length);
        cleanup();
      }
    };
    const handleDragEnd = () => {
      setPause(false);
      cleanup();
    };
    const cleanup = () => {
      document.removeEventListener('mousemove', handleDragMove);
      document.removeEventListener('mouseup', handleDragEnd);
      document.removeEventListener('touchmove', handleDragMove);
      document.removeEventListener('touchend', handleDragEnd);
    };
    document.addEventListener('mousemove', handleDragMove);
    document.addEventListener('mouseup', handleDragEnd);
    document.addEventListener('touchmove', handleDragMove);
    document.addEventListener('touchend', handleDragEnd);
  };

  return (
    <section className="flex justify-center items-center w-full h-[calc(100svh-80px)] relative">
      <div
        className="w-full h-full relative overflow-hidden"
        ref={bannerRef}
        onMouseDown={handleDragStart}
        onTouchStart={handleDragStart}
      >
        {values.map((val, i) => (
          <Image
            key={i}
            fill
            src={val.img}
            alt=""
            className={clsx(
              "absolute top-0 left-0 w-full h-full transform transition-transform duration-1000 object-cover",
              i === selectedBanner
                ? "translate-x-0"
                : i === selectedBanner - 1
                  ? "-translate-x-full"
                  : "translate-x-full",
            )}
          />
        ))}
        <div
          className="absolute top-0 h-full w-full bg-gradient-to-t from-[#131313] to-[rgba(217, 217, 217, 0)]"
          onMouseEnter={() => handlePauseToggle(true)}
          onMouseLeave={() => handlePauseToggle(false)}
        />
      </div>
      <div className="container absolute translate-y-1/4 bottom-1/4 p-4"
        onMouseEnter={() => handlePauseToggle(true)}
        onMouseLeave={() => handlePauseToggle(false)}
      >
        <div className="flex flex-col gap-4 w-fit" dangerouslySetInnerHTML={{ __html: values[selectedBanner].description }} />
        <div className="absolute left-0 top-0 h-full w-full z-10"
          ref={bannerRef}
          onMouseDown={handleDragStart}
          onTouchStart={handleDragStart}
        />
        <button className="rounded mt-8 px-5 py-2 bg-primary-500 text-white shadow-md relative z-20">Saber mais</button>
      </div>
      <div className="flex gap-2 absolute bottom-[56px]">
        {values.map((val, i) => (
          <button
            key={i}
            onClick={() => handleChangeBanner(i)}
            className={clsx("h-2 transition-all", selectedBanner === i ? "w-12 bg-primary-500 rounded-3xl" : "w-2 rounded-full bg-white-200")}
          />
        ))}
      </div>
    </section>
  );
};

export default Banner;

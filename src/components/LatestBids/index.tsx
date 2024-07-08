'use client'
import Image from "next/image"
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from "swiper/modules";

interface ILatestBids {
  values: {
    title: string
    opening: string
    closing: string
  }[]
}

const LatestBids = ({ values }: ILatestBids) => {
  const items = [
    { title: 'Pregão Eletrônico', opening: "25/04/2023", closing: "09/08/2023" },
    { title: 'Concorrência Pública', opening: "15/05/2023", closing: "30/09/2023" },
    { title: 'Tomada de Preços', opening: "01/06/2023", closing: "15/10/2023" },
    { title: 'Convite', opening: "10/07/2023", closing: "20/11/2023" },
    { title: 'Leilão', opening: "25/08/2023", closing: "15/12/2023" }
  ];

  return (
    <section className="my-14 mx-auto container p-4">
      <h1 className="text-primary-500 text-2xl font-semibold text-center">Últimas licitações</h1>
      <div className="relative my-10 max-w-5xl mx-auto px-10">
        <Swiper
          spaceBetween={32}
          modules={[Navigation, Pagination]}
          slidesPerView={1}
          loop={true}
          navigation={{
            prevEl: '.swiper-button-prev',
            nextEl: '.swiper-button-next',
          }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {values.map((val, i) => (
            <SwiperSlide key={i}>
              <li className={`m-auto flex flex-col gap-4 text-primary-500 px-6 pt-5 pb-4 border-b-4 shadow-xl w-fit`}>
                <div className="flex flex-col items-center text-center">
                  <Image src="/hammer.svg" width={30} height={30} alt="martelo" />
                  <p className="font-bold text-lg my-2">{val.title}</p>
                </div>
                <div>
                  <div><strong>Abertura:</strong> {val.opening}</div>
                  <div><strong>Fechamento:</strong> {val.closing}</div>
                </div>
                <button className="py-1 text-white-0 font-semibold text-base rounded bg-primary-500">
                  Aberto
                </button>
              </li>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="absolute left-0 top-1/2 -translate-y-1/2 swiper-button-prev custom-swiper-button">
          <Image src="/leftArrow.svg" width={28} height={28} alt="left arrow" />
        </div>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 swiper-button-next custom-swiper-button">
          <Image src="/rightArrow.svg" width={28} height={28} alt="right arrow" />
        </div>
      </div>
    </section >
  )
}

export default LatestBids
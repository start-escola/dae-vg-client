'use client'
import Image from "next/image"
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from "swiper/modules";
import LatestBidsCard from "./card";

interface ILatestBids {
  values: {
    title: string
    opening: string
    closing: string
    slug: string
    status: {
      name: string,
      date: string
    }[]
    last_status: {
      name: string,
      date: string
    }
    realization?: string;
  }[]
}

const LatestBids = ({ values }: ILatestBids) => {
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
              <LatestBidsCard {...val} />
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
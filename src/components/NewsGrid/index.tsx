'use client'
import Image from "next/image";
import { useState } from "react";

const NewsGrid = ({ news }: { news: { id: number, url: string }[] }) => {
  const [selectedImage, setSelectedImage] = useState<number>(0);

  const handleImageClick = (index: number) => {
    setSelectedImage(index);
  };

  return (
    <div>
      <div className="relative w-full pb-[56.25%]">
        <img src={news[selectedImage].url} alt="" className="absolute h-full w-full object-cover" />
      </div>
      <ul className="grid grid-cols-4 mt-4 gap-4">
        {news.map((newsItem, index) => (
          <li
            key={newsItem.id}
            className={`relative w-full pb-[56.25%] cursor-pointer object-cover ${index === selectedImage ? "opacity-50" : ""
              }`}
            onClick={() => handleImageClick(index)}
          >
            <img src={newsItem.url} alt="" className="absolute h-full w-full" />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NewsGrid;


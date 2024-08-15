import Image from "next/image";

export default function Page ()  {
  const items = [
    {
      name: "Imagem 1",
      type: "image",
      src: "/grid-example.jpeg",
    },
    {
      name: "Imagem 2",
      type: "image",
      src: "/grid-example.jpeg",
    },
    {
      name: "Video 1",
      type: "video",
      src: "https://www.w3schools.com/tags/movie.mp4",
    },
  ];

  return (
    <div className="flex flex-col items-center w-full">
      {items.map((item, index) => (
        <div
          key={index}
          className="w-[300px] h-[300px] mb-4 flex justify-center items-center"
        >
          {item.type === "image" && (
            <Image
              src={item.src}
              alt={item.name}
              width={300}
              height={300}
              className="rounded-lg"
            />
          )}
          {item.type === "video" && (
            <video src={item.src} controls className="rounded-lg" />
          )}
        </div>
      ))}
    </div>
  );
};

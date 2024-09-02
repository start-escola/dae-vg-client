import Text from "@/components/Text"

const Card = ({ item }: { item: { url: string, title: string, type: "image" | "video" } }) => {
  return (
    <a
      href={item.url}
      className="relative w-full h-full pb-[56.25%] flex justify-center items-center overflow-hidden rounded dark:bg-black"
      target="_blank"
    >
      {item.title && (
        <Text as="h2" className="absolute z-10 bg-primary-500 dark:text-white-0 p-4 text-base font-semibold left-0 top-0">{item.title}</Text>
      )}
      {item.type === "image" && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={item.url}
          alt={item.title}
          className="absolute top-0 left-0 w-full h-full object-cover"
          aria-label="Galeria"
        />
      )}
      {item.type === "video" && (
        <video src={item.url} controls className="absolute top-0 left-0 h-full w-full bg-black" />
      )}
    </a>
  )
}

export default Card
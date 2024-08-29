import Text from "@/components/Text"

const Card = ({ id, title, short_description, main_image, createdAt }: { id: number, title: string, short_description: string, main_image: { url: string }, createdAt: string }) => {
  return (
    <li className="flex gap-4">
      <div className="w-full max-w-[25%] relative">
        <img
          src={main_image?.url}
          className="absolute w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-col gap-6">
        <Text className="text-primary-100 dark:text-white-0 text-base">
          Publicada em{" "}
          {new Date(createdAt).toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })}
        </Text>
        <div>
          <Text className="md:text-2xl dark:text-white-0 font-bold mb-4">{title}</Text>
          <p className="text-base">{short_description}</p>
        </div>
        <a
          href={`/comunicacao/noticias-e-eventos/noticias/${id}`}
          className="mt-2 px-4 py-2 text-white-0 bg-primary-500 dark:bg-[#0D0D0D] rounded w-fit"
        >
          Saber mais
        </a>
      </div>
    </li>
  )
}

export default Card
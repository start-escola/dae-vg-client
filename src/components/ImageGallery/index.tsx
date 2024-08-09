import Image from "next/image"

interface IImageProps {
  values: {
    img: string;
  }[]
}

const ImageGallery = ({ values }: IImageProps) => {
  const highlightImage = values?.shift()

  return (
    <section className="my-14 mx-auto container p-4">
      <h1 className="text-primary-500 text-2xl font-semibold text-center">Galeria de imagens</h1>
      <div className="flex flex-col md:flex-row gap-4 mt-10">
        <div className="w-full md:w-1/2 relative h-80 rounded overflow-hidden">
          {
            highlightImage && (<Image src={highlightImage.img} alt="" className="object-cover" />)
          }
        </div>
        <ul className="w-full md:w-1/2 grid grid-cols-2 gap-4 h-80">
          {
            values?.map(({ img }) => (
              <li key={img} className="relative rounded overflow-hidden"><Image src="/grid-example.jpeg" alt="" className="object-cover" /></li>
            ))
          }
        </ul>
      </div>
    </section>
  )
}

export default ImageGallery
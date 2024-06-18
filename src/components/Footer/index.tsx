import Image from "next/image"

const Footer = () => {
  return (
    <footer className="mx-auto bg-primary-500 border-b-8 border-primary-700 md:border-none">
      <section className="mx-auto container p-4">
        <Image src="/brasao.png" width={100} height={100} alt="logo" />
      </section>
    </footer>
  )
}

export default Footer
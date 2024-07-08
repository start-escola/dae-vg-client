import PageTitle from "@/components/PageTitle";
import Link from "next/link";

export const metadata = {
  title: "Agua e Esgoto - DAE",
  description: ""
}

export default function Page() {
  return (
    <>
      <section className="">
        <PageTitle
          title="Água"
          description="is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/agua.jpg" alt="" className="object-contain mx-auto" />
      </section>
      <section>
        <PageTitle
          title="Esgoto"
          description="is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        />
        <div className="mt-8">
          <Link href={"#"} className="px-4 py-2 bg-primary-500 text-white-0 rounded">Relação das Etes MP</Link>
        </div>
      </section>
    </>
  )
}
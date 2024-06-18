import AboutUs from "@/components/AboutUs";
import Banner from "@/components/Banner";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ImageGallery from "@/components/ImageGallery";
import LatestBids from "@/components/LatestBids";
import Services from "@/components/Services";

export default function Home() {
  const values = [
    {
      "description": `
            <p style="font-size: 1.125rem; line-height: 1.75rem;">Obras da</p>
            <h1 style="font-size: 2rem; line-height: 1; font-weight: 600;"> Estação de Tratamento de Água</h1>
            <p style="font-size: 1.125rem; line-height: 1.75rem;"></p>
            <p style="font-size: 0.875rem; line-height: 1.25rem;">Melhorias contínuas para garantir água de qualidade à população.</p>
        `,
      "img": "/banner.jpeg"
    },
    {
      "description": `
            <p style="font-size: 1.125rem; line-height: 1.75rem;">Projetos em</p>
            <h1 style="font-size: 2rem; line-height: 1; font-weight: 600;"> Infraestrutura Hídrica</h1>
            <p style="font-size: 1.125rem; line-height: 1.75rem;">Para garantir a qualidade da água.</p>
            <p style="font-size: 0.875rem; line-height: 1.25rem;">Investimentos em tecnologia e inovação para um abastecimento eficiente.</p>
        `,
      "img": "/banner2.jpg"
    },
    {
      "description": `
            <p style="font-size: 1.125rem; line-height: 1.75rem;">Iniciativas de</p>
            <h1 style="font-size: 2rem; line-height: 1; font-weight: 600;"> Sustentabilidade</h1>
            <p style="font-size: 1.125rem; line-height: 1.75rem;">Tratamento de água sustentável para um futuro melhor.</p>
            <p style="font-size: 0.875rem; line-height: 1.25rem; display: block;">Projetos ecológicos que preservam recursos naturais e promovem sustentabilidade.</p>
        `,
      "img": "/banner3.jpg"
    },
    {
      "description": `
            <p style="font-size: 1.125rem; line-height: 1.75rem;">Avanços em</p>
            <h1 style="font-size: 2rem; line-height: 1; font-weight: 600;"> Tecnologias de Purificação</h1>
            <p style="font-size: 1.125rem; line-height: 1.75rem;">Implementando soluções inovadoras para purificação de água.</p>
            <p style="font-size: 0.875rem; line-height: 1.25rem;">Uso de tecnologias avançadas para remover contaminantes e melhorar a qualidade da água.</p>
        `,
      "img": "/banner4.jpg"
    }
  ];

  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col mt-20">
        <Banner values={values} />
        <Services />
        <AboutUs />
        <LatestBids />
        <ImageGallery />
      </main>
      <Footer />
    </>
  );
}

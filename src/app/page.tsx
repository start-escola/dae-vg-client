import AboutUs from "@/components/AboutUs";
import Banner from "@/components/Banner";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ImageGallery from "@/components/ImageGallery";
import LatestBids from "@/components/LatestBids";
import Services from "@/components/Services";

async function getLastNews() {
  'use server'

  const result = [
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

  return result
}

async function getMostUsedServices() {
  'use server'

  const services = [
    {
      icon: "/water.svg",
      title: "Pedido de nova ligação",
      href: "http://177.136.204.56:180/totem"
    },
    {
      icon: "/water.svg",
      title: "Religação de Água",
      href: "http://177.136.204.56:180/totem"
    },
    {
      icon: "/clock.svg",
      title: "Trocar registro cavalete",
      href: "http://177.136.204.56:180/totem"
    },
    {
      icon: "/swap-fill.svg",
      title: "Trocar de hidrômetro",
      href: "http://177.136.204.56:180/totem"
    }
    , {
      icon: "/address-book-tabs-fill.svg",
      title: "Alterar dados cadastrais",
      href: "http://177.136.204.56:180/totem"
    },
    {
      icon: "/drop-slash-fill.svg",
      title: "Desligamento temporário",
      href: "http://177.136.204.56:180/totem"
    },
    {
      icon: "/clock-with-wrench.svg",
      title: "Conserto de cavalete",
      href: "http://177.136.204.56:180/totem"
    },
    {
      icon: "/file-arrow-down-fill.svg",
      title: "2 Via de conta",
      href: "http://177.136.204.56:180/totem"
    }
  ]

  return services
}

async function getLatestBids() {
  'use server'

  const values = [
    { title: 'Pregão Eletrônico', opening: "25/04/2023", closing: "09/08/2023" },
    { title: 'Concorrência Pública', opening: "15/05/2023", closing: "30/09/2023" },
    { title: 'Tomada de Preços', opening: "01/06/2023", closing: "15/10/2023" },
    { title: 'Convite', opening: "10/07/2023", closing: "20/11/2023" },
    { title: 'Leilão', opening: "25/08/2023", closing: "15/12/2023" }
  ];

  return values
}

async function getImages() {
  'use server'

  return [
    {
      img: "/grid-example.jpeg"
    },
    {
      img: "/grid-example.jpeg"
    },
    {
      img: "/grid-example.jpeg"
    },
    {
      img: "/grid-example.jpeg"
    },
    {
      img: "/grid-example.jpeg"
    }
  ]
}

async function getSummary() {
  'use server'

  return "O Departamento de Água e Esgoto de Várzea Grande (DAE-VG) foi criado em 5 de junho de 1997, conforme Lei Municipal nº 1.733 e alterado em 08 de abril de 1998, conforme Lei Municipal nº 1.866 para atender à comunidade em saneamento básico de qualidade."
}

export default async function Home() {
  const latestNewsData = getLastNews()
  const mostUsedServicesData = getMostUsedServices()
  const latestBidsData = getLatestBids()
  const imagesData = getImages()
  const summaryData = getSummary()

  const [latestNews, mostUsedServices, latestBids, images, summary] =
    await Promise.all([latestNewsData, mostUsedServicesData, latestBidsData, imagesData, summaryData])

  return (
    <>
      <Header />
      <main className="relative mt-20 text-white-0">
        <Banner values={latestNews} />
        <Services values={mostUsedServices} />
        <AboutUs summary={summary} />
        <LatestBids values={latestBids} />
        <ImageGallery values={images} />
      </main>
      <Footer />
    </>
  );
}

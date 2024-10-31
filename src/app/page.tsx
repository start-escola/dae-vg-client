import AboutUs from "@/components/AboutUs";
import Banner from "@/components/Banner";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ImageGallery from "@/components/ImageGallery";
import LatestBids from "@/components/LatestBids";
import Services from "@/components/Services";
import WebChat from "@/components/WebChat";
import { GalleryResponse, NewsResponse } from "@/interfaces/request";
import api from "@/utils/api";
import { normalizeFileUrl } from "@/utils/normalize";
import Warning from "@/components/Warning";

async function getLastNews() {
  "use server";

  const { data: page } = await api.get<NewsResponse>(
    "/news?populate=*&sort[0]=publishedAt:desc&pagination[page]=1&pagination[pageSize]=5"
  );

  const result = page.data.map(({ id, attributes }) => ({
    id,
    title: attributes.title,
    link: `/comunicacao/noticias-e-eventos/noticias/${id}`,
    description: attributes.short_description,
    img: normalizeFileUrl(attributes.main_image.data?.attributes.url),
  }));

  return result;
}

async function getMostUsedServices() {
  "use server";

  const services = [
    {
      icon: "/water.svg",
      title: "Pedido de nova ligação",
      href: "http://177.136.204.56:180/totem",
    },
    {
      icon: "/water.svg",
      title: "Religação de Água",
      href: "http://177.136.204.56:180/totem",
    },
    {
      icon: "/clock.svg",
      title: "Trocar registro cavalete",
      href: "http://177.136.204.56:180/totem",
    },
    {
      icon: "/swap-fill.svg",
      title: "Trocar de hidrômetro",
      href: "http://177.136.204.56:180/totem",
    },
    {
      icon: "/address-book-tabs-fill.svg",
      title: "Alterar dados cadastrais",
      href: "http://177.136.204.56:180/totem",
    },
    {
      icon: "/drop-slash-fill.svg",
      title: "Desligamento temporário",
      href: "http://177.136.204.56:180/totem",
    },
    {
      icon: "/clock-with-wrench.svg",
      title: "Conserto de cavalete",
      href: "http://177.136.204.56:180/totem",
    },
    {
      icon: "/file-arrow-down-fill.svg",
      title: "2 Via de conta",
      href: "http://177.136.204.56:180/totem",
    },
  ];

  return services;
}

async function getLatestBids() {
  "use server";

  const { data: tenders } = await api.get(
    "/tenders?populate[last_status]=*&populate[tender_type]=*&pagination[limit]=15&sort[0]=publishedAt:desc"
  );

  const values = tenders.data.map(
    ({ id, attributes }: { id: number; attributes: any }) => ({
      id,
      title: attributes.tender_type.data.attributes.name,
      opening: attributes.opening_date?.replaceAll("-", "/"),
      closing: attributes.closing_date?.replaceAll("-", "/"),
      realization: attributes.realization?.replaceAll("-", "/"),
      status: attributes.status,
      slug: attributes.tender_type.data.attributes.slug,
      last_status: attributes.last_status,
    })
  );

  return values;
}

async function getImages() {
  "use server";

  const videoExtensions = ["mp4", "mov", "avi", "mkv", "flv", "wmv", "webm"];
  const imageExtensions = ["jpg", "jpeg", "png", "gif", "bmp", "svg", "webp"];

  const { data: page } = await api.get<GalleryResponse>(
    "/gallery?populate[conteudo][populate][midia]=*"
  );

  const result = page.data.attributes.conteudo.map(({ id, midia, title }) => {
    const ext = midia.data?.attributes.ext.toLowerCase().replace(".", "");

    let type = "unknown";
    if (videoExtensions.includes(ext)) {
      type = "video";
    } else if (imageExtensions.includes(ext)) {
      type = "image";
    }

    return { img: normalizeFileUrl(midia.data?.attributes.url) };
  });

  return result;
}

async function getSummary() {
  "use server";

  const { data: page } = await api.get("/home");

  const { summary } = page.data.attributes;

  return summary;
}

async function getWarnings() {
  "use server";

  const { data: page } = await api.get(
    "/warnings?populate=*&sort[0]=publishedAt:desc&pagination[limit]=1"
  );

  const result = page.data.map(
    ({ id, attributes: { image } }: { id: number; attributes: any }) => ({
      id,
      ...image.data.attributes,
    })
  );

  return { img: result[0]?.url ? normalizeFileUrl(result[0]?.url) : null };
}

export default async function Home() {
  const latestNewsData = getLastNews();
  const mostUsedServicesData = getMostUsedServices();
  const latestBidsData = getLatestBids();
  const imagesData = getImages();
  const summaryData = getSummary();
  const warningsData = getWarnings();

  const [latestNews, mostUsedServices, latestBids, images, summary, warnings] =
    await Promise.all([
      latestNewsData,
      mostUsedServicesData,
      latestBidsData,
      imagesData,
      summaryData,
      warningsData,
    ]);

  return (
    <>
      <Header />
      <main className="relative mt-32 text-white-0">
        <Warning values={warnings} />
        <Banner values={latestNews} />
        <Services values={mostUsedServices} />
        <AboutUs summary={summary} />
        <LatestBids values={latestBids} />
        <ImageGallery values={images} />
        <WebChat />
      </main>
      <Footer />
    </>
  );
}

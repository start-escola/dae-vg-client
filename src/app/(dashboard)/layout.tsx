import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main className="mx-auto px-4 py-12 mt-40 container">{children}</main>
      <Footer />
    </>
  );
}

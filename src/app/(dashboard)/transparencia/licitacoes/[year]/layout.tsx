import BackBtn from "../back-btn";

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <>
      <BackBtn />
      {children}
    </>
  );
}

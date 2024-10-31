"use client";
import VLibras from "vlibras-nextjs";

const VLibrasClient = () =>
  process.env.NODE_ENV === "production" ? (
    <div className="z-40 fixed bottom-1/2 right-0 translate-y-1/2">
      <VLibras forceOnload />
    </div>
  ) : (
    <></>
  );

export default VLibrasClient;

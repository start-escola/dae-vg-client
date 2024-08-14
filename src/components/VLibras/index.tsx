'use client'
import VLibras from "vlibras-nextjs";

const VLibrasClient = () => process.env.NODE_ENV === "production" ? <VLibras forceOnload /> : <></>

export default VLibrasClient
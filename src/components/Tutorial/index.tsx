import { useState } from "react"

const Tutorial = () => {
  const [showVideo, setShowVideo] = useState(false);
  const [showTutorial, setShowTutorial] = useState(true)

  if (!showTutorial) return null

  return (
    <>
      <div className="shadow-inner w-full bg-white-0 after:block after:w-full after:h-1 after:bg-primary-500 after:relative after:z-50">
        <div className="relative container mx-auto p-4 pr-12">
          <p className="text-base font-bold text-black">Dúvidas sobre como emitir sua segunda via? Assista ao nosso vídeo de 43 segundos!</p>
          <p className="text-base font-light text-black">Descubra de forma rápida e prática como acessar a segunda via da sua fatura. Sem complicações, direto ao ponto!</p>
          <button onClick={() => setShowVideo(true)} className="px-4 py-2 bg-primary-500 hover:bg-primary-700 rounded mt-4">Assistir</button>
          <button onClick={() => setShowTutorial(false)} className="absolute right-4 top-4 text-xl font-bold text-primary-500">X</button>
        </div>
      </div>
      {
        showVideo && (
          <div className="fixed z-50 top-0 left-0 w-full h-full bg-black bg-opacity-80">
            <div className="w-[80%] absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 p-4">
              <video className="w-full h-full" controls src="https://daevg.com.br/cms/uploads/fatura_e80829b83a.mp4"></video>
            </div>
            <button onClick={() => setShowVideo(false)} className="absolute right-4 top-4 text-xl font-bold text-white-0">X</button>
          </div>
        )
      }
    </>
  )
}

export default Tutorial
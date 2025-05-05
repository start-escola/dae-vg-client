import Image from "next/image";

const WebChat = () => {
  return (
    <div className="fixed right-2 bottom-10 font-boldz z-50 w-14 h-14 md:w-20 md:h-20">
      <a
        href="https://webchat.tatodesk.com/webchat-inject-fullscreen.html?app=48dba43f-073b-4b6c-90c6-86d4433bedfd"
        target="_blank"
      >
        <Image
          src="/wpp.png"
          alt="Support"
          fill
        />
      </a>
    </div>
  );
};

export default WebChat;

"use client";

import Script from "next/script";

const WebChatScript = () => {
  return (
    <Script
      async={true}
      defer={true}
      id="webchat-inject"
      src="https://webchat.tatodesk.com/webchat-inject.js?app=48dba43f-073b-4b6c-90c6-86d4433bedfd"
    ></Script>
  );
};

export default WebChatScript;

export const isExternalUrl = (url: string): boolean => {
  try {
    const { hostname } = new URL(url);
    // Verifica se o hostname é localhost ou 127.0.0.1
    return hostname !== "localhost" && hostname !== "127.0.0.1";
  } catch (error) {
    // Retorna true em caso de erro na URL (por exemplo, URL inválida)
    if (process.env.NODE_ENV === "development") return false;
    return true;
  }
};

export const normalizeFileUrl = (url: string): string => {
  if (isExternalUrl(url)) {
    return url; // URLs externas já estão normalizadas
  } else {
    // Obter a URL base da variável de ambiente
    const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace(
      "/api",
      "/uploads"
    );

    if (!baseUrl) {
      throw new Error(
        "A variável de ambiente NEXT_PUBLIC_API_URL não está definida"
      );
    }

    // Adicionar barra inicial se não houver uma
    if (!url?.startsWith("/")) {
      url = "/" + url;
    }

    // Construir a URL completa
    return new URL(url, baseUrl).toString();
  }
};


export const isExternalUrl = (url: string) => {
  try {
    if (url.startsWith("http://") || url.startsWith("https://")) {
      return true;
    }
  } catch (error) {
    // Retorna true em caso de erro na URL (por exemplo, URL inválida)
    return true;
  }
};

export const normalizeFileUrl = (url: string): string => {
  if (isExternalUrl(url)) {
    return url; // URLs externas já estão normalizadas
  } else {
    // Obter a URL base da variável de ambiente
    const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace("/api", "");

    return baseUrl +  url;
  }
};


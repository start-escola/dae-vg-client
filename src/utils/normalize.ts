export const isExternalUrl = (url: string): boolean => {
  // Expressão regular para verificar se a URL começa com http ou https
  const externalUrlPattern = /^(http|https):\/\//;
  return externalUrlPattern.test(url);
}

export const normalizeFileUrl = (url: string): string => {
  if (isExternalUrl(url)) {
    return url; // URLs externas já estão normalizadas
  } else {
    // Obter a URL base da variável de ambiente
    const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace("/api", "/uploads");

    if (!baseUrl) {
      throw new Error('A variável de ambiente NEXT_PUBLIC_API_URL não está definida');
    }

    // Adicionar barra inicial se não houver uma
    if (!url?.startsWith('/')) {
      url = '/' + url;
    }

    // Construir a URL completa
    return new URL(url, baseUrl).toString();
  }
}
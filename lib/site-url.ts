const DEFAULT_SITE_URL = "https://www.knowitafrica.com";

export function getSiteUrl(fallback = DEFAULT_SITE_URL) {
  const rawValue = process.env.NEXT_PUBLIC_SITE_URL?.trim() || fallback;
  const withProtocol = /^https?:\/\//i.test(rawValue) ? rawValue : `https://${rawValue}`;

  try {
    return new URL(withProtocol).origin;
  } catch {
    return fallback;
  }
}

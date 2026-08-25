import { DEFAULT_LOCALE, type Locale } from "./i18n";

/** "há 3 dias" / "3 days ago", from a day count. */
export function formatDaysAgo(
  days: number,
  locale: Locale = DEFAULT_LOCALE
): string {
  if (locale === "en") {
    if (days <= 0) return "today";
    if (days < 30) return `${days} day${days > 1 ? "s" : ""} ago`;
    const years = Math.floor(days / 365);
    if (years >= 1) return `${years} year${years > 1 ? "s" : ""} ago`;
    const months = Math.floor(days / 30);
    return `${months} month${months > 1 ? "s" : ""} ago`;
  }

  if (days <= 0) return "hoje";
  if (days < 30) return `há ${days} dia${days > 1 ? "s" : ""}`;
  const years = Math.floor(days / 365);
  if (years >= 1) return `há ${years} ano${years > 1 ? "s" : ""}`;
  const months = Math.floor(days / 30);
  return `há ${months} ${months > 1 ? "meses" : "mês"}`;
}

export function formatUpdatedAgo(
  iso: string,
  locale: Locale = DEFAULT_LOCALE,
  now: Date = new Date()
): string {
  return formatDaysAgo(
    Math.floor((now.getTime() - Date.parse(iso)) / 86_400_000),
    locale
  );
}

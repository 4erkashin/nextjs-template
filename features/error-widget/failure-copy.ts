import { routing } from "@/i18n/routing";
import { readCookie } from "@/lib/cookie";
import en from "@/messages/en.json";
import ptBR from "@/messages/pt-BR.json";
import ru from "@/messages/ru.json";
import uk from "@/messages/uk.json";

/**
 * next-intl's default locale cookie. Named here so the crashed tree
 * does not import the middleware just to read a string.
 */
export const LOCALE_COOKIE = "NEXT_LOCALE";

type AppLocale = (typeof routing.locales)[number];

const catalogs = {
  en: en.Error,
  "pt-BR": ptBR.Error,
  ru: ru.Error,
  uk: uk.Error,
};

export function getFailureCopy(locale: AppLocale) {
  return catalogs[locale];
}

export function resolveDocumentLocale(
  cookieSource: string,
  languages: readonly string[],
): AppLocale {
  const cookieLocale = readCookie(cookieSource, LOCALE_COOKIE);

  if (cookieLocale && isAppLocale(cookieLocale)) {
    return cookieLocale;
  }

  for (const tag of languages) {
    const matched = localeFromTag(tag);

    if (matched) {
      return matched;
    }
  }

  return routing.defaultLocale;
}

function isAppLocale(value: string): value is AppLocale {
  return (routing.locales as readonly string[]).includes(value);
}

function localeFromTag(tag: string): AppLocale | undefined {
  if (isAppLocale(tag)) {
    return tag;
  }

  const language = tag.split("-")[0];

  if (language && isAppLocale(language)) {
    return language;
  }

  if (!language) {
    return undefined;
  }

  return routing.locales.find((locale) => locale.startsWith(`${language}-`));
}

import { routing } from "../i18n/routing";
import en from "../messages/en.json";
import ptBR from "../messages/pt-BR.json";
import ru from "../messages/ru.json";
import uk from "../messages/uk.json";

/**
 * Adapter for `storybook-next-intl`, not a second translation source.
 *
 * The app loads messages in `i18n/request.ts`: one locale per HTTP request,
 * via next-intl server APIs (`getRequestConfig`, `rootParams`, `notFound`).
 * Stories are not requests, so that file cannot run here.
 *
 * The addon wants `{ defaultLocale, messagesByLocale }` and wraps each story
 * in `NextIntlClientProvider`. All locales are imported up front so the toolbar
 * can switch language without a server.
 *
 * `defaultLocale` comes from `i18n/routing.ts`. Locale keys and `messages/*.json`
 * are checked against routing in `next-intl.test.ts`.
 */
const nextIntl = {
  defaultLocale: routing.defaultLocale,
  messagesByLocale: {
    en,
    "pt-BR": ptBR,
    ru,
    uk,
  },
};

export default nextIntl;

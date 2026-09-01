import en from "../messages/en.json";
import ptBR from "../messages/pt-BR.json";
import ru from "../messages/ru.json";
import uk from "../messages/uk.json";

const messagesByLocale = {
  en,
  "pt-BR": ptBR,
  ru,
  uk,
};

const nextIntl = {
  defaultLocale: "en",
  messagesByLocale,
};

export default nextIntl;

import { getTheme } from "@/theme";

import { Home } from "./home";

export default async function HomePage() {
  const theme = await getTheme();

  return <Home theme={theme} />;
}

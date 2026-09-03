import { readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { expect, test } from "vitest";

import { routing } from "../i18n/routing";
import nextIntl from "./next-intl";

const messagesDir = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "../messages",
);

const localesOnDisk = readdirSync(messagesDir)
  .filter((name) => name.endsWith(".json"))
  .map((name) => name.replace(/\.json$/, ""));

test("Storybook locales and messages/*.json match i18n/routing.ts", () => {
  const expected = [...routing.locales].toSorted();

  expect(Object.keys(nextIntl.messagesByLocale).toSorted()).toEqual(expected);
  expect(localesOnDisk.toSorted()).toEqual(expected);
});

import { component$ } from "@builder.io/qwik";
import { useLocation, useNavigate } from "@builder.io/qwik-city";
import { SupportedLanguages } from "~/lang/me";
import clsx from "clsx";

const supportedLanguages: SupportedLanguages[] = [
  SupportedLanguages.en,
  SupportedLanguages.hi,
];

const languageFullNames: Record<SupportedLanguages, string> = {
  [SupportedLanguages.en]: "English",
  [SupportedLanguages.hi]: "हिन्दी",
};
const languageIcons: Record<SupportedLanguages, string> = {
  [SupportedLanguages.en]: "🇺🇸",
  [SupportedLanguages.hi]: "🇮🇳",
};

export const LanguageSelector = component$(() => {
  const location = useLocation();
  const nav = useNavigate();
  const currentLanguage =
    location.url.searchParams.get("lang") || SupportedLanguages.en;
  return (
    <div class="flex">
      {supportedLanguages.map((lang) => (
        <button
          key={lang}
          class={clsx("px-4 py-2 hover:bg-blue-300 hover:text-white", {
            "bg-blue-500 text-white": currentLanguage === lang,
            "bg-gray-100": currentLanguage !== lang,
          })}
          onClick$={() => {
            const newUrl = new URL(location.url.href);
            newUrl.searchParams.set("lang", lang);
            nav(newUrl.href);
          }}
        >
          <span class="hidden md:inline-block mr-1">
            {languageFullNames[lang]}{" "}
          </span>
          {languageIcons[lang]}
        </button>
      ))}
    </div>
  );
});

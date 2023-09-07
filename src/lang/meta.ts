import type { DocumentHead } from "@builder.io/qwik-city";
import { SupportedLanguages, defaultLanguage } from "./me";

import aboutMe from "./me";

export const pages: {
  [key: string]: [
    {
      lang: SupportedLanguages;
      meta: DocumentHead;
    }
  ];
} = {
  index: [
    {
      lang: SupportedLanguages.en,
      meta: {
        title: `${aboutMe.en.name} - ${aboutMe.en.shortAboutText}`,
        meta: [
          {
            name: "description",
            content: aboutMe.en.shortAboutText,
          },
          {
            name: "og:image",
            content: aboutMe.en.pictures[0],
          },
        ],
      },
    },
  ],
  twitterSummary: [
    {
      lang: SupportedLanguages.en,
      meta: {
        title: `${aboutMe.en.name} - ${aboutMe.en.shortAboutText}`,
        meta: [
          {
            property: "description",
            content: aboutMe.en.shortAboutText,
          },
          {
            property: "og:image",
            content: aboutMe.en.pictures[0],
          },
          {
            property: 'twitter:card',
            content: "summary",
          },
          {
            property: "twitter:site",
            content: "@asaharan812",
          }
        ],
      }
    }
  ],
  twitterSummaryLargeImage: [
    {
      lang: SupportedLanguages.en,
      meta: {
        title: `${aboutMe.en.name} - ${aboutMe.en.shortAboutText}`,
        meta: [
          {
            property: "description",
            content: aboutMe.en.shortAboutText,
          },
          {
            property: "og:image",
            content: aboutMe.en.pictures[0],
          },
          {
            property: 'twitter:card',
            content: "large-summary",
          },
          {
            property: "twitter:site",
            content: "@asaharan812",
          }
        ],
      }
    }
  ]
};

export const getMeta = (
  lang: SupportedLanguages,
  page: string
): DocumentHead => {
  if (!pages[page]) {
    throw new Error(`Page ${page} not found`);
  }
  const p = pages[page].find((p) => p.lang === lang);
  if (!p) {
    if (lang !== defaultLanguage) {
      return getMeta(defaultLanguage, page);
    }
    throw new Error(`Page ${page} not found in ${lang}`);
  }
  return p.meta;
};

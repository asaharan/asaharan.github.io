import { component$ } from "@builder.io/qwik";
import type { DocumentHead} from "@builder.io/qwik-city";
import { useLocation } from "@builder.io/qwik-city";
import allAboutMe, { SupportedLanguages } from "~/lang/me";
import { getMeta } from "~/lang/meta";

const TwitterCard = component$(() => {
  const loc = useLocation();
  let lang = loc.url.searchParams.get("lang") || "en";

    if (!allAboutMe[lang as SupportedLanguages]) lang = SupportedLanguages.en;
    // const aboutMe = allAboutMe[lang as SupportedLanguages];
    return <div>
        {/* <meta name="twitter:card" content="summary"/>
        <meta name="twitter:site" content="@asaharan812" />
        <meta content="og:description" property={aboutMe.shortAboutText} />
        <meta content="og:title" property={aboutMe.name} />
        <meta content="og:image" property={aboutMe.avatar} /> */}
        <h1>Twitter Card</h1>
    </div>
});

export default TwitterCard;

export const head: DocumentHead = getMeta(SupportedLanguages.en, "twitterSummaryLargeImage");
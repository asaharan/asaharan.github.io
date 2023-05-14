import { component$ } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";
import { getLabels } from "~/lang/labels";
import { SupportedLanguages } from "~/lang/me";
import allAboutMe from "~/lang/me";

const headingClass = "text-lg text-gray-600 mb-4 mt-6";
export const About = component$(() => {
  const loc = useLocation();
  let lang = loc.url.searchParams.get("lang") || "en";
  if (!allAboutMe[lang as SupportedLanguages]) lang = SupportedLanguages.en;
  const aboutMe = allAboutMe[lang as SupportedLanguages];
  const labels = getLabels(lang as SupportedLanguages);
  return (
    <div>
      <img
        src={aboutMe.avatar}
        width={"200"}
        height={"200"}
        class="rounded-3xl mb-4"
        alt={aboutMe.name}
      />
      <p class="text-2xl mb-2">{aboutMe.name}</p>
      <p
        class="text-lg mb-4 text-gray-600"
        dangerouslySetInnerHTML={aboutMe.shortAbout}
      ></p>
      <h2 class={headingClass}>{labels.socialList}</h2>
      <div class="flex flex-wrap gap-4 mb-4">
        {aboutMe.socialLinks.map((social) => (
          <a
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            key={social.name}
          >
            <img
              src={social.icon}
              alt={social.name}
              class="w-[32px] h-[32px]"
              width={"32"}
              height={"32"}
            />
          </a>
        ))}
      </div>
    </div>
  );
});

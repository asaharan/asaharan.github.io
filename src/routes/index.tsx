import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { useLocation } from "@builder.io/qwik-city";
import { SupportedLanguages } from "~/lang/me";
import { getMeta } from "~/lang/meta";
import allAboutMe from "~/lang/me";
import { getLabels } from "~/lang/labels";
import { WorkExperience } from "~/components/WorkExperience";

const headingClass = "text-lg text-gray-600 mb-4 mt-6";

export default component$(() => {
  const loc = useLocation();
  let lang = loc.url.searchParams.get("lang") || "en";
  const labels = getLabels(lang as SupportedLanguages);
  if (!allAboutMe[lang as SupportedLanguages]) lang = SupportedLanguages.en;
  const aboutMe = allAboutMe[lang as SupportedLanguages];
  return (
    <>
      <img
        src={aboutMe.avatar}
        width={"200"}
        height={"200"}
        class="rounded-3xl mb-4"
        alt={aboutMe.name}
        loading="lazy"
      />
      <p class="text-2xl mb-2">{aboutMe.name}</p>
      <p
        class="text-lg mb-4 text-gray-600"
        dangerouslySetInnerHTML={aboutMe.shortAbout}
      ></p>
      <h2 class={headingClass}>
        <span>{labels.technologyList}</span>
      </h2>
      <div class="flex flex-wrap gap-4 mb-4">
        {aboutMe.technologies.map((tech) => (
          <a
            href={tech.url}
            target="_blank"
            rel="noopener noreferrer"
            class="flex flex-col items-center justify-center w-[72px] h-[72px] p-4 rounded-md bg-gray-50"
            key={tech.name}
          >
            <img
              loading="lazy"
              src={tech.icon}
              alt={tech.name}
              class="w-full h-full"
              width={"80"}
              height={"80"}
            />
          </a>
        ))}
      </div>
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
              loading="lazy"
              src={social.icon}
              alt={social.name}
              class="w-[32px] h-[32px]"
              width={"32"}
              height={"32"}
            />
          </a>
        ))}
      </div>
      <h2 class={headingClass}>{labels.workExperience}</h2>
      <div class="flex flex-col gap-4">
        {aboutMe.workExperience.map((work) => (
          <WorkExperience {...work} key={work.company} />
        ))}
      </div>
    </>
  );
});

export const head: DocumentHead = getMeta(SupportedLanguages.en, "index");

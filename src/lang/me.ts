import { customMarkdownToHTML, customMarkdownToText } from "~/utils/string";

interface Technology {
  name: string;
  icon: string;
  url: string;
}

export interface WorkExperience {
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  description: string;
  logo: string;
  website: string;
  logoHasPadding?: boolean;
}

interface SocialLink {
  name: string;
  url: string;
  icon: string;
  username: string;
}

interface AboutMe {
  greeting: string;
  name: string;
  shortAbout: string;
  shortAboutText: string;
  about: string;
  socialLinks: SocialLink[];
  avatar: string;
  pictures: string[];
  technologies: Technology[];
  workExperience: WorkExperience[];
}

export enum SupportedLanguages {
  en = "en",
  hi = "hi",
}

export const defaultLanguage = SupportedLanguages.en;

/**
 * About me in different languages
 * If a detail is not provided for a language, it will be picked from default language
 */
export const aboutMeRaw: {
  lang: SupportedLanguages;
  detail: Partial<AboutMe>;
}[] = [
  {
    lang: SupportedLanguages.en,
    detail: {
      greeting: "Hello.",
      name: "Amit Saharan",
      shortAbout:
        "Director of Technology [Masai School](https://masaischool.com), Co-founder [Prepleaf](https://www.prepleaf.com)",
      about: `I am currently working at [Masai School](https://masaischool.com) as Director of Technology. I am also a co-founder of [Prepleaf](https://www.prepleaf.com). I have been working in the software industry for more than 6 years. I love creating beatiful and scalable products.`,
      socialLinks: [
        {
          name: "Twitter",
          url: "https://twitter.com/asaharan812",
          icon: "https://cdn.svgporn.com/logos/twitter.svg",
          username: "asaharan812",
        },
        {
          name: "LinkedIn",
          url: "https://www.linkedin.com/in/asaharan",
          icon: "https://cdn.svgporn.com/logos/linkedin-icon.svg",
          username: "asaharan",
        },
        {
          name: "GitHub",
          url: "https://github.com/asaharan",
          icon: "https://cdn.svgporn.com/logos/github-icon.svg",
          username: "asaharan",
        },
        {
          name: "Facebook",
          url: "https://www.facebook.com/asaharan812",
          icon: "https://cdn.svgporn.com/logos/facebook.svg",
          username: "asaharan812",
        },
      ],
      pictures: ["https://avatars.githubusercontent.com/u/11248242?v=4"],
      avatar: "/images/amit-saharan-profile-picture.webp",
      technologies: [
        {
          name: "Qwik",
          icon: "https://cdn.svgporn.com/logos/qwik-icon.svg",
          url: "https://qwik.builder.io",
        },
        {
          name: "Svelte",
          icon: "https://cdn.svgporn.com/logos/svelte-icon.svg",
          url: "https://svelte.dev",
        },
        {
          name: "TypeScript",
          icon: "https://cdn.svgporn.com/logos/typescript-icon.svg",
          url: "https://www.typescriptlang.org",
        },
        {
          name: "MongoDB",
          icon: "https://cdn.svgporn.com/logos/mongodb-icon.svg",
          url: "https://www.mongodb.com",
        },
        {
          name: "Node",
          icon: "https://cdn.svgporn.com/logos/nodejs-icon.svg",
          url: "https://nodejs.org",
        },
        {
          name: "React",
          icon: "https://cdn.svgporn.com/logos/react.svg",
          url: "https://reactjs.org",
        },
      ],
      workExperience: [
        {
          company: "Masai School",
          role: "Director of Technology",
          startDate: "April 2022",
          endDate: "Present",
          description:
            "Masai School is a career focused coding school. We offer 30 weeks of intensive coding bootcamp where we train students to become software engineers. We have trained more than 1000 students so far.",
          logo: "/icons/masai-logo-dark.svg",
          website: "https://masaischool.com",
          logoHasPadding: true,
        },
        {
          company: "Prepleaf",
          role: "Co-founder & CTO",
          startDate: "June 2019",
          endDate: "Present",
          description:
            "Prepleaf is a platform for students to prepare for their exams. We have more than 100,000 students using our platform to prepare for their exams.",
          logo: "/icons/prepleaf-logo-dark.svg",
          website: "https://www.prepleaf.com",
        },
        {
          company: "VMock",
          role: "Software Developer",
          startDate: "June 2017",
          endDate: "May 2019",
          description:
            "VMock is a platform for students to prepare for their interviews. We have more than 100,000 students using our platform to prepare for their interviews.",
          logo: "/icons/vmock-logo-dark.png",
          website: "https://www.vmock.com",
        },
      ],
    },
  },
  {
    lang: SupportedLanguages.hi,
    detail: {
      greeting: "नमस्ते।",
      name: "अमित सहराण",
      shortAbout:
        "टेक्नोलॉजी के निदेशक [Masai School](https://masaischool.com), सह संस्थापक [Prepleaf](https://www.prepleaf.com)",
      about: `मैं वर्तमान में [Masai School](https://masaischool.com) में टेक्नोलॉजी के निदेशक के रूप में काम कर रहा हूं। मैं [Prepleaf](https://www.prepleaf.com) का सह संस्थापक भी हूं। मैं 6 से अधिक साल से सॉफ्टवेयर उद्योग में काम कर रहा हूं। मुझे सुंदर और स्केलेबल उत्पाद बनाना पसंद है।`,
    },
  },
].map((a) => ({
  ...a,
  detail: {
    ...a.detail,
    shortAboutText: customMarkdownToText(a.detail.shortAbout),
    shortAbout: customMarkdownToHTML(a.detail.shortAbout),
    about: customMarkdownToHTML(a.detail.about),
  },
}));

const defaultAboutMe = aboutMeRaw.find(
  (a) => a.lang === defaultLanguage
)?.detail;

const aboutMe: { [key in SupportedLanguages]: AboutMe } = aboutMeRaw.reduce(
  (acc, curr) => {
    acc[curr.lang] = {
      ...defaultAboutMe,
      ...curr.detail,
    } as AboutMe;
    return acc;
  },
  {} as { [key in SupportedLanguages]: AboutMe }
);

export default aboutMe;

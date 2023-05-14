import { component$, useStore } from "@builder.io/qwik";
import { LanguageSelector } from "../LanguageSelector";
import { TopbarLink } from "./TopbarLink";
import clsx from "clsx";

const links = [
  {
    text: "Home",
    href: "/",
  },
  {
    text: "Quick Tools",
    href: "/tools",
    isExternal: true,
  },
  {
    text: "Blog",
    href: "/blogs",
  },
  {
    text: "Prepleaf",
    href: "https://prepleaf.com",
    isExternal: true,
  },
  {
    text: "Masai School",
    href: "https://www.masaischool.com",
    isExternal: true,
  },
  {
    text: "College Profile",
    href: "https://home.iitk.ac.in/~amitkum",
    isExternal: true,
  },
];

export const Topbar = component$(() => {
  // use state
  const store = useStore({
    open: false,
  });
  return (
    <div class="shadow-sm h-12 fixed top-0 left-0 right-0 z-50 bg-white">
      <div class="container mx-auto flex justify-between align-middle h-12">
        <div class="md:hidden relative h-full">
          <button
            onclick$={() => (store.open = !store.open)}
            class="focus:outline-none z-10 h-12 w-12 flex justify-center items-center"
          >
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
          <div
            class={clsx(
              "fixed w-full bg-white rounded-md overflow-hidden shadow-xl z-20 transition-all duration-300",
              {
                "-left-full": !store.open,
                "left-0": !!store.open,
                "right-0": !!store.open,
              }
            )}
          >
            <div class="container mx-auto">
              {links.map((link) => (
                <TopbarLink
                  onClick$={() => {
                    store.open = false;
                  }}
                  key={link.href}
                  {...link}
                />
              ))}
            </div>
          </div>
        </div>

        <div class="md:flex hidden">
          {links.map((link) => (
            <TopbarLink
              onClick$={() => {
                store.open = false;
              }}
              key={link.href}
              {...link}
            />
          ))}
        </div>
        <div class="flex">
          <LanguageSelector />
        </div>
      </div>
    </div>
  );
});

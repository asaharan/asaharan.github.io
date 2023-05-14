import type { PropFunction } from "@builder.io/qwik";
import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";

interface TopbarLinkProps {
  text: string;
  href: string;
  isExternal?: boolean;
  onClick$: PropFunction<() => void>;
}
export const TopbarLink = component$<TopbarLinkProps>(
  ({ text, href, onClick$ }) => {
    const C = href.startsWith("http") ? "a" : Link;
    return (
      <C
        class="text-gray-700 text-sm hover:text-blue-500 flex align-middle items-center px-4 h-12"
        href={href}
        onClick$={onClick$}
      >
        {text}
      </C>
    );
  }
);

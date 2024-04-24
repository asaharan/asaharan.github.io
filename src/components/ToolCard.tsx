import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";

interface ToolCardProps {
  title: string;
  description: string;
  path: string;
}

export const ToolCard = component$(({ title, path }: ToolCardProps) => {
  return (
    <div class="bg-white rounded-lg border border-transparent relative p-[1px]">
      <div class="absolute z-20 left-0 top-0 w-full h-full rounded-lg border border-black" />
      <div class="absolute z-10 left-1 top-1 w-full h-full bg-red-400 rounded-lg" />
      <div class="p-4 z-20 relative bg-white rounded-lg border border-transparent">
        <Link href={path}>
          <p class="uppercase tracking-wide text-xl font-semibold text-blue-500">
            {title}
          </p>
        </Link>
      </div>
    </div>
  );
});

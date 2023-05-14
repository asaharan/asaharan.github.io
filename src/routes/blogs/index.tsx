import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";

interface BlogList {
  title: string;
  date: string;
  description: string;
  slug: string;
}

const blogList: BlogList[] = [
  {
    title: "A Qwik experiment",
    date: "2023-05-13",
    description: "A blog post about my experience with Qwik framework.",
    slug: "a-qwik-experiment",
  },
];

export default component$(() => {
  return (
    <div>
      <h1 class="font-bold text-3xl mb-4">Blog</h1>
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        {blogList.map((blog) => (
          <Link
            class="bg-slate-200 p-2 rounded-lg"
            href={blog.slug}
            key={blog.slug}
          >
            <div class="text-lg font-semibold">{blog.title}</div>
            <div>{blog.date}</div>
          </Link>
        ))}
      </div>
    </div>
  );
});

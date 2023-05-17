import { Link } from "@builder.io/qwik-city";

export default function Playground() {
  return (
    <div>
      <h1>Playground</h1>
      <div>
        <Link class="link" href="/playground/tweetnacl">
          TweetNaCl
        </Link>
      </div>
    </div>
  );
}

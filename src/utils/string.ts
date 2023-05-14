/**
 * Converts a string to HTML with my custom syntax
 * [text](link) => <a href="link">text</a>
 */
export function customMarkdownToHTML(input: string): string {
  const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const replacement = '<a class="link" href="$2">$1</a>';
  return input.replace(regex, replacement);
}

export function customMarkdownToText(input: string): string {
  const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const replacement = "$1";
  return input.replace(regex, replacement);
}

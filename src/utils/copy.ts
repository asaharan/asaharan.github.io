export async function copyToClipboard(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    console.log("Text copied to clipboard");
  } catch (err) {
    console.error("Error in copy to clipboard: ", err);
  }
}

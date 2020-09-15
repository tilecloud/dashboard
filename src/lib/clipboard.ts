import * as clipboard from "clipboard-polyfill";

export const copyToClipBoard = (cssSelector: string) => {
  const input = document.querySelector(cssSelector) as HTMLInputElement;
  if (input) {
    input.select();
    clipboard.writeText(input.value);
  }
};

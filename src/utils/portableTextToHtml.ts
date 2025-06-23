import { toHTML } from "@portabletext/to-html";

export function portableTextToHtml(blocks: any[]) {
  return toHTML(blocks);
}

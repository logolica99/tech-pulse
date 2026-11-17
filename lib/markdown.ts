import rehypeExternalLinks from "rehype-external-links";
import rehypeSanitize from "rehype-sanitize";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

export async function renderMarkdown(source: string): Promise<string> {
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeSanitize)
    .use(rehypeExternalLinks, {
      rel: ["noopener", "noreferrer"],
      target: "_blank",
      content: { type: "text", value: " (opens in a new tab)" },
      contentProperties: { className: ["sr-only"] },
    })
    .use(rehypeStringify)
    .process(source);

  return String(file);
}

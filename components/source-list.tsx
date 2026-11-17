import { hostnameOf } from "@/lib/format";
import type { PostSource } from "@/lib/types";

export function SourceList({ sources }: { sources: PostSource[] }) {
  return (
    <section aria-labelledby="sources-heading" className="mt-12">
      <h2 id="sources-heading" className="text-base">
        Sources
      </h2>
      <ul className="mt-2 space-y-2">
        {sources.map((source, index) => (
          <li key={`${source.url}-${index}`}>
            <a href={source.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">
              {source.title}
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            <span className="text-muted"> · {hostnameOf(source.url)}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

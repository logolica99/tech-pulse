import { hostnameOf } from "@/lib/format";
import type { PostSource } from "@/lib/types";

export function SourceList({ sources }: { sources: PostSource[] }) {
  return (
    <section aria-labelledby="sources-heading" className="mt-14 border-t border-line pt-8">
      <h2 id="sources-heading" className="font-display text-3xl tracking-tight">
        Sources
      </h2>
      <p className="mt-3 max-w-prose text-muted">
        This post relies on the documents below. Open them to check the reporting behind it.
      </p>
      <ol className="mt-6 space-y-5">
        {sources.map((source, index) => (
          <li key={`${source.url}-${index}`} className="grid grid-cols-[2.5rem_1fr] gap-3">
            <span className="pt-1 font-sans text-sm tabular-nums text-copper">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div>
              <a
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg text-ink underline decoration-line underline-offset-4 hover:decoration-accent"
              >
                {source.title}
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
              <p className="mt-1 font-sans text-sm text-muted">{hostnameOf(source.url)}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

import type { ReactNode } from "react";
import { slugify, textOf } from "@/lib/slugify";

/**
 * Small typography primitives shared by every static content page, so
 * heading size/spacing is one decision, not one per page.
 *
 * H2/H3 double as the source the right-hand "On this page" TOC (Toc.tsx)
 * scans for: `data-toc-heading` marks them as real content sections (as
 * opposed to, say, a card title elsewhere on the page that happens to be a
 * heading tag), and an id is generated from the text automatically — no page
 * has to remember to pass one just so the TOC can link to it.
 */

export function H1({ children }: { children: ReactNode }) {
    return <h1 className="text-3xl font-bold text-foreground font-sans">{children}</h1>;
}

export function Lead({ children }: { children: ReactNode }) {
    return <p className="mt-3 max-w-2xl text-base text-body">{children}</p>;
}

export function H2({ children, id }: { children: ReactNode; id?: string }) {
    return (
        <h2
            id={id ?? slugify(textOf(children))}
            data-toc-heading
            data-toc-level={2}
            className="mt-12 scroll-mt-24 text-xl font-bold text-foreground font-sans first:mt-0"
        >
            {children}
        </h2>
    );
}

export function H3({ children, id }: { children: ReactNode; id?: string }) {
    return (
        <h3
            id={id ?? slugify(textOf(children))}
            data-toc-heading
            data-toc-level={3}
            className="mt-8 scroll-mt-24 text-base font-bold text-foreground font-sans"
        >
            {children}
        </h3>
    );
}

export function P({ children }: { children: ReactNode }) {
    return <p className="mt-3 max-w-2xl text-sm leading-6 text-body">{children}</p>;
}

export function UL({ children }: { children: ReactNode }) {
    return <ul className="mt-3 max-w-2xl list-disc space-y-1.5 pl-5 text-sm leading-6 text-body">{children}</ul>;
}

export function Code({ children }: { children: ReactNode }) {
    return (
        <code className="rounded bg-control px-1.5 py-0.5 font-mono text-[13px] text-foreground">{children}</code>
    );
}

export function Callout({ children, tone = "info" }: { children: ReactNode; tone?: "info" | "warning" }) {
    return (
        <div
            className={`mt-4 max-w-2xl rounded-lg border px-4 py-3 text-sm leading-6 ${
                tone === "warning"
                    ? "border-amber-300/60 bg-amber-500/10 text-amber-900 dark:text-amber-200"
                    : "border-accent/30 bg-accent/5 text-body"
            }`}
        >
            {children}
        </div>
    );
}

export function Table({ head, rows }: { head: string[]; rows: ReactNode[][] }) {
    return (
        <div className="mt-4 overflow-x-auto rounded-lg border border-hairline">
            <table className="w-full min-w-max border-collapse text-sm">
                <thead>
                    <tr className="border-b border-hairline bg-panel">
                        {head.map((h) => (
                            <th key={h} className="whitespace-nowrap px-3 py-2 text-left text-[11px] font-bold uppercase tracking-wide text-muted">
                                {h}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-hairline">
                    {rows.map((row, i) => (
                        <tr key={i} className="transition hover:bg-control/40">
                            {row.map((cell, j) => (
                                <td key={j} className="px-3 py-2 align-top text-body">
                                    {cell}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

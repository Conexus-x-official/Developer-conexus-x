"use client";

import { useState } from "react";

/**
 * A plain, dependency-free code block — no syntax highlighter. The content on
 * this site is JSON and short cURL/JS snippets, none of which need more than
 * monospace + a copy button to be readable, and every highlighter considered
 * (Shiki, Prism) is either a build-time cost or a client bundle this docs
 * site does not otherwise carry.
 */
export default function CodeBlock({ code, language }: { code: string; language?: string }) {
    const [copied, setCopied] = useState(false);

    const copy = async () => {
        try {
            await navigator.clipboard.writeText(code);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        } catch {
            // Clipboard permission denied — the code is still selectable by hand.
        }
    };

    return (
        <div className="overflow-hidden rounded-lg border border-white/10" style={{ background: "var(--code-bg)" }}>
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-1.5">
                <span className="font-mono text-[11px] text-white/40">{language ?? "text"}</span>
                <button
                    type="button"
                    onClick={copy}
                    className="rounded-md px-2 py-0.5 text-[11px] font-medium text-white/60 transition hover:bg-white/10 hover:text-white cursor-pointer"
                >
                    {copied ? "Copied" : "Copy"}
                </button>
            </div>
            <pre className="overflow-x-auto p-4 text-[13px] leading-6" style={{ color: "var(--code-ink)" }}>
                <code>{code}</code>
            </pre>
        </div>
    );
}

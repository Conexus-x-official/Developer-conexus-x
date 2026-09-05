"use client";

import { useState } from "react";
import CodeBlock from "./CodeBlock";

export default function CodeTabs({ curl, js }: { curl: string; js: string }) {
    const [tab, setTab] = useState<"curl" | "js">("curl");

    return (
        <div>
            {/* A muted track with an elevated active pill — the same shape as a
                shadcn TabsList, built with plain utilities rather than the
                library: bg-control is the recessed groove, the active tab lifts
                off it with bg-card + shadow-sm instead of a solid colour fill. */}
            <div className="mb-1.5 inline-flex gap-0.5 rounded-lg bg-control p-1">
                {(["curl", "js"] as const).map((id) => (
                    <button
                        key={id}
                        type="button"
                        onClick={() => setTab(id)}
                        className={`rounded-md px-3 py-1 text-[11px] font-semibold transition cursor-pointer ${
                            tab === id ? "bg-card text-foreground shadow-sm" : "text-muted hover:text-body"
                        }`}
                    >
                        {id === "curl" ? "cURL" : "JavaScript"}
                    </button>
                ))}
            </div>
            <CodeBlock code={tab === "curl" ? curl : js} language={tab === "curl" ? "bash" : "javascript"} />
        </div>
    );
}

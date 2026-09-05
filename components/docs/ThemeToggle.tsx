"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "cx_docs_theme";

export default function ThemeToggle() {
    // Lazy-initialised from what the inline script in layout.tsx already
    // applied to <html>, so this never fights that first paint — no reset
    // effect, just reading the DOM state once at mount.
    const [dark, setDark] = useState(() => {
        if (typeof document === "undefined") return false;
        return document.documentElement.classList.contains("dark");
    });

    useEffect(() => {
        document.documentElement.classList.toggle("dark", dark);
        try {
            localStorage.setItem(STORAGE_KEY, dark ? "dark" : "light");
        } catch {
            // Private browsing — the toggle still works for this page view.
        }
    }, [dark]);

    return (
        <button
            type="button"
            onClick={() => setDark((value) => !value)}
            aria-label="Toggle theme"
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-hairline text-muted transition hover:bg-control cursor-pointer"
        >
            {dark ? "☀" : "☾"}
        </button>
    );
}

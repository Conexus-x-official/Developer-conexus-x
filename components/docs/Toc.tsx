"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

interface TocItem {
    id: string;
    text: string;
    level: number;
}

/** How far below the sticky header a heading has to cross before it counts as "reached" — matches the header height plus a little breathing room. */
const ACTIVATION_LINE_PX = 110;

/**
 * The right-hand "On this page" rail — scans the CURRENT page's own headings
 * (anything Prose's H2/H3 or EndpointCard's title rendered, marked with
 * `data-toc-heading`) rather than each page describing its own outline by
 * hand, so a new H2 shows up here automatically.
 *
 * Active section = the LAST heading whose top has crossed the activation
 * line, computed straight from getBoundingClientRect on scroll — not an
 * IntersectionObserver watching each heading. An observer looked right until
 * the very last section: a short final section near the bottom of the page
 * often never satisfies "intersecting" under a shrunk root margin (there is
 * no more page below it to push it into the observed band), so scrolling all
 * the way down left the PREVIOUS item lit instead of the one actually on
 * screen. Walking headings in document order and taking the last one already
 * past the line has no such edge case — and a "scrolled to the bottom of the
 * document" check forces the very last heading active even if its top never
 * quite reaches the line, which is exactly the case a short final section hits.
 */
export default function Toc() {
    const pathname = usePathname();
    const [items, setItems] = useState<TocItem[]>([]);
    const [activeId, setActiveId] = useState<string | null>(null);
    const headingsRef = useRef<HTMLElement[]>([]);

    useEffect(() => {
        // The initial setState call is deferred to a microtask rather than
        // called synchronously in the effect body — react-hooks/set-state-in-effect
        // wants an effect to subscribe to an external system and call setState
        // from ITS callback, not compute state directly inline.
        let cancelled = false;
        let ticking = false;

        const updateActive = () => {
            const headings = headingsRef.current;
            if (headings.length === 0) return;

            const atBottom =
                window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;

            if (atBottom) {
                setActiveId(headings[headings.length - 1]?.id ?? null);
                return;
            }

            let current = headings[0]?.id ?? null;
            for (const el of headings) {
                if (el.getBoundingClientRect().top <= ACTIVATION_LINE_PX) {
                    current = el.id;
                } else {
                    break;
                }
            }
            setActiveId(current);
        };

        const onScroll = () => {
            if (ticking) return;
            ticking = true;
            requestAnimationFrame(() => {
                updateActive();
                ticking = false;
            });
        };

        queueMicrotask(() => {
            if (cancelled) return;

            const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-toc-heading]"));
            headingsRef.current = elements;

            setItems(
                elements
                    .filter((el) => el.id)
                    .map((el) => ({
                        id: el.id,
                        text: el.textContent ?? "",
                        level: Number(el.dataset.tocLevel ?? 2),
                    }))
            );

            updateActive();
        });

        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);

        return () => {
            cancelled = true;
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
        };
    }, [pathname]);

    if (items.length === 0) return null;

    return (
        <nav className="sticky top-24 hidden h-[calc(100vh-7rem)] w-52 shrink-0 overflow-y-auto py-10 pl-4 xl:block">
            <p className="mb-3 px-2 text-[11px] font-bold uppercase tracking-wide text-muted">On this page</p>
            {/* Same active-row treatment as the main left sidebar (DocsShell) —
                a nav-glass box, not a coloured rail down the side. Two small
                sidebars that disagree on what "selected" looks like would read
                as two different products glued together. */}
            <ul className="space-y-0.5">
                {items.map((item) => {
                    const active = activeId === item.id;
                    return (
                        <li key={item.id}>
                            <a
                                href={`#${item.id}`}
                                className={`block rounded-md px-2 py-1.5 text-sm transition ${item.level >= 3 ? "pl-5" : ""} ${
                                    active ? "nav-glass font-semibold text-foreground" : "text-muted hover:bg-control"
                                }`}
                            >
                                {item.text}
                            </a>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}

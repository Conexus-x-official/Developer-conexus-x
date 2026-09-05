"use client";

import { useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_SECTIONS } from "@/lib/nav";
import ThemeToggle from "./ThemeToggle";
import Toc from "./Toc";

function Sidebar({ pathname, onNavigate }: { pathname: string; onNavigate?: () => void }) {
    return (
        <nav className="flex h-full flex-col gap-6 overflow-y-auto px-4 py-6">
            <Link href="/" onClick={onNavigate} className="flex items-center gap-2 px-2">
                {/* A plain string src pointing into public/, not a bundled import —
                    the main app's own Sidebar imports its Logo.png as a module
                    from app/assets/ (a location webpack/turbopack processes), but
                    files under public/ are served as-is and are not meant to be
                    resolved through the bundler's module graph. */}
                <Image src="/logo.png" alt="" width={28} height={28} priority className="h-7 w-7 object-contain" />
                <span className="font-bold text-foreground">Conexus X</span>
                <span className="text-xs text-muted">Docs</span>
            </Link>

            {NAV_SECTIONS.map((section) => (
                <div key={section.title}>
                    <p className="mb-1.5 px-2 text-[11px] font-bold uppercase tracking-wide text-muted">
                        {section.title}
                    </p>
                    <div className="flex flex-col gap-0.5">
                        {section.links.map((link) => {
                            const active = pathname === link.href;
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={onNavigate}
                                    className={`rounded-md px-2 py-1.5 text-sm transition ${
                                        active
                                            ? "nav-glass font-semibold text-foreground"
                                            : "text-body hover:bg-control"
                                    }`}
                                >
                                    {link.title}
                                </Link>
                            );
                        })}
                    </div>
                </div>
            ))}
        </nav>
    );
}

export default function DocsShell({ children }: { children: ReactNode }) {
    const pathname = usePathname();
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <div className="flex min-h-screen">
            <aside className="hidden w-64 shrink-0 border-r border-hairline bg-panel lg:block">
                <div className="sticky top-0 h-screen">
                    <Sidebar pathname={pathname} />
                </div>
            </aside>

            {mobileOpen && (
                <div className="fixed inset-0 z-40 lg:hidden">
                    <div className="absolute inset-0 bg-black/40" onClick={() => setMobileOpen(false)} />
                    <div className="absolute inset-y-0 left-0 w-72 bg-panel shadow-xl">
                        <Sidebar pathname={pathname} onNavigate={() => setMobileOpen(false)} />
                    </div>
                </div>
            )}

            <div className="flex min-w-0 flex-1 flex-col">
                {/* Sticky, not fixed: this column has no independent scroll
                    container of its own (the whole page scrolls, same as the
                    sidebar's own `sticky top-0 h-screen`), so `sticky top-0`
                    pins it against that same document scroll without a
                    height/overflow dance. */}
                <header className="sticky top-0 z-30 flex items-center justify-between gap-3 border-b border-hairline bg-card px-4 py-3 lg:justify-end">
                    <button
                        type="button"
                        onClick={() => setMobileOpen(true)}
                        className="rounded-lg border border-hairline px-2.5 py-1.5 text-sm font-medium text-body lg:hidden"
                    >
                        Menu
                    </button>
                    <ThemeToggle />
                </header>

                {/* Flush left, not centered — a fixed-width column centred in
                    whatever space is left after the sidebar reads as an
                    uneven gap on a wide screen (empty on the right, none on
                    the left).

                    Neither child is flex-1 here on purpose: that stretched
                    main to fill the row and shoved the TOC out to whatever
                    the row's own cap happened to be — correct on one screen
                    width, a growing gap between content and TOC on every
                    other. main gets its own generous max-width instead, and
                    the TOC sits right beside it with a fixed gap; any width
                    left over past the TOC is just page background, not a
                    stretch distance. */}
                <div className="flex w-full items-start gap-10">
                    <main className="min-w-0 max-w-6xl flex-1 px-8 py-10 lg:px-12">{children}</main>
                    <Toc />
                </div>
            </div>
        </div>
    );
}

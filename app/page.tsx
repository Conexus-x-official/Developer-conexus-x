import Link from "next/link";
import type { ReactNode } from "react";
import { H1, Lead, H2, P } from "@/components/docs/Prose";
import { API_RESOURCES } from "@/lib/apiReference";

/** LAYOUT.md §7's icon-tile recipe: bg-card + border, never a loose glyph — one repeatable idea instead of four differently-styled marks. */
function IconTile({ children }: { children: ReactNode }) {
    return (
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-hairline bg-card text-accent">
            {children}
        </div>
    );
}

function Card({ href, title, description, icon }: { href: string; title: string; description: string; icon: ReactNode }) {
    return (
        <Link
            href={href}
            className="flex flex-col gap-3 rounded-xl border border-hairline bg-card p-5 shadow-sm transition hover:border-accent/50 hover:shadow-md"
        >
            <IconTile>{icon}</IconTile>
            <div>
                <h3 className="font-bold text-foreground font-sans">{title}</h3>
                <p className="mt-1.5 text-sm text-body">{description}</p>
            </div>
        </Link>
    );
}

const ICONS = {
    api: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="16" rx="2" />
            <path d="M7 9h4M7 13h7M7 17h5" />
        </svg>
    ),
    sdk: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 4 3 12l6 8M15 4l6 8-6 8" />
        </svg>
    ),
    cli: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="16" rx="2" />
            <path d="m7 9 3 3-3 3M13 15h4" />
        </svg>
    ),
    key: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="8" cy="15" r="4" />
            <path d="m10.5 12.5 8-8M16 5l2 2M13 8l2 2" />
        </svg>
    ),
};

export default function Home() {
    return (
        <div>
            <H1>Conexus X developer docs</H1>
            <Lead>
                Two ways to build on Conexus X: call the REST API directly against your workspace data, or ship a
                custom view that runs inside a module — the way a monday.com module view works.
            </Lead>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <Card
                    href="/api-reference"
                    icon={ICONS.api}
                    title="REST API"
                    description={`${API_RESOURCES.length} resources — workspaces, modules, records and everything they hold. List, create, update and delete over plain HTTP.`}
                />
                <Card
                    href="/sdk"
                    icon={ICONS.sdk}
                    title="Extensions SDK"
                    description="Build a view that runs in an iframe inside a module, talking to the host over one postMessage bridge. Framework-free core, React hooks on the side."
                />
                <Card
                    href="/cli"
                    icon={ICONS.cli}
                    title="CLI & templates"
                    description="npm create @conexus-x/app — scaffold a Next.js or React starter for a new view in one command."
                />
                <Card
                    href="/authentication"
                    icon={ICONS.key}
                    title="Authentication"
                    description="Every call — REST or SDK-proxied — runs as a real signed-in user, authenticated with a Personal Integration Token."
                />
            </div>

            <H2>How the two fit together</H2>
            <P>
                The REST API is the full surface, authenticated with your own Personal Integration Token (PIT) — anything
                you could do signed in, a script can do too. The Extensions SDK is a narrower, sandboxed slice of that
                same API: a custom view never sees your PIT key, only the subset of endpoints its manifest declared and
                an admin approved, proxied through the host with the viewing user&rsquo;s own session.
            </P>
            <P>
                Building an internal script, a data sync, or a CI job against your own workspace? Start with{" "}
                <Link href="/authentication" className="font-medium text-accent hover:underline">
                    Authentication
                </Link>{" "}
                and the{" "}
                <Link href="/api-reference" className="font-medium text-accent hover:underline">
                    REST API reference
                </Link>
                . Building something other people install into their own workspace? Start with the{" "}
                <Link href="/sdk" className="font-medium text-accent hover:underline">
                    Extensions SDK
                </Link>{" "}
                and scaffold from the{" "}
                <Link href="/cli" className="font-medium text-accent hover:underline">
                    CLI
                </Link>
                .
            </P>
        </div>
    );
}

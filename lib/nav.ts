import { API_RESOURCES } from "./apiReference";

/**
 * The whole site's structure, in one place — the sidebar renders straight
 * off this rather than each page declaring its own slice of it, so adding a
 * page is a row here plus a folder, never a second place to remember to
 * update the nav.
 */
export interface NavLink {
    href: string;
    title: string;
}

export interface NavSection {
    title: string;
    links: NavLink[];
}

export const NAV_SECTIONS: NavSection[] = [
    {
        title: "Get started",
        links: [
            { href: "/", title: "Introduction" },
            { href: "/authentication", title: "Authentication" },
        ],
    },
    {
        title: "REST API",
        links: [
            { href: "/api-reference", title: "Overview" },
            ...API_RESOURCES.map((resource) => ({
                href: `/api-reference/${resource.slug}`,
                title: resource.name,
            })),
        ],
    },
    {
        title: "Extensions SDK",
        links: [
            { href: "/sdk", title: "Overview" },
            { href: "/sdk/guest-api", title: "Guest API" },
            { href: "/sdk/react-hooks", title: "React hooks" },
            { href: "/sdk/scopes", title: "Scopes & routes" },
            { href: "/sdk/manifest", title: "Manifest" },
            { href: "/sdk/hosting", title: "Hosting a view" },
        ],
    },
    {
        title: "Build an extension",
        links: [{ href: "/cli", title: "CLI & templates" }],
    },
];

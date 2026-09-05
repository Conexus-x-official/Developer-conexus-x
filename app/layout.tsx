import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import DocsShell from "@/components/docs/DocsShell";
import "./globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Conexus X Developer Docs",
    description: "REST API reference, Extensions SDK, and the CLI for building Conexus X views.",
};

/**
 * Applied before hydration so a dark-theme reader never sees a flash of the
 * light page — a plain script tag, not a client component, because a
 * component cannot run before the first paint it is trying to fix.
 */
const THEME_SCRIPT = `
(function () {
    try {
        var stored = localStorage.getItem("cx_docs_theme");
        var dark = stored ? stored === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
        if (dark) document.documentElement.classList.add("dark");
    } catch (e) {}
})();
`;

export default function RootLayout({ children }: LayoutProps<"/">) {
    return (
        <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full`} suppressHydrationWarning>
            <head>
                <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
            </head>
            <body className="min-h-full antialiased">
                <DocsShell>{children}</DocsShell>
            </body>
        </html>
    );
}

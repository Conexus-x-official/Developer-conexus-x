/** Turns heading text into a URL-safe anchor id — the same algorithm every heading on the site uses, so a link built from one page's text always lands on the element the other end actually rendered. */
export const slugify = (text: string): string =>
    text
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

/** Flattens a heading's children down to plain text for slugifying — every heading on this site is plain text or a handful of inline nodes (Code, strong), never something that needs a richer extraction. */
export const textOf = (node: unknown): string => {
    if (node === null || node === undefined || typeof node === "boolean") return "";
    if (typeof node === "string" || typeof node === "number") return String(node);
    if (Array.isArray(node)) return node.map(textOf).join("");
    if (typeof node === "object" && "props" in node) {
        return textOf((node as { props?: { children?: unknown } }).props?.children);
    }
    return "";
};

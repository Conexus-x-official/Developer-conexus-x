import type { HttpMethod } from "@/lib/apiReference";

/** A verb badge — one fixed colour per method everywhere on the site, so a reader learns the palette once. Soft fill + tinted ink + hairline border, the same 50/600/100 pill recipe every status badge in the app uses (LAYOUT.md §4.4) rather than a solid saturated chip. */
export default function Method({ method }: { method: HttpMethod }) {
    return (
        <span
            className={`method-${method.toLowerCase()} inline-flex w-[68px] shrink-0 items-center justify-center rounded-md border py-1 text-[11px] font-bold tracking-wide`}
        >
            {method}
        </span>
    );
}

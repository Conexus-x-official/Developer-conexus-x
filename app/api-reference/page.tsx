import Link from "next/link";
import { H1, Lead, H2, P } from "@/components/docs/Prose";
import Method from "@/components/docs/Method";
import { API_RESOURCES } from "@/lib/apiReference";

export default function ApiReferenceOverview() {
    return (
        <div>
            <H1>REST API reference</H1>
            <Lead>
                Plain HTTP, JSON in and out. Every endpoint below is authenticated the way{" "}
                <Link href="/authentication" className="font-medium text-accent hover:underline">
                    Authentication
                </Link>{" "}
                describes, and every one of them is real — copied from the routes the server actually registers, not
                an aspirational surface.
            </Lead>

            <H2>Conventions</H2>
            <P>Every list and single-object response wraps its payload under a named key, never a bare array or object — <code className="rounded bg-control px-1.5 py-0.5 font-mono text-[13px]">{"{ workspaces: [...] }"}</code>, <code className="rounded bg-control px-1.5 py-0.5 font-mono text-[13px]">{"{ record: {...} }"}</code>. Unwrap that one field rather than assuming the response body itself is the array.</P>
            <P>IDs are 24-character Mongo ObjectIds throughout. A path with two id segments (<code className="rounded bg-control px-1.5 py-0.5 font-mono text-[13px]">/records/:recordId/sub-records</code>) addresses a nested resource through its parent; everything else is addressed directly by its own id once you have it.</P>

            <H2>Resources</H2>
            <div className="mt-4 divide-y divide-hairline rounded-xl border border-hairline">
                {API_RESOURCES.map((resource) => (
                    <Link
                        key={resource.slug}
                        href={`/api-reference/${resource.slug}`}
                        className="flex flex-col gap-2 p-4 transition hover:bg-control/40"
                    >
                        <div className="flex items-center justify-between gap-3">
                            <h3 className="font-bold text-foreground font-sans">{resource.name}</h3>
                            <div className="flex shrink-0 gap-1">
                                {[...new Set(resource.endpoints.map((e) => e.method))].map((method) => (
                                    <Method key={method} method={method} />
                                ))}
                            </div>
                        </div>
                        <p className="text-sm text-body">{resource.description}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
}

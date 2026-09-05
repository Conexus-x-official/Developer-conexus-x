import type { ApiEndpoint } from "@/lib/apiReference";
import { examplePath, toCurl, toFetchSnippet, toJson } from "@/lib/snippets";
import { slugify } from "@/lib/slugify";
import Method from "./Method";
import ParamsTable from "./ParamsTable";
import CodeTabs from "./CodeTabs";
import CodeBlock from "./CodeBlock";

export default function EndpointCard({ endpoint }: { endpoint: ApiEndpoint }) {
    return (
        <section
            id={`${endpoint.method}-${endpoint.path}`}
            className="scroll-mt-24 rounded-xl border border-hairline bg-card p-6 shadow-sm"
        >
            <div className="flex flex-wrap items-center gap-3">
                <Method method={endpoint.method} />
                <code className="text-sm font-semibold text-foreground">{examplePath(endpoint)}</code>
            </div>

            <h3
                id={slugify(endpoint.title)}
                data-toc-heading
                data-toc-level={2}
                className="mt-4 scroll-mt-24 text-lg font-bold text-foreground font-sans"
            >
                {endpoint.title}
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-body">{endpoint.description}</p>

            {endpoint.sdkScope && (
                <p className="mt-2 inline-flex items-center gap-1.5 rounded-md bg-control px-2.5 py-1 text-xs text-muted">
                    From an extension view: requires the{" "}
                    <code className="font-mono text-[11px] font-semibold text-foreground">{endpoint.sdkScope}</code> scope
                </p>
            )}

            {/* items-start: without it, CSS Grid stretches the shorter column
                (params — often just one row, e.g. a DELETE with a single id)
                to match the taller one (curl + JSON response), leaving a big
                blank rectangle under the params table that reads like a
                second, empty sidebar. */}
            <div className="mt-6 grid items-start gap-8 border-t border-hairline pt-6 lg:grid-cols-2">
                <div>
                    {endpoint.pathParams && <ParamsTable title="Path parameters" fields={endpoint.pathParams} />}
                    {endpoint.queryParams && <ParamsTable title="Query parameters" fields={endpoint.queryParams} />}
                    {endpoint.bodyParams && <ParamsTable title="Body" fields={endpoint.bodyParams} />}

                    {endpoint.notes?.map((note, i) => (
                        <p key={i} className="mt-4 rounded-lg border border-accent/20 bg-accent/5 px-3 py-2 text-xs text-body">
                            {note}
                        </p>
                    ))}
                </div>

                <div className="space-y-4">
                    <CodeTabs curl={toCurl(endpoint)} js={toFetchSnippet(endpoint)} />

                    <div>
                        <h4 className="mb-1.5 text-[11px] font-bold uppercase tracking-wide text-muted">Example response</h4>
                        <CodeBlock code={toJson(endpoint.exampleResponse)} language="json" />
                    </div>
                </div>
            </div>
        </section>
    );
}

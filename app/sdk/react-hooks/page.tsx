import { H1, Lead, H2, P, Code, Table } from "@/components/docs/Prose";
import CodeBlock from "@/components/docs/CodeBlock";

export default function ReactHooksPage() {
    return (
        <div>
            <H1>React hooks</H1>
            <Lead>
                <Code>@conexus-x/sdk/react</Code> — a separate entry point from the framework-free core, so a view
                written in Svelte, Vue or plain JS never pays for React it does not use. A view is fundamentally a
                subscription problem: the module moves under it as the person switches collection, a colleague edits a
                cell, the theme flips. Hooks are the right shape for that; hand-rolled listen/unsubscribe in{" "}
                <Code>useEffect</Code> is where the leaks live.
            </Lead>

            <H2>Connection</H2>
            <Table
                head={["Hook", "Returns"]}
                rows={[
                    [<Code key="1">useConnection()</Code>, "{ status: \"connecting\" | \"ready\" | \"error\", connection, error }"],
                    [<Code key="2">useViewContext()</Code>, "The live ViewContext, re-rendering as the person moves around the module."],
                    [<Code key="3">useSettings&lt;T&gt;()</Code>, "This view instance's configured settings, typed to your own shape."],
                    [<Code key="4">useSelection()</Code>, "string[] — the rows currently selected on the module."],
                    [<Code key="5">useScope(scope)</Code>, "boolean — was this scope actually granted? Renders false until connected, never throws."],
                ]}
            />

            <H2>Data</H2>
            <P>
                Each of these wraps the general-purpose <Code>useConexusQuery</Code>, refetching automatically on the
                realtime event that could plausibly have changed its data — never on an unrelated one.
            </P>
            <Table
                head={["Hook", "Refetches on"]}
                rows={[
                    [<Code key="1">useRecords(collectionId)</Code>, "record or recordValue changes"],
                    [<Code key="2">useModules(workspaceId)</Code>, "module changes — the hook a workspace-level view needs, since it has no collection to list records from"],
                    [<Code key="3">useCollections(moduleId)</Code>, "collection changes"],
                    [<Code key="4">useColumns(moduleId)</Code>, "column changes"],
                ]}
            />
            <P>
                Each returns <Code>{"{ data, loading, error, refresh }"}</Code>. Build your own with{" "}
                <Code>useConexusQuery(fetcher, options)</Code> when none of the above fit — same shape, your own
                fetcher and refetch condition.
            </P>

            <div className="mt-4 max-w-2xl">
                <CodeBlock
                    language="tsx"
                    code={`const { data: records, loading, error, refresh } = useRecords(context?.collectionId);

// A custom one, refetching only on an amendment:
const { data } = useConexusQuery(
    (cx) => cx.api.amendments.list(recordId),
    { deps: [recordId], shouldRefetch: (e) => e.entity === "amendment" }
);`}
                />
            </div>

            <H2>Subscribing directly</H2>
            <P>
                <Code>useConexusEvent(topic, handler)</Code> — for anything the data hooks above do not cover. The
                handler is held in a ref internally, so passing an inline arrow never resubscribes on every render.
            </P>

            <H2>Chrome</H2>
            <Table
                head={["Hook", "What it does"]}
                rows={[
                    [<Code key="1">useAutoResize(ref?)</Code>, "Keeps the iframe as tall as the content. Opt-in, like the underlying call."],
                    [<Code key="2">useCommands()</Code>, "{ notice, openRecord, confirm, navigate, copyToClipboard } — bound and stable across renders."],
                ]}
            />

            <H2>One client per page</H2>
            <P>
                Every hook shares a single client memoised at module scope — a view iframe has exactly one parent
                host, so a context provider would be ceremony around a value that can never legitimately differ
                between two subtrees. Pass an explicit <Code>client</Code> argument to any hook only if you genuinely
                need a second one.
            </P>
        </div>
    );
}

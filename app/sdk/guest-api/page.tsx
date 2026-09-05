import { H1, Lead, H2, H3, P, Code, Table } from "@/components/docs/Prose";
import CodeBlock from "@/components/docs/CodeBlock";

export default function GuestApiPage() {
    return (
        <div>
            <H1>Guest API</H1>
            <Lead>
                Everything a view calls funnels through one client — <Code>@conexus-x/sdk</Code>&rsquo;s default
                export. No fetch, no token and no CRM base URL anywhere in this package on purpose: a view that cannot
                address the API directly is a view that cannot be tricked into addressing it with someone else&rsquo;s
                credentials.
            </Lead>

            <div className="mt-4 max-w-2xl">
                <CodeBlock
                    language="js"
                    code={`import conexus from "@conexus-x/sdk";

const cx = conexus();
const { context, settings, grantedScopes } = await cx.connect();`}
                />
            </div>

            <H2>Connection</H2>
            <Table
                head={["Call", "What it does"]}
                rows={[
                    [<Code key="1">cx.connect()</Code>, "Handshake. Resolves { context, settings, grantedScopes, hostVersion }. Safe to call from ten components — one handshake happens."],
                    [<Code key="2">cx.context</Code>, "The last context the host sent, kept current by pushes. null before connect."],
                    [<Code key="3">cx.hasScope(scope)</Code>, "Feature-detect. Never assume a scope was granted just because it was requested."],
                    [<Code key="4">cx.getContext()</Code>, "Fetch the context fresh, rather than reading the cached value."],
                    [<Code key="5">cx.getSettings()</Code>, "Fetch the view's settings fresh."],
                    [<Code key="6">cx.destroy()</Code>, "Drop every listener and reject anything still in flight."],
                ]}
            />

            <H2>Subscribing</H2>
            <P>
                <Code>cx.listen(topic, handler)</Code> subscribes to a host push and returns the unsubscribe function
                — handing it straight back as a React effect&rsquo;s cleanup is the whole reason it is shaped this
                way.
            </P>
            <Table
                head={["Topic", "Payload"]}
                rows={[
                    ["context", "The live ViewContext — pushed again whenever the person moves: switches collection, the module changes."],
                    ["settings", "The settings object configured for this view instance."],
                    ["selection", "{ recordIds: string[] } — rows selected on the module."],
                    ["change", "The CRM realtime envelope, already filtered to this module."],
                    ["theme", "{ theme: \"light\" | \"dark\" } when the host's theme flips."],
                ]}
            />

            <H2>Reading and writing data</H2>
            <P>
                <Code>cx.api.*</Code> are typed helpers over the same allowlist described in{" "}
                <a href="/sdk/scopes" className="font-medium text-accent hover:underline">Scopes &amp; routes</a> — thin
                on purpose, they build a path and hand back the unwrapped payload.
            </P>
            <div className="mt-4 max-w-2xl">
                <CodeBlock
                    language="js"
                    code={`const records = await cx.api.records.list(context.collectionId);

if (cx.hasScope("records:write")) {
    await cx.api.records.update(records[0]._id, { isCompleted: true });
}`}
                />
            </div>

            <H3>cx.api.modules</H3>
            <P><Code>list(workspaceId)</Code> · <Code>create(workspaceId, body)</Code> · <Code>update(moduleId, body)</Code> · <Code>remove(moduleId)</Code></P>

            <H3>cx.api.collections</H3>
            <P><Code>list(moduleId)</Code> · <Code>create(moduleId, body)</Code> · <Code>update(collectionId, body)</Code> · <Code>remove(collectionId)</Code></P>

            <H3>cx.api.columns</H3>
            <P><Code>list(moduleId)</Code> · <Code>create(moduleId, body)</Code> · <Code>update(columnId, body)</Code> · <Code>remove(columnId)</Code></P>

            <H3>cx.api.records</H3>
            <P>
                <Code>list(collectionId)</Code> · <Code>create(collectionId, body)</Code> · <Code>update(recordId, body)</Code> ·{" "}
                <Code>remove(recordId)</Code> · <Code>subRecords(recordId)</Code> · <Code>createSubRecord(recordId, body)</Code>
            </P>

            <H3>cx.api.values</H3>
            <P>
                <Code>forRecord(recordId)</Code> · <Code>set({"{ record, column, value }"})</Code> ·{" "}
                <Code>update(recordValueId, {"{ value }"})</Code> · <Code>clear(recordValueId)</Code>
            </P>

            <H3>cx.api.amendments</H3>
            <P><Code>list(recordId)</Code> · <Code>post(recordId, {"{ message, parentComment? }"})</Code></P>

            <H3>cx.api.members / cx.api.activity</H3>
            <P>
                <Code>members.list(workspaceId)</Code> and <Code>activity.list(workspaceId, query?)</Code> — both
                read-only; there is no members/activity write surface for a view at all.
            </P>

            <H3>The raw call</H3>
            <P>
                <Code>cx.request({"{ method, path, query, body }"})</Code> reaches an endpoint the typed helpers do not
                cover yet — still checked against the exact same allowlist and scopes.
            </P>

            <H2>Commands — asking the host to do something</H2>
            <P>
                Things only the host can do, because they touch chrome the iframe cannot reach. An unimplemented
                command rejects with <Code>command_unsupported</Code> rather than resolving quietly, so a view can
                feature-detect instead of assuming it worked.
            </P>
            <Table
                head={["Command", "Params", "Resolves to"]}
                rows={[
                    ["notice", "{ message, type?, timeoutMs? }", "void — a toast in the host chrome"],
                    ["openRecord", "{ recordId }", "void — opens the record panel the module already has"],
                    ["confirm", "{ message, confirmLabel?, cancelLabel? }", "boolean — the answer"],
                    ["resize", "{ height? }", "void — omit height to fit content"],
                    ["navigate", "{ path }", "void — paths only, never a foreign origin"],
                    ["copyToClipboard", "{ text }", "void — through the host, which has the user gesture"],
                ]}
            />

            <H2>Storage</H2>
            <P>
                <Code>cx.storage.get/set/delete/keys</Code> — a small key-value store scoped to THIS mount of the
                view. For view state (a chosen grouping, a collapsed panel), not customer data.
            </P>

            <H2>Sizing itself</H2>
            <P>
                <Code>cx.autoResize(element?)</Code> keeps the iframe as tall as its content, via a{" "}
                <Code>ResizeObserver</Code>. Opt-in — a view that draws its own scroll area does not want it.
            </P>

            <H2>Errors</H2>
            <P>
                Every failure rejects with a <Code>ConexusError</Code> carrying a <Code>code</Code>. Branch on the
                code — the message is for your console and may be reworded.
            </P>
            <Table
                head={["Code", "Meaning"]}
                rows={[
                    ["protocol_mismatch", "The host and SDK speak different major protocol versions. Upgrade @conexus-x/sdk."],
                    ["not_connected", "Not embedded in an iframe, or connect() hasn't resolved yet."],
                    ["timeout", "The host did not answer within the request/handshake timeout."],
                    ["scope_denied", "The call needs a scope this view was not granted."],
                    ["route_denied", "The endpoint is not on the allowlist at all."],
                    ["bad_request", "The CRM API rejected the request — see .status and .details."],
                    ["command_unsupported", "This host build does not implement that command."],
                    ["storage_unavailable", "The host's storage backend is down."],
                    ["host_error", "The host returned an error with no further detail."],
                    ["api_error", "The proxied CRM API call failed — .status carries its HTTP status."],
                ]}
            />
        </div>
    );
}

import Link from "next/link";
import { H1, Lead, H2, P, UL, Code, Table } from "@/components/docs/Prose";
import CodeBlock from "@/components/docs/CodeBlock";

export default function SdkOverview() {
    return (
        <div>
            <H1>Extensions SDK</H1>
            <Lead>
                Build custom views that run inside a Conexus X module — the way a monday.com module view works. A
                view is a web page you host; Conexus X frames it in an iframe and talks to it over a single
                postMessage channel.
            </Lead>

            <H2>Why an iframe</H2>
            <P>
                A custom view is code you did not write. Rendered directly into the module DOM it would share globals,
                styles, and the signed-in user&rsquo;s JWT. On its own origin it can read none of that —{" "}
                <strong>every piece of data it gets, it gets because the host handed it over.</strong>
            </P>
            <P>Two independent gates stand between a view and customer data:</P>
            <UL>
                <li>
                    <strong>Scopes</strong> — the view&rsquo;s manifest declares what it needs, an admin approves a
                    subset, the host serves only the intersection.
                </li>
                <li>
                    <strong>The route allowlist</strong> — a fixed table of endpoints a view may reach at all.{" "}
                    <Code>/api-key</Code>, <Code>/auth/*</Code>, <Code>/agent/*</Code>, <Code>/conversations/*</Code>{" "}
                    and similar are not on it, whatever a view was granted. See{" "}
                    <Link href="/sdk/scopes" className="font-medium text-accent hover:underline">
                        Scopes &amp; routes
                    </Link>
                    .
                </li>
            </UL>
            <P>
                Underneath both, the host proxies every call with the <strong>signed-in user&rsquo;s own credentials</strong>,
                so the API re-checks workspace membership and module access exactly as it would in the browser. A
                scope narrows what a view can ask for; it never widens what the person looking at it may do.
            </P>

            <H2>Entry points</H2>
            <Table
                head={["Package", "For", "Needs React"]}
                rows={[
                    [<Code key="1">@conexus-x/sdk</Code>, "The view, any framework or none", "No"],
                    [<Code key="2">@conexus-x/sdk/react</Code>, "The view, with hooks", "Yes"],
                    [<Code key="3">@conexus-x/sdk/host</Code>, "The Conexus X app side, framework-free", "No"],
                    [<Code key="4">@conexus-x/sdk/react-host</Code>, "The Conexus X app side, as a hook", "Yes"],
                    [<Code key="5">@conexus-x/sdk/manifest</Code>, "The review pipeline — validate a submission", "No"],
                ]}
            />

            <H2>Quick start</H2>
            <P>The fastest path is the CLI — see <Link href="/cli" className="font-medium text-accent hover:underline">CLI &amp; templates</Link>. The view itself looks like this:</P>
            <div className="mt-4 max-w-2xl">
                <CodeBlock
                    language="tsx"
                    code={`import {
    useConnection, useViewContext, useScope, useRecords, useCommands, useAutoResize
} from "@conexus-x/sdk/react";

export default function View() {
    const { status } = useConnection();
    const context = useViewContext();
    const canWrite = useScope("records:write");
    const commands = useCommands();

    // Refetches on its own when the module changes — no socket, no polling
    const { data: records, loading } = useRecords(context?.collectionId);

    useAutoResize();

    if (status !== "ready") return <Spinner />;

    return records?.map((record) => (
        <Row key={record._id} record={record} canWrite={canWrite}
             onOpen={() => commands.openRecord(record._id)} />
    ));
}`}
                />
            </div>

            <H2>Where this sits in the bigger plan</H2>
            <P>
                Built today: the protocol, the guest client and host bridge, React bindings for both halves, the scope
                model and route allowlist, the manifest format and its validator, and two starters (
                <Code>conexus-x-np</Code> for Next.js, <Code>conexus-x-rp</Code> for React + Vite) to scaffold from.
            </P>
            <P>
                Not built yet, each its own piece of work: backend models/routes for apps, versions, installs and
                grants; a sandbox test workspace; an automated test-case runner gating submission; an admin approval
                queue; mounting a view inside the module page itself (today that route is one module with no view
                switcher); a marketplace, billing and versioned rollout.
            </P>
        </div>
    );
}

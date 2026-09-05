import { H1, Lead, H2, P, Code, Callout } from "@/components/docs/Prose";
import CodeBlock from "@/components/docs/CodeBlock";

export default function HostingPage() {
    return (
        <div>
            <H1>Hosting a view</H1>
            <Lead>
                This page is for the Conexus X app side of the bridge — mounting a third-party view inside the
                product, not building one. Most readers of this reference want{" "}
                <a href="/sdk/guest-api" className="font-medium text-accent hover:underline">Guest API</a> instead.
            </Lead>

            <P>One hook does the whole job in a Next.js host:</P>

            <div className="mt-4 max-w-2xl">
                <CodeBlock
                    language="tsx"
                    code={`"use client";

import { useViewHost, fetchTransport } from "@conexus-x/sdk/react-host";

export function CustomView({ install, context }: Props) {
    const { iframeProps, connected, forwardChange } = useViewHost({
        entry: install.manifest.entry,
        appId: install.manifest.id,
        viewId: install.viewId,
        grantedScopes: install.grantedScopes,

        // Pass a new object when the module moves; the hook diffs and pushes
        // only on a real change, so unrelated re-renders cost nothing.
        context,
        settings: install.settings,

        transport: fetchTransport({ baseUrl: API_URL, token: () => getToken() }),
        commands: {
            notice: ({ message, type }) => toast[type ?? "info"](message),
            openRecord: ({ recordId }) => router.push(recordPath(recordId)),
            confirm: ({ message }) => confirmDialog(message)
        },
        onError: (error, detail) => console.warn("[view]", error.code, error.message, detail)
    });

    // Feed it the socket the app already has
    useRealtime((event) => forwardChange(event));

    return <iframe {...iframeProps} className="h-full w-full border-0" />;
}`}
                />
            </div>

            <H2>Why props to spread, not a component</H2>
            <P>
                <Code>useViewHost</Code> returns props to spread onto your own <Code>&lt;iframe&gt;</Code> rather than
                a <Code>&lt;ConexusView /&gt;</Code> component — the host owns how the frame is sized, bordered and
                laid out, and a wrapping component would grow a prop for each of those until it was a worse{" "}
                <Code>&lt;iframe&gt;</Code>.
            </P>

            <H2>forwardChange filters by module</H2>
            <P>
                <Code>forwardChange</Code> drops any realtime event that is not for this exact module — a view must
                never learn that a record moved on a module its user cannot open, and only the host knows which
                module that is. Feed it every event your realtime socket already receives; it decides what the guest
                actually gets.
            </P>

            <H2>Framework-free</H2>
            <P>
                <Code>createViewHost</Code> under <Code>@conexus-x/sdk/host</Code> is the same bridge without React —
                the hook above is a thin wrapper over it, not a separate implementation, so the two cannot drift.
            </P>

            <Callout tone="warning">
                Not built yet: the backend models and routes for apps, versions, installs and grants; the sandbox test
                workspace; the admin approval queue; and actually mounting a view inside the module page — today that
                route renders one board with no view switcher for third-party views. This page documents the bridge
                the rest of that pipeline will sit on top of.
            </Callout>
        </div>
    );
}

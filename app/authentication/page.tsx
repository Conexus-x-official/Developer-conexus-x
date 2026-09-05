import Link from "next/link";
import { H1, Lead, H2, P, UL, Code, Callout, Table } from "@/components/docs/Prose";
import CodeBlock from "@/components/docs/CodeBlock";

export default function AuthenticationPage() {
    return (
        <div>
            <H1>Authentication</H1>
            <Lead>
                Every REST call runs as a real signed-in user. There is no separate service-account or app-key concept
                — you authenticate as yourself, and the API enforces the exact same workspace membership and module
                access rules it would in the browser.
            </Lead>

            <H2>Personal Integration Tokens</H2>
            <P>
                A PIT (Personal Integration Token) is a long-lived key tied to your account. Generate one from{" "}
                <Code>Developer → PIT Key</Code> in the app, or via the API itself:
            </P>

            <div className="mt-4 max-w-2xl">
                <CodeBlock
                    language="bash"
                    code={`curl -X POST https://api.conexus-x.example/api/api-key/generate \\\n  -H 'Authorization: Bearer YOUR_SESSION_JWT'`}
                />
            </div>

            <Callout tone="warning">
                Generating a new key immediately invalidates the old one, and is rate-limited to once every 20 minutes.
                A request inside that window is rejected with the timestamp you may next regenerate at.
            </Callout>

            <H2>Using the key</H2>
            <P>
                Send it as the <Code>x-api-key</Code> header on every request. The server accepts either that or a
                session <Code>Authorization: Bearer</Code> JWT on the exact same routes — a PIT is simply the
                credential that outlives a browser session.
            </P>

            <div className="mt-4 max-w-2xl">
                <CodeBlock
                    language="bash"
                    code={`curl 'https://api.conexus-x.example/api/workspaces' \\\n  -H 'x-api-key: YOUR_PIT_KEY'`}
                />
            </div>

            <H2>Base URL</H2>
            <P>
                All REST endpoints in this reference are relative to your Conexus X API host, mounted under{" "}
                <Code>/api</Code>:
            </P>
            <div className="mt-4 max-w-2xl">
                <CodeBlock language="text" code={`https://api.conexus-x.example/api`} />
            </div>

            <H2>Errors</H2>
            <P>Every failure answers with a JSON body carrying a <Code>message</Code>, and the status code names the kind of failure:</P>
            <Table
                head={["Status", "Meaning"]}
                rows={[
                    ["401", "No key/token, or it isn't valid — check the header name and that the key wasn't just rotated."],
                    ["403", "Authenticated, but not a member of the workspace, or the module is private and access wasn't granted."],
                    ["404", "The id in the path doesn't exist, or isn't visible to you."],
                    ["429", "Rate-limited — currently only on POST /api-key/generate."],
                    ["503", "The database is unreachable. Retry shortly; this is never a client-side problem."],
                ]}
            />

            <H2>What you can reach</H2>
            <P>
                A PIT key has the full reach of your own account — every workspace you belong to, every module you can
                open. There are no scopes on a PIT the way there are on an{" "}
                <Link href="/sdk/scopes" className="font-medium text-accent hover:underline">
                    Extensions SDK
                </Link>{" "}
                view; scoping belongs to a narrower guest running inside an iframe you don&rsquo;t control, not to a
                script you wrote yourself and run with your own credentials.
            </P>
            <UL>
                <li>Keep your PIT key out of client-side code — anything a browser can read, a visitor can read.</li>
                <li>Rotate it if it ever leaks; the old one stops working the instant a new one is generated.</li>
                <li>
                    For a view that runs inside other people&rsquo;s workspaces, use the{" "}
                    <Link href="/sdk" className="font-medium text-accent hover:underline">
                        Extensions SDK
                    </Link>{" "}
                    instead — it never has access to anyone&rsquo;s PIT key at all.
                </li>
            </UL>
        </div>
    );
}

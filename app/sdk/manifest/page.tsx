import { H1, Lead, H2, P, UL, Code, Callout, Table } from "@/components/docs/Prose";
import CodeBlock from "@/components/docs/CodeBlock";

export default function ManifestPage() {
    return (
        <div>
            <H1>Manifest</H1>
            <Lead>
                One JSON file per view, submitted with the build. It says who wrote the view, where it&rsquo;s served
                from, which surfaces it wants to appear on, and what it needs permission to touch — the unit the
                review pipeline works on.
            </Lead>

            <div className="mt-4 max-w-2xl">
                <CodeBlock
                    language="json"
                    code={`{
    "id": "revenue-timeline",
    "name": "Revenue Timeline",
    "version": "1.0.0",
    "description": "A timeline of closed deals.",
    "publisher": { "name": "Acme", "email": "dev@acme.example" },
    "entry": "https://apps.acme.example/timeline/index.html",
    "views": [
        { "id": "timeline", "name": "Timeline", "surface": "module", "defaultHeight": 600 }
    ],
    "scopes": ["records:read", "values:read"],
    "permissionsRationale": {
        "records:read": "To place each deal on the timeline."
    }
}`}
                />
            </div>

            <H2>Fields</H2>
            <Table
                head={["Field", "Rule"]}
                rows={[
                    [<Code key="1">id</Code>, "Kebab-case, unique across the marketplace, permanent."],
                    [<Code key="2">name</Code>, "Required, 60 characters or fewer."],
                    [<Code key="3">version</Code>, "Semver, e.g. \"1.0.0\". A new version is a new review."],
                    [<Code key="4">publisher.name / .email</Code>, "Required — a contactable name and email."],
                    [<Code key="5">entry</Code>, "Absolute https URL. The host pins this origin for postMessage — a security value, not merely a location. No fragment; a query string draws a warning (the host appends its own cx* parameters)."],
                    [<Code key="6">views</Code>, "At least one. Each needs a kebab-case id unique within the manifest, a name, and a surface."],
                    [<Code key="7">views[].surface</Code>, "\"module\" (a tab beside the grid — the monday-style custom view), \"record\" (a panel in the record view), or \"workspace\" (a full page)."],
                    [<Code key="8">views[].defaultHeight</Code>, "120–2000px. The view can ask to resize once running."],
                    [<Code key="9">views[].settings</Code>, "Fields the host renders in a settings pane for an installed view — text, number, boolean, select, or column (lets the person pick a column from the mounted module)."],
                    [<Code key="10">scopes</Code>, "[] if the view needs no data access at all — never omitted."],
                    [<Code key="11">permissionsRationale</Code>, "One sentence per requested scope, shown to the reviewer and to the person installing."],
                ]}
            />

            <H2>Validating</H2>
            <div className="mt-4 max-w-2xl">
                <CodeBlock
                    language="js"
                    code={`import { parseManifest, reviewSummary } from "@conexus-x/sdk/manifest";

const result = parseManifest(json);              // https entry required
const local  = parseManifest(json, { allowLocalhostEntry: true });  // test env only

if (!result.ok) console.error(result.errors);    // every problem at once, not the first`}
                />
            </div>
            <P>
                Collects every problem in one pass rather than throwing on the first — an author fixing one error per
                submission round is the slowest possible way to publish a view, and a reviewer wants the whole picture
                at once too. <Code>warnings</Code> come back alongside <Code>errors</Code> even on a passing result —
                e.g. a <Code>:write</Code> scope requested without its <Code>:read</Code> counterpart, which almost
                always means the view can change something but not read back what it just did.
            </P>

            <Callout tone="warning">
                <Code>allowLocalhostEntry</Code> exists only for the test environment. A submission with an{" "}
                <Code>http://localhost</Code> entry is never valid — the whole point of pinning an origin is that
                customers reach the exact code that was reviewed.
            </Callout>

            <H2>The approval screen</H2>
            <P>
                <Code>reviewSummary(manifest)</Code> turns each requested scope into the plain-English list of
                endpoints it actually unlocks (the same summaries from{" "}
                <a href="/sdk/scopes" className="font-medium text-accent hover:underline">Scopes &amp; routes</a>),
                alongside the developer&rsquo;s own <Code>permissionsRationale</Code> — so an admin approves a list of
                concrete capabilities, never a bare string like <Code>records:write</Code> whose reach they have to
                take on trust.
            </P>

            <H2>The pipeline</H2>
            <UL>
                <li>Build the view against the SDK, using a manifest that validates.</li>
                <li>Point it at a sandbox (test) workspace to develop against real data with no customer risk.</li>
                <li>Submit — the same <Code>parseManifest</Code> runs again server-side; local validation is a courtesy, not the rule.</li>
                <li>Automated test cases and admin approval, reviewing exactly the scopes above.</li>
                <li>Live on the CRM, installable into a real workspace.</li>
            </UL>
        </div>
    );
}

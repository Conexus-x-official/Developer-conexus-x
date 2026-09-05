import { H1, Lead, H2, P, Code, Callout, Table } from "@/components/docs/Prose";
import Method from "@/components/docs/Method";
import type { HttpMethod } from "@/lib/apiReference";

const ROUTES: [HttpMethod, string, string, string][] = [
    ["GET", "/modules/:workspaceId", "modules:read", "List the modules in a workspace"],
    ["POST", "/modules/:workspaceId", "modules:write", "Create a module"],
    ["PUT", "/modules/:moduleId", "modules:write", "Rename, recolour or change the visibility of a module"],
    ["DELETE", "/modules/:moduleId", "modules:write", "Delete a module and everything inside it"],
    ["GET", "/collections/:moduleId", "collections:read", "List the collections on a module"],
    ["POST", "/collections/:moduleId", "collections:write", "Create a collection"],
    ["PUT", "/collections/:collectionId", "collections:write", "Rename or recolour a collection"],
    ["DELETE", "/collections/:collectionId", "collections:write", "Delete a collection and its records"],
    ["GET", "/columns/:moduleId", "columns:read", "List the columns on a module"],
    ["POST", "/columns/:moduleId", "columns:write", "Add a column"],
    ["PUT", "/columns/:columnId", "columns:write", "Change a column"],
    ["DELETE", "/columns/:columnId", "columns:write", "Delete a column and every value in it"],
    ["GET", "/records/:recordId/sub-records", "records:read", "List the sub-records of a record"],
    ["POST", "/records/:recordId/sub-records", "records:write", "Create a sub-record"],
    ["GET", "/records/:collectionId", "records:read", "List the records in a collection"],
    ["POST", "/records/:collectionId", "records:write", "Create a record"],
    ["PUT", "/records/:recordId", "records:write", "Rename, move, complete or archive a record"],
    ["DELETE", "/records/:recordId", "records:write", "Delete a record"],
    ["GET", "/record-values/references/:moduleId", "values:read", "Read mirrored values across linked modules"],
    ["GET", "/record-values/:recordId", "values:read", "Read every cell on a record"],
    ["POST", "/record-values", "values:write", "Write a cell"],
    ["PUT", "/record-values/:recordValueId", "values:write", "Change a cell"],
    ["DELETE", "/record-values/:recordValueId", "values:write", "Clear a cell"],
    ["GET", "/amendments/:recordId", "amendments:read", "Read the amendments on a record"],
    ["POST", "/amendments/:recordId", "amendments:write", "Post an amendment"],
    ["PUT", "/amendments/:amendmentId", "amendments:write", "Edit an amendment the user wrote"],
    ["DELETE", "/amendments/:amendmentId", "amendments:write", "Delete an amendment"],
    ["GET", "/workspace-members/:workspaceId", "members:read", "List workspace members"],
    ["GET", "/activity/:workspaceId", "activity:read", "Read the activity feed"],
];

export default function ScopesPage() {
    return (
        <div>
            <H1>Scopes &amp; routes</H1>
            <Lead>
                Declared in a view&rsquo;s manifest, approved by an admin, enforced by the host. This table is the
                whole allowlist — the security boundary of the SDK. A view cannot reach an endpoint merely because the
                signed-in user could; it has to be on this list, and the manifest has to hold the scope it costs.
            </Lead>

            <H2>What is deliberately missing</H2>
            <P>The interesting half of the allowlist is what is not on it:</P>
            <Table
                head={["Prefix", "Why it's excluded"]}
                rows={[
                    [<Code key="1">/api-key/*</Code>, "Returns the user's PERMANENT API key. A view that could read it would walk away with credentials that outlive the session, the module, and the view being uninstalled."],
                    [<Code key="2">/auth/*</Code>, "Sessions, OTPs, preferences, the Google handshake — none of it is a view concern, and /auth/me leaks the email of someone who never installed the view."],
                    [<Code key="3">/agent/*</Code>, "Spends the workspace AI credit balance. A view must not be able to bill a customer through their own session."],
                    [<Code key="4">/uploads/*</Code>, "Multipart, size limits, a Cloudinary bill attached to the workspace. Wanted later, gated on its own scope."],
                    [<Code key="5">/automations/*</Code>, "Rules that fire on other people's work. Reading them exposes a module's internal shape; writing them is remote code execution with extra steps."],
                    [<Code key="6">/conversations/*, /messages/*</Code>, "Private messages between colleagues. Never."],
                    [<Code key="7">/module-access/*</Code>, "Permission grants. A view that can widen access is a view that can grant itself more than it was approved for."],
                    [<Code key="8">/workspaces</Code>, "Renaming or deleting the workspace a view is merely a guest in."],
                ]}
            />
            <Callout>
                Adding a row to the allowlist is a permission decision, not a convenience one — it belongs in the same
                review as the manifest scopes it serves.
            </Callout>

            <H2>The allowlist</H2>
            <Table
                head={["Method", "Path", "Scope", "Summary"]}
                rows={ROUTES.map((row) => [
                    <Method key="m" method={row[0]} />,
                    <code key="p" className="whitespace-nowrap font-mono text-[12px] text-foreground">{row[1]}</code>,
                    <code key="s" className="whitespace-nowrap font-mono text-[12px] text-accent">{row[2]}</code>,
                    row[3],
                ])}
            />

            <H2>The ceiling: scopes never widen access</H2>
            <P>
                A scope can never widen what the signed-in user may do. The host proxies every call with that
                person&rsquo;s own credentials, and the API re-checks workspace membership and module access on each
                one — so a view granted <Code>records:write</Code> inside a module the user may only read still gets a
                403 from the server. Scopes narrow; they do not grant.
            </P>

            <H2>Degraded, not rejected</H2>
            <P>
                A view asking for more than it was approved for is not refused outright — it runs with whatever subset
                was actually granted, because a view that renders read-only is more useful to the person looking at it
                than one that refuses to load. Always check <Code>cx.hasScope(scope)</Code>; never assume a requested
                scope was granted.
            </P>

            <H2>storage</H2>
            <P>
                One more scope exists outside this table: <Code>storage</Code>, which gates the per-instance
                key-value store (<Code>cx.storage.*</Code>) rather than any CRM endpoint.
            </P>
        </div>
    );
}

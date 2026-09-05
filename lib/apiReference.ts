/**
 * THE CATALOG — every real REST endpoint Conexus X exposes, grouped by
 * resource. This is the single source the whole /api-reference section
 * renders from: one dynamic page (`app/api-reference/[resource]/page.tsx`)
 * walks this data rather than 13 hand-written pages repeating the same
 * layout, the same pattern the app's own Data Console (lib/dataConsole.ts)
 * already uses for its read-only endpoint list.
 *
 * Every endpoint here is real — copied from the routes Express actually
 * registers (backend/routes/*.routes.ts) and cross-checked against the
 * frontend's own RTK Query definitions (app/store/api/*.api.ts), which are
 * the proven-correct callers of this exact API. Nothing here is aspirational;
 * a resource with no write endpoints (Activity, Members) simply has none
 * listed, rather than a documented DELETE that would 404.
 *
 * Scoped to the CRM data model. Auth (/auth/*), Conexus Meet chat
 * (/conversations, /messages), the AI agent (/agent/*) and avatar uploads
 * (/uploads/*) are real endpoints too, but they are product-internal
 * surfaces, not integration points a third party builds against — the same
 * judgement call Data Console's own catalog already made by omission.
 */

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface FieldDef {
    name: string;
    type: string;
    required?: boolean;
    description: string;
}

export interface ApiEndpoint {
    method: HttpMethod;
    /** API-relative, with `:param` placeholders — mounted under the base URL. */
    path: string;
    title: string;
    description: string;
    pathParams?: FieldDef[];
    queryParams?: FieldDef[];
    bodyParams?: FieldDef[];
    /** Sent verbatim as the example request body, when there is one. */
    exampleRequestBody?: unknown;
    /** The JSON the endpoint actually answers with. */
    exampleResponse: unknown;
    /**
     * The scope an Extensions-SDK view needs to call this same endpoint
     * through `cx.api.*` / `cx.request()`. Absent means the endpoint is not
     * on the SDK's route allowlist at all — session-only, never reachable
     * from a custom view (see /sdk/scopes).
     */
    sdkScope?: string;
    notes?: string[];
}

export interface ApiResource {
    slug: string;
    name: string;
    description: string;
    endpoints: ApiEndpoint[];
}

const workspaceExample = {
    _id: "66f1a2b3c4d5e6f7a8b9c0d1",
    name: "Acme Sales",
    slug: "acme-sales",
    description: "Everything the go-to-market team touches.",
    logo: undefined,
    createdAt: "2026-01-14T09:12:00.000Z",
    updatedAt: "2026-08-02T15:40:11.000Z",
    totalModules: 4,
};

const memberExample = {
    _id: "66f1a2b3c4d5e6f7a8b9c0e2",
    role: "admin",
    status: "active",
    joinedAt: "2026-01-14T09:12:00.000Z",
    user: {
        _id: "66f1a2b3c4d5e6f7a8b9c0e1",
        firstName: "Dana",
        lastName: "Ortiz",
        email: "dana@acme.example",
        avatar: undefined,
        presence: "online",
    },
};

const moduleExample = {
    _id: "66f1a2b3c4d5e6f7a8b9c1a1",
    name: "Deals",
    description: "Every open and closed opportunity.",
    icon: "briefcase",
    color: "#6a00ff",
    visibility: "workspace",
    tags: [{ label: "Sales", color: "#16a34a" }],
    createdAt: "2026-01-14T09:15:00.000Z",
    updatedAt: "2026-08-02T15:40:11.000Z",
    totalRecords: 128,
    completedRecords: 61,
    performance: 48,
};

const collectionExample = {
    _id: "66f1a2b3c4d5e6f7a8b9c2b1",
    name: "In progress",
    color: "#2563eb",
    position: 0,
    isCollapsed: false,
};

const columnExample = {
    _id: "66f1a2b3c4d5e6f7a8b9c3c1",
    name: "Stage",
    type: "status",
    position: 1,
    width: 160,
    isRequired: false,
    isHidden: false,
    statusOptions: [
        { label: "Hot", color: "#ef4444" },
        { label: "Warm", color: "#f59e0b" },
        { label: "Cold", color: "#3b82f6" },
    ],
};

const recordExample = {
    _id: "66f1a2b3c4d5e6f7a8b9c4d1",
    name: "Northwind — renewal",
    position: 0,
    collectionName: "66f1a2b3c4d5e6f7a8b9c2b1",
    parentRecord: null,
    subRecordCount: 2,
    amendmentCount: 3,
    module: "66f1a2b3c4d5e6f7a8b9c1a1",
    workspace: "66f1a2b3c4d5e6f7a8b9c0d1",
    isCompleted: false,
    isArchived: false,
    createdAt: "2026-02-01T10:00:00.000Z",
    updatedAt: "2026-08-02T15:40:11.000Z",
};

const recordValueExample = {
    _id: "66f1a2b3c4d5e6f7a8b9c5e1",
    record: "66f1a2b3c4d5e6f7a8b9c4d1",
    column: columnExample,
    value: "Hot",
    createdAt: "2026-02-01T10:00:05.000Z",
    updatedAt: "2026-08-02T15:40:11.000Z",
};

const amendmentExample = {
    _id: "66f1a2b3c4d5e6f7a8b9c6f1",
    record: "66f1a2b3c4d5e6f7a8b9c4d1",
    module: "66f1a2b3c4d5e6f7a8b9c1a1",
    workspace: "66f1a2b3c4d5e6f7a8b9c0d1",
    user: memberExample.user,
    message: "Pushed the close date out two weeks — waiting on legal.",
    parentComment: null,
    edited: false,
    isDeleted: false,
    createdAt: "2026-08-01T11:20:00.000Z",
};

const activityExample = {
    _id: "66f1a2b3c4d5e6f7a8b9c7a1",
    action: "cell_updated",
    message: "changed Stage from Warm to Hot",
    targetName: "Northwind — renewal",
    before: "Warm",
    after: "Hot",
    user: {
        _id: "66f1a2b3c4d5e6f7a8b9c0e1",
        firstName: "Dana",
        lastName: "Ortiz",
        email: "dana@acme.example",
    },
    module: { _id: "66f1a2b3c4d5e6f7a8b9c1a1", name: "Deals" },
    collectionName: { _id: "66f1a2b3c4d5e6f7a8b9c2b1", name: "In progress" },
    record: { _id: "66f1a2b3c4d5e6f7a8b9c4d1", name: "Northwind — renewal" },
    column: { _id: "66f1a2b3c4d5e6f7a8b9c3c1", name: "Stage" },
    createdAt: "2026-08-02T15:40:11.000Z",
    automation: null,
    triggeredBy: null,
    canRevert: true,
    revertBlocker: null,
    revertedAt: null,
};

const automationExample = {
    _id: "66f1a2b3c4d5e6f7a8b9c8b1",
    workspace: "66f1a2b3c4d5e6f7a8b9c0d1",
    module: "66f1a2b3c4d5e6f7a8b9c1a1",
    scope: "module",
    name: "Notify on Hot",
    trigger: { type: "column_changed_to", column: "66f1a2b3c4d5e6f7a8b9c3c1", value: "Hot" },
    conditions: [],
    match: "all",
    actions: [{ type: "post_amendment", value: "This deal just turned Hot 🔥" }],
    isActive: true,
    runCount: 12,
    lastRunAt: "2026-08-02T15:40:11.000Z",
    createdAt: "2026-03-01T09:00:00.000Z",
};

const moduleAccessExample = {
    role: "member",
    modules: [
        {
            _id: "66f1a2b3c4d5e6f7a8b9c1a1",
            name: "Deals",
            icon: "briefcase",
            color: "#6a00ff",
            visibility: "private",
            granted: true,
            openToRole: false,
            canAccess: true,
            isCreator: false,
        },
    ],
};

const notificationExample = {
    _id: "66f1a2b3c4d5e6f7a8b9c9c1",
    user: "66f1a2b3c4d5e6f7a8b9c0e1",
    workspace: "66f1a2b3c4d5e6f7a8b9c0d1",
    module: "66f1a2b3c4d5e6f7a8b9c1a1",
    record: "66f1a2b3c4d5e6f7a8b9c4d1",
    type: "mention",
    title: "Dana mentioned you",
    message: "@you can you take a look at the Northwind renewal?",
    isRead: false,
    readAt: null,
    createdAt: "2026-08-02T15:41:00.000Z",
    updatedAt: "2026-08-02T15:41:00.000Z",
};

const pitKeyExample = {
    apiKey: "cxpt_9f3a7c2e8b1d4a6f0c5e2b7d9a1f3c6e",
    nextAllowedAt: "2026-08-02T16:01:00.000Z",
};

export const API_RESOURCES: ApiResource[] = [
    {
        slug: "workspaces",
        name: "Workspaces",
        description:
            "The top-level container everything else — modules, members, activity — hangs off.",
        endpoints: [
            {
                method: "GET",
                path: "/workspaces",
                title: "List workspaces",
                description: "Every workspace the caller belongs to, wrapped in its membership row.",
                exampleResponse: { workspaces: [{ workspace: workspaceExample }] },
            },
            {
                method: "GET",
                path: "/workspaces/:id",
                title: "Get a workspace",
                description: "One workspace by id.",
                pathParams: [{ name: "id", type: "string", required: true, description: "Workspace id." }],
                exampleResponse: { workspace: workspaceExample },
            },
            {
                method: "POST",
                path: "/workspaces",
                title: "Create a workspace",
                description: "Creates a workspace and makes the caller its owner.",
                bodyParams: [
                    { name: "name", type: "string", required: true, description: "Workspace name." },
                    { name: "icon", type: "string", description: "Icon catalog key." },
                ],
                exampleRequestBody: { name: "Acme Sales", icon: "briefcase" },
                exampleResponse: { workspace: workspaceExample },
            },
            {
                method: "PUT",
                path: "/workspaces/:id",
                title: "Update a workspace",
                description: "Renames or restyles a workspace. Owner/admin only.",
                pathParams: [{ name: "id", type: "string", required: true, description: "Workspace id." }],
                bodyParams: [
                    { name: "name", type: "string", description: "New name." },
                    { name: "description", type: "string", description: "New description." },
                    { name: "icon", type: "string", description: "Icon catalog key." },
                    { name: "banner", type: "string", description: "Banner key, or an absolute URL." },
                ],
                exampleRequestBody: { name: "Acme Sales EMEA" },
                exampleResponse: { workspace: workspaceExample },
            },
            {
                method: "DELETE",
                path: "/workspaces/:id",
                title: "Delete a workspace",
                description: "Deletes a workspace and everything inside it. Owner only. Irreversible.",
                pathParams: [{ name: "id", type: "string", required: true, description: "Workspace id." }],
                exampleResponse: { message: "Workspace deleted." },
            },
        ],
    },

    {
        slug: "workspace-members",
        name: "Workspace members",
        description: "Who belongs to a workspace, their role, and invitations.",
        endpoints: [
            {
                method: "GET",
                path: "/workspace-members/:workspaceId",
                title: "List members",
                description: "The roster, each row carrying role, membership status and live presence.",
                pathParams: [{ name: "workspaceId", type: "string", required: true, description: "Workspace id." }],
                exampleResponse: { members: [memberExample] },
                sdkScope: "members:read",
            },
            {
                method: "POST",
                path: "/workspace-members/:workspaceId",
                title: "Add or invite a member",
                description: "Adds an existing user, or invites one by email, at a given role.",
                pathParams: [{ name: "workspaceId", type: "string", required: true, description: "Workspace id." }],
                bodyParams: [
                    { name: "email", type: "string", description: "Invite by email. Use this or userId, not both." },
                    { name: "userId", type: "string", description: "Add an existing user by id." },
                    { name: "role", type: "string", required: true, description: "\"admin\" | \"member\" | \"guest\"." },
                ],
                exampleRequestBody: { email: "new.hire@acme.example", role: "member" },
                exampleResponse: { member: memberExample },
            },
            {
                method: "PUT",
                path: "/workspace-members/:workspaceId/:userId",
                title: "Change a member's role",
                description: "Owner/admin only. The server refuses demoting the last owner.",
                pathParams: [
                    { name: "workspaceId", type: "string", required: true, description: "Workspace id." },
                    { name: "userId", type: "string", required: true, description: "The member's user id." },
                ],
                bodyParams: [{ name: "role", type: "string", required: true, description: "New role." }],
                exampleRequestBody: { role: "admin" },
                exampleResponse: { member: memberExample },
            },
            {
                method: "DELETE",
                path: "/workspace-members/:workspaceId/:userId",
                title: "Remove a member",
                description: "Removes a person from the workspace.",
                pathParams: [
                    { name: "workspaceId", type: "string", required: true, description: "Workspace id." },
                    { name: "userId", type: "string", required: true, description: "The member's user id." },
                ],
                exampleResponse: { message: "Member removed." },
            },
            {
                method: "POST",
                path: "/workspace-members/:workspaceId/accept",
                title: "Accept an invite",
                description: "Called by the invited user themselves, resolving their own pending invite.",
                pathParams: [{ name: "workspaceId", type: "string", required: true, description: "Workspace id." }],
                exampleResponse: { message: "Invite accepted." },
            },
            {
                method: "POST",
                path: "/workspace-members/:workspaceId/decline",
                title: "Decline an invite",
                description: "Called by the invited user themselves.",
                pathParams: [{ name: "workspaceId", type: "string", required: true, description: "Workspace id." }],
                exampleResponse: { message: "Invite declined." },
            },
        ],
    },

    {
        slug: "module-access",
        name: "Module access",
        description:
            "Per-person grants on private modules — separate from workspace role, which only decides whether a grant is even necessary.",
        endpoints: [
            {
                method: "GET",
                path: "/module-access/:workspaceId/:userId",
                title: "Get a member's module access",
                description:
                    "Every module in the workspace, each with granted/openToRole/canAccess already decided server-side.",
                pathParams: [
                    { name: "workspaceId", type: "string", required: true, description: "Workspace id." },
                    { name: "userId", type: "string", required: true, description: "The member's user id." },
                ],
                exampleResponse: moduleAccessExample,
            },
            {
                method: "PUT",
                path: "/module-access/:workspaceId/:userId",
                title: "Set a member's module access",
                description:
                    "Replaces the WHOLE grant set for that person in one call — send every module id they should have, not just the one changing.",
                pathParams: [
                    { name: "workspaceId", type: "string", required: true, description: "Workspace id." },
                    { name: "userId", type: "string", required: true, description: "The member's user id." },
                ],
                bodyParams: [
                    { name: "moduleIds", type: "string[]", required: true, description: "The complete set of module ids this person may access." },
                ],
                exampleRequestBody: { moduleIds: ["66f1a2b3c4d5e6f7a8b9c1a1"] },
                exampleResponse: { message: "Access updated.", moduleIds: ["66f1a2b3c4d5e6f7a8b9c1a1"] },
            },
        ],
    },

    {
        slug: "modules",
        name: "Modules",
        description: "Boards — the unit a workspace is organized into. Modules hold collections, columns and records.",
        endpoints: [
            {
                method: "GET",
                path: "/modules/:workspaceId",
                title: "List modules",
                description: "Modules in a workspace, each with its record stats (totalRecords, completedRecords, performance).",
                pathParams: [{ name: "workspaceId", type: "string", required: true, description: "Workspace id." }],
                exampleResponse: { modules: [moduleExample] },
                sdkScope: "modules:read",
            },
            {
                method: "POST",
                path: "/modules/:workspaceId",
                title: "Create a module",
                description: "Creates a module in the given workspace.",
                pathParams: [{ name: "workspaceId", type: "string", required: true, description: "Workspace id." }],
                bodyParams: [
                    { name: "name", type: "string", required: true, description: "Module name." },
                    { name: "description", type: "string", description: "Module description." },
                    { name: "tags", type: "{label,color}[]", description: "Free-form labels." },
                ],
                exampleRequestBody: { name: "Deals", description: "Every open and closed opportunity." },
                exampleResponse: { module: moduleExample },
                sdkScope: "modules:write",
            },
            {
                method: "PUT",
                path: "/modules/:moduleId",
                title: "Update a module",
                description: "Renames, recolours, retags or changes the visibility of a module.",
                pathParams: [{ name: "moduleId", type: "string", required: true, description: "Module id." }],
                bodyParams: [
                    { name: "name", type: "string", description: "New name." },
                    { name: "description", type: "string", description: "New description." },
                    { name: "icon", type: "string", description: "Icon catalog key." },
                    { name: "color", type: "string", description: "Hex color." },
                    { name: "tags", type: "{label,color}[]", description: "Replaces the whole tag set — send [] to clear." },
                    { name: "visibility", type: "string", description: "\"private\" | \"workspace\" | \"public\". Owner/admin only." },
                ],
                exampleRequestBody: { visibility: "private" },
                exampleResponse: { module: moduleExample },
                sdkScope: "modules:write",
            },
            {
                method: "DELETE",
                path: "/modules/:moduleId",
                title: "Delete a module",
                description: "Deletes a module and everything inside it — collections, columns, records, cells. Irreversible.",
                pathParams: [{ name: "moduleId", type: "string", required: true, description: "Module id." }],
                exampleResponse: { message: "Module deleted." },
                sdkScope: "modules:write",
            },
        ],
    },

    {
        slug: "collections",
        name: "Collections",
        description: "The groups a module's records are split into — the rows a board's grid is grouped under.",
        endpoints: [
            {
                method: "GET",
                path: "/collections/:moduleId",
                title: "List collections",
                description: "Collections on a module, in module order.",
                pathParams: [{ name: "moduleId", type: "string", required: true, description: "Module id." }],
                exampleResponse: { collections: [collectionExample] },
                sdkScope: "collections:read",
            },
            {
                method: "POST",
                path: "/collections/:moduleId",
                title: "Create a collection",
                description: "Adds a collection to a module.",
                pathParams: [{ name: "moduleId", type: "string", required: true, description: "Module id." }],
                bodyParams: [
                    { name: "name", type: "string", required: true, description: "Collection name." },
                    { name: "color", type: "string", description: "Hex color." },
                    { name: "position", type: "number", description: "Sort position — omit to append." },
                ],
                exampleRequestBody: { name: "In progress", color: "#2563eb" },
                exampleResponse: collectionExample,
                sdkScope: "collections:write",
            },
            {
                method: "PUT",
                path: "/collections/:collectionId",
                title: "Update a collection",
                description: "Renames, recolours, reorders or collapses a collection.",
                pathParams: [{ name: "collectionId", type: "string", required: true, description: "Collection id." }],
                bodyParams: [
                    { name: "name", type: "string", description: "New name." },
                    { name: "color", type: "string", description: "Hex color." },
                    { name: "position", type: "number", description: "New sort position." },
                    { name: "isCollapsed", type: "boolean", description: "Collapsed state in the board UI." },
                ],
                exampleRequestBody: { name: "Closed won" },
                exampleResponse: collectionExample,
                sdkScope: "collections:write",
            },
            {
                method: "DELETE",
                path: "/collections/:collectionId",
                title: "Delete a collection",
                description: "Deletes a collection and every record inside it.",
                pathParams: [{ name: "collectionId", type: "string", required: true, description: "Collection id." }],
                exampleResponse: { message: "Collection deleted." },
                sdkScope: "collections:write",
            },
        ],
    },

    {
        slug: "columns",
        name: "Columns",
        description: "The shape of a module's grid — one definition per field every record in the module carries.",
        endpoints: [
            {
                method: "GET",
                path: "/columns/:moduleId",
                title: "List columns",
                description:
                    "Column definitions for a module — types, options, widths. A module carries two sets: the board's own (default) and its sub-record grid's (?scope=subrecord).",
                pathParams: [{ name: "moduleId", type: "string", required: true, description: "Module id." }],
                queryParams: [
                    { name: "scope", type: "string", description: "\"subrecord\" for the sub-record grid's columns. Omit for the board's own." },
                ],
                exampleResponse: { columns: [columnExample] },
                sdkScope: "columns:read",
            },
            {
                method: "POST",
                path: "/columns/:moduleId",
                title: "Add a column",
                description: "Creates a column on a module.",
                pathParams: [{ name: "moduleId", type: "string", required: true, description: "Module id." }],
                bodyParams: [
                    { name: "name", type: "string", required: true, description: "Column name." },
                    {
                        name: "type",
                        type: "string",
                        required: true,
                        description:
                            "text | number | status | date | timeline | person | email | phone | checkbox | dropdown | link | file | rating | relation | reference",
                    },
                    { name: "scope", type: "string", description: "\"subrecord\" to add it to the sub-record grid instead of the board." },
                    { name: "settings", type: "object", description: "relation: {targetModule} · reference: {via, field, aggregate}." },
                ],
                exampleRequestBody: { name: "Stage", type: "status" },
                exampleResponse: columnExample,
                sdkScope: "columns:write",
            },
            {
                method: "PUT",
                path: "/columns/:columnId",
                title: "Update a column",
                description: "Renames, resizes, reorders a column, or replaces its status options.",
                pathParams: [{ name: "columnId", type: "string", required: true, description: "Column id." }],
                bodyParams: [
                    { name: "name", type: "string", description: "New name." },
                    { name: "width", type: "number", description: "Column width in px." },
                    { name: "position", type: "number", description: "New sort position." },
                    { name: "statusOptions", type: "{label,color}[]", description: "Status columns only — replaces the whole option set." },
                ],
                exampleRequestBody: { width: 200 },
                exampleResponse: columnExample,
                sdkScope: "columns:write",
            },
            {
                method: "DELETE",
                path: "/columns/:columnId",
                title: "Delete a column",
                description: "Deletes a column and every value stored in it, on every record.",
                pathParams: [{ name: "columnId", type: "string", required: true, description: "Column id." }],
                exampleResponse: { message: "Column deleted." },
                sdkScope: "columns:write",
            },
        ],
    },

    {
        slug: "records",
        name: "Records",
        description: "Rows — the items a collection holds, and the sub-records that hang one level off them.",
        endpoints: [
            {
                method: "GET",
                path: "/records/:collectionId",
                title: "List records",
                description: "Top-level records in a collection. Archived rows and sub-records are excluded; each row carries subRecordCount and amendmentCount.",
                pathParams: [{ name: "collectionId", type: "string", required: true, description: "Collection id." }],
                exampleResponse: { records: [recordExample] },
                sdkScope: "records:read",
            },
            {
                method: "POST",
                path: "/records/:collectionId",
                title: "Create a record",
                description: "Adds a record to a collection.",
                pathParams: [{ name: "collectionId", type: "string", required: true, description: "Collection id." }],
                bodyParams: [{ name: "name", type: "string", required: true, description: "Record name." }],
                exampleRequestBody: { name: "Northwind — renewal" },
                exampleResponse: { record: recordExample },
                sdkScope: "records:write",
            },
            {
                method: "GET",
                path: "/records/:recordId/sub-records",
                title: "List sub-records",
                description: "The sub-records of one record. They carry the module's subrecord-scoped columns, not the board's.",
                pathParams: [{ name: "recordId", type: "string", required: true, description: "The parent record id." }],
                exampleResponse: { records: [{ ...recordExample, parentRecord: recordExample._id, subRecordCount: 0 }] },
                sdkScope: "records:read",
            },
            {
                method: "POST",
                path: "/records/:recordId/sub-records",
                title: "Create a sub-record",
                description: "Adds a sub-record under a record. The first sub-record on a module seeds its sub-record columns.",
                pathParams: [{ name: "recordId", type: "string", required: true, description: "The parent record id." }],
                bodyParams: [{ name: "name", type: "string", required: true, description: "Sub-record name." }],
                exampleRequestBody: { name: "Follow-up call" },
                exampleResponse: { record: { ...recordExample, parentRecord: recordExample._id } },
                sdkScope: "records:write",
            },
            {
                method: "PUT",
                path: "/records/:recordId",
                title: "Update a record",
                description:
                    "Renames, reorders, moves between collections, completes or archives a record — a sub-record IS a record, so the same route edits one.",
                pathParams: [{ name: "recordId", type: "string", required: true, description: "Record id (or sub-record id)." }],
                bodyParams: [
                    { name: "name", type: "string", description: "New name." },
                    { name: "position", type: "number", description: "New sort position." },
                    { name: "collectionName", type: "string", description: "Target collection id — set to move the record between collections." },
                    { name: "isCompleted", type: "boolean", description: "Mark complete/incomplete." },
                    { name: "isArchived", type: "boolean", description: "Archive/restore." },
                ],
                exampleRequestBody: { isCompleted: true },
                exampleResponse: { record: recordExample },
                sdkScope: "records:write",
            },
            {
                method: "DELETE",
                path: "/records/:recordId",
                title: "Delete a record",
                description: "Deletes a record. Deleting a parent archives its sub-records with it.",
                pathParams: [{ name: "recordId", type: "string", required: true, description: "Record id (or sub-record id)." }],
                exampleResponse: { message: "Record deleted.", archivedSubRecords: 2 },
                sdkScope: "records:write",
            },
        ],
    },

    {
        slug: "record-values",
        name: "Record values",
        description: "Cell values — one row per (record, column) pair, plus the resolved view of every reference/mirror column on a module.",
        endpoints: [
            {
                method: "GET",
                path: "/record-values/:recordId",
                title: "List a record's values",
                description: "Every cell on one record, each with its column populated.",
                pathParams: [{ name: "recordId", type: "string", required: true, description: "Record id." }],
                exampleResponse: { values: [recordValueExample] },
                sdkScope: "values:read",
            },
            {
                method: "GET",
                path: "/record-values/references/:moduleId",
                title: "Resolve mirrored values",
                description: "Every reference/relation column on a module, resolved for every record in one request — recordId → columnId → resolved value.",
                pathParams: [{ name: "moduleId", type: "string", required: true, description: "Module id." }],
                exampleResponse: {
                    references: {
                        [recordExample._id]: {
                            [columnExample._id]: { items: [{ recordId: recordExample._id, name: recordExample.name, value: "Hot" }], display: "Hot" },
                        },
                    },
                },
                sdkScope: "values:read",
            },
            {
                method: "POST",
                path: "/record-values",
                title: "Set a cell",
                description: "Creates the value row for a (record, column) pair that has none yet.",
                bodyParams: [
                    { name: "record", type: "string", required: true, description: "Record id." },
                    { name: "column", type: "string", required: true, description: "Column id." },
                    { name: "collectionName", type: "string", required: true, description: "The record's collection id." },
                    { name: "module", type: "string", required: true, description: "Module id." },
                    { name: "workspace", type: "string", required: true, description: "Workspace id." },
                    { name: "value", type: "unknown", required: true, description: "Encoding depends on the column's type — see the type reference on this page." },
                ],
                exampleRequestBody: {
                    record: recordExample._id,
                    column: columnExample._id,
                    collectionName: recordExample.collectionName,
                    module: recordExample.module,
                    workspace: recordExample.workspace,
                    value: "Hot",
                },
                exampleResponse: recordValueExample,
                sdkScope: "values:write",
                notes: [
                    "Value encoding by column type — status: plain label string · checkbox: \"true\"/\"false\" · person/people: JSON array of user ids · rating: decimal string in 0.5 steps (\"3.5\") · timeline: JSON {startDate,endDate} · everything else: plain string.",
                ],
            },
            {
                method: "PUT",
                path: "/record-values/:recordValueId",
                title: "Change a cell",
                description: "Updates an existing value row.",
                pathParams: [{ name: "recordValueId", type: "string", required: true, description: "Record value id." }],
                bodyParams: [{ name: "value", type: "unknown", required: true, description: "New value — same encoding rules as creating one." }],
                exampleRequestBody: { value: "Cold" },
                exampleResponse: recordValueExample,
                sdkScope: "values:write",
            },
            {
                method: "DELETE",
                path: "/record-values/:recordValueId",
                title: "Clear a cell",
                description: "Deletes a value row, returning the cell to empty.",
                pathParams: [{ name: "recordValueId", type: "string", required: true, description: "Record value id." }],
                exampleResponse: { message: "Value cleared." },
                sdkScope: "values:write",
            },
        ],
    },

    {
        slug: "amendments",
        name: "Amendments",
        description: "The conversation on a record — what the product calls an \"update\" posted underneath it.",
        endpoints: [
            {
                method: "GET",
                path: "/amendments/:recordId",
                title: "List amendments",
                description: "Every amendment posted on a record, oldest first.",
                pathParams: [{ name: "recordId", type: "string", required: true, description: "Record id." }],
                exampleResponse: { amendments: [amendmentExample] },
                sdkScope: "amendments:read",
            },
            {
                method: "POST",
                path: "/amendments/:recordId",
                title: "Post an amendment",
                description: "Adds an amendment to a record, optionally as a reply to another one.",
                pathParams: [{ name: "recordId", type: "string", required: true, description: "Record id." }],
                bodyParams: [
                    { name: "message", type: "string", required: true, description: "The note text." },
                    { name: "parentComment", type: "string", description: "Set to reply to an existing amendment." },
                    { name: "mentions", type: "string[]", description: "User ids picked via @-autocomplete." },
                ],
                exampleRequestBody: { message: "Pushed the close date out two weeks — waiting on legal." },
                exampleResponse: { amendment: amendmentExample },
                sdkScope: "amendments:write",
            },
            {
                method: "PUT",
                path: "/amendments/:amendmentId",
                title: "Edit an amendment",
                description: "Edits an amendment the caller wrote.",
                pathParams: [{ name: "amendmentId", type: "string", required: true, description: "Amendment id." }],
                bodyParams: [{ name: "message", type: "string", required: true, description: "New text." }],
                exampleRequestBody: { message: "Pushed the close date out three weeks now." },
                exampleResponse: { amendment: { ...amendmentExample, edited: true } },
                sdkScope: "amendments:write",
            },
            {
                method: "DELETE",
                path: "/amendments/:amendmentId",
                title: "Delete an amendment",
                description: "Deletes an amendment. A deleted parent with live replies is kept as a tombstone.",
                pathParams: [{ name: "amendmentId", type: "string", required: true, description: "Amendment id." }],
                exampleResponse: { message: "Amendment deleted." },
                sdkScope: "amendments:write",
            },
        ],
    },

    {
        slug: "activity",
        name: "Activity",
        description: "The audit feed — every write in a workspace, including what an automation did, cursor-paged.",
        endpoints: [
            {
                method: "GET",
                path: "/activity/:workspaceId",
                title: "List activity",
                description: "Cursor-paged rather than offset-paged, so rows landing on top cannot shift a page.",
                pathParams: [{ name: "workspaceId", type: "string", required: true, description: "Workspace id." }],
                queryParams: [
                    { name: "limit", type: "number", description: "Page size." },
                    { name: "moduleId", type: "string", description: "Filter to one module." },
                    { name: "recordId", type: "string", description: "Filter to one record." },
                    { name: "userId", type: "string", description: "Filter to one actor." },
                    { name: "action", type: "string", description: "Comma-separated action names, e.g. cell_updated,record_created." },
                    { name: "source", type: "string", description: "\"automation\" (engine-written rows only) or \"person\"." },
                    { name: "before", type: "string", description: "ISO timestamp — pass back the previous page's nextCursor." },
                ],
                exampleResponse: {
                    activities: [activityExample],
                    hasMore: true,
                    nextCursor: "2026-08-02T15:30:00.000Z",
                    retentionDays: 0,
                },
                sdkScope: "activity:read",
            },
            {
                method: "POST",
                path: "/activity/:workspaceId/:activityId/revert",
                title: "Revert an activity entry",
                description: "Undoes a change, when the server has decided it is revertible (canRevert on the entry).",
                pathParams: [
                    { name: "workspaceId", type: "string", required: true, description: "Workspace id." },
                    { name: "activityId", type: "string", required: true, description: "Activity entry id." },
                ],
                exampleResponse: { message: "Reverted." },
            },
        ],
    },

    {
        slug: "automations",
        name: "Automations",
        description:
            "Recipes: WHEN a trigger fires, ONLY IF its conditions hold, THEN run its actions. Scoped to one module, or to every module in a workspace.",
        endpoints: [
            {
                method: "GET",
                path: "/automations/:moduleId",
                title: "List a module's automations",
                description: "Recipes scoped to one module, with run counts and the last error.",
                pathParams: [{ name: "moduleId", type: "string", required: true, description: "Module id." }],
                exampleResponse: { automations: [automationExample] },
            },
            {
                method: "GET",
                path: "/automations/workspace/:workspaceId",
                title: "List a workspace's automations",
                description: "Recipes that watch every module in the workspace, addressed by column NAME rather than id.",
                pathParams: [{ name: "workspaceId", type: "string", required: true, description: "Workspace id." }],
                exampleResponse: { automations: [{ ...automationExample, module: null, scope: "workspace" }] },
            },
            {
                method: "POST",
                path: "/automations/:moduleId",
                title: "Create a module automation",
                description: "Creates a recipe scoped to one module — its trigger/conditions/actions address columns by id.",
                pathParams: [{ name: "moduleId", type: "string", required: true, description: "Module id." }],
                bodyParams: [
                    { name: "name", type: "string", required: true, description: "Recipe name." },
                    { name: "trigger", type: "object", required: true, description: "{ type, column?, value? } — see the trigger types on this page." },
                    { name: "conditions", type: "object[]", required: true, description: "[] for none." },
                    { name: "match", type: "string", required: true, description: "\"all\" or \"any\"." },
                    { name: "actions", type: "object[]", required: true, description: "{ type, ... } — see the action types on this page." },
                    { name: "isActive", type: "boolean", description: "Defaults to true." },
                ],
                exampleRequestBody: {
                    name: "Notify on Hot",
                    trigger: { type: "column_changed_to", column: columnExample._id, value: "Hot" },
                    conditions: [],
                    match: "all",
                    actions: [{ type: "post_amendment", value: "This deal just turned Hot 🔥" }],
                },
                exampleResponse: { message: "Automation created.", automation: automationExample },
                notes: [
                    "Trigger types: record_created, record_moved, record_renamed, record_completed, record_uncompleted, record_archived, column_changed, column_changed_to, subrecord_created, subrecord_column_changed, subrecord_column_changed_to, subrecord_completed, all_subrecords_completed, amendment_posted.",
                    "Action types: set_column_value, clear_column_value, move_to_collection, archive_record, set_completed, rename_record, create_subrecord, complete_all_subrecords, archive_all_subrecords, set_parent_column_value, set_parent_completed, move_parent_to_collection, create_record, post_amendment.",
                ],
            },
            {
                method: "POST",
                path: "/automations/workspace/:workspaceId",
                title: "Create a workspace automation",
                description: "Creates a recipe that watches every module in the workspace — addresses columns by NAME (columnName), not id.",
                pathParams: [{ name: "workspaceId", type: "string", required: true, description: "Workspace id." }],
                bodyParams: [
                    { name: "name", type: "string", required: true, description: "Recipe name." },
                    { name: "trigger", type: "object", required: true, description: "Same trigger types, columnName instead of column." },
                    { name: "conditions", type: "object[]", required: true, description: "[] for none." },
                    { name: "match", type: "string", required: true, description: "\"all\" or \"any\"." },
                    { name: "actions", type: "object[]", required: true, description: "Same action types, columnName instead of column." },
                ],
                exampleRequestBody: {
                    name: "Flag every Hot deal",
                    trigger: { type: "column_changed_to", columnName: "Stage", value: "Hot" },
                    conditions: [],
                    match: "all",
                    actions: [{ type: "post_amendment", value: "This deal just turned Hot 🔥" }],
                },
                exampleResponse: { message: "Automation created.", automation: { ...automationExample, module: null, scope: "workspace" } },
            },
            {
                method: "PUT",
                path: "/automations/:automationId",
                title: "Update an automation",
                description: "Edits a recipe — module-scoped or workspace-scoped, addressed by its own id either way.",
                pathParams: [{ name: "automationId", type: "string", required: true, description: "Automation id." }],
                bodyParams: [{ name: "...", type: "object", description: "Any subset of the fields accepted on create." }],
                exampleRequestBody: { isActive: false },
                exampleResponse: { message: "Automation updated.", automation: { ...automationExample, isActive: false } },
            },
            {
                method: "DELETE",
                path: "/automations/:automationId",
                title: "Delete an automation",
                description: "Deletes a recipe.",
                pathParams: [{ name: "automationId", type: "string", required: true, description: "Automation id." }],
                exampleResponse: { message: "Automation deleted." },
                notes: [
                    "There is no \"runs\" endpoint. What a recipe did is an activity row — read it from GET /activity/:workspaceId?source=automation.",
                ],
            },
        ],
    },

    {
        slug: "notifications",
        name: "Notifications",
        description: "The caller's own notification feed — mentions, assignments, invites, status changes.",
        endpoints: [
            {
                method: "GET",
                path: "/notifications",
                title: "List notifications",
                description: "The caller's own notifications, newest first.",
                queryParams: [
                    { name: "limit", type: "number", description: "Page size." },
                    { name: "isRead", type: "boolean", description: "Filter to read or unread." },
                    { name: "type", type: "string", description: "mention | assignment | invite | comment | status_change | deadline | system." },
                ],
                exampleResponse: { notifications: [notificationExample] },
            },
            {
                method: "GET",
                path: "/notifications/unread-count",
                title: "Get the unread count",
                description: "A single number, for a badge.",
                exampleResponse: { count: 3 },
            },
            {
                method: "PATCH",
                path: "/notifications/:id/read",
                title: "Mark one read",
                description: "Marks a single notification read.",
                pathParams: [{ name: "id", type: "string", required: true, description: "Notification id." }],
                exampleResponse: { notification: { ...notificationExample, isRead: true, readAt: "2026-08-02T15:45:00.000Z" } },
            },
            {
                method: "POST",
                path: "/notifications/read-all",
                title: "Mark all read",
                description: "Marks every one of the caller's notifications read.",
                exampleResponse: { message: "All notifications marked read." },
            },
            {
                method: "DELETE",
                path: "/notifications/:id",
                title: "Delete a notification",
                description: "Removes a single notification.",
                pathParams: [{ name: "id", type: "string", required: true, description: "Notification id." }],
                exampleResponse: { message: "Notification deleted." },
            },
        ],
    },

    {
        slug: "api-keys",
        name: "API keys (PIT)",
        description:
            "The Personal Integration Token — the credential this whole reference authenticates with. See Authentication for how to use it.",
        endpoints: [
            {
                method: "GET",
                path: "/api-key",
                title: "Get the caller's key",
                description: "Returns the caller's own PIT key, or null if one was never generated.",
                exampleResponse: pitKeyExample,
            },
            {
                method: "POST",
                path: "/api-key/generate",
                title: "Generate a new key",
                description:
                    "Rotates the caller's PIT key. Rate-limited to once per 20 minutes — a request inside that window is rejected with nextAllowedAt in the error body.",
                exampleResponse: pitKeyExample,
            },
        ],
    },
];

export const findResource = (slug: string): ApiResource | undefined =>
    API_RESOURCES.find((resource) => resource.slug === slug);

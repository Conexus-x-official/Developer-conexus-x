import type { ApiEndpoint } from "./apiReference";

export const API_BASE_URL = "https://api.conexus-x.example/api";

/** Fills every `:param` with a short, obviously-fake placeholder for display. */
export const examplePath = (endpoint: ApiEndpoint): string =>
    endpoint.path.replace(/:([a-zA-Z]+)/g, (_match, name: string) => {
        const found = endpoint.pathParams?.find((p) => p.name === name);
        return found ? `{${found.name}}` : `{${name}}`;
    });

export const toCurl = (endpoint: ApiEndpoint): string => {
    const url = `${API_BASE_URL}${examplePath(endpoint)}`;
    const lines = [`curl -X ${endpoint.method} '${url}' \\`, `  -H 'x-api-key: YOUR_PIT_KEY'`];

    if (endpoint.exampleRequestBody !== undefined) {
        lines.push(`  -H 'Content-Type: application/json' \\`);
        lines.push(`  -d '${JSON.stringify(endpoint.exampleRequestBody)}'`);
    }

    return lines.join("\n");
};

export const toFetchSnippet = (endpoint: ApiEndpoint): string => {
    const url = `${API_BASE_URL}${examplePath(endpoint)}`;
    const hasBody = endpoint.exampleRequestBody !== undefined;

    const lines = [
        `const response = await fetch("${url}", {`,
        `  method: "${endpoint.method}",`,
        `  headers: {`,
        `    "x-api-key": "YOUR_PIT_KEY",`,
        ...(hasBody ? [`    "Content-Type": "application/json",`] : []),
        `  },`,
        ...(hasBody ? [`  body: JSON.stringify(${JSON.stringify(endpoint.exampleRequestBody, null, 2).replace(/\n/g, "\n  ")}),`] : []),
        `});`,
        ``,
        `const data = await response.json();`,
    ];

    return lines.join("\n");
};

export const toJson = (value: unknown): string => JSON.stringify(value, null, 2);

import { H1, Lead, H2, P, UL, Code, Callout, Table } from "@/components/docs/Prose";
import CodeBlock from "@/components/docs/CodeBlock";

export default function CliPage() {
    return (
        <div>
            <H1>CLI &amp; templates</H1>
            <Lead>
                Scaffold a new Conexus X view in one command — asks where and which framework, fetches the template,
                makes it yours, installs, and tells you what to run next.
            </Lead>

            <div className="mt-4 max-w-2xl">
                <CodeBlock language="bash" code={`npm create @conexus-x/app`} />
            </div>

            <P>Which prints something like:</P>
            <div className="mt-4 max-w-2xl">
                <CodeBlock
                    language="text"
                    code={` Conexus X  create-app v0.1.0

✔ Where should the view live? … my-view
✔ Which framework? › Next.js
✔ Template ready (@conexus-x/next-view@latest)
✔ Created my-view (my-view)
✔ Dependencies installed with npm
✔ Initialised a git repository

Done. Next:

  cd my-view
  npm run dev`}
                />
            </div>

            <P>
                Also works as <Code>npx @conexus-x/create-app my-view</Code>, and with <Code>pnpm create</Code>,{" "}
                <Code>yarn create</Code> or <Code>bun create</Code> — whichever package manager you invoke it with is
                the one it installs with.
            </P>

            <H2>Templates</H2>
            <Table
                head={["--template", "Package", "What you get"]}
                rows={[
                    ["next", <Code key="1">@conexus-x/next-view</Code>, "Next.js 16 + React 19 — pick this if your view needs a server of its own."],
                    ["react", <Code key="2">@conexus-x/react-view</Code>, "React 19 + Vite, static output — pick this if the view only talks to Conexus X."],
                ]}
            />
            <P>
                Templates are fetched from npm at scaffold time, not bundled into the CLI — each starter is its own
                repository with its own release cycle, so a template fix reaches new projects the moment it&rsquo;s
                published, without a release of this CLI. Use <Code>--template-version</Code> to pin one when you need
                to reproduce an older scaffold.
            </P>

            <H2>Non-interactive usage</H2>
            <P>Every prompt has a flag, so the whole command can run unattended — in a script, in CI, in a template repository:</P>
            <div className="mt-4 max-w-2xl">
                <CodeBlock language="bash" code={`npx @conexus-x/create-app my-view --template react --pm pnpm -y`} />
            </div>

            <Table
                head={["Flag", "Does"]}
                rows={[
                    [<Code key="1">-t, --template &lt;name&gt;</Code>, "template to use (next | react)"],
                    [<Code key="2">--template-version &lt;range&gt;</Code>, "version of the template package to fetch (default: latest)"],
                    [<Code key="3">--from &lt;path&gt;</Code>, "use a local template directory or .tgz instead of the registry"],
                    [<Code key="4">--name &lt;name&gt;</Code>, "package name for the new project (default: the directory name)"],
                    [<Code key="5">--pm &lt;manager&gt;</Code>, "package manager (npm | pnpm | yarn | bun)"],
                    [<Code key="6">--no-install</Code>, "skip installing dependencies"],
                    [<Code key="7">--no-git</Code>, "skip initialising a git repository"],
                    [<Code key="8">-y, --yes</Code>, "accept the defaults and do not prompt"],
                    [<Code key="9">--overwrite</Code>, "replace the contents of a non-empty directory"],
                ]}
            />
            <P>
                A non-interactive environment (no TTY, or <Code>CI</Code> set) is detected automatically and takes the
                defaults rather than hanging on a prompt no one can answer.
            </P>

            <H2>What scaffolding changes in the template</H2>
            <P>
                The template is a package we publish, so its identity has to be replaced or a new project inherits
                ours:
            </P>
            <Table
                head={["Field", "Becomes"]}
                rows={[
                    ["package.json name", "your project name"],
                    ["package.json version", "0.1.0"],
                    ["package.json private", "true"],
                    ["package.json files / publishConfig / keywords / license", "removed"],
                    ["conexus.manifest.json id, name", "derived from your project name"],
                    ["conexus.manifest.json entry, description, publisher", "blanked"],
                ]}
            />
            <Callout tone="warning">
                <Code>private: true</Code> and the removed <Code>publishConfig</Code> are the ones that matter: without
                them, your first <Code>npm publish</Code> would go to our scope. <Code>entry</Code> is blanked rather
                than guessed — it&rsquo;s the origin the view bridge pins for postMessage, so a wrong value there is a
                security setting that silently fails to match at review time. Fill it in yourself once you know where
                the view will be served from.
            </Callout>

            <H2>Local template development</H2>
            <P>To work on a template before publishing it:</P>
            <div className="mt-4 max-w-2xl">
                <CodeBlock
                    language="bash"
                    code={`npx @conexus-x/create-app my-view --from ../conexus-x-np      # a checkout
npx @conexus-x/create-app my-view --from ./template.tgz       # a packed tarball`}
                />
            </div>
            <P><Code>--from</Code> a directory skips <Code>node_modules</Code>, <Code>dist</Code>, <Code>.next</Code>, <Code>.git</Code> and lockfiles.</P>

            <H2>Behaviour worth knowing</H2>
            <UL>
                <li>A failed fetch cleans up — a directory the command created is removed; one that already existed never is.</li>
                <li>A failed install does not clean up — the project is already on disk and re-running the install is a one-line fix.</li>
                <li><Code>--overwrite</Code> empties the target but keeps <Code>.git</Code> — never the repository history of a directory you had already initialised.</li>
                <li>It refuses to empty a drive root or your home directory, whatever the arguments say.</li>
                <li>No <Code>shell: true</Code> anywhere — arguments are passed as arrays, so a path containing a space or an ampersand can never become two arguments or two commands.</li>
            </UL>

            <H2>Requirements</H2>
            <P>Node 20.9 or newer, checked at startup with a message that names your version.</P>
        </div>
    );
}

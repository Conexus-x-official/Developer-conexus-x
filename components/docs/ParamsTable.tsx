import type { FieldDef } from "@/lib/apiReference";

export default function ParamsTable({ title, fields }: { title: string; fields: FieldDef[] }) {
    if (!fields.length) return null;

    return (
        <div className="mt-5">
            <h4 className="mb-2 text-[11px] font-bold uppercase tracking-wide text-muted">{title}</h4>
            <div className="overflow-x-auto rounded-lg border border-hairline">
                <table className="w-full border-collapse text-sm">
                    <tbody className="divide-y divide-hairline">
                        {fields.map((field) => (
                            <tr key={field.name} className="transition hover:bg-control/40">
                                <td className="whitespace-nowrap px-3 py-2 align-top font-mono text-[13px] text-foreground">
                                    {field.name}
                                    {field.required && <span className="ml-1 text-red-500">*</span>}
                                </td>
                                <td className="whitespace-nowrap px-3 py-2 align-top font-mono text-[12px] text-muted">
                                    {field.type}
                                </td>
                                <td className="px-3 py-2 align-top text-body">{field.description}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

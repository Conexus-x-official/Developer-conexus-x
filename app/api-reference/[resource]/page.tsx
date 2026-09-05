import { notFound } from "next/navigation";
import { API_RESOURCES, findResource } from "@/lib/apiReference";
import { H1, Lead } from "@/components/docs/Prose";
import EndpointCard from "@/components/docs/EndpointCard";

export function generateStaticParams() {
    return API_RESOURCES.map((resource) => ({ resource: resource.slug }));
}

export default async function ResourcePage(props: PageProps<"/api-reference/[resource]">) {
    const { resource: slug } = await props.params;
    const resource = findResource(slug);

    if (!resource) notFound();

    return (
        <div>
            <H1>{resource.name}</H1>
            <Lead>{resource.description}</Lead>

            <div className="mt-8 space-y-6">
                {resource.endpoints.map((endpoint) => (
                    <EndpointCard key={`${endpoint.method}-${endpoint.path}`} endpoint={endpoint} />
                ))}
            </div>
        </div>
    );
}

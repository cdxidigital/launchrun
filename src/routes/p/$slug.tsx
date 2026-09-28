import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteCanvas, ToolCanvas } from "@/components/launch/site-canvas";
import { getPublished } from "@/lib/launch/server";

export const Route = createFileRoute("/p/$slug")({
  loader: ({ params }) => getPublished({ data: { slug: params.slug } }),
  head: ({ loaderData }) => ({
    meta: [{ title: loaderData?.found ? loaderData.businessName : "Page not found" }],
  }),
  component: PublicPage,
});

function PublicPage() {
  const data = Route.useLoaderData();
  if (!data.found) {
    return (
      <main className="grid min-h-screen place-items-center bg-ink px-6 text-center text-fg">
        <div>
          <h1 className="text-xl font-semibold">This page is not live</h1>
          <p className="mt-2 text-sm text-muted">It may still be a draft, or the link is wrong.</p>
          <Link to="/" className="mt-4 inline-flex text-sm text-signal">
            launch/run
          </Link>
        </div>
      </main>
    );
  }
  return (
    <main className="min-h-screen" style={{ background: "transparent" }}>
      <div className="site min-h-screen" data-direction={data.direction}>
        {data.kind === "tool" ? (
          <div className="mx-auto max-w-xl px-4 py-10">
            <ToolCanvas
              name={data.businessName}
              tool={data.meta.tool === "enquiry" ? "enquiry" : "calculator"}
              packages={data.meta.packages ?? []}
              slug={data.slug}
            />
          </div>
        ) : (
          <SiteCanvas
            name={data.businessName}
            direction={data.direction}
            sections={data.sections}
            slug={data.slug}
            interactive
          />
        )}
        <footer className="px-4 py-6 text-center text-xs" style={{ color: "var(--site-muted)" }}>
          launch/run
        </footer>
      </div>
    </main>
  );
}

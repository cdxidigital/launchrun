import { Link } from "@tanstack/react-router";
import { useState } from "react";
import type { BusinessProfile } from "@/lib/launch/domain";
import { COSTS, MODULES } from "@/lib/launch/domain";
import { improveCopy, updateAudience, updateBrand, updateMemory, updateOffer } from "@/lib/launch/server";
import { Block, Button, ConfirmDialog, Estimate, Field, Meter, PageHeader, Panel, StatusBadge, fieldClass } from "./ui";
import { canEdit, useActive, useMutate } from "./workspace";

export function MapScreen() {
  const active = useActive();
  if (!active) return null;
  const next = MODULES.map((item) => active.profile.modules[item.key])
    .find((item) => item.status === "needs_attention" || item.status === "needs_setup");
  return (
    <div>
      <PageHeader
        title="Business map"
        detail="Six parts of the business. One next action, not a pile of features."
        action={
          <Link to="/app/website" className="inline-flex min-h-11 items-center rounded-md bg-action px-4 text-sm font-semibold text-action-ink">
            {next?.next ?? "Review launch page"}
          </Link>
        }
      />
      <ul className="mt-6 divide-y divide-line rounded-lg border border-line">
        {MODULES.map((item) => {
          const module = active.profile.modules[item.key];
          const href =
            item.key === "offer"
              ? "/app/offer"
              : item.key === "audience"
                ? "/app/audience"
                : item.key === "brand"
                  ? "/app/brand"
                  : item.key === "product"
                    ? "/app/website"
                    : item.key === "marketing"
                      ? "/app/campaigns"
                      : "/app/automations";
          return (
            <li key={item.key} className="px-4 py-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="text-base font-semibold">{item.label}</h2>
                <StatusBadge status={module.status} />
              </div>
              <p className="mt-1 text-sm text-muted">{item.about}</p>
              <div className="mt-3"><Meter value={module.percent} /></div>
              <p className="mt-2 text-sm">
                Next: {module.next}
                <span className="text-muted"> · {module.owner}</span>
              </p>
              <Link to={href} className="mt-2 inline-flex min-h-11 items-center text-sm text-signal">
                Open {item.label.toLowerCase()}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function OfferScreen() {
  const active = useActive();
  const save = useMutate(updateOffer);
  const improve = useMutate(improveCopy);
  const [offer, setOffer] = useState<BusinessProfile["offer"] | null>(null);
  const [ask, setAsk] = useState(false);
  if (!active) return null;
  const value = offer ?? active.profile.offer;
  const allowed = canEdit(active.role);
  return (
    <div>
      <PageHeader
        title="Offer"
        detail="This is what you sell. Approving it is separate from editing it."
        action={
          <Button type="button" disabled={!allowed || save.isPending} onClick={() => save.mutate({ businessId: active.id, offer: value })}>
            Save offer
          </Button>
        }
      />
      <div className="mt-6 space-y-4">
        <Field label="Summary">
          <textarea className={fieldClass} rows={4} value={value.summary} onChange={(event) => setOffer({ ...value, summary: event.target.value })} />
        </Field>
        <Field label="Positioning">
          <textarea className={fieldClass} rows={3} value={value.positioning} onChange={(event) => setOffer({ ...value, positioning: event.target.value })} />
        </Field>
        <Field label="Guarantee">
          <textarea className={fieldClass} rows={3} value={value.guarantee} onChange={(event) => setOffer({ ...value, guarantee: event.target.value })} />
        </Field>
        <Field label="Sales line">
          <textarea className={fieldClass} rows={2} value={value.messaging} onChange={(event) => setOffer({ ...value, messaging: event.target.value })} />
        </Field>
      </div>
      <Block title="Packages">
        <ul className="space-y-3">
          {value.packages.map((item, index) => (
            <li key={item.id} className="grid gap-2 rounded-lg border border-line p-3 sm:grid-cols-3">
              <input className={fieldClass} aria-label="Package name" value={item.name} onChange={(event) => {
                const packages = value.packages.slice();
                packages[index] = { ...item, name: event.target.value };
                setOffer({ ...value, packages });
              }} />
              <input className={fieldClass} aria-label="Price" value={item.price} onChange={(event) => {
                const packages = value.packages.slice();
                packages[index] = { ...item, price: event.target.value };
                setOffer({ ...value, packages });
              }} />
              <input className={fieldClass} aria-label="Includes" value={item.includes} onChange={(event) => {
                const packages = value.packages.slice();
                packages[index] = { ...item, includes: event.target.value };
                setOffer({ ...value, packages });
              }} />
            </li>
          ))}
        </ul>
        <Button
          type="button"
          variant="quiet"
          className="mt-3"
          onClick={() => setOffer({ ...value, packages: [...value.packages, { id: crypto.randomUUID(), name: "New", price: "A$0", includes: "Describe what is included." }] })}
        >
          Add package
        </Button>
      </Block>
      <div className="mt-6">
        <Button type="button" variant="quiet" disabled={!allowed} onClick={() => setAsk(true)}>
          Improve the wording
        </Button>
      </div>
      <ConfirmDialog
        open={ask}
        onOpenChange={setAsk}
        title="Improve the offer wording"
        body="This rewrites the summary and the sales line. You still review it. Nothing is published."
        confirm="Rewrite offer"
        busy={improve.isPending}
        onConfirm={() => {
          improve.mutate(
            { businessId: active.id, target: "offer" },
            { onSuccess: () => { setOffer(null); setAsk(false); } },
          );
        }}
      >
        <Estimate units={COSTS.rewriteOffer} />
      </ConfirmDialog>
    </div>
  );
}

export function AudienceScreen() {
  const active = useActive();
  const save = useMutate(updateAudience);
  const [audience, setAudience] = useState<BusinessProfile["audienceProfile"] | null>(null);
  if (!active) return null;
  const value = audience ?? active.profile.audienceProfile;
  return (
    <div>
      <PageHeader
        title="Audience"
        detail="Who buys, what they need, and what might stop them."
        action={
          <Button type="button" disabled={!canEdit(active.role) || save.isPending} onClick={() => save.mutate({ businessId: active.id, audience: value })}>
            Save audience
          </Button>
        }
      />
      <div className="mt-6">
        <Field label="In one line">
          <textarea className={fieldClass} rows={3} value={value.summary} onChange={(event) => setAudience({ ...value, summary: event.target.value })} />
        </Field>
      </div>
      <ul className="mt-4 space-y-4">
        {value.segments.map((segment, index) => (
          <li key={segment.id}>
            <Panel className="space-y-3">
              <Field label="Segment">
                <input className={fieldClass} value={segment.name} onChange={(event) => {
                  const segments = value.segments.slice();
                  segments[index] = { ...segment, name: event.target.value };
                  setAudience({ ...value, segments });
                }} />
              </Field>
              <Field label="Needs">
                <textarea className={fieldClass} rows={2} value={segment.needs} onChange={(event) => {
                  const segments = value.segments.slice();
                  segments[index] = { ...segment, needs: event.target.value };
                  setAudience({ ...value, segments });
                }} />
              </Field>
              <Field label="Objections">
                <textarea className={fieldClass} rows={2} value={segment.objections} onChange={(event) => {
                  const segments = value.segments.slice();
                  segments[index] = { ...segment, objections: event.target.value };
                  setAudience({ ...value, segments });
                }} />
              </Field>
              <Field label="Where they come from">
                <textarea className={fieldClass} rows={2} value={segment.sources} onChange={(event) => {
                  const segments = value.segments.slice();
                  segments[index] = { ...segment, sources: event.target.value };
                  setAudience({ ...value, segments });
                }} />
              </Field>
            </Panel>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function BrandScreen() {
  const active = useActive();
  const save = useMutate(updateBrand);
  const [name, setName] = useState<string | null>(null);
  const [brand, setBrand] = useState<BusinessProfile["brand"] | null>(null);
  if (!active) return null;
  const value = brand ?? active.profile.brand;
  const businessName = name ?? active.name;
  return (
    <div>
      <PageHeader
        title="Brand"
        detail="The name, tone and rules other drafts should follow."
        action={
          <Button type="button" disabled={!canEdit(active.role) || save.isPending} onClick={() => save.mutate({ businessId: active.id, name: businessName, brand: value })}>
            Save brand
          </Button>
        }
      />
      <div className="mt-6 space-y-4">
        <Field label="Name">
          <input className={fieldClass} value={businessName} onChange={(event) => setName(event.target.value)} />
        </Field>
        <Field label="Positioning">
          <textarea className={fieldClass} rows={3} value={value.positioning} onChange={(event) => setBrand({ ...value, positioning: event.target.value })} />
        </Field>
        <Field label="Tone">
          <textarea className={fieldClass} rows={2} value={value.tone} onChange={(event) => setBrand({ ...value, tone: event.target.value })} />
        </Field>
        <Field label="Message">
          <textarea className={fieldClass} rows={2} value={value.messaging} onChange={(event) => setBrand({ ...value, messaging: event.target.value })} />
        </Field>
        <Field label="Rules">
          <textarea className={fieldClass} rows={3} value={value.rules} onChange={(event) => setBrand({ ...value, rules: event.target.value })} />
        </Field>
        <Field label="Visual direction for pages">
          <select className={fieldClass} value={value.direction} onChange={(event) => setBrand({ ...value, direction: event.target.value as BusinessProfile["brand"]["direction"] })}>
            <option value="paper">Paper — light page, quiet type</option>
            <option value="night">Night — dark page, lime action</option>
            <option value="signal">Signal — light page, blue action</option>
          </select>
        </Field>
      </div>
    </div>
  );
}

export function MemoryScreen() {
  const active = useActive();
  const save = useMutate(updateMemory);
  const [memory, setMemory] = useState<BusinessProfile["memory"] | null>(null);
  if (!active) return null;
  const value = memory ?? active.profile.memory;
  return (
    <div>
      <PageHeader
        title="Business memory"
        detail="Facts the rest of the workspace should reuse. You can edit every line."
        action={
          <Button type="button" disabled={!canEdit(active.role) || save.isPending} onClick={() => save.mutate({ businessId: active.id, memory: value })}>
            Save memory
          </Button>
        }
      />
      <ul className="mt-6 space-y-3">
        {value.map((item, index) => (
          <li key={item.id} className="grid gap-2 sm:grid-cols-[10rem_1fr]">
            <input className={fieldClass} aria-label="Memory label" value={item.label} onChange={(event) => {
              const next = value.slice();
              next[index] = { ...item, label: event.target.value };
              setMemory(next);
            }} />
            <textarea className={fieldClass} aria-label="Memory value" rows={2} value={item.value} onChange={(event) => {
              const next = value.slice();
              next[index] = { ...item, value: event.target.value };
              setMemory(next);
            }} />
          </li>
        ))}
      </ul>
      <Button type="button" variant="quiet" className="mt-4" onClick={() => setMemory([...value, { id: crypto.randomUUID(), label: "", value: "" }])}>
        Add a fact
      </Button>
    </div>
  );
}

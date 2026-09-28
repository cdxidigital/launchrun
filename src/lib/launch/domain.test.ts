import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  answersFromConcept,
  answersSchema,
  buildInitial,
  canAddBusiness,
  canAfford,
  clampPolicies,
  clampWorkflowMode,
  exampleAnswers,
  inboxItems,
  localBrief,
  profileSchema,
  readinessOf,
  remaining,
  statusSentence,
} from "./domain.ts";

describe("launch/run domain", () => {
  it("builds a six-part map and a draft page from answers", () => {
    const answers = exampleAnswers();
    assert.equal(answersSchema.safeParse(answers).success, true);
    const built = buildInitial(answers);
    assert.equal(profileSchema.safeParse(built.profile).success, true);
    assert.equal(Object.keys(built.profile.modules).length, 6);
    assert.ok(built.page.sections.length >= 4);
    assert.equal(built.approvals.length, 2);
    assert.equal(built.readiness, readinessOf(built.profile.modules));
    assert.ok(built.readiness > 20 && built.readiness < 80);
  });

  it("starts a map from a concept alone", () => {
    const answers = answersFromConcept(
      "A weekly coffee subscription for people working from home. A short brew note comes with every bag.",
    );
    assert.equal(answersSchema.safeParse(answers).success, true);
    assert.equal(answers.businessName, "Weekly Coffee Subscription");
    assert.equal(answers.path, "new");
    assert.match(answers.audience, /People working from home/);
    assert.equal(answers.autonomy, "collaborate");
    const named = answersFromConcept("Sourdough for neighbours", "Harbor & Rye");
    assert.equal(named.businessName, "Harbor & Rye");
    const built = buildInitial(answers);
    assert.equal(profileSchema.safeParse(built.profile).success, true);
    assert.ok(built.readiness < 45);
    assert.match(built.profile.offer.summary, /coffee subscription/i);
    assert.equal(built.tasks[0]?.title, "Name who this is for");
  });

  it("describes status without hiding the counts", () => {
    assert.match(statusSentence({ readiness: 48, waiting: 2, running: 0 }), /48%/);
    assert.match(statusSentence({ readiness: 48, waiting: 2, running: 0 }), /2 things need you/);
    assert.match(statusSentence({ readiness: 48, waiting: 0, running: 1 }), /One workflow is running/);
  });

  it("never spends more executions than the balance", () => {
    const balance = { included: 10, topup: 0, used: 8 };
    assert.equal(remaining(balance), 2);
    assert.equal(canAfford(balance, 2), true);
    assert.equal(canAfford(balance, 3), false);
    assert.equal(remaining({ included: 10, topup: 0, used: 40 }), 0);
  });

  it("locks money movement to manual and blocks silent publishing", () => {
    const policies = clampPolicies({
      websiteCopy: "auto",
      websitePublish: "auto",
      customerEmail: "auto",
      adSpend: "auto",
      refund: "auto",
      bank: "auto",
      irreversible: "auto",
    });
    assert.equal(policies.websiteCopy, "auto");
    assert.notEqual(policies.websitePublish, "auto");
    assert.notEqual(policies.customerEmail, "auto");
    assert.equal(policies.refund, "manual");
    assert.equal(policies.bank, "manual");
    assert.equal(policies.irreversible, "manual");
    assert.equal(clampWorkflowMode("lead-follow-up", "auto"), "approve");
  });

  it("limits extra businesses to the Scale plan", () => {
    assert.equal(canAddBusiness("start", 1), false);
    assert.equal(canAddBusiness("build", 0), true);
    assert.equal(canAddBusiness("scale", 2), true);
    assert.equal(canAddBusiness("scale", 3), false);
  });

  it("puts waiting approvals ahead of older notes in the inbox sort", () => {
    const items = inboxItems({
      approvals: [
        {
          id: "a",
          title: "Approve offer",
          summary: "Summary",
          status: "waiting",
          createdAt: "2026-09-27T02:00:00.000Z",
        },
      ],
      leads: [
        {
          id: "l",
          name: "Ada",
          email: "ada@example.com",
          status: "new",
          createdAt: "2026-09-27T03:00:00.000Z",
        },
      ],
      conversations: [],
    });
    assert.equal(items[0]?.title, "New lead · Ada");
    assert.match(localBrief({
      name: "Harbor",
      leads: 0,
      published: 0,
      running: 0,
      waiting: 1,
      remaining: 5,
      next: "Review the launch page",
    }), /No page is live yet/);
  });
});

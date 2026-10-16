import assert from "node:assert/strict";
import { test } from "node:test";
import { isAuthorized, readGateConfig } from "../src/lib/access-gate.ts";

const basic = (user: string, pass: string) =>
  `Basic ${Buffer.from(`${user}:${pass}`).toString("base64")}`;

test("gate is off unless a password is configured", () => {
  assert.equal(readGateConfig({}), null);
  assert.equal(readGateConfig({ STAGING_ACCESS_PASSWORD: "   " }), null);
  assert.equal(isAuthorized(null, null), true);
});

test("default username is 'preview'", () => {
  assert.deepEqual(readGateConfig({ STAGING_ACCESS_PASSWORD: "pw" }), { user: "preview", password: "pw" });
});

test("accepts only the exact credentials", () => {
  const cfg = readGateConfig({ STAGING_ACCESS_USER: "arc", STAGING_ACCESS_PASSWORD: "s3cret:with:colons" });
  assert.equal(isAuthorized(basic("arc", "s3cret:with:colons"), cfg), true);
  assert.equal(isAuthorized(basic("arc", "wrong"), cfg), false);
  assert.equal(isAuthorized(basic("other", "s3cret:with:colons"), cfg), false);
  assert.equal(isAuthorized(null, cfg), false);
  assert.equal(isAuthorized("Bearer abc", cfg), false);
  assert.equal(isAuthorized("Basic not-base64!!", cfg), false);
  assert.equal(isAuthorized(`Basic ${Buffer.from("nocolon").toString("base64")}`, cfg), false);
});

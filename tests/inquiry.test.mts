import assert from "node:assert/strict";
import { test } from "node:test";
import {
  isFreeMail,
  looksLikeSecret,
  normalizeWebsite,
  validateInquiry,
  type InquiryFields,
} from "../src/lib/inquiry.ts";

const valid: InquiryFields = {
  name: "Ada Developer",
  email: "ada@studio.example",
  company: "Studio",
  website: "studio.example",
  message: "Our companion forgets that the user apologized last week.",
  nextStep: "audit",
};

test("accepts a complete, valid inquiry", () => {
  assert.deepEqual(validateInquiry(valid), {});
});

test("company and website are optional", () => {
  assert.deepEqual(validateInquiry({ ...valid, company: "", website: "" }), {});
});

test("requires name, email, message and a known next step", () => {
  const errors = validateInquiry({ ...valid, name: "", email: "", message: "", nextStep: "x" });
  assert.ok(errors.name);
  assert.ok(errors.email);
  assert.ok(errors.message);
  assert.ok(errors.nextStep);
});

test("rejects malformed email and website", () => {
  assert.ok(validateInquiry({ ...valid, email: "not-an-email" }).email);
  assert.ok(validateInquiry({ ...valid, website: "not a url" }).website);
});

test("enforces message length bounds", () => {
  assert.ok(validateInquiry({ ...valid, message: "too short" }).message);
  assert.ok(validateInquiry({ ...valid, message: "x".repeat(2001) }).message);
});

test("normalizes bare domains to https", () => {
  assert.equal(normalizeWebsite("studio.example"), "https://studio.example");
  assert.equal(normalizeWebsite("http://a.example"), "http://a.example");
  assert.equal(normalizeWebsite(""), "");
});

test("flags free-mail domains and pasted secrets", () => {
  assert.equal(isFreeMail("someone@gmail.com"), true);
  assert.equal(isFreeMail("someone@studio.example"), false);
  assert.equal(looksLikeSecret("my key is sk-ant-abcdefghijklmnopqrstuv"), true);
  assert.equal(looksLikeSecret("no secrets here"), false);
});

/** @jest-environment node */

import robots from "@/app/robots";

describe("robots()", () => {
  it("returns a rules array", () => {
    const result = robots();
    expect(Array.isArray(result.rules)).toBe(true);
  });

  it("userAgent is wildcard (*)", () => {
    const { rules } = robots();
    const rule = Array.isArray(rules) ? rules[0] : rules;
    expect(rule.userAgent).toBe("*");
  });

  it("allows the root path /", () => {
    const { rules } = robots();
    const rule = Array.isArray(rules) ? rules[0] : rules;
    expect(rule.allow).toBe("/");
  });

  it("disallows /portal/", () => {
    const { rules } = robots();
    const rule = Array.isArray(rules) ? rules[0] : rules;
    const disallow = rule.disallow as string[];
    expect(disallow).toContain("/portal/");
  });

  it("disallows /api/", () => {
    const { rules } = robots();
    const rule = Array.isArray(rules) ? rules[0] : rules;
    const disallow = rule.disallow as string[];
    expect(disallow).toContain("/api/");
  });

  it("sitemap URL ends with sitemap.xml", () => {
    const { sitemap } = robots();
    expect(String(sitemap)).toContain("sitemap.xml");
  });

  it("sitemap URL contains supracloud.co.uk", () => {
    const { sitemap } = robots();
    expect(String(sitemap)).toContain("supracloud.co.uk");
  });
});

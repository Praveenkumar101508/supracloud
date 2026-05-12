import robots from "@/app/robots";

describe("Robots.txt", () => {
  it("returns rules array", () => {
    const result = robots();
    expect(result.rules).toBeDefined();
    expect(Array.isArray(result.rules)).toBe(true);
  });

  it("allows all user agents", () => {
    const result = robots();
    const rules = Array.isArray(result.rules) ? result.rules : [result.rules];
    expect(rules[0].userAgent).toBe("*");
  });

  it("allows root path", () => {
    const result = robots();
    const rules = Array.isArray(result.rules) ? result.rules : [result.rules];
    expect(rules[0].allow).toBe("/");
  });

  it("disallows /portal/", () => {
    const result = robots();
    const rules = Array.isArray(result.rules) ? result.rules : [result.rules];
    const disallow = rules[0].disallow as string[];
    expect(disallow).toContain("/portal/");
  });

  it("disallows /api/", () => {
    const result = robots();
    const rules = Array.isArray(result.rules) ? result.rules : [result.rules];
    const disallow = rules[0].disallow as string[];
    expect(disallow).toContain("/api/");
  });

  it("includes sitemap URL", () => {
    const result = robots();
    expect(result.sitemap).toContain("sitemap.xml");
  });

  it("sitemap URL contains supracloud.co.uk", () => {
    const result = robots();
    expect(result.sitemap).toContain("supracloud.co.uk");
  });
});

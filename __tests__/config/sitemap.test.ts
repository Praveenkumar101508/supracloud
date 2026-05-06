import sitemap from "@/app/sitemap";

describe("Sitemap", () => {
  const urls = sitemap().map((entry) => entry.url);

  it("includes homepage", () => {
    expect(urls.some((u) => u.endsWith(".co.uk") || u.endsWith(".co.uk/"))).toBe(true);
  });

  it("includes /programs", () => {
    expect(urls.some((u) => u.includes("/programs"))).toBe(true);
  });

  it("includes /projects", () => {
    expect(urls.some((u) => u.includes("/projects"))).toBe(true);
  });

  it("includes /success-stories", () => {
    expect(urls.some((u) => u.includes("/success-stories"))).toBe(true);
  });

  it("includes /about", () => {
    expect(urls.some((u) => u.includes("/about"))).toBe(true);
  });

  it("includes /apply", () => {
    expect(urls.some((u) => u.includes("/apply"))).toBe(true);
  });

  it("includes /book", () => {
    expect(urls.some((u) => u.includes("/book"))).toBe(true);
  });

  it("includes /privacy", () => {
    expect(urls.some((u) => u.includes("/privacy"))).toBe(true);
  });

  it("includes /terms", () => {
    expect(urls.some((u) => u.includes("/terms"))).toBe(true);
  });

  it("all URLs contain supracloud.co.uk", () => {
    urls.forEach((url) => {
      expect(url).toContain("supracloud.co.uk");
    });
  });

  it("homepage has highest priority", () => {
    const home = sitemap().find((e) => !e.url.match(/\/(programs|projects|about|apply|book|privacy|terms|success)/));
    expect(home?.priority).toBe(1);
  });

  it("returns 9 URLs total", () => {
    expect(sitemap().length).toBe(9);
  });
});

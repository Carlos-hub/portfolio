import { describe, it, expect } from "vitest";
import { formatUpdatedAgo } from "./format";

const now = new Date("2026-07-21T00:00:00Z");

describe("formatUpdatedAgo", () => {
  it("says 'hoje' for today", () => {
    expect(formatUpdatedAgo("2026-07-21T00:00:00Z", now)).toBe("hoje");
  });
  it("uses days for < 30 days", () => {
    expect(formatUpdatedAgo("2026-07-16T00:00:00Z", now)).toBe("há 5 dias");
  });
  it("uses months for < 12 months", () => {
    expect(formatUpdatedAgo("2026-04-21T00:00:00Z", now)).toBe("há 3 meses");
  });
  it("uses years otherwise", () => {
    expect(formatUpdatedAgo("2023-07-21T00:00:00Z", now)).toBe("há 3 anos");
  });
  it("singular forms", () => {
    expect(formatUpdatedAgo("2026-07-20T00:00:00Z", now)).toBe("há 1 dia");
    expect(formatUpdatedAgo("2026-06-21T00:00:00Z", now)).toBe("há 1 mês");
    expect(formatUpdatedAgo("2025-07-21T00:00:00Z", now)).toBe("há 1 ano");
  });
  it("uses months (not '0 anos') at the 360-364 day year boundary", () => {
    expect(formatUpdatedAgo("2025-07-24T00:00:00Z", now)).toBe("há 12 meses");
  });
});

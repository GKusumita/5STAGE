const request = require("supertest");
const app = require("../src/backend/server");

describe("SCRUM-15: /metrics Endpoint", () => {
  test("should return correct metric fields", async () => {
    const res = await request(app).get("/metrics");
    expect(res.status).toBe(200);

    expect(res.body).toHaveProperty("hits");
    expect(res.body).toHaveProperty("misses");
    expect(res.body).toHaveProperty("items");
    expect(res.body).toHaveProperty("expired");
    expect(res.body).toHaveProperty("timestamp");
  });

  test("metrics should update after cache operations", async () => {
    // Miss
    await request(app).get("/v1/cache/not_here");

    // Set and get (hit)
    await request(app).put("/v1/cache/test_key").send("hello");
    await request(app).get("/v1/cache/test_key");

    const res = await request(app).get("/metrics");
    expect(res.body.hits).toBeGreaterThanOrEqual(1);
    expect(res.body.misses).toBeGreaterThanOrEqual(1);
    expect(res.body.items).toBeGreaterThanOrEqual(1);
  });
});

import { api } from "../hooks/apiService";

describe("apiService", () => {
  it("should create an axios instance with the correct base URL and headers", () => {
    expect(api.defaults.baseURL).toBe("https://reqres.in/api");
    expect(api.defaults.headers["Content-Type"]).toBe("application/json");
  });
});

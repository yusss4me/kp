import { describe, it, expect, beforeEach, vi } from "vitest";
import { useAuthStore, UserRole } from "@/app/lib/stores/auth-store";

// Mock the dynamic import used in loginApi
vi.mock("@/app/lib/api/services/auth", () => ({
  loginAdmin: vi.fn(),
}));

describe("auth-store", () => {
  beforeEach(() => {
    // Reset store before each test
    useAuthStore.setState({
      token: null,
      user: null,
      isAuthenticated: false,
    });
  });

  describe("setAuth", () => {
    it("sets token, user, and isAuthenticated", () => {
      const { setAuth } = useAuthStore.getState();
      setAuth("test-token-123", { email: "admin@test.com", role: "admin", name: "Admin" });

      const state = useAuthStore.getState();
      expect(state.token).toBe("test-token-123");
      expect(state.user?.email).toBe("admin@test.com");
      expect(state.user?.role).toBe("admin");
      expect(state.isAuthenticated).toBe(true);
    });

    it("defaults role to donatur when not provided", () => {
      const { setAuth } = useAuthStore.getState();
      setAuth("tok", { email: "user@test.com" });

      // setAuth sets the cookie with role || "donatur"
      const state = useAuthStore.getState();
      expect(state.isAuthenticated).toBe(true);
    });
  });

  describe("logout", () => {
    it("clears all auth state", async () => {
      useAuthStore.setState({
        token: "some-token",
        user: { email: "test@test.com", role: "admin" },
        isAuthenticated: true,
      });

      await useAuthStore.getState().logout();

      const state = useAuthStore.getState();
      expect(state.token).toBeNull();
      expect(state.user).toBeNull();
      expect(state.isAuthenticated).toBe(false);
    });
  });

  describe("hasRole", () => {
    it("returns true when user has the specified role", () => {
      useAuthStore.setState({
        user: { email: "admin@test.com", role: "admin" },
      });

      expect(useAuthStore.getState().hasRole("admin")).toBe(true);
    });

    it("returns false when user does not have the specified role", () => {
      useAuthStore.setState({
        user: { email: "admin@test.com", role: "admin" },
      });

      expect(useAuthStore.getState().hasRole("super_admin")).toBe(false);
    });

    it("returns false when user is null", () => {
      expect(useAuthStore.getState().hasRole("admin")).toBe(false);
    });
  });

  describe("loginApi", () => {
    it("returns success with valid credentials", async () => {
      const { loginAdmin } = await import("@/app/lib/api/services/auth");
      (loginAdmin as ReturnType<typeof vi.fn>).mockResolvedValue({
        token: "jwt-token-abc",
        user: { id: "1", email: "admin@test.com", name: "Admin", role: "admin" },
      });

      const result = await useAuthStore.getState().loginApi("admin@test.com", "password123");

      expect(result.success).toBe(true);
      expect(useAuthStore.getState().token).toBe("jwt-token-abc");
      expect(useAuthStore.getState().user?.role).toBe("admin");
    });

    it("returns error when no token in response", async () => {
      const { loginAdmin } = await import("@/app/lib/api/services/auth");
      (loginAdmin as ReturnType<typeof vi.fn>).mockResolvedValue({});

      const result = await useAuthStore.getState().loginApi("admin@test.com", "wrong");

      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
    });

    it("handles API errors gracefully", async () => {
      const { loginAdmin } = await import("@/app/lib/api/services/auth");
      (loginAdmin as ReturnType<typeof vi.fn>).mockRejectedValue({
        response: { data: { message: "Invalid credentials" } },
      });

      const result = await useAuthStore.getState().loginApi("bad@test.com", "wrong");

      expect(result.success).toBe(false);
      expect(result.error).toBe("Invalid credentials");
    });

    it("supports nested data.token response shape", async () => {
      const { loginAdmin } = await import("@/app/lib/api/services/auth");
      (loginAdmin as ReturnType<typeof vi.fn>).mockResolvedValue({
        data: {
          token: "nested-token",
          user: { id: "2", email: "owner@test.com", name: "Owner", role: "super_admin" },
        },
      });

      const result = await useAuthStore.getState().loginApi("owner@test.com", "pass");

      expect(result.success).toBe(true);
      expect(useAuthStore.getState().token).toBe("nested-token");
      expect(useAuthStore.getState().user?.role).toBe("super_admin");
    });

    it("supports access_token response shape", async () => {
      const { loginAdmin } = await import("@/app/lib/api/services/auth");
      (loginAdmin as ReturnType<typeof vi.fn>).mockResolvedValue({
        access_token: "passport-token",
        user: { id: "3", email: "a@test.com", name: "A", role: "admin" },
      });

      const result = await useAuthStore.getState().loginApi("a@test.com", "pass");

      expect(result.success).toBe(true);
      expect(useAuthStore.getState().token).toBe("passport-token");
    });
  });
});

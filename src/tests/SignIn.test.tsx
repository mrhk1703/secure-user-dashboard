import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { AuthContext } from "../context/AuthContext";
import SignIn from "../components/SignIn";
import { BrowserRouter as Router } from "react-router-dom";
import { toast } from "react-toastify";

jest.mock("react-toastify", () => ({
  toast: {
    error: jest.fn(),
  },
  ToastContainer: () => <div>Toast Container</div>,
}));

const mockSignIn = jest.fn();

const renderWithContext = (isAuthenticated = false) => {
  return render(
    <AuthContext.Provider
      value={{
        signIn: mockSignIn,
        isAuthenticated,
        user: undefined,
        signOut: mockSignIn,
        signUp: mockSignIn,
      }}
    >
      <Router>
        <SignIn />
      </Router>
    </AuthContext.Provider>
  );
};

describe("SignIn Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders Sign In form", () => {
    renderWithContext();

    expect(screen.getByText(/Sign in to your account/i)).toBeInTheDocument();
    expect(screen.getByText(/Your email/i)).toBeInTheDocument();
    expect(screen.getByText(/Password/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Sign in/i })
    ).toBeInTheDocument();
  });

  test("submits form with correct credentials", async () => {
    mockSignIn.mockResolvedValueOnce({ success: true });

    renderWithContext();

    fireEvent.change(screen.getByTestId("email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByTestId("password"), {
      target: { value: "password" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Sign in/i }));

    await waitFor(() => {
      expect(mockSignIn).toHaveBeenCalledWith("test@example.com", "password");
    });
    await waitFor(() => {
      expect(mockSignIn).toHaveBeenCalledTimes(1);
    });
  });

  test("shows error message on failed sign in", async () => {
    mockSignIn.mockResolvedValueOnce({
      success: false,
      message: "Invalid credentials",
    });

    renderWithContext();

    fireEvent.change(screen.getByTestId("email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByTestId("password"), {
      target: { value: "wrongpassword" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Sign in/i }));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Invalid credentials", {
        position: "bottom-center",
      });
    });
  });
});

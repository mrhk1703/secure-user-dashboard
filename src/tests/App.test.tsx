import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import App from "../App";
import { AuthProvider } from "../context/AuthContext";
import { MemoryRouter } from "react-router-dom";

describe("App Component", () => {
  test("renders navigation and welcome message", () => {
    render(
      <AuthProvider>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </AuthProvider>
    );

    expect(screen.getByText(/Welcome!/i)).toBeInTheDocument();
    expect(screen.getByText(/Users/i)).toBeInTheDocument();
    expect(screen.getByText(/Resources/i)).toBeInTheDocument();
    const logoutButton = screen.getByText(/Logout/i);
    expect(logoutButton).toBeInTheDocument();
    fireEvent.click(logoutButton);
    expect(screen.getByText(/Are you sure/i)).toBeInTheDocument();
  });
});

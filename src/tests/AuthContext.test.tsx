import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { AuthProvider, AuthContext } from "../context/AuthContext";

const renderWithAuthProvider = (ui: React.ReactNode) => {
  return render(<AuthProvider>{ui}</AuthProvider>);
};

describe("AuthContext", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("initial state is not authenticated", () => {
    renderWithAuthProvider(<div />);
    expect(screen.queryByText(/Welcome!/i)).toBeNull();
  });

  test("signIn successfully updates the context", async () => {
    renderWithAuthProvider(
      <AuthContext.Consumer>
        {({ signIn, isAuthenticated }) => (
          <>
            <button onClick={() => signIn("eve.holt@reqres.in", "cityslicka")}>
              Sign In
            </button>
            <div>{isAuthenticated ? "Authenticated" : "Not Authenticated"}</div>
          </>
        )}
      </AuthContext.Consumer>
    );
    fireEvent.click(screen.getByText(/Sign In/i));
    expect(await screen.findByText(/Authenticated/i)).toBeInTheDocument();
  });

  test("signOut clears user state", async () => {
    renderWithAuthProvider(
      <AuthContext.Consumer>
        {({ signIn, signOut, user }) => (
          <>
            <button onClick={() => signIn("eve.holt@reqres.in", "cityslicka")}>
              Sign In
            </button>
            <button onClick={signOut}>Sign Out</button>
            <div>{user ? `Logged in as ${user.name}` : "Not Logged In"}</div>
          </>
        )}
      </AuthContext.Consumer>
    );

    fireEvent.click(screen.getByText(/Sign In/i));
    expect(
      await screen.findByText(/Logged in as Demo User/i)
    ).toBeInTheDocument();

    fireEvent.click(screen.getByText(/Sign Out/i));
    expect(screen.getByText(/Not Logged In/i)).toBeInTheDocument();
  });
});

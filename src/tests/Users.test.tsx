import React from "react";
import { render, screen } from "@testing-library/react";
import { AuthProvider } from "../context/AuthContext";
import Users from "../components/users/Users";
import useUsers from "../hooks/useUsers";
import { MemoryRouter } from "react-router-dom";

jest.mock("../hooks/useUsers");

const mockUsers = [
  {
    id: 1,
    first_name: "John",
    last_name: "Doe",
    email: "john@example.com",
    avatar: "",
  },
  {
    id: 2,
    first_name: "Jane",
    last_name: "Doe",
    email: "jane@example.com",
    avatar: "",
  },
];

describe("Users Component", () => {
  beforeEach(() => {
    (useUsers as jest.Mock).mockReturnValue({
      loading: false,
      users: mockUsers,
      getUsers: jest.fn(),
    });
  });

  test("renders users correctly", () => {
    render(
      <AuthProvider>
        <MemoryRouter>
          <Users />
        </MemoryRouter>
      </AuthProvider>
    );

    expect(screen.getByText(/john@example.com/i)).toBeInTheDocument();
    expect(screen.getByText(/jane@example.com/i)).toBeInTheDocument();
  });

  test("displays loader while loading", () => {
    (useUsers as jest.Mock).mockReturnValue({
      loading: true,
      users: [],
      getUsers: jest.fn(),
    });

    render(
      <AuthProvider>
        <MemoryRouter>
          <Users />
        </MemoryRouter>
      </AuthProvider>
    );

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });
});

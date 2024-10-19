import { renderHook, act } from "@testing-library/react";
import useUsers from "../hooks/useUsers";
import { api } from "../hooks/apiService";

jest.mock("../hooks/apiService");

describe("useUsers", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch users and set the users state", async () => {
    const mockUsers = {
      data: {
        data: [
          {
            id: 1,
            email: "eve.holt@reqres.in",
            first_name: "Eve",
            last_name: "Holt",
            avatar: "https://reqres.in/img/faces/1-image.jpg",
          },
        ],
      },
    };

    (api.get as jest.Mock).mockResolvedValue(mockUsers);

    const { result } = renderHook(() => useUsers());

    await act(async () => {
      await result.current.getUsers();
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.users).toEqual(mockUsers.data.data);
  });

  it("should handle errors", async () => {
    (api.get as jest.Mock).mockRejectedValue(new Error("Network Error"));

    const { result } = renderHook(() => useUsers());

    await act(async () => {
      await result.current.getUsers();
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.users).toEqual([]);
  });
});

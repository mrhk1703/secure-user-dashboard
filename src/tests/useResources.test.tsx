import { renderHook, act } from "@testing-library/react";
import useResources from "../hooks/useResources";
import { api } from "../hooks/apiService";

jest.mock("../hooks/apiService");

describe("useResources", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch resources and set the resources state", async () => {
    const mockResources = {
      data: {
        data: [
          {
            id: 1,
            name: "Color 1",
            year: 2021,
            color: "#F3C200",
            pantone_value: "13-0756",
          },
        ],
      },
    };

    (api.get as jest.Mock).mockResolvedValue(mockResources);

    const { result } = renderHook(() => useResources());

    await act(async () => {
      await result.current.getResources();
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.resources).toEqual(mockResources.data.data);
  });

  it("should handle errors", async () => {
    (api.get as jest.Mock).mockRejectedValue(new Error("Network Error"));

    const { result } = renderHook(() => useResources());

    await act(async () => {
      await result.current.getResources();
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.resources).toEqual([]);
  });
});

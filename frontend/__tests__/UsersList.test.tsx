import React from "react";
import { screen } from "@testing-library/react";
import { renderWithProvider } from "./test-utils";
import UserList from "@/components/UsersList";

const mockUsers = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
];

beforeEach(() => {
    const res = new Response(JSON.stringify(mockUsers), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
    const g = globalThis as unknown as { fetch?: jest.Mock };
    g.fetch = jest.fn().mockResolvedValue(res);
});

afterEach(() => {
    const g = globalThis as unknown as { fetch?: jest.Mock };
    if (g.fetch) {
        g.fetch.mockReset();
    }
});

test("renders users from API", async () => {
    renderWithProvider(<UserList />);

    expect(await screen.findByText("Alice")).toBeInTheDocument();
    expect(await screen.findByText("Bob")).toBeInTheDocument();
});

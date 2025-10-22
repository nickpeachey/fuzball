import React from "react";
import { renderWithProvider } from "./test-utils";
import UserList from "@/components/UsersList";
import { screen, fireEvent, waitFor } from "@testing-library/react";

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

test("searches by numeric ID and shows only the matching user (single object result)", async () => {
    const g = globalThis as unknown as { fetch: jest.Mock };

    const resList = new Response(JSON.stringify(mockUsers), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
    const resUser = new Response(JSON.stringify({ id: 2, name: "Bob" }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });

    // First call: list, second call: single user
    g.fetch.mockResolvedValueOnce(resList).mockResolvedValueOnce(resUser);

    renderWithProvider(<UserList />);

    // Initial list
    expect(await screen.findByText("Alice")).toBeInTheDocument();
    expect(await screen.findByText("Bob")).toBeInTheDocument();

    // Perform search
    const input = screen.getByPlaceholderText("Search users...");
    fireEvent.change(input, { target: { value: "2" } });
    fireEvent.click(screen.getByRole("button", { name: /search/i }));

    // After search, only Bob should be rendered
    await waitFor(() => expect(screen.queryByText("Alice")).not.toBeInTheDocument());
    expect(screen.getByText("Bob")).toBeInTheDocument();
});

test("search returns an array result and renders it", async () => {
    const g = globalThis as unknown as { fetch: jest.Mock };

    const resList = new Response(JSON.stringify(mockUsers), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
    const resArray = new Response(JSON.stringify([mockUsers[0]]), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });

    // First call: list, second call: array with Alice
    g.fetch.mockResolvedValueOnce(resList).mockResolvedValueOnce(resArray);

    renderWithProvider(<UserList />);

    // Initial list
    expect(await screen.findByText("Alice")).toBeInTheDocument();
    expect(await screen.findByText("Bob")).toBeInTheDocument();

    // Perform search
    const input = screen.getByPlaceholderText("Search users...");
    fireEvent.change(input, { target: { value: "1" } });
    fireEvent.click(screen.getByRole("button", { name: /search/i }));

    // After search, only Alice should be rendered
    await waitFor(() => expect(screen.queryByText("Bob")).not.toBeInTheDocument());
    expect(screen.getByText("Alice")).toBeInTheDocument();
});

test("does not trigger search when input is not a number", async () => {
    const g = globalThis as unknown as { fetch: jest.Mock };
    renderWithProvider(<UserList />);

    // Initial list fetched once
    await screen.findByText("Alice");
    const initialCalls = g.fetch.mock.calls.length;

    const input = screen.getByPlaceholderText("Search users...");
    fireEvent.change(input, { target: { value: "abc" } }); // NaN
    fireEvent.click(screen.getByRole("button", { name: /search/i }));

    // No extra fetch should be triggered
    await waitFor(() => {
        expect(g.fetch).toHaveBeenCalledTimes(initialCalls);
    });

    // List remains unchanged
    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.getByText("Bob")).toBeInTheDocument();
});


import React, { ReactElement } from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { makeStore } from "@/lib/store";
import type { AppStore } from "@/lib/store";

export function renderWithProvider(
    ui: ReactElement,
    {
        store = makeStore(),
        ...renderOptions
    }: { store?: AppStore } = {}
) {
    function Wrapper({ children }: { children: React.ReactNode }) {
        return <Provider store={store}>{children}</Provider>;
    }

    return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}

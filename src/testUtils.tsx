import React, { type PropsWithChildren } from "react";
import { configureStore } from "@reduxjs/toolkit";
// @ts-ignore
import type { PreloadedState } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { render, type RenderOptions } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import projectReducer from "./store/projectSlice";
import type { RootState } from "./store";

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {},
    store = configureStore({ reducer: projectReducer }),
    route = "/projects/123",
    ...renderOptions
  }: {
    preloadedState?: PreloadedState<RootState>;
    store?: ReturnType<typeof configureStore>;
    route?: string;
  } & Omit<RenderOptions, "queries"> = {},
) {
  const Wrapper = ({ children }: PropsWithChildren<{}>) => (
    <Provider store={store}>
      <MemoryRouter initialEntries={[route]}>{children}</MemoryRouter>
    </Provider>
  );

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}

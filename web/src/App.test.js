import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import App from "./App";

test("Start at login screen", () => {
  render(<App />);
  expect(screen.getByRole("heading")).toHaveTextContent("Login");
});

test("navigation", () => {
  render(<App />);
  const register = screen.getByText(/Register/);
  expect(register).toHaveTextContent("Register");
  fireEvent.click(register);
  expect(screen.getByRole("heading")).toHaveTextContent("Register");
});

import "@testing-library/jest-dom";
import { fireEvent, render } from "@testing-library/react";
import LoginPage from "../app/(client)/login/page";
import { useRouter } from "next/router";
import { useUser } from '@clerk/nextjs';

jest.mock("@clerk/clerk-react", () => {
  return {
    SignInButton: jest.fn(() => <button data-testid="mock-signin-button">Sign in</button>),
    SignUpButton: jest.fn(() => <button data-testid="mock-signup-button">Sign up</button>),
    ClerkProvider: ({ children }) => <div>{children}</div>,
    ClerkLoaded: jest.fn(({ children }) => <>{children}</>),
    useClerk: () => ({ signOut: jest.fn() }),
  };
});


describe("Login Page", () => {
  it("check for relevant text", () => {
    const { getByText } = render(<LoginPage />);

    expect(getByText("MY")).toBeInTheDocument();
    expect(getByText("BUCKET")).toBeInTheDocument();
    expect(getByText("List")).toBeInTheDocument();
  });
});
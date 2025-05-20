import "@testing-library/jest-dom";
import { fireEvent, render } from "@testing-library/react";
import Home from "../../app/page";
import { useUser } from "@clerk/nextjs";

jest.mock("@clerk/nextjs", () => {
  return {
    SignInButton: jest.fn(() => <button data-testid="mock-signin-button">Sign in</button>),
    SignUpButton: jest.fn(() => <button data-testid="mock-signup-button">Sign up</button>),
    ClerkProvider: ({ children }) => <div>{children}</div>,
    ClerkLoaded: jest.fn(({ children }) => <>{children}</>),
    useClerk: () => ({ signOut: jest.fn() }),
    useUser: () => ({
      isSignedIn: true,
      isLoaded: true,
      user: {id: 'user_4452342424'},
    }),
  };
});

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("Home Page", () => {
  it("check for relevant text", async () => {
      const { getByText } = render(<Home />);
      expect(getByText("WELCOME,")).toBeInTheDocument();
  })
  it("Check for defined user session", async () => {
    expect(useUser().isSignedIn).toBe(true);
    expect(useUser().user.id).toBe("user_4452342424");
  })
});
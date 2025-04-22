import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import LoginPage from "../app/(client)/login/page";

jest.mock('@clerk/clerk-react', () => {
  return {
    SignInButton: ({}) => <div fallbackRedirectUrl="/" />,
    SignUpButton: ({}) => <div fallbackRedirectUrl="/" />,
    ClerkProvider: ({ children }) => <div>{children}</div>,
    useUser: () => ({ user: { id: 'user_123', fullName: 'John Doe' } }),
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
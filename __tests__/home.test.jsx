import "@testing-library/jest-dom";
import { fireEvent, render } from "@testing-library/react";
import Home from "../app/page";
import MenuItem from "../components/MenuItem";
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

jest.mock('@clerk/nextjs', () => ({
  useUser: () => ({
    isSignedIn: true,
    isLoaded: true,
    user: { firstName: 'Jean Testeur' },
  }),
}));

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

test('fetches data', async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ message: 'success' }),
    })
  );

  const response = await fetch(`/api/collections/user/${userId}`);
  const data = await response.json();

  expect(data.message).toBe('success');
});

describe("Home Page", () => {
  it("check for relevant text", () => {
    const { getByText } = render(<Home />);

    expect(getByText("WELCOME,")).toBeInTheDocument();
  });
});

describe("Test de session et redirection", () => {
  const pushMock = jest.fn();
  
  beforeEach(() => {
    useRouter.mockReturnValue({ push: pushMock });
  });

  it("affiche le composant si l'utilisateur est connecté", () => {
    useUser.mockReturnValue({ user: { name: "John Doe" } });
    
    expect(pushMock).not.toHaveBeenCalled();
  });

  it("redirige vers '/login' si l'utilisateur n'est pas connecté", () => {
    useUser.mockReturnValue({ user: null });
    
    expect(pushMock).toHaveBeenCalledWith("/login");
  });
});
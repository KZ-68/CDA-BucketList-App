import React from 'react';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import Home from "../../app/page";
import LoginPage from "../../app/(client)/login/page";

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

expect.extend(toHaveNoViolations);

test('Home page is accessible', async () => {
  const { container } = render(<Home />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});

test('Login page is accessible', async () => {
    const { container } = render(<LoginPage />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
});
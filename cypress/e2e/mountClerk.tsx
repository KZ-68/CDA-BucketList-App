import React from 'react';
import { mount } from 'cypress/react';
import { ClerkProvider } from '@clerk/nextjs';
import * as clerk from '@clerk/clerk-react';
import { NextNavigationRouterMock } from "@/cypress/mocks/CustomRouter";

const ClerkWrapper = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => (
  <ClerkProvider
    afterSignOutUrl="/login"
  >
    {children}
  </ClerkProvider>
);

export const mountWithClerk = (component: React.ReactNode) => {
  
  cy.stub(clerk, 'useUser').returns({
    isLoaded: true,
    isSignedIn: true,
    user: {
      id: 'abc123',
      fullName: 'Jean Testeur',
      primaryEmailAddress: {
        emailAddress: 'jean@test.dev',
      },
    },
  });
  
  const routerStub = {
    replace: cy.stub().as("router:replace")
  };
  return mount(<NextNavigationRouterMock router={routerStub}><ClerkWrapper>{component}</ClerkWrapper></NextNavigationRouterMock>);
};
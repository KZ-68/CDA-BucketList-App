/* eslint-disable prefer-rest-params */
import { AppRouterContext, AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { PathnameContext, SearchParamsContext } from "next/dist/shared/lib/hooks-client-context.shared-runtime";
import { ReactNode, useState } from "react";

export const NextNavigationRouterMock = ({
  children,
  router
}: {
  children: ReactNode;
  router: Partial<AppRouterInstance>;
}) => {
  const [searchParams, setSearchParams] = useState<URLSearchParams>(new URLSearchParams());
  const routerProxy = new Proxy(router, {
    get(target: Record<string, () => void>, prop: string) {
      if (["push", "replace"].includes(prop)) {
        return function () {
          const [paramsString] = [...arguments];
           
          // update search params values
          setSearchParams(new URLSearchParams(paramsString?.split("/")?.[1]));
          
          // invoke the original method
          target[prop].apply(null, [...arguments] as []);
        };
      }

      return target[prop];
    }
  });

  return (
    <AppRouterContext.Provider value={routerProxy as AppRouterInstance}>
      <SearchParamsContext.Provider value={searchParams}>
        <PathnameContext.Provider value={"/"}>{children}</PathnameContext.Provider>
      </SearchParamsContext.Provider>
    </AppRouterContext.Provider>
  );
};
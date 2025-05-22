import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import RedirectionHook from "../../components/RedirectionHook";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("Redirection hook component", () => {
  const pushMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();

    // Fourni un faux useRouter
    const useRouter = require("next/navigation").useRouter;
    useRouter.mockReturnValue({
      push: pushMock,
    });
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  // Vérifie si le delay du setTimeout est bien sur 3000ms
  test("Verify if the call has a delay fixed to 3000ms", () => {
    // Espionne le délai de setTimeout
    const setTimeoutSpy = jest.spyOn(global, "setTimeout");
    render(<RedirectionHook url="/collections/user" />);

    expect(pushMock).not.toHaveBeenCalled();
    expect(setTimeoutSpy).toHaveBeenCalledWith(expect.any(Function), 3000);

    setTimeoutSpy.mockRestore();
  });

  // Vérifie si l'url dans l'argument du composant est bien en compte
  test("Should call redirection to this specific url", () => {
    render(<RedirectionHook url="/collections/user" />);
    // Permet d'avancer le délai de 3000ms
    jest.advanceTimersByTime(3000);
    const [calledUrl] = pushMock.mock.calls[0];
    expect(calledUrl).toBe("/collections/user");
  })

  // Vérifie si la redirection est bien appelée qu'une fois
  test("Should call redirection only one time", () => {
    render(<RedirectionHook url="/collections/user" />);
    jest.advanceTimersByTime(3000);
    expect(pushMock).toHaveBeenCalledTimes(1);
  })
});
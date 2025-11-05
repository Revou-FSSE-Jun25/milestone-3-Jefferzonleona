// jest.setup.ts
import "@testing-library/jest-dom";

// mock next/navigation kalau diperlukan
jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: jest.fn(), replace: jest.fn() }),
}));

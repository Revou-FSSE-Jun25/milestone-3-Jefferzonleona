import React from "react";
import { render, screen } from "@testing-library/react";
import Navbar from "../app/components/Navbar";

jest.mock("next-auth/react", () => ({
  useSession: jest.fn(),
  signOut: jest.fn(),
}));

const { useSession } = require("next-auth/react");

describe("Navbar auth behavior", () => {
  test("shows Admin link when role is admin", () => {
    useSession.mockReturnValue({ data: { user: { name: "Admin", role: "admin" } }, status: "authenticated" });
    render(<Navbar />);

    const adminLink = screen.getByText(/Admin/i);
    expect(adminLink).toBeInTheDocument();
  });

  test("does not show Admin link for normal user", () => {
    useSession.mockReturnValue({ data: { user: { name: "User", role: "user" } }, status: "authenticated" });
    render(<Navbar />);

    const admin = screen.queryByText(/Admin/i);
    expect(admin).toBeNull();
  });
});

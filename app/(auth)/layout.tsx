import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Authentication - Fynance",
  description: "Login or register to manage your finances",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}

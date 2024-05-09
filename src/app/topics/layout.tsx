import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Topics Layout Lists"
};

export default function TopicsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

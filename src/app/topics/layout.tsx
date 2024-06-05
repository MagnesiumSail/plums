import type { Metadata } from "next";
import FormSelector from "../components/FormSelector";

export const metadata: Metadata = {
  title: "Topics Layout Lists"
};

export default function TopicsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <FormSelector />
      {children}
    </div>
  );
}
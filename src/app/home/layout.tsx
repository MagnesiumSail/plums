import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from '../components/Header';
import Footer from '../components/footer';
import AuthProvider from "../context/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Home Page",
  description: "Personal Learning Management System",
};

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={inter.className}>
    <AuthProvider>
    {children}
    </AuthProvider>
  </div>
  );
}

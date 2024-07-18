import './globals.css';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import AuthProvider from './context/AuthProvider';
import Header from './components/Header';
import Footer from './components/footer';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Plums",
  description: "Personal Learning Management System",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Header />
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}

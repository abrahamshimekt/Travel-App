import type { Metadata } from "next";

import "./globals.css";
import Navbar from "@/components/navBar";
import Footer from "@/components/footer";
import StoreProvider from "./StoreProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 

export const metadata: Metadata = {
  title: "Travel",
  description: "Travel UI/UX App for Camping",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          <Navbar />
          <ToastContainer />
          <main className="relative overflow-hidden">{children}</main>
          <Footer />
        </StoreProvider>
      </body>
    </html>
  );
}

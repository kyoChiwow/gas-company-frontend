import Footer from "@/components/general/Footer";
import Navbar from "@/components/general/Navbar";
import { ReactNode } from "react";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Navbar />
      <main className="min-h-screen flex-1 max-w-7xl mx-auto pt-10 px-4">{children}</main>
      <Footer />
    </div>
  );
}

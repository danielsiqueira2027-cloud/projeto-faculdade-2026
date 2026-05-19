import Navbar from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import TempNavFooter from "@/components/TempNavFooter";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="grow">
        {children}
      </main>
      <TempNavFooter />
      <Footer />
    </>
  );
}

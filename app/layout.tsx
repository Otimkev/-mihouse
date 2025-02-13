import { Nunito } from "next/font/google";

import Navbar from "@/app/components/navbar/Navbar";
import LoginModal from "@/app/components/modals/LoginModal";
import RegisterModal from "@/app/components/modals/RegisterModal";
import SearchModal from "@/app/components/modals/SearchModal";
import RentModal from "@/app/components/modals/RentModal";

import ToasterProvider from "@/app/providers/ToasterProvider";

import "./globals.css";
import ClientOnly from "./components/ClientOnly";
import getCurrentUser from "./actions/getCurrentUser";
import GenerateIdealModal from "./components/modals/GenerateIdeaModal";
import Providers from "./redux/Providers";
import CreditsModal from "./components/modals/CreditsModal";

export const metadata = {
  title: "mihouse AI",
  description: "AI is a great tool to generate interior design ideas.",
};

const font = Nunito({
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={font.className}>
        <Providers>
          <ClientOnly>
            <Navbar currentUser={currentUser} />
            <ToasterProvider />
            <LoginModal />
            <RegisterModal />
            <SearchModal />
            <RentModal />
            <CreditsModal/>
            <GenerateIdealModal />
            <div className="pb-20 pt-28 2xl:h-screen 2xl:overflow-hidden xl:h-screen xl:overflow-hidden lg:h-screen lg:overflow-hidden">
              {children}
            </div>
          </ClientOnly>
        </Providers>
      </body>
    </html>
  );
}

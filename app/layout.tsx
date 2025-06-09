import "./globals.css";
import { AuthProvider } from "./context/authcontext";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tafsiri | Preserving Kenyan Languages",
  description:
    "Preserving and promoting Kenya's indigenous languages through open-source technology.",
  icons: {
    icon: "/taffavicon.ico", // Your favicon in /public/favicon.ico
    apple: "/apple-touch-icon.png", // Optional for iOS
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});


export const metadata: Metadata = {
  title: "Winson Portfolio",
  description: "Spotify-inspired developer portfolio",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({children,}: {children: React.ReactNode;}) {

  return (
    <html lang="en" className={poppins.variable}>
      <body className="antialiased bg-black text-white">{children}</body>
    </html>
  );
}
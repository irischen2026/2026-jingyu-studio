import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "JingYu's Digital Lab",
  description:
    "A digital lab exploring AI tools, generative workflows, and the intersection of design and engineering. Currently building WutZit — an AI tool that translates code into human metaphors.",
  keywords: ["AI", "Developer Tools", "WutZit", "Generative AI", "Digital Lab", "JingYu"],
  authors: [{ name: "JingYu" }],
  openGraph: {
    title: "JingYu's Digital Lab",
    description: "Exploring AI tools, generative workflows, and design engineering.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

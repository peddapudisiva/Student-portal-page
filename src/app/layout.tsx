import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "IXL Integrated School - Student Portal",
  description: "Official Student Portal for IXL Integrated School. Access your academics, assignments, and AI tutor.",
  keywords: "student portal, school ERP, IXL school, academic management",
  authors: [{ name: "IXL Integrated School" }],
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ixl-portal.edu",
    siteName: "IXL Student Portal",
    title: "IXL Integrated School - Student Portal",
    description: "Manage your academic journey with the IXL Integrated School Student Portal.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "IXL Student Portal Dashboard preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "IXL Integrated School - Student Portal",
    description: "Access assignments, attendance, and AI tutoring in one place.",
    images: ["/og-image.png"],
  },
};

import { AuthProvider } from "@/lib/auth-context";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-[#f3f4f6] text-[#0f172a]">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}

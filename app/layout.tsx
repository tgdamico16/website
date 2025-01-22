import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Card, CardContent } from "@/components/ui/card";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { TSParticles } from "@/components/particles";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Troy's Site - Home",
  description: "A website all about Troy",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-neutral-950`}>
        <Navbar />
        <Card className="mx-8">
          <CardContent className="pt-6 min-h-[80vh]">
            <main>{children}</main>
          </CardContent>
        </Card>
        <Footer />
        <TSParticles />
      </body>
    </html>
  );
}

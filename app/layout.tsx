import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Troy's Page - Home",
  description: "A website all about Troy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-neutral-950`}>
        <div className="px-8 py-4 text-foreground flex justify-between items-center">
          <span className="float-left">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link href="/" legacyBehavior passHref>
                    <NavigationMenuLink>
                      <div className="flex items-center">
                        <Avatar>
                          <AvatarImage src="/avatarZoomed2.jpg" alt="@shadcn" />
                        </Avatar>
                        <p className="font-bold text-xl ml-2">TGD</p>
                      </div>
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </span>
          <span className="float-right">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem className="pr-4">
                  <Link href="/games" legacyBehavior passHref>
                    <NavigationMenuLink>Games</NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem className="px-2">
                  <Link href="/" legacyBehavior passHref>
                    <NavigationMenuLink>Page 2</NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <span className="float-right">
                  <NavigationMenuItem className="pl-4">
                    <Link href="/" legacyBehavior passHref>
                      <NavigationMenuLink>Page 3</NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                </span>
              </NavigationMenuList>
            </NavigationMenu>
          </span>
        </div>
        <Card className="mx-8">
          <CardContent className="pt-6 min-h-[80vh]">
            <main>{children}</main>
          </CardContent>
        </Card>
        <div className="w-full py-4">
          <p className="text-white text-center text-sm">
            Developed by Troy D&apos;Amico
          </p>
        </div>
      </body>
    </html>
  );
}

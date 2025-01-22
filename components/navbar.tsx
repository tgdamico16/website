import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "./ui/navigation-menu";
import { Avatar, AvatarImage } from "./ui/avatar";
import Link from "next/link";

export function Navbar() {
  return (
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
  );
}

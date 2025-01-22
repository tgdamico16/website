import { Avatar, AvatarImage } from "@/components/ui/avatar";

export default function Home() {
  return (
    <div className="pl-10 text-foreground self-center flex flex-col gap-2">
      <h1 className="text-2xl sm:text-5xl font-bold">
        Welcome to Troy's Website
      </h1>
      <p className="text-sm sm:text-lg">Navigate to a page to get started</p>
    </div>
  );
}

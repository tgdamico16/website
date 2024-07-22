import { Avatar, AvatarImage } from "@/components/ui/avatar";

export default function Home() {
  return (
    <>
      <Avatar className="size-28">
        <AvatarImage src="/avatar.jpg" alt="@shadcn" />
      </Avatar>
      <h1>Welcome to Troy&apos;s Website!</h1>
    </>
  );
}

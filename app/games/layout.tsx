import { Card } from "@/components/ui/card";

export default function GamesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="w-full flex justify-center">
      <Card className="w-[75vw] p-4">{children}</Card>
    </section>
  );
}

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";

export default function Games() {
  return (
    <>
      <h1 className="text-center font-bold text-xl">Games</h1>
      <div className="grid grid-cols-2 gap-4 pt-4">
        <Link href="/games/spelling-bee">
          <Card>
            <CardHeader>Spelling Bee</CardHeader>
            <CardContent className="pt-6">Spelling Game</CardContent>
          </Card>
        </Link>
        <Card>
          <CardHeader>title</CardHeader>
          <CardContent className="pt-6">temp</CardContent>
        </Card>
      </div>
    </>
  );
}

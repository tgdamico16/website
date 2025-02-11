import { Icons } from "@/components/icons";

export default function BlackjackPage() {
  return (
    <div className="flex flex-col">
      <h1 className="text-center text-xl font-bold">Blackjack</h1>
      <div className="flex flex-col">
        <div className="flex justify-between">
          <Icons.spade />
          <h1>Balance: 5000</h1>
        </div>
      </div>
    </div>
  );
}

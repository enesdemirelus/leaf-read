import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="m-2">
        <h1>Welcome!</h1>

        <Link href="/backend-test">
          <Button>api backend test!</Button>
        </Link>
      </div>
    </>
  );
}

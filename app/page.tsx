
import Image from "next/image";
import Landing from "@/elements/landing";
import Horizontal from "@/elements/horizontal";
import Physics from "@/elements/physics";
//font-[family-name:var(--font-satoshi)]
export default function Home() {
  return (
    <div>
      <Landing />
      <Horizontal />
      <Physics />
    </div>
  );
}
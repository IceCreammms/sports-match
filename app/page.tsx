import Footer from "@/elements/footer";
import Horizontal from "@/elements/horizontal";
import Landing from "@/elements/landing";
import Physics from "@/elements/physics";
//font-[family-name:var(--font-satoshi)]
export default function Home() {
  return (
    <div>
      <Landing />
      <Horizontal />
      <Physics />
      <Footer />
    </div>
  );
}

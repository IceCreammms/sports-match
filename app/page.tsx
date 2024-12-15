import Footer from "@/elements/footer";
import Horizontal from "@/elements/horizontal";
import Landing from "@/elements/landing";
import Physics from "@/elements/physics";
import SportSwipe from "@/elements/cards";
//font-[family-name:var(--font-satoshi)]
export default function Home() {
  return (
    <div>
      <Landing />
      <Horizontal />
      <Physics />
      <SportSwipe />
      <Footer />
    </div>
  );
}

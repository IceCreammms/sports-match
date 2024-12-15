import Button from "@/components/button";

export default function Landing() {
  return (
    <div className="bg-white min-h-screen w-full p-8">
      <div className="bg-cover bg-[url('/default.png')] min-h-[calc(100vh-4rem)] w-full p-10 border-4 border-white flex flex-col justify-center items-center">
        <div className="font-[family-name:var(--font-maru-mega)] text-[220px]">
          PlayPulse
        </div>
        <div className="font-[family-name:var(--font-satoshi)] text-[40px] text-black font-bold">
          Every passion has its sport – discover yours.
        </div>
        <Button />
      </div>
    </div>
  );
}
